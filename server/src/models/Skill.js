import mongoose from 'mongoose';

const skillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: 'General' },
    proficiency: { type: Number, min: 0, max: 100 }, // optional, for progress bars
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

skillSchema.index({ order: 1 });

export default mongoose.model('Skill', skillSchema);
