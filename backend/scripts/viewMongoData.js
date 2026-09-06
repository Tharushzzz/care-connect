import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from '../models/User.js';
import Caregiver from '../models/Caregiver.js';
import Booking from '../models/Booking.js';
import MessageThread from '../models/Message.js';
import Notification from '../models/Notification.js';

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();

const viewData = async () => {
  try {
    console.log('\nConnecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB successfully!\n');

    // 1. Fetch Users
    const users = await User.find({}).select('-password').lean();
    console.log(`========================================`);
    console.log(` 1. USERS (${users.length} found)`);
    console.log(`========================================`);
    console.table(
      users.map(u => ({
        ID: u._id.toString().substring(0, 8) + '...',
        Name: `${u.firstName} ${u.lastName}`,
        Email: u.email,
        Role: u.role,
        Status: u.status,
        Phone: u.phone
      }))
    );

    // 2. Fetch Caregivers
    const caregivers = await Caregiver.find({}).lean();
    console.log(`\n========================================`);
    console.log(` 2. CAREGIVERS (${caregivers.length} found)`);
    console.log(`========================================`);
    console.table(
      caregivers.map(c => ({
        ID: c._id.toString().substring(0, 8) + '...',
        Name: c.name,
        Role: c.role,
        Location: c.location,
        Rate: c.rate,
        Rating: `${c.rating} (${c.reviews} rev)`,
        Specialties: Array.isArray(c.specialties) ? c.specialties.join(', ') : c.specialties
      }))
    );

    // 3. Fetch Bookings
    const bookings = await Booking.find({}).lean();
    console.log(`\n========================================`);
    console.log(` 3. BOOKINGS (${bookings.length} found)`);
    console.log(`========================================`);
    console.table(
      bookings.map(b => ({
        BookingID: b.bookingId || b.id || b._id.toString().substring(0, 8),
        Caregiver: b.caregiverName,
        Client: b.clientName,
        Date: b.date,
        Total: b.total,
        Status: b.status
      }))
    );

    // 4. Fetch Message Threads
    const threads = await MessageThread.find({}).lean();
    console.log(`\n========================================`);
    console.log(` 4. MESSAGE THREADS (${threads.length} found)`);
    console.log(`========================================`);
    console.table(
      threads.map(t => ({
        ThreadID: t.threadId || t._id.toString().substring(0, 8),
        Caregiver: t.caregiverName,
        Client: t.clientName,
        LastMessage: t.lastMessage ? t.lastMessage.substring(0, 30) + '...' : '',
        Unread: t.unread
      }))
    );

    // 5. Fetch Notifications
    const notifications = await Notification.find({}).lean();
    console.log(`\n========================================`);
    console.log(` 5. NOTIFICATIONS (${notifications.length} found)`);
    console.log(`========================================`);
    console.table(
      notifications.map(n => ({
        ID: n._id.toString().substring(0, 8) + '...',
        UserEmail: n.userEmail,
        Title: n.title,
        Type: n.type,
        Read: n.read ? 'Yes' : 'No'
      }))
    );

    console.log('\nData fetch completed successfully.');
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    process.exit(1);
  }
};

viewData();
