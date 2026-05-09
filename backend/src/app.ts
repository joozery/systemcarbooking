import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

import partnerRoutes from './routes/partnerRoutes';
import staffRoutes from './routes/staffRoutes';
import uploadRoutes from './routes/uploadRoutes';
import logRoutes from './routes/logRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app: Application = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/partners', partnerRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/bookings', bookingRoutes);

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Crown Wealth API' });
});

// Health Check
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

export default app;
