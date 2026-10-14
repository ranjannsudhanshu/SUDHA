import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema(
  {
    degree: { type: String, required: true, trim: true },
    institution: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

educationSchema.index({ order: 1 });

export default mongoose.model('Education', educationSchema);
