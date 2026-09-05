import express from 'express';
import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
  createNotification,
} from '../controllers/notificationController.js';

const router = express.Router();

router.get('/', getNotifications);
router.post('/', createNotification);
router.patch('/read-all', markAllNotificationsRead);
router.patch('/:id/read', markNotificationRead);

export default router;
