import express from 'express';
import {
  getCaregivers,
  getCaregiverById,
  updateCaregiverVerification,
  addCaregiverReview,
  getSavedCaregivers,
  saveCaregiver,
  removeSavedCaregiver,
  clearSavedCaregivers,
} from '../controllers/caregiverController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Saved caregivers routes (Must be declared before /:id)
router.get('/saved', protect, getSavedCaregivers);
router.delete('/saved', protect, clearSavedCaregivers);
router.post('/saved/:id', protect, saveCaregiver);
router.delete('/saved/:id', protect, removeSavedCaregiver);

router.get('/', getCaregivers);
router.get('/:id', getCaregiverById);
router.patch('/:id/verify', updateCaregiverVerification);
router.post('/:id/reviews', addCaregiverReview);

export default router;
