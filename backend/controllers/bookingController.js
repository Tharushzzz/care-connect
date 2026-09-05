import Booking from '../models/Booking.js';

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
    totalPrice: 280.0,
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
    totalPrice: 208.0,
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
    totalPrice: 180.0,
    days: 1,
  },
];

// @desc    Get all bookings for user
// @route   GET /api/bookings
// @access  Public / Optional Auth
export const getBookings = async (req, res) => {
  try {
    const query = req.user ? { $or: [{ user: req.user._id }, { user: null }] } : {};
    let bookings = await Booking.find(query).sort({ createdAt: -1 });

    // Auto-seed if database is empty
    if (bookings.length === 0) {
      const seeded = await Booking.insertMany(
        defaultBookings.map((b) => ({
          ...b,
          user: req.user ? req.user._id : null,
        }))
      );
      bookings = seeded;
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
      caregiverName,
      caregiverRole,
      caregiverAvatar,
      serviceType,
      startDate,
      endDate,
      startTime,
      endTime,
      totalPrice,
      days,
      notes,
    } = req.body;

    const newBooking = await Booking.create({
      user: req.user ? req.user._id : null,
      caregiverId: caregiverId || 1,
      caregiverName: caregiverName || 'Caregiver',
      caregiverRole: caregiverRole || 'Nurse',
      caregiverAvatar: caregiverAvatar || '',
      serviceType: serviceType || 'Elderly Care',
      startDate: startDate || new Date().toLocaleDateString(),
      endDate: endDate || startDate || new Date().toLocaleDateString(),
      startTime: startTime || '09:00 AM',
      endTime: endTime || '05:00 PM',
      status: 'Scheduled',
      totalPrice: Number(totalPrice) || 200,
      days: Number(days) || 1,
      notes: notes || '',
    });

    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error creating booking' });
  }
};

// @desc    Update booking status (e.g. Cancelled)
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

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error updating booking status' });
  }
};
