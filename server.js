import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bcrypt from 'bcrypt';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const MONGODB_URI = 'mongodb://localhost:27017';
const DB_NAME = 'wrestlebestdb';
const COLLECTION_NAME = 'wrestlebestdb_collection';

let db;

MongoClient.connect(MONGODB_URI)
  .then(client => {
    db = client.db(DB_NAME);
    console.log('Connected to MongoDB');
  })
  .catch(error => console.error('MongoDB connection error:', error));

app.post('/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const existingUser = await db.collection(COLLECTION_NAME).findOne({
      $or: [{ username }, { email }]
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await db.collection(COLLECTION_NAME).insertOne({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });
    
    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const user = await db.collection(COLLECTION_NAME).findOne({ username });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }
    
    res.json({
      token: 'fake-token-' + user._id,
      user: { username: user.username, id: user._id }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});