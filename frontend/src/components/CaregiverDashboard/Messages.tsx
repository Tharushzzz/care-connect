import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Image as ImageIcon,
  Send
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'family';
  text: string;
  time: string;
}

interface Conversation {
  id: string;
  name: string;
  category: string;
  online: boolean;
  avatar: string;
  lastMessage: string;
  lastTime: string;
  unreadCount?: number;
  messages: Message[];
}

export const CaregiverMessages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatId, setActiveChatId] = useState('1');
  const [inputText, setInputText] = useState('');
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'John Doe Family',
      category: 'Senior Care',
      online: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      lastMessage: 'Are you available to start a bit earlier tomorrow?',
      lastTime: '10:42 AM',
      unreadCount: 1,
      messages: [
        {
          id: 'm1',
          sender: 'family',
          text: 'Hi Sarah, are we still on for tomorrow at 9 AM?',
          time: '10:30 AM'
        },
        {
          id: 'm2',
          sender: 'user',
          text: 'Yes! I will be arriving exactly on time.',
          time: '10:35 AM'
        },
        {
          id: 'm3',
          sender: 'family',
          text: 'Great. Are you available to start a bit earlier tomorrow? Maybe 8:30?',
          time: '10:42 AM'
        }
      ]
    },
    {
      id: '2',
      name: 'Alice Smith Family',
      category: 'Post-Surgery',
      online: false,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      lastMessage: 'Thanks for taking such good care of mom!',
      lastTime: 'Yesterday',
      messages: [
        {
          id: 'm4',
          sender: 'family',
          text: 'Thanks for taking such good care of mom!',
          time: 'Yesterday 4:15 PM'
        },
        {
          id: 'm5',
          sender: 'user',
          text: 'It was my absolute pleasure! Let me know if you need any follow-up notes.',
          time: 'Yesterday 4:30 PM'
        }
      ]
    },
    {
      id: '3',
      name: 'Mark T. Family',
      category: 'Dementia Care',
      online: false,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      lastMessage: 'We will review your application soon.',
      lastTime: 'Mon',
      messages: [
        {
          id: 'm6',
          sender: 'family',
          text: 'We will review your application soon.',
          time: 'Mon 2:10 PM'
        }
      ]
    }
  ]);

  const activeConversation = conversations.find((c) => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: newMessage.text,
            lastTime: newMessage.time,
            unreadCount: 0,
            messages: [...c.messages, newMessage]
          };
        }
        return c;
      })
    );

    setInputText('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto h-[calc(100vh-4.25rem)] flex flex-col">
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs flex-1 flex overflow-hidden">
        {/* Left List Pane (Conversations) */}
        <div className="w-full sm:w-80 lg:w-96 border-r border-slate-200/80 flex flex-col shrink-0 bg-white">
          {/* Header */}
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Family Messages</h2>
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {filteredConversations.map((c) => {
              const isSelected = c.id === activeChatId;
              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setActiveChatId(c.id);
                    // Clear unread count on selection
                    setConversations((prev) =>
                      prev.map((item) => (item.id === c.id ? { ...item, unreadCount: 0 } : item))
                    );
                  }}
                  className={`p-4 flex items-start gap-3 cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-teal-50/60 border-l-4 border-l-[#0D9488]'
                      : 'hover:bg-slate-50 border-l-4 border-l-transparent'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                    />
                    {c.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <h3 className="text-sm font-bold text-slate-900 truncate">{c.name}</h3>
                      <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                        {c.lastTime}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={`text-xs truncate ${
                          c.unreadCount ? 'font-semibold text-slate-800' : 'text-slate-500'
                        }`}
                      >
                        {c.lastMessage}
                      </p>
                      {c.unreadCount && c.unreadCount > 0 ? (
                        <span className="bg-[#0D9488] text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full min-w-4.5 text-center shrink-0">
                          {c.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="hidden sm:flex flex-1 flex-col bg-[#F8FAFC]">
          {/* Active Chat Top Header */}
          <div className="h-16 px-6 bg-white border-b border-slate-200/80 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.avatar}
                  alt={activeConversation.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {activeConversation.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white" />
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">{activeConversation.name}</h3>
                <span className="text-xs text-slate-400">
                  {activeConversation.category} • {activeConversation.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-slate-500">
              <button
                onClick={() => alert(`Calling ${activeConversation.name}...`)}
                className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition-colors"
                title="Audio call"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                onClick={() => alert(`Starting video call with ${activeConversation.name}...`)}
                className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition-colors"
                title="Video call"
              >
                <Video className="w-4.5 h-4.5" />
              </button>
              <button className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-800 transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex justify-center my-2">
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-200/70 px-3 py-1 rounded-full">
                Today
              </span>
            </div>

            {activeConversation.messages.map((m) => {
              const isUser = m.sender === 'user';
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-md">
                    {!isUser && (
                      <img
                        src={activeConversation.avatar}
                        alt="sender"
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}
                    <div
                      className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isUser
                          ? 'bg-[#0D9488] text-white rounded-br-xs shadow-xs'
                          : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-4 bg-white border-t border-slate-200/80">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                title="Attach file"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <button
                type="button"
                className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
                title="Upload image"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 rounded-xl transition-all ${
                  inputText.trim()
                    ? 'bg-[#0D9488] hover:bg-[#0b7970] text-white shadow-xs cursor-pointer'
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverMessages;
