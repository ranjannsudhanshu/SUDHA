import { Router } from 'express';
import { body } from 'express-validator';
import {
  getProfile,
  updateProfile,
  updateProfileImage,
  updateSocialLinks,
} from '../controllers/profileController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadSingle } from '../config/cloudinary.js';

const router = Router();

router.get('/', getProfile);

router.put(
  '/',
  protect,
  [
    body('email').optional({ checkFalsy: true }).isEmail().withMessage('Must be a valid email'),
    body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  ],
  validate,
  updateProfile
);

router.put('/image', protect, ...uploadSingle('image'), updateProfileImage);

router.put('/social-links', protect, updateSocialLinks);

export default router;
