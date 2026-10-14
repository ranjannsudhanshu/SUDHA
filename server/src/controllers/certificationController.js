import asyncHandler from 'express-async-handler';
import Certification from '../models/Certification.js';
import { deleteImage } from '../config/cloudinary.js';
import { createCrudController } from '../utils/crudFactory.js';

const base = createCrudController(Certification, { defaultSort: 'order -issueDate' });

export const getAllCertifications = base.getAll;
export const getCertification = base.getOne;
export const reorderCertifications = base.reorder;

export const createCertification = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) data.image = { url: req.file.path, publicId: req.file.filename };

  const cert = await Certification.create(data);
  res.status(201).json({ success: true, data: cert });
});

export const updateCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findById(req.params.id);
  if (!cert) {
    res.status(404);
    throw new Error('Certification not found');
  }

  if (req.file) {
    if (cert.image?.publicId) await deleteImage(cert.image.publicId);
    req.body.image = { url: req.file.path, publicId: req.file.filename };
  }

  Object.assign(cert, req.body);
  await cert.save();

  res.json({ success: true, data: cert });
});

export const deleteCertification = asyncHandler(async (req, res) => {
  const cert = await Certification.findByIdAndDelete(req.params.id);
  if (!cert) {
    res.status(404);
    throw new Error('Certification not found');
  }
  if (cert.image?.publicId) await deleteImage(cert.image.publicId);
  res.json({ success: true, message: 'Certification deleted successfully' });
});
