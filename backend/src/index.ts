import app from './app';
import connectDB from './config/db';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5002;

const startServer = async () => {
  try {
    // Connect to Database
    await connectDB();

    // Start Listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
