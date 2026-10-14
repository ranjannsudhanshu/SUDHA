import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllCertifications,
  getCertification,
  createCertification,
  updateCertification,
  deleteCertification,
  reorderCertifications,
} from '../controllers/certificationController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadSingle } from '../config/cloudinary.js';

const router = Router();

const validation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('issuer').trim().notEmpty().withMessage('Issuer is required'),
];

router.get('/', getAllCertifications);
router.get('/:id', getCertification);

router.post('/', protect, ...uploadSingle('image'), validation, validate, createCertification);
router.put('/reorder', protect, reorderCertifications);
router.put('/:id', protect, ...uploadSingle('image'), updateCertification);
router.delete('/:id', protect, deleteCertification);

export default router;
