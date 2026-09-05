import express from 'express';
import {
  getThreads,
  sendMessage,
  markThreadRead,
} from '../controllers/messageController.js';

const router = express.Router();

router.get('/', getThreads);
router.post('/:threadId', sendMessage);
router.patch('/:threadId/read', markThreadRead);

export default router;
