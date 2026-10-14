import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import { deleteImage } from '../config/cloudinary.js';
import { createCrudController } from '../utils/crudFactory.js';

const base = createCrudController(Project, { defaultSort: 'order -createdAt' });

// technologies arrives from multipart/form-data as either a JSON string
// or a comma-separated string; normalize to an array either way.
const normalizeTechnologies = (body) => {
  if (body.technologies === undefined) return;
  if (Array.isArray(body.technologies)) return;
  try {
    body.technologies = JSON.parse(body.technologies);
  } catch {
    body.technologies = body.technologies
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
  }
};

export const getAllProjects = base.getAll;
export const getProject = base.getOne;
export const reorderProjects = base.reorder;

export const createProject = asyncHandler(async (req, res) => {
  normalizeTechnologies(req.body);

  const data = { ...req.body };
  if (req.file) {
    data.image = { url: req.file.path, publicId: req.file.filename };
  }

  const project = await Project.create(data);
  res.status(201).json({ success: true, data: project });
});

export const updateProject = asyncHandler(async (req, res) => {
  normalizeTechnologies(req.body);

  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }

  if (req.file) {
    if (project.image?.publicId) await deleteImage(project.image.publicId);
    req.body.image = { url: req.file.path, publicId: req.file.filename };
  }

  Object.assign(project, req.body);
  await project.save();

  res.json({ success: true, data: project });
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) {
    res.status(404);
    throw new Error('Project not found');
  }
  if (project.image?.publicId) await deleteImage(project.image.publicId);
  res.json({ success: true, message: 'Project deleted successfully' });
});
