import Notification from '../models/Notification.js';

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
export const getNotifications = async (req, res) => {
  try {
    const query = req.user ? { $or: [{ user: req.user._id }, { user: null }] } : {};
    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Server error retrieving notifications' });
  }
};

// @desc    Mark a single notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Public
export const markNotificationRead = async (req, res) => {
  try {
    const { id } = req.params;

    let notification;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      notification = await Notification.findById(id);
    } else {
      notification = await Notification.findOne({ notificationId: id });
    }

    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }

    notification.read = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ message: 'Server error marking notification as read' });
  }
};

// @desc    Mark all notifications as read
// @route   PATCH /api/notifications/read-all
// @access  Public
export const markAllNotificationsRead = async (req, res) => {
  try {
    const query = req.user ? { $or: [{ user: req.user._id }, { user: null }] } : {};
    await Notification.updateMany(query, { $set: { read: true } });

    const notifications = await Notification.find(query).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error('Error updating all notifications:', error);
    res.status(500).json({ message: 'Server error marking all notifications read' });
  }
};

// @desc    Create a notification
// @route   POST /api/notifications
// @access  Public
export const createNotification = async (req, res) => {
  try {
    const { title, description, type, user } = req.body;

    const notification = await Notification.create({
      notificationId: `n_${Date.now()}`,
      title,
      description,
      type: type || 'system',
      user: user || (req.user ? req.user._id : null),
      time: 'Just now',
      read: false,
    });

    res.status(201).json(notification);
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({ message: 'Server error creating notification' });
  }
};
