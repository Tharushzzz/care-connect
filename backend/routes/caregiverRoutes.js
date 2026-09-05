import express from 'express';
import {
  getCaregivers,
  getCaregiverById,
  updateCaregiverVerification,
  addCaregiverReview,
} from '../controllers/caregiverController.js';

const router = express.Router();

router.get('/', getCaregivers);
router.get('/:id', getCaregiverById);
router.patch('/:id/verify', updateCaregiverVerification);
router.post('/:id/reviews', addCaregiverReview);

export default router;
