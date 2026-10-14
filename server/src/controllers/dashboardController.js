import asyncHandler from 'express-async-handler';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Certification from '../models/Certification.js';
import ContactMessage from '../models/ContactMessage.js';

// @desc    Get counts for the admin dashboard overview
// @route   GET /api/dashboard/summary
// @access  Private
export const getDashboardSummary = asyncHandler(async (req, res) => {
  const [projects, skills, experience, education, certifications, unreadMessages, totalMessages] =
    await Promise.all([
      Project.countDocuments(),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      Certification.countDocuments(),
      ContactMessage.countDocuments({ read: false }),
      ContactMessage.countDocuments(),
    ]);

  res.json({
    success: true,
    data: {
      projects,
      skills,
      experience,
      education,
      certifications,
      unreadMessages,
      totalMessages,
    },
  });
});
