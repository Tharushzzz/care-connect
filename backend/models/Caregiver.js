import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    id: { type: Number },
    reviewerName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
    comment: { type: String, required: true },
  },
  { _id: false }
);

const caregiverSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, 'Caregiver name is required'],
      trim: true,
    },
    role: {
      type: String,
      required: true,
      default: 'Caregiver',
    },
    profileImage: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      required: true,
      default: 'Colombo, Sri Lanka',
    },
    experience: {
      type: String,
      default: '1 year experience',
    },
    rating: {
      type: Number,
      default: 5.0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    rate: {
      type: String,
      default: 'Rs. 3,000/hr',
    },
    availability: {
      type: String,
      default: 'Available today',
    },
    availableDates: {
      type: [String],
      default: [],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      default: '',
    },
    specialties: {
      type: [String],
      default: [],
    },
    credentials: {
      type: [String],
      default: [],
    },
    about: {
      type: String,
      default: '',
    },
    freetime: {
      type: String,
      default: '',
    },
    reviewText: {
      type: String,
      default: '',
    },
    reviewsData: [reviewSchema],
  },
  {
    timestamps: true,
  }
);

// Indexes for fast querying and sorting
caregiverSchema.index({ rating: -1, id: 1 });
caregiverSchema.index({ specialties: 1 });
caregiverSchema.index({ availability: 1 });

const Caregiver = mongoose.model('Caregiver', caregiverSchema);

export default Caregiver;
