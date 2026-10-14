import { Router } from 'express';
import { body } from 'express-validator';
import Education from '../models/Education.js';
import { createCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
const ctrl = createCrudController(Education, { defaultSort: 'order -startDate' });

const validation = [
  body('degree').trim().notEmpty().withMessage('Degree is required'),
  body('institution').trim().notEmpty().withMessage('Institution is required'),
];

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post('/', protect, validation, validate, ctrl.create);
router.put('/reorder', protect, ctrl.reorder);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;
