import mongoose from 'mongoose';

const certificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    issueDate: { type: Date },
    credentialUrl: { type: String, trim: true },
    image: {
      url: String,
      publicId: String,
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

certificationSchema.index({ order: 1 });

export default mongoose.model('Certification', certificationSchema);
