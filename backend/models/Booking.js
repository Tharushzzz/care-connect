import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    userName: {
      type: String,
      default: '',
    },
    userEmail: {
      type: String,
      default: '',
    },
    userPhone: {
      type: String,
      default: '',
    },
    bookingCode: {
      type: String,
      default: () => `BK_${Math.floor(1000 + Math.random() * 9000)}`,
    },
    caregiverId: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    caregiverUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    caregiverName: {
      type: String,
      required: true,
    },
    caregiverRole: {
      type: String,
      default: 'Caregiver',
    },
    caregiverAvatar: {
      type: String,
      default: '',
    },
    serviceType: {
      type: String,
      required: true,
      default: 'Elderly Care',
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      default: '09:00 AM',
    },
    endTime: {
      type: String,
      default: '05:00 PM',
    },
    location: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Scheduled', 'Pending', 'Completed', 'Cancelled', 'Accepted', 'Declined'],
      default: 'Pending',
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    days: {
      type: Number,
      default: 1,
    },
    notes: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
