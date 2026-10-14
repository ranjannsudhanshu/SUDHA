import { Router } from 'express';
import { body } from 'express-validator';
import Skill from '../models/Skill.js';
import { createCrudController } from '../utils/crudFactory.js';
import { protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';

const router = Router();
const ctrl = createCrudController(Skill);

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getOne);

router.post(
  '/',
  protect,
  [body('name').trim().notEmpty().withMessage('Skill name is required')],
  validate,
  ctrl.create
);
router.put('/reorder', protect, ctrl.reorder);
router.put('/:id', protect, ctrl.update);
router.delete('/:id', protect, ctrl.remove);

export default router;
