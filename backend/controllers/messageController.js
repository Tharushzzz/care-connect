import MessageThread from '../models/Message.js';

const defaultThreads = [
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
    role: 'Physical Therapist',
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
];

// @desc    Get all chat threads
// @route   GET /api/messages
// @access  Public / Optional Auth
export const getThreads = async (req, res) => {
  try {
    let threads = await MessageThread.find().sort({ updatedAt: -1 });

    if (threads.length === 0) {
      threads = await MessageThread.insertMany(defaultThreads);
    }

    res.json(threads);
  } catch (error) {
    console.error('Error fetching message threads:', error);
    res.status(500).json({ message: 'Server error retrieving messages' });
  }
};

// @desc    Send a message in a thread
// @route   POST /api/messages/:threadId
// @access  Public / Optional Auth
export const sendMessage = async (req, res) => {
  try {
    const { threadId } = req.params;
    const { text, sender = 'me' } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ message: 'Message text cannot be empty' });
    }

    const thread = await MessageThread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    const currentTime = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newMessage = {
      sender,
      text: text.trim(),
      time: currentTime,
    };

    thread.messages.push(newMessage);
    thread.lastMessage = text.trim();
    thread.time = currentTime;
    thread.unread = false;
    thread.unreadCount = 0;

    await thread.save();

    res.status(201).json(thread);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: 'Server error sending message' });
  }
};

// @desc    Mark thread messages as read
// @route   PATCH /api/messages/:threadId/read
// @access  Public / Optional Auth
export const markThreadRead = async (req, res) => {
  try {
    const { threadId } = req.params;

    const thread = await MessageThread.findById(threadId);

    if (!thread) {
      return res.status(404).json({ message: 'Chat thread not found' });
    }

    thread.unread = false;
    thread.unreadCount = 0;
    await thread.save();

    res.json(thread);
  } catch (error) {
    console.error('Error marking thread as read:', error);
    res.status(500).json({ message: 'Server error marking thread read' });
  }
};
