import Caregiver from '../models/Caregiver.js';
import User from '../models/User.js';

// Sync caregiver accounts from User collection to Caregiver collection
export const syncCaregiversFromUsers = async () => {
  try {
    const caregiverUsers = await User.find({ role: 'caregiver' });
    for (const u of caregiverUsers) {
      const fullName = `${u.firstName} ${u.lastName}`.trim();
      let cg = await Caregiver.findOne({
        $or: [
          { userId: u._id },
          { email: u.email },
          { name: fullName },
        ],
      });

      if (!cg) {
        const lastCg = await Caregiver.findOne().sort({ id: -1 });
        const nextId = (lastCg && lastCg.id ? lastCg.id : 0) + 1;
        await Caregiver.create({
          id: nextId,
          userId: u._id,
          email: u.email,
          name: fullName || 'Caregiver Professional',
          role: u.title || 'Certified Caregiver',
          profileImage: u.avatar || '',
          location: 'Colombo, Sri Lanka',
          experience: u.experience ? `${u.experience} years experience` : '1 year experience',
          rate: u.hourlyRate ? `Rs. ${Number(u.hourlyRate).toLocaleString()}/hr` : 'Rs. 2,500/hr',
          rating: 5.0,
          reviews: 0,
          availability: 'Available today',
          verified: u.status === 'Verified',
          description: u.bio || `${fullName} is a compassionate, verified caregiver providing dedicated care support.`,
          specialties: ['Senior Care', 'Mobility Support'],
          credentials: ['SLNC Registered', 'Background checked'],
          about: u.bio || `${fullName} is committed to compassionate, dignified care for all families.`,
          freetime: 'Enjoys reading and community volunteering.',
          reviewText: 'Warm, reliable, and attentive to family needs.',
          reviewsData: [],
        });
      } else {
        let modified = false;
        if (!cg.userId) { cg.userId = u._id; modified = true; }
        if (!cg.email) { cg.email = u.email; modified = true; }
        if (u.avatar && cg.profileImage !== u.avatar) { cg.profileImage = u.avatar; modified = true; }
        if (fullName && cg.name !== fullName) { cg.name = fullName; modified = true; }
        if (u.title && cg.role !== u.title) { cg.role = u.title; modified = true; }
        if (u.status === 'Verified' && !cg.verified) { cg.verified = true; modified = true; }
        if (u.hourlyRate) {
          const formattedRate = `Rs. ${Number(u.hourlyRate).toLocaleString()}/hr`;
          if (cg.rate !== formattedRate) { cg.rate = formattedRate; modified = true; }
        }
        if (u.experience) {
          const formattedExp = `${u.experience} years experience`;
          if (cg.experience !== formattedExp) { cg.experience = formattedExp; modified = true; }
        }
        if (u.bio && cg.description !== u.bio) {
          cg.description = u.bio;
          cg.about = u.bio;
          modified = true;
        }
        if (modified) await cg.save();
      }
    }
  } catch (err) {
    console.error('Error syncing caregivers from users:', err);
  }
};

// @desc    Get all caregivers with optional filtering
// @route   GET /api/caregivers
// @access  Public
export const getCaregivers = async (req, res) => {
  try {
    // Ensure any registered caregiver accounts in MongoDB are synchronized
    await syncCaregiversFromUsers();

    const { search, specialty, experience, rate, availability } = req.query;

    const filter = {};

    // Search query on name, role, or description
    if (search && search.trim() !== '') {
      const regex = new RegExp(search.trim(), 'i');
      filter.$or = [
        { name: regex },
        { role: regex },
        { description: regex },
        { location: regex },
        { specialties: regex },
      ];
    }

    // Filter by specialty
    if (specialty && specialty !== 'All') {
      filter.specialties = { $in: [specialty] };
    }

    // Filter by availability
    if (availability && availability !== 'Any') {
      filter.availability = new RegExp(availability, 'i');
    }

    let caregivers = await Caregiver.find(filter).sort({ rating: -1, id: 1 });

    // Additional memory filter for experience / rate if needed
    if (experience && experience !== 'Any') {
      caregivers = caregivers.filter((c) => {
        const expMatch = c.experience.match(/\d+/);
        const expYears = expMatch ? parseInt(expMatch[0], 10) : 0;
        if (experience === '1-3 years') return expYears >= 1 && expYears <= 3;
        if (experience === '3-5 years') return expYears >= 3 && expYears <= 5;
        if (experience === '5+ years') return expYears >= 5;
        return true;
      });
    }

    if (rate && rate !== 'Any') {
      caregivers = caregivers.filter((c) => {
        const rateMatch = c.rate.replace(/,/g, '').match(/\d+/);
        const rateVal = rateMatch ? parseInt(rateMatch[0], 10) : 0;
        if (rate === 'Under Rs. 2,500/hr') return rateVal < 2500;
        if (rate === 'Rs. 2,500 - Rs. 3,500/hr') return rateVal >= 2500 && rateVal <= 3500;
        if (rate === 'Rs. 3,500+/hr') return rateVal >= 3500;
        return true;
      });
    }

    res.json(caregivers);
  } catch (error) {
    console.error('Error fetching caregivers:', error);
    res.status(500).json({ message: 'Server error retrieving caregivers' });
  }
};

// @desc    Get single caregiver by id or _id
// @route   GET /api/caregivers/:id
// @access  Public
export const getCaregiverById = async (req, res) => {
  try {
    const { id } = req.params;

    let caregiver;
    if (!isNaN(Number(id))) {
      caregiver = await Caregiver.findOne({ id: Number(id) });
    }

    if (!caregiver && id.match(/^[0-9a-fA-F]{24}$/)) {
      caregiver = await Caregiver.findById(id);
    }

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    res.json(caregiver);
  } catch (error) {
    console.error('Error fetching caregiver:', error);
    res.status(500).json({ message: 'Server error retrieving caregiver' });
  }
};

// @desc    Update caregiver verification status
// @route   PATCH /api/caregivers/:id/verify
// @access  Public / Admin
export const updateCaregiverVerification = async (req, res) => {
  try {
    const { id } = req.params;
    const { verified } = req.body;

    let caregiver;
    if (!isNaN(Number(id))) {
      caregiver = await Caregiver.findOne({ id: Number(id) });
    } else {
      caregiver = await Caregiver.findById(id);
    }

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    caregiver.verified = verified !== undefined ? verified : true;
    await caregiver.save();

    res.json(caregiver);
  } catch (error) {
    console.error('Error verifying caregiver:', error);
    res.status(500).json({ message: 'Server error updating caregiver' });
  }
};

// @desc    Add review to caregiver
// @route   POST /api/caregivers/:id/reviews
// @access  Public
export const addCaregiverReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { reviewerName, rating, comment } = req.body;

    if (!reviewerName || !rating || !comment) {
      return res.status(400).json({ message: 'Please provide reviewer name, rating and comment' });
    }

    let caregiver;
    if (!isNaN(Number(id))) {
      caregiver = await Caregiver.findOne({ id: Number(id) });
    } else {
      caregiver = await Caregiver.findById(id);
    }

    if (!caregiver) {
      return res.status(404).json({ message: 'Caregiver not found' });
    }

    const newReview = {
      id: (caregiver.reviewsData?.length || 0) + 1,
      reviewerName,
      rating: Number(rating),
      comment,
      date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
    };

    caregiver.reviewsData.push(newReview);
    caregiver.reviews = caregiver.reviewsData.length;

    // Recalculate average rating
    const sum = caregiver.reviewsData.reduce((acc, curr) => acc + curr.rating, 0);
    caregiver.rating = parseFloat((sum / caregiver.reviewsData.length).toFixed(1));

    await caregiver.save();

    res.status(201).json(caregiver);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Server error adding review' });
  }
};
