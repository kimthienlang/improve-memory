import express from 'express';
import type { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db';
import { errorMiddleware } from './middlewares/errorMiddleware';
import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';
import collectionRoutes from './routes/collectionRoutes';
import cookieParser from 'cookie-parser';

// Load environmental variables FIRST (before anything that needs them)
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3030;

connectDB();


app.use(cors({
  origin: true, // Allow all origins for now (can change to specific frontend URL)
  credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register routes
app.use((req, res, next) => {
  console.log(`>>> Request nhận được: ${req.method} ${req.url}`);
  next();
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/collections', collectionRoutes);


// Global Error Handler (HAVE TO BE AT THE END)
app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`\x1b[36m[Server] Running at: http://localhost:${PORT}\x1b[0m`);
});