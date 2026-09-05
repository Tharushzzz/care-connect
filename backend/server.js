import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import caregiverRoutes from './routes/caregiverRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { seedData } from './config/seedData.js';

dotenv.config();

// Connect to MongoDB and seed dataset
connectDB().then(async () => {
  await seedData();
});

const port = process.env.PORT || 5000;

const app = express();

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/caregivers', caregiverRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.send('CareConnect API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});