import express from 'express';
import {
  getBookings,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from '../controllers/bookingController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', optionalAuth, getBookings);
router.post('/', optionalAuth, createBooking);
router.patch('/:id/status', optionalAuth, updateBookingStatus);
router.delete('/:id', optionalAuth, deleteBooking);

export default router;
