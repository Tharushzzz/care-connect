import Booking from '../models/Booking.js';
import Caregiver from '../models/Caregiver.js';
import Notification from '../models/Notification.js';

// Default initial bookings for demonstration
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

// @desc    Get all bookings for user (family or caregiver)
// @route   GET /api/bookings
// @access  Public / Optional Auth
export const getBookings = async (req, res) => {
  try {
    let query = {};

    if (req.user) {
      if (req.user.role === 'caregiver') {
        // Query bookings meant for this caregiver
        const fullName = `${req.user.firstName || ''} ${req.user.lastName || ''}`.trim() || req.user.name || '';
        const cg = await Caregiver.findOne({
          $or: [
            { userId: req.user._id },
            { email: req.user.email },
            ...(fullName ? [{ name: fullName }] : []),
          ],
        });

        const orClauses = [{ caregiverUserId: req.user._id }];

        if (cg) {
          if (cg.id !== undefined && cg.id !== null) {
            orClauses.push({ caregiverId: cg.id });
            orClauses.push({ caregiverId: String(cg.id) });
            if (!isNaN(Number(cg.id))) orClauses.push({ caregiverId: Number(cg.id) });
          }
          if (cg._id) {
            orClauses.push({ caregiverId: cg._id });
            orClauses.push({ caregiverId: String(cg._id) });
          }
          if (cg.name) {
            orClauses.push({ caregiverName: cg.name });
          }
        }
        if (fullName) {
          orClauses.push({ caregiverName: fullName });
        }

        query = { $or: orClauses };
      } else if (req.user.role === 'family') {
        // Query bookings created by this family user
        query = {
          $or: [
            { user: req.user._id },
            { userEmail: req.user.email },
          ],
        };
      }
      // If admin, query stays {} to see all bookings
    }

    let bookings = await Booking.find(query).sort({ createdAt: -1 }).lean();

    // Auto-seed initial records only if collection is completely empty and unauthenticated
    if (bookings.length === 0 && !req.user) {
      const totalCount = await Booking.countDocuments();
      if (totalCount === 0) {
        bookings = await Booking.insertMany(defaultBookings);
      }
    }

    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error retrieving bookings' });
  }
};

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public / Optional Auth
export const createBooking = async (req, res) => {
  try {
    const {
      caregiverId,
      caregiverUserId: passedCaregiverUserId,
      caregiverName,
      caregiverRole,
      caregiverAvatar,
      serviceType,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      totalPrice,
      days,
      notes,
    } = req.body;

    // Resolve caregiver and caregiverUserId from DB
    let resolvedCaregiverUserId = passedCaregiverUserId;
    let resolvedCaregiverName = caregiverName;
    let resolvedCaregiverRole = caregiverRole;
    let resolvedCaregiverAvatar = caregiverAvatar;

    if (caregiverId) {
      let cg = null;
      if (!isNaN(Number(caregiverId))) {
        cg = await Caregiver.findOne({ id: Number(caregiverId) });
      }
      if (!cg && String(caregiverId).match(/^[0-9a-fA-F]{24}$/)) {
        cg = await Caregiver.findById(caregiverId);
      }
      if (cg) {
        if (!resolvedCaregiverUserId && cg.userId) {
          resolvedCaregiverUserId = cg.userId;
        }
        resolvedCaregiverName = resolvedCaregiverName || cg.name;
        resolvedCaregiverRole = resolvedCaregiverRole || cg.role;
        resolvedCaregiverAvatar = resolvedCaregiverAvatar || cg.profileImage;
      }
    }

    const familyUser = req.user;
    const userName = familyUser
      ? `${familyUser.firstName || ''} ${familyUser.lastName || ''}`.trim() || familyUser.name || 'Family Member'
      : 'Family Member';
    const userEmail = familyUser ? familyUser.email : '';
    const userPhone = familyUser ? familyUser.phone : '';

    const newBooking = await Booking.create({
      user: familyUser ? familyUser._id : null,
      userName,
      userEmail,
      userPhone,
      caregiverId: caregiverId || 1,
      caregiverUserId: resolvedCaregiverUserId || null,
      caregiverName: resolvedCaregiverName || 'Caregiver',
      caregiverRole: resolvedCaregiverRole || 'Caregiver',
      caregiverAvatar: resolvedCaregiverAvatar || '',
      serviceType: serviceType || 'Elderly Care',
      startDate: startDate || new Date().toLocaleDateString(),
      endDate: endDate || startDate || new Date().toLocaleDateString(),
      startTime: startTime || '09:00 AM',
      endTime: endTime || '05:00 PM',
      location: location || '',
      status: 'Pending', // Arrives as Pending request for the caregiver to review
      totalPrice: Number(totalPrice) || 28000,
      days: Number(days) || 1,
      notes: notes || '',
    });

    // Notify Caregiver
    if (resolvedCaregiverUserId) {
      try {
        await Notification.create({
          user: resolvedCaregiverUserId,
          title: 'New Booking Request',
          description: `${userName} requested ${serviceType || 'Care'} on ${startDate}.`,
          type: 'booking',
          time: 'Just now',
        });
      } catch (notifErr) {
        console.error('Error creating caregiver notification:', notifErr);
      }
    }

    // Notify Family
    if (familyUser) {
      try {
        await Notification.create({
          user: familyUser._id,
          title: 'Booking Request Submitted',
          description: `Your request with ${resolvedCaregiverName} has been submitted.`,
          type: 'booking',
          time: 'Just now',
        });
      } catch (notifErr) {
        console.error('Error creating family notification:', notifErr);
      }
    }

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

// @desc    Update booking status (e.g. Scheduled/Accepted, Declined, Completed, Cancelled)
// @route   PATCH /api/bookings/:id/status
// @access  Public / Optional Auth
export const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    // If caregiver accepted or declined, notify the family member
    if (booking.user) {
      try {
        const isAccepted = status === 'Scheduled' || status === 'Accepted';
        await Notification.create({
          user: booking.user,
          title: `Booking Request ${isAccepted ? 'Accepted' : status}`,
          description: `${booking.caregiverName} has ${status.toLowerCase()} your care request for ${booking.startDate}.`,
          type: 'booking',
          time: 'Just now',
        });
      } catch (e) {
        console.error('Error sending family notification:', e);
      }
    }

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error updating booking status' });
  }
};

// @desc    Delete a booking (Admin / User)
// @route   DELETE /api/bookings/:id
// @access  Public / Optional Auth
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    await Booking.findByIdAndDelete(id);

    res.json({ message: 'Booking deleted successfully', id });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ message: 'Server error deleting booking' });
  }
};
