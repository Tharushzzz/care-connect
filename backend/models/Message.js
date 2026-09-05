import mongoose from 'mongoose';

const singleMessageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ['me', 'them'],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  },
  {
    timestamps: true,
  }
);

const messageThreadSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    caregiverId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: 'Caregiver',
    },
    avatar: {
      type: String,
      default: '',
    },
    lastMessage: {
      type: String,
      default: '',
    },
    time: {
      type: String,
      default: () =>
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    unread: {
      type: Boolean,
      default: false,
    },
    unreadCount: {
      type: Number,
      default: 0,
    },
    online: {
      type: Boolean,
      default: true,
    },
    messages: [singleMessageSchema],
  },
  {
    timestamps: true,
  }
);

const MessageThread = mongoose.model('MessageThread', messageThreadSchema);

export default MessageThread;
