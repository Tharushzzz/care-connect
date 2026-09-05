import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config();

// Connect to MongoDB
connectDB();

const port = process.env.PORT || 5000;

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('CareConnect API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});