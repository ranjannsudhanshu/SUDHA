import asyncHandler from 'express-async-handler';
import Profile from '../models/Profile.js';
import { deleteImage } from '../config/cloudinary.js';

// Profile is a singleton. This helper fetches it, creating an empty
// default document the very first time so the public site never 404s.
const getOrCreateProfile = async () => {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create({});
  }
  return profile;
};

// @desc    Get public profile info
// @route   GET /api/profile
// @access  Public
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();
  res.json({ success: true, data: profile });
});

// @desc    Update profile fields (bio, contact info, resume link, etc.)
// @route   PUT /api/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await getOrCreateProfile();

  const editableFields = [
    'name',
    'title',
    'tagline',
    'heroHeadline',
    'bio',
    'location',
    'email',
    'phone',
    'resumeUrl',
  ];

  editableFields.forEach((field) => {
    if (req.body[field] !== undefined) profile[field] = req.body[field];
  });

  await profile.save();
  res.json({ success: true, data: profile });
});

// @desc    Upload/replace profile image
// @route   PUT /api/profile/image
// @access  Private
export const updateProfileImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error('No image file uploaded');
  }

  const profile = await getOrCreateProfile();

  if (profile.profileImage?.publicId) {
    await deleteImage(profile.profileImage.publicId);
  }

  profile.profileImage = { url: req.file.path, publicId: req.file.filename };
  await profile.save();

  res.json({ success: true, data: profile });
});

// @desc    Replace the full social links array
// @route   PUT /api/profile/social-links
// @access  Private
export const updateSocialLinks = asyncHandler(async (req, res) => {
  const { socialLinks } = req.body;

  if (!Array.isArray(socialLinks)) {
    res.status(400);
    throw new Error('socialLinks must be an array');
  }

  const profile = await getOrCreateProfile();
  profile.socialLinks = socialLinks;
  await profile.save();

  res.json({ success: true, data: profile });
});
