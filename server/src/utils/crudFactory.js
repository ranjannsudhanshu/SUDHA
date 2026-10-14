import asyncHandler from 'express-async-handler';

// Generates standard index/create/update/delete/reorder handlers for a
// simple Mongoose model. Resources with extra behavior (e.g. image
// handling) layer their own controller on top instead of using this,
// see projectController.js and certificationController.js.
export const createCrudController = (Model, { defaultSort = 'order' } = {}) => {
  const getAll = asyncHandler(async (req, res) => {
    const items = await Model.find().sort(defaultSort);
    res.json({ success: true, count: items.length, data: items });
  });

  const getOne = asyncHandler(async (req, res) => {
    const item = await Model.findById(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ success: true, data: item });
  });

  const create = asyncHandler(async (req, res) => {
    const item = await Model.create(req.body);
    res.status(201).json({ success: true, data: item });
  });

  const update = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ success: true, data: item });
  });

  const remove = asyncHandler(async (req, res) => {
    const item = await Model.findByIdAndDelete(req.params.id);
    if (!item) {
      res.status(404);
      throw new Error('Item not found');
    }
    res.json({ success: true, message: 'Deleted successfully' });
  });

  // Accepts [{ id, order }, ...] and bulk-updates order fields in one go.
  const reorder = asyncHandler(async (req, res) => {
    const { items } = req.body;
    if (!Array.isArray(items)) {
      res.status(400);
      throw new Error('items must be an array of { id, order }');
    }

    await Promise.all(
      items.map(({ id, order }) => Model.findByIdAndUpdate(id, { order }))
    );

    const updated = await Model.find().sort(defaultSort);
    res.json({ success: true, data: updated });
  });

  return { getAll, getOne, create, update, remove, reorder };
};
