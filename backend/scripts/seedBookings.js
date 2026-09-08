import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import Booking from '../models/Booking.js';
import Caregiver from '../models/Caregiver.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();

const defaultBookings = [
  {
    caregiverId: 1,
    caregiverName: 'Sarah Jenkins',
    caregiverRole: 'Registered Nurse (RN)',
    caregiverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    serviceType: 'Elderly Care',
    startDate: 'Aug 28, 2026',
    endDate: 'Aug 28, 2026',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    status: 'Scheduled',
    totalPrice: 28000.0,
    days: 1,
  },
  {
    caregiverId: 2,
    caregiverName: 'Michael Lee',
    caregiverRole: 'Certified Nursing Assistant',
    caregiverAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    serviceType: 'Elderly Care',
    startDate: 'Aug 29, 2026',
    endDate: 'Aug 29, 2026',
    startTime: '09:00 AM',
    endTime: '05:00 PM',
    status: 'Pending',
    totalPrice: 20800.0,
    days: 1,
  },
  {
    caregiverId: 3,
    caregiverName: 'Emily Davis',
    caregiverRole: 'Physical Therapist',
    caregiverAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    serviceType: 'Physical Therapy',
    startDate: 'Aug 24, 2026',
    endDate: 'Aug 24, 2026',
    startTime: '10:00 AM',
    endTime: '02:00 PM',
    status: 'Completed',
    totalPrice: 18000.0,
    days: 1,
  },
];

const seedBookings = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully.');

    for (const b of defaultBookings) {
      // Find caregiver to link caregiverUserId if available
      const caregiver = await Caregiver.findOne({
        $or: [{ id: b.caregiverId }, { name: b.caregiverName }],
      });

      const bookingData = {
        ...b,
        caregiverUserId: caregiver?.userId || null,
        bookingCode: `BK_${Math.floor(1000 + Math.random() * 9000)}`,
      };

      // Check if this booking already exists to prevent duplicate insertion
      const existing = await Booking.findOne({
        caregiverName: b.caregiverName,
        startDate: b.startDate,
        serviceType: b.serviceType,
      });

      if (!existing) {
        const created = await Booking.create(bookingData);
        console.log(`Inserted booking for ${b.caregiverName} (ID: ${created._id})`);
      } else {
        console.log(`Booking for ${b.caregiverName} on ${b.startDate} already exists.`);
      }
    }

    const allBookings = await Booking.find({});
    console.log(`\nTotal bookings in MongoDB: ${allBookings.length}`);
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding bookings:', error);
    process.exit(1);
  }
};

seedBookings();
