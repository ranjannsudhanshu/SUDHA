import asyncHandler from 'express-async-handler';
import ContactMessage from '../models/ContactMessage.js';

// @desc    Submit a contact form message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;
  const contactMessage = await ContactMessage.create({ name, email, message });
  res.status(201).json({
    success: true,
    message: 'Thanks for reaching out — I will get back to you soon.',
    data: { id: contactMessage._id },
  });
});

// @desc    List all contact messages (newest first)
// @route   GET /api/contact
// @access  Private
export const getMessages = asyncHandler(async (req, res) => {
  const messages = await ContactMessage.find().sort('-createdAt');
  res.json({ success: true, count: messages.length, data: messages });
});

// @desc    Mark a message as read
// @route   PUT /api/contact/:id/read
// @access  Private
export const markMessageRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(
    req.params.id,
    { read: true },
    { new: true }
  );
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ success: true, data: message });
});

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private
export const deleteMessage = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndDelete(req.params.id);
  if (!message) {
    res.status(404);
    throw new Error('Message not found');
  }
  res.json({ success: true, message: 'Message deleted' });
});
