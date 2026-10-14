import { validationResult } from 'express-validator';

// Run this after any array of express-validator checks in a route to
// short-circuit with a clean 400 response if validation fails.
export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};
