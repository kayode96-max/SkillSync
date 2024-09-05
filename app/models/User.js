import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username uniqueness
  },
  bannerImage: {
    type: String,
    default: '', // Set a default value for banner image
  },
  socialLinks: {
    twitter: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    stackoverflow: { type: String, default: '' },
    leetcode: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  // ... other user data fields (optional)
});

export default mongoose.models.User || mongoose.model('User', UserSchema);