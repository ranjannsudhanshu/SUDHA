import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  reorderProjects,
} from '../controllers/projectController.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { uploadSingle } from '../config/cloudinary.js';

const router = Router();

const projectValidation = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('shortDescription')
    .trim()
    .notEmpty()
    .withMessage('Short description is required')
    .isLength({ max: 200 })
    .withMessage('Short description must be under 200 characters'),
];

router.get('/', getAllProjects);
router.get('/:id', getProject);

router.post('/', protect, ...uploadSingle('image'), projectValidation, validate, createProject);
router.put('/reorder', protect, reorderProjects);
router.put('/:id', protect, ...uploadSingle('image'), updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
