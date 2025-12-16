import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected to Auth database');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};