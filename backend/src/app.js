import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import { authRouter } from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(morgan('combined'));
app.use(helmet());

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.json({ message: 'WrestleBest API Server' });
});

app.use("/auth", authRouter);

export { app };