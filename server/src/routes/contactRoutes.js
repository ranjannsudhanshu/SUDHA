import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import {
  submitContactMessage,
  getMessages,
  markMessageRead,
  deleteMessage,
} from '../controllers/contactController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();

// Basic abuse protection on the public contact endpoint.
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many messages sent. Please try again later.' },
});

router.post(
  '/',
  contactLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('A valid email is required'),
    body('message').trim().notEmpty().withMessage('Message cannot be empty'),
  ],
  validate,
  submitContactMessage
);

router.get('/', protect, getMessages);
router.put('/:id/read', protect, markMessageRead);
router.delete('/:id', protect, deleteMessage);

export default router;
