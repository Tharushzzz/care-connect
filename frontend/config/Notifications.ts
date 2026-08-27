export type NotificationType = 'booking' | 'message' | 'reminder' | 'system'

export interface NotificationItem {
  id: string
  title: string
  description: string
  time: string
  read: boolean
  type: NotificationType
}

const NotificationsData: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Booking Confirmed',
    description: 'Sarah Jenkins accepted your care request for Friday at 9:00 AM.',
    time: '10 min ago',
    read: false,
    type: 'booking',
  },
  {
    id: 'n2',
    title: 'New Care Message',
    description: 'Michael sent an update regarding today’s medication routine.',
    time: '45 min ago',
    read: false,
    type: 'message',
  },
  {
    id: 'n3',
    title: 'Upcoming Appointment Reminder',
    description: 'Vitals check & physical therapy scheduled for tomorrow at 2:00 PM.',
    time: '2 hours ago',
    read: true,
    type: 'reminder',
  },
  {
    id: 'n4',
    title: 'Profile Verification',
    description: 'Your care plan preferences were saved successfully.',
    time: '1 day ago',
    read: true,
    type: 'system',
  },
]

export default NotificationsData
