import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import { seedAdminUser } from './config/seedAdmin.js';

dotenv.config();

// Connect to MongoDB
connectDB().then(() => {
  seedAdminUser();
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
app.use('/api/bookings', bookingRoutes);
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.send('CareConnect API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});