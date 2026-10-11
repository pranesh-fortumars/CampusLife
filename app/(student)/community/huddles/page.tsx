'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  Plus, 
  Mic, 
  MicOff, 
  Volume2, 
  FileText, 
  Pin, 
  ShieldCheck, 
  MessageSquare, 
  X, 
  Send, 
  Users, 
  Check, 
  Radio, 
  Headphones,
  CheckCheck,
  Download
} from 'lucide-react';

interface ConversationItem {
  id: string;
  name: string;
  badge?: string;
  badgeColor?: string;
  pinned?: boolean;
  timestamp: string;
  lastMessage: string;
  unreadCount?: number;
  unreadDot?: boolean;
  avatarBg: string;
  avatarText: string;
  attachmentName?: string;
  attachmentSize?: string;
}

export default function StudyGroupsHuddlesPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'groups' | 'direct'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Audio Huddle State
  const [inAudioHuddle, setInAudioHuddle] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [elapsedMinutes, setElapsedMinutes] = useState(34);

  // New Chat Modal
  const [showNewChatModal, setShowNewChatModal] = useState(false);
  const [newChatName, setNewChatName] = useState('');
  const [newChatType, setNewChatType] = useState<'direct' | 'group'>('group');

  // Active chat drawer
  const [activeChat, setActiveChat] = useState<ConversationItem | null>(null);
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState<Array<{ sender: string; text: string; time: string }>>([
    { sender: 'Priya Nair', text: 'Hey guys, I uploaded the solved BCNF tutorial sheet. Check unit 3!', time: '10:42 AM' }
  ]);

  const [conversations, setConversations] = useState<ConversationItem[]>([
    {
      id: 'c1',
      name: 'CS-302 DBMS Theory',
      badge: '42 PEERS',
      badgeColor: 'bg-indigo-50 text-indigo-700',
      timestamp: '10:42 AM',
      lastMessage: 'Priya Nair: Uploaded the handwritten...',
      unreadCount: 3,
      avatarBg: 'bg-indigo-100 text-indigo-700',
      avatarText: 'DB',
      attachmentName: 'BCNF_Tutorial_Sheet.pdf',
      attachmentSize: '2.4 MB'
    },
    {
      id: 'c2',
      name: "HackCampus '24 ByteCraft",
      badge: 'HACKATHON',
      badgeColor: 'bg-purple-100 text-purple-700',
      timestamp: '9:15 AM',
      lastMessage: '✓ Kabir V.: Deployed the IoT endpoint on AWS...',
      avatarBg: 'bg-purple-100 text-purple-700',
      avatarText: 'BC'
    },
    {
      id: 'c3',
      name: 'Prof. Dr. Ananya Roy',
      badge: 'FACULTY',
      badgeColor: 'bg-teal-100 text-teal-700',
      pinned: true,
      timestamp: 'Yesterday',
      lastMessage: 'Please bring your lab journal for evaluation tomorrow.',
      avatarBg: 'bg-teal-100 text-teal-700',
      avatarText: 'AR'
    },
    {
      id: 'c4',
      name: 'Priya Nair',
      badge: 'CR CSE-B',
      badgeColor: 'bg-slate-100 text-slate-700',
      timestamp: 'Yesterday',
      lastMessage: 'Hey Rahul, did you submit the OS assignment?',
      unreadDot: true,
      avatarBg: 'bg-purple-100 text-purple-700',
      avatarText: 'PN'
    },
    {
      id: 'c5',
      name: 'ACM DTU Council',
      badge: 'SOCIETY',
      badgeColor: 'bg-indigo-50 text-indigo-700',
      timestamp: 'Oct 23',
      lastMessage: 'Announcement: HackCampus registration closes in 48h.',
      avatarBg: 'bg-blue-100 text-blue-700',
      avatarText: 'ACM'
    },
    {
      id: 'c6',
      name: 'Tanmay Gupta',
      badge: 'LAB PARTNER',
      badgeColor: 'bg-slate-100 text-slate-700',
      timestamp: 'Oct 22',
      lastMessage: 'I have the Arduino jumper wires and sensor kit.',
      avatarBg: 'bg-amber-100 text-amber-700',
      avatarText: 'TG'
    }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { sender: 'You', text: chatInput.trim(), time: 'Just now' }
    ]);
    setChatInput('');
  };

  const handleCreateChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatName.trim()) return;
    const newConv: ConversationItem = {
      id: `c-${Date.now()}`,
      name: newChatName.trim(),
      badge: newChatType === 'group' ? 'STUDY GROUP' : 'PEER',
      badgeColor: 'bg-indigo-50 text-indigo-700',
      timestamp: 'Just now',
      lastMessage: 'Chat channel started.',
      avatarBg: 'bg-indigo-100 text-indigo-700',
      avatarText: newChatName.slice(0, 2).toUpperCase()
    };
    setConversations([newConv, ...conversations]);
    setShowNewChatModal(false);
    setNewChatName('');
  };

  const filteredConversations = conversations.filter(c => {
    if (activeTab === 'groups' && !c.badge?.includes('PEERS') && !c.badge?.includes('GROUP') && !c.badge?.includes('HACKATHON') && !c.badge?.includes('SOCIETY')) return false;
    if (activeTab === 'direct' && (c.badge?.includes('PEERS') || c.badge?.includes('HACKATHON') || c.badge?.includes('SOCIETY'))) return false;
    if (searchQuery.trim()) {
      return c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    }
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages, study groups, chan..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          />
        </div>
        <button
          onClick={() => setActiveTab(activeTab === 'groups' ? 'all' : 'groups')}
          className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs Row */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'all'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          All Chats 14
        </button>

        <button
          onClick={() => setActiveTab('groups')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'groups'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Study Groups 6
        </button>

        <button
          onClick={() => setActiveTab('direct')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
            activeTab === 'direct'
              ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Direct Messages
        </button>
      </div>

      {/* Active Huddles & Squads Strip */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-extrabold text-slate-900">
            <Radio className="w-4 h-4 text-indigo-600 animate-pulse" />
            <span>Active Huddles &amp; Squads</span>
          </div>
          <span className="text-[10px] font-bold text-indigo-600">4 Live Now</span>
        </div>

        {/* Horizontal Huddles List */}
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
          {/* New Hub circular button */}
          <button
            onClick={() => setShowNewChatModal(true)}
            className="flex flex-col items-center gap-1.5 shrink-0"
          >
            <div className="w-14 h-14 rounded-full border-2 border-dashed border-indigo-300 bg-indigo-50/50 flex items-center justify-center text-indigo-600 hover:bg-indigo-100 transition-colors">
              <Plus className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-slate-600">New Hub</span>
          </button>

          {/* Hub 1: CS-302 */}
          <div 
            onClick={() => setInAudioHuddle(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 p-0.5 relative shadow-sm">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center font-bold text-xs text-indigo-700">
                CS-302
              </div>
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-900 block leading-tight">CS-302</span>
              <span className="text-[9px] font-bold text-emerald-600">18 ONLINE</span>
            </div>
          </div>

          {/* Hub 2: ByteCraft */}
          <div 
            onClick={() => setInAudioHuddle(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-black text-xs relative shadow-xs">
              BC
              <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white absolute bottom-0 right-0"></span>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-900 block leading-tight">ByteCraft</span>
              <span className="text-[9px] text-slate-400">4 online</span>
            </div>
          </div>

          {/* Hub 3: OS Lab B */}
          <div 
            onClick={() => setInAudioHuddle(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs relative shadow-xs">
              OS-B
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-900 block leading-tight">OS Lab B</span>
              <span className="text-[9px] text-slate-400">32 peers</span>
            </div>
          </div>

          {/* Hub 4: Placement */}
          <div 
            onClick={() => setInAudioHuddle(true)}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-700 font-bold text-xs relative shadow-xs">
              🎓
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-slate-900 block leading-tight">Placement</span>
              <span className="text-[9px] text-slate-400">54 peers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Vibrant Live Audio Huddle Card */}
      <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-[28px] p-4 text-white shadow-lg shadow-indigo-300/40 space-y-3 relative overflow-hidden">
        
        {/* Top Tag Row */}
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-300/40 text-cyan-200 text-[9px] font-extrabold tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping"></span>
            LIVE AUDIO HUDDLE
          </span>

          <span className="text-[10px] text-indigo-200 font-mono">
            ⏱️ {elapsedMinutes}m elapsed
          </span>
        </div>

        {/* Topic Title */}
        <div>
          <h2 className="text-sm font-black text-white leading-snug">
            DBMS Normalization &amp; Indexing Sprint
          </h2>
          <div className="flex items-center gap-1.5 text-[11px] text-indigo-100 mt-1">
            <Mic className="w-3.5 h-3.5 text-cyan-300" />
            <span>Priya Nair is explaining BCNF canonical decomposition</span>
          </div>
        </div>

        {/* Member Avatars & Join Action */}
        <div className="flex items-center justify-between pt-1 border-t border-indigo-500/40">
          <div className="flex items-center -space-x-2">
            <div className="w-7 h-7 rounded-full bg-purple-400 text-purple-950 font-bold text-[10px] flex items-center justify-center ring-2 ring-indigo-700">
              PN
            </div>
            <div className="w-7 h-7 rounded-full bg-cyan-400 text-cyan-950 font-bold text-[10px] flex items-center justify-center ring-2 ring-indigo-700">
              RS
            </div>
            <div className="w-7 h-7 rounded-full bg-indigo-300 text-indigo-950 font-bold text-[10px] flex items-center justify-center ring-2 ring-indigo-700">
              KV
            </div>
            <div className="w-7 h-7 rounded-full bg-white/20 text-white font-bold text-[10px] flex items-center justify-center ring-2 ring-indigo-700">
              +4
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-indigo-800/80 hover:bg-indigo-800 text-white transition-colors"
              title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
            >
              {isMuted ? <MicOff className="w-4 h-4 text-rose-300" /> : <Mic className="w-4 h-4 text-emerald-300" />}
            </button>

            <button
              onClick={() => setInAudioHuddle(!inAudioHuddle)}
              className={`py-2 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all ${
                inAudioHuddle
                  ? 'bg-rose-500 hover:bg-rose-600 text-white'
                  : 'bg-white hover:bg-indigo-50 text-indigo-700 shadow-sm'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>{inAudioHuddle ? 'Leave Room' : 'Join Room'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Conversations Section */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900">Recent Conversations</h3>
          <button 
            onClick={() => setConversations(prev => prev.map(c => ({ ...c, unreadCount: undefined, unreadDot: false })))}
            className="text-[11px] font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark all read</span>
          </button>
        </div>

        {/* Conversations List */}
        <div className="space-y-2">
          {filteredConversations.map((chat) => (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 cursor-pointer transition-all space-y-2"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-9 h-9 rounded-xl ${chat.avatarBg} font-black text-xs flex items-center justify-center shrink-0`}>
                    {chat.avatarText}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-extrabold text-xs text-slate-900 truncate">
                        {chat.name}
                      </span>
                      {chat.badge && (
                        <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${chat.badgeColor}`}>
                          {chat.badge}
                        </span>
                      )}
                      {chat.pinned && (
                        <Pin className="w-3 h-3 text-indigo-600 fill-indigo-600" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium">
                    {chat.timestamp}
                  </span>
                  {chat.unreadCount ? (
                    <div className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center ml-auto mt-1">
                      {chat.unreadCount}
                    </div>
                  ) : chat.unreadDot ? (
                    <div className="w-2 h-2 rounded-full bg-indigo-600 ml-auto mt-1"></div>
                  ) : null}
                </div>
              </div>

              {/* Attachment Preview Box if any */}
              {chat.attachmentName && (
                <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between text-xs ml-11">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-rose-500" />
                    <div>
                      <span className="font-bold text-slate-900 text-[11px] block">{chat.attachmentName}</span>
                      <span className="text-[9px] text-slate-400">{chat.attachmentSize}</span>
                    </div>
                  </div>
                  <Download className="w-3.5 h-3.5 text-slate-400 hover:text-indigo-600" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Security Footer Note */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>End-to-end encrypted • DTU verified student network only</span>
      </div>

      {/* Floating New Chat Button */}
      <div className="sticky bottom-20 z-30 pt-2 flex justify-center">
        <button
          onClick={() => setShowNewChatModal(true)}
          className="py-3 px-6 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xl shadow-indigo-500/30 flex items-center gap-2 transition-transform active:scale-95"
        >
          <MessageSquare className="w-4 h-4" />
          <span>New Chat</span>
        </button>
      </div>

      {/* Active Chat Conversation Modal */}
      {activeChat && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full h-[520px] flex flex-col p-4 text-slate-900 shadow-2xl border border-slate-200">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${activeChat.avatarBg} font-bold text-xs flex items-center justify-center`}>
                  {activeChat.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{activeChat.name}</h4>
                  <span className="text-[10px] text-emerald-600 font-bold">● Active in session</span>
                </div>
              </div>
              <button onClick={() => setActiveChat(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-3">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender === 'You' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs ${
                    msg.sender === 'You'
                      ? 'bg-indigo-600 text-white rounded-br-none shadow-xs'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                  }`}>
                    {msg.sender !== 'You' && <div className="text-[9px] font-bold text-indigo-600 mb-0.5">{msg.sender}</div>}
                    <div>{msg.text}</div>
                    <div className="text-[8px] opacity-70 text-right mt-0.5">{msg.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Send Input */}
            <form onSubmit={handleSendMessage} className="pt-2 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                placeholder="Type a message or share formula..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
              <button
                type="submit"
                className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Chat Modal */}
      {showNewChatModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateChat} className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Start Study Group or Chat</h3>
              <button onClick={() => setShowNewChatModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Channel / Peer Name</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., Operating Systems Unit 4 Squad"
                  value={newChatName}
                  onChange={(e) => setNewChatName(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Channel Type</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewChatType('group')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      newChatType === 'group' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Study Group Hub
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewChatType('direct')}
                    className={`p-2 rounded-xl font-bold border transition-all ${
                      newChatType === 'direct' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Direct Peer
                  </button>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl mt-2"
              >
                Create Hub
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
