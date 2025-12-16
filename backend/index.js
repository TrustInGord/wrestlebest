import 'dotenv/config';
import { app } from "./src/app.js";
import { connectDB } from './src/config/database.js';

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT, () => {
  console.info(`WrestleBest server running on PORT: ${PORT}`);
});