import { Router } from 'express';
import { body } from 'express-validator';
import Experience from '../models/Experience.js';
import { createCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
const ctrl = createCrudController(Experience, { defaultSort: 'order -startDate' });

const validation = [
  body('role').trim().notEmpty().withMessage('Role is required'),
  body('company').trim().notEmpty().withMessage('Company is required'),
  body('startDate').notEmpty().withMessage('Start date is required').isISO8601(),
];

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post('/', protect, validation, validate, ctrl.create);
router.put('/reorder', protect, ctrl.reorder);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;
