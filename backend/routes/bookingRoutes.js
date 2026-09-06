import express from 'express';
import {
  getBookings,
  createBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getBookings);
router.post('/', optionalAuth, createBooking);
router.patch('/:id/status', optionalAuth, updateBookingStatus);

export default router;
