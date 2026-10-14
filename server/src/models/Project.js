import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true, maxlength: 200 },
    detailedDescription: { type: String, trim: true },
    technologies: [{ type: String, trim: true }],
    githubUrl: { type: String, trim: true },
    liveDemoUrl: { type: String, trim: true },
    image: {
      url: String,
      publicId: String,
    },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

projectSchema.index({ order: 1 });
projectSchema.index({ featured: 1 });

export default mongoose.model('Project', projectSchema);
