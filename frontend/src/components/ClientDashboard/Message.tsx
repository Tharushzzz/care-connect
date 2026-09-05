import React, { useState, useRef, useEffect } from 'react';
import { Search, Send, Paperclip, Image, Smile, Phone, Video, Info, ArrowLeft, CheckCheck } from 'lucide-react';
import CaregiversData from '../../../config/Caregivers';

interface MessageLog {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  caregiverId: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
  unreadCount?: number;
  online: boolean;
  messages: MessageLog[];
}

export const Message: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Retrieve caregiver profile avatars
  const getCaregiverAvatar = (id: number) => {
    const cg = CaregiversData.find(c => c.id === id);
    return cg ? cg.profileImage : '';
  };

  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string>('');
  const [typedMessage, setTypedMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingChatPaneOnMobile, setViewingChatPaneOnMobile] = useState(false);
  // Load threads from MongoDB API
  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const res = await fetch('/api/messages');
        if (res.ok) {
          const data = await res.json();
          const mapped: ChatThread[] = data.map((t: any) => ({
            id: t._id || t.id,
            caregiverId: t.caregiverId,
            name: t.name,
            role: t.role,
            avatar: t.avatar || getCaregiverAvatar(t.caregiverId),
            lastMessage: t.lastMessage,
            time: t.time,
            unread: t.unread,
            unreadCount: t.unreadCount || 0,
            online: t.online,
            messages: (t.messages || []).map((m: any) => ({
              id: m._id || m.id || String(Math.random()),
              sender: m.sender,
              text: m.text,
              time: m.time,
            })),
          }));
          setThreads(mapped);
          if (mapped.length > 0) {
            setActiveThreadId(mapped[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load messages from MongoDB:', err);
      }
    };

    fetchThreads();
  }, []);

  const activeThread = threads.find((t) => t.id === activeThreadId) || threads[0] || null;

  // Scroll to bottom of chat when active thread changes or new message sent
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeThread?.messages, activeThreadId]);

  // Mark active thread messages as read
  useEffect(() => {
    if (activeThread?.unread && activeThread?.id) {
      setThreads((prev) =>
        prev.map((t) =>
          t.id === activeThread.id
            ? { ...t, unread: false, unreadCount: 0 }
            : t
        )
      );
      fetch(`/api/messages/${activeThread.id}/read`, { method: 'PATCH' }).catch(console.error);
    }
  }, [activeThreadId, activeThread?.unread]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMessage.trim() || !activeThread) return;

    const currentText = typedMessage.trim();
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMsg: MessageLog = {
      id: Date.now().toString(),
      sender: 'me',
      text: currentText,
      time: currentTime
    };

    // Optimistic UI update
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === activeThread.id) {
          return {
            ...t,
            lastMessage: currentText,
            time: currentTime,
            messages: [...t.messages, newMsg]
          };
        }
        return t;
      })
    );

    setTypedMessage('');

    try {
      const targetThreadId = activeThread.id;
      await fetch(`/api/messages/${targetThreadId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: currentText,
          sender: 'me',
        }),
      });
    } catch (err) {
      console.error('Error sending message to MongoDB:', err);
    }
  };

  const filteredThreads = threads.filter(t =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-[calc(100vh-68px)] flex bg-white select-none">
      {/* 1. Threads Sidebar (Hidden on mobile if chat pane is visible) */}
      <div
        className={`${
          viewingChatPaneOnMobile ? 'hidden' : 'flex'
        } lg:flex flex-col w-full lg:w-96 border-r border-[#E4EDF5] shrink-0 h-full bg-white`}
      >
        {/* Search */}
        <div className="p-4 border-b border-gray-100 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2 border border-[#D0D5DD] rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0686CD]/30 focus:border-[#0686CD] transition-all bg-[#F9FBFE]"
            />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredThreads.map((thread) => {
            const isSelected = thread.id === activeThreadId;
            return (
              <div
                key={thread.id}
                onClick={() => {
                  setActiveThreadId(thread.id);
                  setViewingChatPaneOnMobile(true);
                }}
                className={`p-4 flex gap-3.5 items-start cursor-pointer transition-all ${
                  isSelected ? 'bg-[#F2F8FD]' : 'hover:bg-[#F8FAFC]'
                }`}
              >
                {/* Avatar with status circle */}
                <div className="relative shrink-0">
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className="w-12 h-12 rounded-full object-cover shadow-xs border border-gray-100"
                  />
                  {thread.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/20" />
                  )}
                </div>

                {/* Meta details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <h4 className={`text-sm truncate font-bold ${thread.unread ? 'text-[#0D182B]' : 'text-gray-800'}`}>
                      {thread.name}
                    </h4>
                    <span className="text-[10px] text-gray-400 shrink-0 font-medium">{thread.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 font-semibold truncate mb-1">{thread.role}</p>
                  <p className={`text-xs truncate ${thread.unread ? 'text-[#0D182B] font-semibold' : 'text-gray-500'}`}>
                    {thread.lastMessage}
                  </p>
                </div>

                {/* Badge indicator */}
                {thread.unreadCount && thread.unreadCount > 0 ? (
                  <span className="bg-[#0686CD] text-white text-[10px] font-extrabold px-1.5 py-0.5 rounded-full shrink-0 min-w-[18px] text-center mt-1">
                    {thread.unreadCount}
                  </span>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Main Chat Panel (Visible on mobile if viewingChatPaneOnMobile is true) */}
      <div
        className={`${
          viewingChatPaneOnMobile ? 'flex' : 'hidden'
        } lg:flex flex-col flex-1 h-full bg-slate-50`}
      >
        {/* Chat Header */}
        <div className="h-16 px-4 border-b border-[#E4EDF5] bg-white flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3.5 min-w-0">
            {/* Back button for mobile */}
            <button
              onClick={() => setViewingChatPaneOnMobile(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            {/* Profile Avatar */}
            <div className="relative shrink-0">
              <img
                src={activeThread.avatar}
                alt={activeThread.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-xs"
              />
              {activeThread.online && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white ring-1 ring-emerald-500/20" />
              )}
            </div>

            {/* Caregiver Name and Online indicator text */}
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-[#0D182B] truncate">{activeThread.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`w-1.5 h-1.5 rounded-full ${activeThread.online ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                <span className="text-[10px] text-gray-500 font-semibold">
                  {activeThread.online ? 'Active Now' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          {/* Header Action icons */}
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-[#0686CD] transition-colors cursor-pointer">
              <Phone className="w-4.5 h-4.5" />
            </button>
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-[#0686CD] transition-colors cursor-pointer">
              <Video className="w-4.5 h-4.5" />
            </button>
            <button className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 hover:text-[#0686CD] transition-colors cursor-pointer">
              <Info className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Message Logs */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeThread.messages.map((message) => {
            const isMe = message.sender === 'me';
            return (
              <div
                key={message.id}
                className={`flex w-full ${isMe ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl p-3.5 text-sm shadow-xs ${
                    isMe
                      ? 'bg-[#0686CD] text-white rounded-tr-none'
                      : 'bg-white text-gray-800 rounded-tl-none border border-gray-100'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1.5 mt-1.5 text-[9px] ${
                      isMe ? 'text-[#E2F1FF]' : 'text-gray-400'
                    }`}
                  >
                    <span>{message.time}</span>
                    {isMe && <CheckCheck className="w-3.5 h-3.5 text-[#EAF5FC]" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input panel */}
        <div className="p-4 bg-white border-t border-[#E4EDF5] shrink-0">
          <form onSubmit={handleSendMessage} className="flex gap-2">
            {/* Input wrap */}
            <div className="flex-1 flex items-center border border-[#D0D5DD] rounded-xl px-3 bg-[#F9FBFE] focus-within:ring-2 focus-within:ring-[#0686CD]/30 focus-within:border-[#0686CD] transition-all">
              {/* Media attach actions */}
              <div className="flex items-center gap-1 mr-2 text-gray-400 shrink-0">
                <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Paperclip className="w-4.5 h-4.5" />
                </button>
                <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Image className="w-4.5 h-4.5" />
                </button>
                <button type="button" className="p-1.5 hover:text-gray-600 rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Smile className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* TextInput */}
              <input
                type="text"
                placeholder="Type a message..."
                value={typedMessage}
                onChange={(e) => setTypedMessage(e.target.value)}
                className="w-full py-3 bg-transparent text-sm text-[#101828] placeholder:text-gray-400 focus:outline-none"
              />
            </div>

            {/* Send button */}
            <button
              type="submit"
              disabled={!typedMessage.trim()}
              className={`p-3 rounded-xl shadow-sm transition-all flex items-center justify-center cursor-pointer shrink-0 ${
                typedMessage.trim()
                  ? 'bg-[#0686CD] hover:bg-[#0071A8] text-white'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4.5 h-4.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Message;
