import mongoose from 'mongoose';
import dotenv from 'dotenv';
import dns from 'dns';
import User from '../models/User.js';
import Caregiver from '../models/Caregiver.js';
import Booking from '../models/Booking.js';
import MessageThread from '../models/Message.js';
import Notification from '../models/Notification.js';

dotenv.config();
dns.setServers(['1.1.1.1', '8.8.8.8']);

export const seedData = async () => {
  try {
    console.log('--- Starting MongoDB Database Seeding ---');

    // 1. Seed Users
    const usersToSeed = [
      {
        firstName: 'Eleanor',
        lastName: 'Vance',
        email: 'eleanor@example.com',
        phone: '0712554567',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
        password: '1234',
        role: 'family',
        status: 'Active',
      },
      {
        firstName: 'Sarah',
        lastName: 'Jenkins',
        email: 'sarah@example.com',
        phone: '0712554568',
        avatar: 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788630765/Sarah.jpg',
        password: '1234',
        role: 'caregiver',
        status: 'Verified',
        title: 'Registered Nurse (RN)',
        experience: 5,
        hourlyRate: 3500,
        bio: 'Sarah is a compassionate Registered Nurse with extensive experience in geriatric care and post-surgery recovery.',
      },
      {
        firstName: 'William',
        lastName: 'Smith',
        email: 'william@example.com',
        phone: '0712554569',
        avatar: '',
        password: '1234',
        role: 'family',
        status: 'Active',
      },
      {
        firstName: 'Michael',
        lastName: 'Lee',
        email: 'michael@example.com',
        phone: '0712554570',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
        password: '1234',
        role: 'caregiver',
        status: 'Verified',
        title: 'Certified Nursing Assistant',
        experience: 4,
        hourlyRate: 2600,
        bio: 'Michael is a warm, dependable Certified Nursing Assistant with a strong background in helping elderly clients.',
      },
      {
        firstName: 'System',
        lastName: 'Admin',
        email: 'admin@admin.com',
        phone: '0712554571',
        avatar: '',
        password: 'admin',
        role: 'admin',
        status: 'Active',
      },
    ];

    for (const u of usersToSeed) {
      const exists = await User.findOne({ email: u.email });
      if (!exists) {
        await User.create(u);
        console.log(`Seeded user: ${u.email} (${u.role})`);
      } else {
        // Ensure status, avatar and role are aligned
        exists.role = u.role;
        exists.status = u.status;
        exists.avatar = u.avatar;
        if (u.title) exists.title = u.title;
        if (u.hourlyRate) exists.hourlyRate = u.hourlyRate;
        if (u.experience) exists.experience = u.experience;
        await exists.save();
      }
    }

    // 2. Seed Caregivers
    const caregiversToSeed = [
      {
        id: 1,
        profileImage: 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788630765/Sarah.jpg',
        name: 'Sarah Jenkins',
        role: 'Registered Nurse (RN)',
        location: 'Colombo, Sri Lanka',
        experience: '5 years experience',
        rating: 4.9,
        reviews: 124,
        rate: 'Rs. 3,500/hr',
        availability: 'Available today',
        availableDates: [
          'Aug 27, 2026',
          'Aug 28, 2026',
          'Aug 30, 2026',
          'Sep 01, 2026',
          'Sep 03, 2026',
        ],
        verified: true,
        description:
          'Sarah is a compassionate Registered Nurse with extensive experience in geriatric care and post-surgery recovery. She is dedicated to providing dignified, respectful care to all her patients.',
        specialties: [
          'Senior Care',
          'Mobility Support',
          'Medication Administration',
          'Recovery Care',
        ],
        credentials: [
          'SLNC Registered',
          'BLS Certified',
          'Background checked',
        ],
        about:
          "I started my journey in caregiving over a decade ago after caring for my own grandmother. That experience taught me the profound impact that patient, empathetic support can have on a family's well-being. I bring a calm demeanor and a positive attitude to every home I visit.",
        freetime:
          'In my free time, I enjoy hiking, reading historical novels, and volunteering at local animal shelters. I also love to cook and often share my favorite healthy recipes with the families I work with.',
        reviewText:
          'Sarah was warm, professional, and truly attentive to my mother’s needs. She made us feel supported from day one.',
        reviewsData: [
          {
            id: 1,
            reviewerName: 'Linda M.',
            rating: 5,
            date: 'Aug 2026',
            comment:
              'Sarah was warm, professional, and truly attentive to my mother’s needs. She made us feel supported from day one.',
          },
          {
            id: 2,
            reviewerName: 'Carlos R.',
            rating: 5,
            date: 'Jul 2026',
            comment:
              'Excellent communication and very gentle care during post-surgery recovery. Highly recommended.',
          },
          {
            id: 3,
            reviewerName: 'Ayesha K.',
            rating: 4,
            date: 'Jun 2026',
            comment:
              'Dependable and kind. She kept detailed notes that helped our family coordinate care easily.',
          },
        ],
      },
      {
        id: 2,
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=500&q=80',
        name: 'Michael Lee',
        role: 'Certified Nursing Assistant',
        location: 'Kandy, Sri Lanka',
        experience: '4 years experience',
        rating: 4.8,
        reviews: 96,
        rate: 'Rs. 2,600/hr',
        availability: 'Available tomorrow',
        availableDates: [
          'Aug 28, 2026',
          'Aug 29, 2026',
          'Aug 31, 2026',
          'Sep 02, 2026',
          'Sep 04, 2026',
        ],
        verified: true,
        description:
          'Michael is a warm, dependable Certified Nursing Assistant with a strong background in helping elderly clients with daily routines, personal support, and companionship.',
        specialties: [
          'Daily Living Support',
          'Companionship',
          'Bathing Assistance',
          'Meal Support',
        ],
        credentials: [
          'CNA Certificate',
          'First Aid Certified',
          'Background checked',
        ],
        about:
          'Michael is known for creating calm, respectful routines for seniors and recovering patients. His compassionate approach and reliability make families feel secure and comfortable.',
        freetime:
          'Outside of work, Michael enjoys cycling, playing chess, and attending local community theater productions. He also volunteers at a senior center on weekends.',
        reviewText:
          'Michael is patient, respectful, and always on time. He built trust with our family very quickly.',
        reviewsData: [
          {
            id: 1,
            reviewerName: 'Priya S.',
            rating: 5,
            date: 'Aug 2026',
            comment:
              'Michael is patient, respectful, and always on time. He built trust with our family very quickly.',
          },
          {
            id: 2,
            reviewerName: 'James T.',
            rating: 4,
            date: 'Jul 2026',
            comment:
              'Very supportive with daily routines and meal prep. My father felt comfortable with him right away.',
          },
          {
            id: 3,
            reviewerName: 'Sofia L.',
            rating: 5,
            date: 'May 2026',
            comment:
              'Professional and calm under pressure. We appreciated his consistency and clear updates.',
          },
        ],
      },
      {
        id: 3,
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=500&q=80',
        name: 'Emily Davis',
        role: 'Licensed Practical Nurse (LPN)',
        location: 'Galle, Sri Lanka',
        experience: '3 years experience',
        rating: 4.7,
        reviews: 82,
        rate: 'Rs. 3,000/hr',
        availability: 'Available this week',
        availableDates: [
          'Aug 29, 2026',
          'Aug 30, 2026',
          'Sep 01, 2026',
          'Sep 03, 2026',
          'Sep 05, 2026',
        ],
        verified: false,
        description:
          'Emily is a Licensed Practical Nurse with a strong focus on patient-centered care. She is skilled in medication management, patient monitoring, and providing emotional support to patients and their families.',
        specialties: [
          'Medication Management',
          'Patient Monitoring',
          'Basic Life Support',
          'Post-Visit Care',
        ],
        credentials: [
          'LPN License',
          'Patient Monitoring Certified',
          'Background checked',
        ],
        about:
          'Emily supports patients with a balance of clinical skill and compassionate communication. She is especially helpful for short-term recovery, check-ins, and routine health monitoring.',
        freetime:
          'In her free time, Emily enjoys reading, gardening, and spending time with her family.',
        reviewText:
          'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
        reviewsData: [
          {
            id: 1,
            reviewerName: 'Noah P.',
            rating: 5,
            date: 'Aug 2026',
            comment:
              'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
          },
          {
            id: 2,
            reviewerName: 'Grace W.',
            rating: 4,
            date: 'Jun 2026',
            comment:
              'She explained medications clearly and made follow-up routines easy to manage.',
          },
          {
            id: 3,
            reviewerName: 'Ethan B.',
            rating: 5,
            date: 'Apr 2026',
            comment:
              'Great bedside manner and strong clinical judgment. We felt safe and cared for.',
          },
        ],
      },
    ];

    for (const cg of caregiversToSeed) {
      await Caregiver.findOneAndUpdate({ id: cg.id }, cg, { upsert: true, new: true });
      console.log(`Seeded caregiver: ${cg.name}`);
    }

    // 3. Seed Bookings if empty
    const existingBookingsCount = await Booking.countDocuments();
    if (existingBookingsCount === 0) {
      await Booking.create([
        {
          bookingCode: 'BK_001',
          caregiverId: 1,
          caregiverName: 'Sarah Jenkins',
          caregiverRole: 'Registered Nurse (RN)',
          caregiverAvatar: 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788630765/Sarah.jpg',
          serviceType: 'Elderly Care',
          startDate: 'Aug 28, 2026',
          endDate: 'Aug 28, 2026',
          startTime: '09:00 AM',
          endTime: '05:00 PM',
          status: 'Scheduled',
          totalPrice: 28000.0,
          days: 1,
          notes: 'Regular check-in and post-operative monitoring.',
        },
        {
          bookingCode: 'BK_002',
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
          notes: 'Daily routine and companionship assistance.',
        },
        {
          bookingCode: 'BK_003',
          caregiverId: 3,
          caregiverName: 'Emily Davis',
          caregiverRole: 'Licensed Practical Nurse (LPN)',
          caregiverAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
          serviceType: 'Special Needs Care',
          startDate: 'Aug 24, 2026',
          endDate: 'Aug 24, 2026',
          startTime: '10:00 AM',
          endTime: '02:00 PM',
          status: 'Completed',
          totalPrice: 12000.0,
          days: 1,
          notes: 'Medication administration and therapy support.',
        },
      ]);
      console.log('Seeded initial platform bookings');
    }

    // 4. Seed Message Threads if empty
    const existingThreadsCount = await MessageThread.countDocuments();
    if (existingThreadsCount === 0) {
      await MessageThread.create([
        {
          caregiverId: 1,
          name: 'Sarah Jenkins',
          role: 'Registered Nurse (RN)',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
          lastMessage: 'I have arrived and updated today’s care notes for your review.',
          time: '10:15 AM',
          unread: true,
          unreadCount: 1,
          online: true,
          messages: [
            {
              sender: 'them',
              text: "I'm on my way to Eleanor's home. I should be there in about 15 minutes.",
              time: '09:45 AM',
            },
            {
              sender: 'me',
              text: 'Great! Thank you for the update, Sarah. See you soon!',
              time: '09:48 AM',
            },
            {
              sender: 'them',
              text: 'I have arrived and updated today’s care notes for your review.',
              time: '10:15 AM',
            },
          ],
        },
        {
          caregiverId: 2,
          name: 'Michael Lee',
          role: 'Certified Nursing Assistant',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
          lastMessage: 'All clear on medication scheduling for tomorrow morning.',
          time: 'Yesterday',
          unread: false,
          unreadCount: 0,
          online: false,
          messages: [
            {
              sender: 'them',
              text: 'Hello! Just confirming the morning schedule for tomorrow.',
              time: '04:20 PM',
            },
            {
              sender: 'me',
              text: 'Yes, 9:00 AM works perfectly.',
              time: '04:35 PM',
            },
            {
              sender: 'them',
              text: 'All clear on medication scheduling for tomorrow morning.',
              time: '04:36 PM',
            },
          ],
        },
        {
          caregiverId: 3,
          name: 'Emily Davis',
          role: 'Licensed Practical Nurse',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
          lastMessage: 'The therapy session went wonderfully today!',
          time: 'Aug 24',
          unread: false,
          unreadCount: 0,
          online: true,
          messages: [
            {
              sender: 'them',
              text: 'The therapy session went wonderfully today!',
              time: '02:15 PM',
            },
          ],
        },
      ]);
      console.log('Seeded initial chat threads');
    }

    // 5. Seed Notifications
    const existingNotificationsCount = await Notification.countDocuments();
    if (existingNotificationsCount === 0) {
      await Notification.create([
        {
          notificationId: 'n1',
          title: 'Booking Confirmed',
          description: 'Sarah Jenkins accepted your care request for Friday at 9:00 AM.',
          time: '10 min ago',
          read: false,
          type: 'booking',
        },
        {
          notificationId: 'n2',
          title: 'New Care Message',
          description: 'Michael sent an update regarding today’s medication routine.',
          time: '45 min ago',
          read: false,
          type: 'message',
        },
        {
          notificationId: 'n3',
          title: 'Upcoming Appointment Reminder',
          description: 'Vitals check & physical therapy scheduled for tomorrow at 2:00 PM.',
          time: '2 hours ago',
          read: true,
          type: 'reminder',
        },
        {
          notificationId: 'n4',
          title: 'Profile Verification',
          description: 'Your care plan preferences were saved successfully.',
          time: '1 day ago',
          read: true,
          type: 'system',
        },
      ]);
      console.log('Seeded initial notifications');
    }

    console.log('--- MongoDB Database Seeding Complete! ---');
  } catch (error) {
    console.error('Error during database seeding:', error);
  }
};

// If run directly via node
if (process.argv[1] && process.argv[1].endsWith('seedData.js')) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(async () => {
      await seedData();
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
