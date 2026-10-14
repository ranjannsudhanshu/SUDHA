import mongoose from 'mongoose';

// Profile is a singleton: there is only ever one document, holding
// everything shown on Home/About plus contact + resume + social links.
const socialLinkSchema = new mongoose.Schema(
  {
    platform: {
      type: String,
      required: true,
      enum: ['facebook', 'linkedin', 'twitter', 'instagram', 'github', 'youtube', 'other'],
    },
    url: { type: String, required: true, trim: true },
    label: { type: String, trim: true }, // used when platform is "other"
  },
  { _id: true }
);

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, default: 'Saroj Kumar' },
    title: { type: String, trim: true, default: 'Web Developer' },
    tagline: { type: String, trim: true },
    heroHeadline: { type: String, trim: true },
    bio: { type: String, trim: true },
    location: { type: String, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    profileImage: {
      url: String,
      publicId: String,
    },
    resumeUrl: { type: String, trim: true },
    socialLinks: [socialLinkSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Profile', profileSchema);
