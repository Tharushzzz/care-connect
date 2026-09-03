import React, { useState } from 'react';
import {
  Calendar,
  MessageSquare,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  Check
} from 'lucide-react';

interface CaregiverNotification {
  id: string;
  type: 'job' | 'message' | 'payment' | 'verification' | 'alert';
  title: string;
  description: string;
  time: string;
  read: boolean;
}

export const CaregiverNotifications: React.FC = () => {
  const [notifications, setNotifications] = useState<CaregiverNotification[]>([
    {
      id: '1',
      type: 'job',
      title: 'New Job Request',
      description: 'John Doe Family requested you for Senior Care on Oct 28.',
      time: '10 minutes ago',
      read: false
    },
    {
      id: '2',
      type: 'message',
      title: 'New Message',
      description: 'Alice Smith: "Thanks for taking such good care of mom!"',
      time: '1 hour ago',
      read: false
    },
    {
      id: '3',
      type: 'payment',
      title: 'Payment Received',
      description: 'You received a payout of Rs. 42,000.00 to your bank account.',
      time: 'Yesterday',
      read: true
    },
    {
      id: '4',
      type: 'verification',
      title: 'Background Check Cleared',
      description: 'Your annual criminal background check has been cleared.',
      time: '2 days ago',
      read: true
    },
    {
      id: '5',
      type: 'alert',
      title: 'Action Required: CPR Expiring',
      description: 'Your CPR certification expires in 30 days. Please upload a new certificate.',
      time: '1 week ago',
      read: true
    }
  ]);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const getIcon = (type: CaregiverNotification['type']) => {
    switch (type) {
      case 'job':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
        );
      case 'message':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
        );
      case 'payment':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
            <DollarSign className="w-5 h-5" />
          </div>
        );
      case 'verification':
        return (
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
        );
      case 'alert':
        return (
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
        );
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Stay updated on your jobs, messages, and account activity.
          </p>
        </div>

        <div>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-full border border-teal-600 text-teal-700 hover:bg-teal-50 text-xs sm:text-sm font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Mark all as read</span>
          </button>
        </div>
      </div>

      {/* Notifications Card List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs divide-y divide-slate-100 overflow-hidden">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markAsRead(n.id)}
            className={`p-5 flex items-start justify-between gap-4 transition-colors cursor-pointer ${
              !n.read ? 'bg-teal-50/20 hover:bg-teal-50/40' : 'hover:bg-slate-50/80'
            }`}
          >
            <div className="flex items-start gap-4 flex-1 min-w-0">
              {getIcon(n.type)}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold text-slate-900">{n.title}</h3>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                  {n.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs text-slate-400 font-medium">{n.time}</span>
              {!n.read && (
                <span className="w-2 h-2 rounded-full bg-blue-600 block shrink-0" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaregiverNotifications;
