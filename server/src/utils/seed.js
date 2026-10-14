import dotenv from 'dotenv';
dotenv.config();

import connectDB from '../config/db.js';
import User from '../models/User.js';
import Profile from '../models/Profile.js';
import Skill from '../models/Skill.js';
import Experience from '../models/Experience.js';
import Education from '../models/Education.js';
import Project from '../models/Project.js';

const run = async () => {
  await connectDB();

  // --- Admin user ---
  const adminEmail = (process.env.ADMIN_EMAIL || 'admin@example.com').toLowerCase();
  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    await User.create({
      name: process.env.ADMIN_NAME || 'Admin',
      email: adminEmail,
      password: process.env.ADMIN_PASSWORD || 'ChangeMe123!',
    });
    console.log(`Admin user created: ${adminEmail}`);
  } else {
    console.log('Admin user already exists, skipping.');
  }

  // --- Profile (singleton) ---
  const existingProfile = await Profile.findOne();
  if (!existingProfile) {
    await Profile.create({
      name: 'Saroj Kumar',
      title: 'Web Developer',
      heroHeadline: "Hi, it's Saroj Kumar From Bihar",
      tagline: 'Web Developer',
      bio: "I'm a Web Developer and Software Developer from Bihar, India, working as a Web Development Intern at Prasunet Company. I enjoy turning complex problems into simple, beautiful and intuitive designs. My job is to build websites that are functional and user-friendly while also attractive, adding a personal touch that makes each product eye-catching and easy to use.",
      location: 'Bihar, India',
      email: 'silintsaroj@gmail.com',
      phone: '+91-7367978031',
      socialLinks: [
        { platform: 'facebook', url: 'https://www.facebook.com/silintsarojkumar' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/in/sarojkumarcse/' },
        { platform: 'twitter', url: 'https://x.com/silintsarojkuma' },
        { platform: 'instagram', url: 'https://www.instagram.com/silint_saroj_kumar/' },
      ],
    });
    console.log('Profile seeded.');
  } else {
    console.log('Profile already exists, skipping.');
  }

  // --- Skills ---
  if ((await Skill.countDocuments()) === 0) {
    await Skill.insertMany([
      { name: 'C/C++', category: 'Software Development', order: 0 },
      { name: 'Web Development', category: 'Web App Development', order: 1 },
    ]);
    console.log('Skills seeded.');
  }

  // --- Experience ---
  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      {
        role: 'Web Developer Intern',
        company: 'Prasunet Company',
        startDate: new Date('2024-06-01'),
        current: true,
        order: 0,
      },
    ]);
    console.log('Experience seeded.');
  }

  // --- Education ---
  if ((await Education.countDocuments()) === 0) {
    await Education.insertMany([
      {
        degree: 'Web Development',
        institution: 'Apna College',
        order: 0,
      },
      {
        degree: 'B.Tech (Pursuing)',
        institution: 'Maharaja Ranjit Singh Punjab Technical University',
        order: 1,
      },
    ]);
    console.log('Education seeded.');
  }

  // --- Projects ---
  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: 'Landing Page',
        shortDescription: 'Landing page for Prasunet Company, built as an internship project.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveDemoUrl: 'https://silintsarojkumar.github.io/Prasunet_WD_01/',
        featured: true,
        order: 0,
      },
      {
        title: 'Weather App',
        shortDescription: 'A weather application built as an internship project.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveDemoUrl: 'https://silintsarojkumar.github.io/Prasunet_WD_05/',
        featured: false,
        order: 1,
      },
      {
        title: 'Tic Tac Toe',
        shortDescription: 'A Tic Tac Toe game built as an internship project.',
        technologies: ['HTML', 'CSS', 'JavaScript'],
        liveDemoUrl: 'https://silintsarojkumar.github.io/Prasunet_WD_04/',
        featured: false,
        order: 2,
      },
    ]);
    console.log('Projects seeded.');
  }

  console.log('Seeding complete.');
  process.exit(0);
};

run().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
