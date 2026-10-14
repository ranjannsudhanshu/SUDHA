import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema(
  {
    role: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    location: { type: String, trim: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // null/undefined = currently working here
    current: { type: Boolean, default: false },
    description: { type: String, trim: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

experienceSchema.index({ order: 1 });

export default mongoose.model('Experience', experienceSchema);
