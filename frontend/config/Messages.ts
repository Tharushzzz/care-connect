export interface MessageItem {
  id: string
  senderId: string
  senderName: string
  senderAvatar?: string
  senderRole: string
  lastMessage: string
  time: string
  unread: boolean
  unreadCount?: number
}

const MessagesData: MessageItem[] = [
  {
    id: 'msg_1',
    senderId: 'usr_102',
    senderName: 'Sarah Jenkins',
    senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
    senderRole: 'Registered Nurse (RN)',
    lastMessage: 'I have arrived and updated today’s care notes for your review.',
    time: '10:15 AM',
    unread: true,
    unreadCount: 1,
  },
  {
    id: 'msg_2',
    senderId: 'usr_104',
    senderName: 'Michael Lee',
    senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
    senderRole: 'Certified Nursing Assistant',
    lastMessage: 'Tomorrow’s afternoon schedule works great for me!',
    time: 'Yesterday',
    unread: true,
    unreadCount: 1,
  },
  {
    id: 'msg_3',
    senderId: 'usr_103',
    senderName: 'Emily Davis',
    senderAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=160&q=80',
    senderRole: 'Licensed Practical Nurse',
    lastMessage: 'Thank you for confirming the booking details.',
    time: 'Aug 25',
    unread: false,
  },
]

export default MessagesData
