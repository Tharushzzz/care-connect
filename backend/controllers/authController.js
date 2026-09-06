import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import Caregiver from '../models/Caregiver.js';
import Notification from '../models/Notification.js';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'careconnect_super_secret_jwt_key_2026_production',
    {
      expiresIn: '30d',
    }
  );
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      role = 'family',
      title,
      experience,
      hourlyRate,
      bio,
    } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const userExists = await User.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: 'An account with this email already exists' });
    }

    // Create user - new caregivers require admin approval by default
    const userData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: normalizedEmail,
      phone: phone ? phone.trim() : '',
      password,
      role,
      status: role === 'caregiver' ? 'Pending Verification' : 'Active',
    };

    if (role === 'caregiver') {
      if (title) userData.title = title;
      if (experience) userData.experience = Number(experience);
      if (hourlyRate) userData.hourlyRate = Number(hourlyRate);
      if (bio) userData.bio = bio;
    }

    const user = await User.create(userData);

    if (user) {
      // If new user is a caregiver, create their profile in the Caregiver collection
      if (user.role === 'caregiver') {
        try {
          const lastCaregiver = await Caregiver.findOne().sort({ id: -1 });
          const nextId = (lastCaregiver && lastCaregiver.id ? lastCaregiver.id : 0) + 1;
          await Caregiver.create({
            id: nextId,
            userId: user._id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.title || 'Professional Caregiver',
            profileImage: user.avatar || '',
            location: req.body.location || 'Colombo, Sri Lanka',
            experience: user.experience ? `${user.experience} years experience` : '1 year experience',
            rate: user.hourlyRate ? `Rs. ${Number(user.hourlyRate).toLocaleString()}/hr` : 'Rs. 2,500/hr',
            rating: 5.0,
            reviews: 0,
            availability: 'Available today',
            verified: false,
            description: user.bio || `${user.firstName} is a certified, compassionate caregiver dedicated to delivering dignified, high-quality care.`,
            specialties: req.body.specialties || ['Senior Care', 'Mobility Support'],
            credentials: ['SLNC Registered', 'Background checked'],
            about: user.bio || `${user.firstName} is committed to providing patient-centered care.`,
            freetime: 'Enjoys reading and community activities.',
            reviewText: 'Warm, reliable, and attentive to family needs.',
            reviewsData: [],
          });
        } catch (cgErr) {
          console.error('Error creating caregiver profile on register:', cgErr);
        }
      }

      return res.status(201).json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        title: user.title,
        experience: user.experience,
        hourlyRate: user.hourlyRate,
        bio: user.bio,
        token: generateToken(user._id),
      });
    } else {
      return res.status(400).json({ message: 'Invalid user data received' });
    }
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Authenticate user & get token (Login via Email OR Phone)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide both email/phone and password' });
    }

    const rawInput = email.trim();
    const normalizedInput = rawInput.toLowerCase();
    const searchIdentifier = normalizedInput === 'admin' ? 'admin@admin.com' : normalizedInput;

    // Find user by email OR phone number
    const user = await User.findOne({
      $or: [
        { email: searchIdentifier },
        { phone: rawInput },
        { phone: rawInput.replace(/\s+/g, '') },
      ],
    });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        avatar: user.avatar,
        title: user.title,
        experience: user.experience,
        hourlyRate: user.hourlyRate,
        bio: user.bio,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email/phone or password' });
    }
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      return res.json({
        _id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || '',
        role: user.role,
        status: user.status,
        avatar: user.avatar || '',
        title: user.title || '',
        experience: user.experience || 0,
        hourlyRate: user.hourlyRate || 0,
        bio: user.bio || '',
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ message: 'Server error retrieving profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (req.body.firstName) user.firstName = req.body.firstName.trim();
      if (req.body.lastName) user.lastName = req.body.lastName.trim();
      if (req.body.email) user.email = req.body.email.toLowerCase().trim();
      if (req.body.phone !== undefined) user.phone = req.body.phone;
      if (req.body.avatar !== undefined) user.avatar = req.body.avatar;
      if (req.body.title !== undefined) user.title = req.body.title;
      if (req.body.experience !== undefined) user.experience = Number(req.body.experience);
      if (req.body.hourlyRate !== undefined) user.hourlyRate = Number(req.body.hourlyRate);
      if (req.body.bio !== undefined) user.bio = req.body.bio;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      // If user is a caregiver, update their corresponding Caregiver card
      if (updatedUser.role === 'caregiver') {
        try {
          const fullName = `${updatedUser.firstName} ${updatedUser.lastName}`.trim();
          let caregiver = await Caregiver.findOne({
            $or: [
              { userId: updatedUser._id },
              { email: updatedUser.email },
              { name: fullName },
            ],
          });

          if (caregiver) {
            caregiver.name = fullName;
            if (updatedUser.title) caregiver.role = updatedUser.title;
            if (updatedUser.avatar !== undefined) caregiver.profileImage = updatedUser.avatar;
            if (updatedUser.experience) caregiver.experience = `${updatedUser.experience} years experience`;
            if (updatedUser.hourlyRate) caregiver.rate = `Rs. ${Number(updatedUser.hourlyRate).toLocaleString()}/hr`;
            if (updatedUser.bio) {
              caregiver.description = updatedUser.bio;
              caregiver.about = updatedUser.bio;
            }
            if (req.body.location) caregiver.location = req.body.location;
            if (req.body.specialties && Array.isArray(req.body.specialties)) caregiver.specialties = req.body.specialties;
            await caregiver.save();
          } else {
            const lastCg = await Caregiver.findOne().sort({ id: -1 });
            const nextId = (lastCg && lastCg.id ? lastCg.id : 0) + 1;
            await Caregiver.create({
              id: nextId,
              userId: updatedUser._id,
              email: updatedUser.email,
              name: fullName,
              role: updatedUser.title || 'Professional Caregiver',
              profileImage: updatedUser.avatar || '',
              location: req.body.location || 'Colombo, Sri Lanka',
              experience: updatedUser.experience ? `${updatedUser.experience} years experience` : '1 year experience',
              rate: updatedUser.hourlyRate ? `Rs. ${Number(updatedUser.hourlyRate).toLocaleString()}/hr` : 'Rs. 2,500/hr',
              rating: 5.0,
              reviews: 0,
              availability: 'Available today',
              verified: updatedUser.status === 'Verified',
              description: updatedUser.bio || `${fullName} is a dedicated caregiver.`,
              specialties: req.body.specialties || ['Senior Care', 'Mobility Support'],
              credentials: ['SLNC Registered', 'Background checked'],
              about: updatedUser.bio || '',
              reviewsData: [],
            });
          }
        } catch (cgUpdateErr) {
          console.error('Error updating Caregiver document:', cgUpdateErr);
        }
      }

      return res.json({
        _id: updatedUser._id,
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        role: updatedUser.role,
        status: updatedUser.status,
        avatar: updatedUser.avatar,
        title: updatedUser.title,
        experience: updatedUser.experience,
        hourlyRate: updatedUser.hourlyRate,
        bio: updatedUser.bio,
      });
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: error.message || 'Server error updating profile' });
  }
};

// @desc    Get all registered users (for Admin Dashboard)
// @route   GET /api/auth/users
// @access  Public / Admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    const formattedUsers = users.map((u) => ({
      id: u._id.toString(),
      _id: u._id.toString(),
      name: `${u.firstName} ${u.lastName}`,
      firstName: u.firstName,
      lastName: u.lastName,
      email: u.email,
      role: u.role,
      status: u.status || 'Active',
      joined: u.createdAt ? new Date(u.createdAt).toISOString().split('T')[0] : '2026-08-14',
      phone: u.phone || '',
      avatar: u.avatar || '',
      title: u.title || '',
      hourlyRate: u.hourlyRate || 0,
      experience: u.experience || 0,
    }));

    res.json(formattedUsers);
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ message: 'Server error retrieving users' });
  }
};

// @desc    Update user status (e.g. approve caregiver verification, suspend, or reject)
// @route   PATCH /api/auth/users/:id/status
// @access  Public / Admin
export const updateUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (status) {
      user.status = status;
    }

    await user.save();

    // If this user is a caregiver, synchronize Caregiver.verified
    if (user.role === 'caregiver') {
      const isApproved = status === 'Verified';
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      const caregiver = await Caregiver.findOne({
        $or: [
          { userId: user._id },
          { email: user.email },
          ...(fullName ? [{ name: fullName }] : []),
        ],
      });

      if (caregiver) {
        caregiver.verified = isApproved;
        await caregiver.save();
      }

      // Create a system notification for the caregiver
      try {
        let notifTitle = 'Account Status Update';
        let notifDesc = `Your account status was changed to: ${status}.`;

        if (status === 'Verified') {
          notifTitle = 'Profile Approved & Verified!';
          notifDesc = 'Congratulations! The platform administrator has verified your credentials. Your profile is now live for family bookings.';
        } else if (status === 'Rejected') {
          notifTitle = 'Verification Request Declined';
          notifDesc = 'Your caregiver verification request was declined. Please check your profile credentials or contact support.';
        }

        await Notification.create({
          user: user._id,
          title: notifTitle,
          description: notifDesc,
          type: 'system',
          time: 'Just now',
        });
      } catch (notifErr) {
        console.error('Error creating status update notification:', notifErr);
      }
    }

    res.json({
      id: user._id.toString(),
      _id: user._id.toString(),
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  } catch (error) {
    console.error('Update user status error:', error);
    res.status(500).json({ message: 'Server error updating user status' });
  }
};

// @desc    Delete user and associated caregiver profile
// @route   DELETE /api/auth/users/:id
// @access  Public / Admin
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // If caregiver, remove their profile from Caregiver collection too
    if (user.role === 'caregiver') {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      await Caregiver.deleteMany({
        $or: [
          { userId: user._id },
          { email: user.email },
          ...(fullName ? [{ name: fullName }] : []),
        ],
      });
    }

    await User.findByIdAndDelete(id);

    res.json({ message: 'User deleted successfully', id });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
};

