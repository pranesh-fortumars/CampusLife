'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Pin, 
  Download, 
  Bookmark, 
  Heart, 
  MessageSquare, 
  Share2, 
  CheckCircle2, 
  FileText, 
  Plus, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  Users, 
  Sparkles,
  Send,
  X
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function CommunityPage() {
  const { profile, posts, toggleLikePost, toggleBookmarkPost, createPost } = useApp();

  const [activeTab, setActiveTab] = useState<'feed' | 'clubs' | 'events' | 'study'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'notice' | 'coding' | 'doubt'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostCategory, setNewPostCategory] = useState<'notice' | 'coding' | 'doubt' | 'event'>('doubt');
  const [registeredHackCampus, setRegisteredHackCampus] = useState(false);
  const [reminderSet, setReminderSet] = useState(false);

  const filteredPosts = posts.filter(post => {
    if (selectedCategory === 'all') return true;
    return post.category === selectedCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;
    createPost(newPostContent.trim(), newPostCategory, newPostTitle.trim() || undefined);
    setNewPostContent('');
    setNewPostTitle('');
    setShowCreateModal(false);
  };

  const handleDownloadNoticePDF = () => {
    alert('Downloading MidSem_Exam_Schedule_Nov2024.pdf (340 KB) - Verified by Academic Affairs.');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Campus Hub Bar */}
      <div className="flex items-center justify-between bg-white rounded-2xl p-3 border border-slate-100 shadow-subtle">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-primary flex items-center justify-center font-bold">
            🎓
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
              North Campus Hub
            </span>
            <span className="text-xs font-bold text-slate-800">
              Hey Rahul, what&apos;s buzzing?
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 bg-indigo-50 text-primary font-bold text-xs rounded-xl flex items-center gap-1">
          ⚡ {profile.collegeShort}
        </span>
      </div>

      {/* Subnav Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        {[
          { id: 'feed', label: 'Feed' },
          { id: 'clubs', label: 'Clubs & Societies' },
          { id: 'events', label: 'Events & Fests' },
          { id: 'study', label: 'Study Groups' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-primary text-white shadow-sm shadow-indigo-200'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-primary text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All •
        </button>
        <button
          onClick={() => setSelectedCategory('notice')}
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
            selectedCategory === 'notice'
              ? 'bg-primary text-white font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          🏛️ Official Notices
        </button>
        <button
          onClick={() => setSelectedCategory('coding')}
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
            selectedCategory === 'coding'
              ? 'bg-primary text-white font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          💻 Coding &amp; Tech
        </button>
        <button
          onClick={() => setSelectedCategory('doubt')}
          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 transition-all ${
            selectedCategory === 'doubt'
              ? 'bg-primary text-white font-semibold'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          ❓ Peer Doubts
        </button>
      </div>

      {/* Community Feed Posts */}
      <div className="space-y-4">
        {/* Pinned Official Notice */}
        <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-subtle space-y-3 relative overflow-hidden">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-primary flex items-center justify-center font-bold">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h4 className="text-xs font-bold text-slate-900">
                    Dean of Academic Affairs
                  </h4>
                  <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-800 text-[9px] font-bold rounded flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified Notice
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                  Administrative Council • 2 hours ago
                </p>
              </div>
            </div>
            <Pin className="w-4 h-4 text-indigo-500 fill-indigo-500" />
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900 leading-snug">
              Mid-Semester Examination Schedule &amp; Room Allocations Released
            </h3>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              Exams commence from Nov 4th. Hall tickets available on the university student portal. Ensure minimum 75% attendance criteria is met before reporting to examination halls.
            </p>
          </div>

          {/* Connected Attendance Status Pill */}
          <div className="bg-indigo-50/70 border border-indigo-100/80 rounded-2xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-[11px] font-semibold text-slate-800">
                Your Overall Attendance: <strong>{profile.overallAttendance}%</strong>
              </span>
            </div>
            <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold rounded-full">
              SAFE
            </span>
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={handleDownloadNoticePDF}
              className="px-3.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-primary text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              Download PDF (340 KB)
            </button>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* HackCampus 2024 Post */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                ACM
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  ACM Student Chapter • <span className="text-primary">Coding Club</span>
                </h4>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  4 hours ago • Technical Society
                </p>
              </div>
            </div>
            <button className="text-slate-400 text-xs">•••</button>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            Registrations for <strong>HackCampus 2024</strong> are now live! 36-hour hackathon with cash prizes of <strong>₹50,000</strong> sponsored by tech partners. Themes include AI in Education, Fintech, and Smart Campus. 🚀
          </p>

          {/* Hackathon banner graphic */}
          <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format&fit=crop&q=80"
              alt="HackCampus"
              className="w-full h-36 object-cover opacity-80"
            />
            <div className="absolute top-2 left-2 flex gap-1.5">
              <span className="px-2 py-0.5 bg-amber-500 text-black text-[10px] font-black rounded-lg">
                🏆 ₹50,000 POOL
              </span>
              <span className="px-2 py-0.5 bg-purple-600 text-white text-[10px] font-bold rounded-lg">
                36 HOURS
              </span>
            </div>

            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white">
              <div>
                <p className="text-xs font-bold leading-tight">Nov 16-17 • Campus Auditorium</p>
                <p className="text-[10px] text-slate-300">Free Entry • Open to all branches</p>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  href="/community/events/hackcampus"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white border border-white/30 transition-all"
                >
                  Pass #8102 ↗
                </Link>
                <button
                  onClick={() => setRegisteredHackCampus(!registeredHackCampus)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    registeredHackCampus
                      ? 'bg-emerald-500 text-white'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-md'
                  }`}
                >
                  {registeredHackCampus ? 'Registered' : 'Register'}
                </button>
              </div>
            </div>
          </div>

          {/* Interactions */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-xs text-slate-500">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => toggleLikePost('post-2')} 
                className="flex items-center gap-1 hover:text-rose-600"
              >
                <Heart className="w-3.5 h-3.5" />
                142
              </button>
              <button className="flex items-center gap-1 hover:text-primary">
                <MessageSquare className="w-3.5 h-3.5" />
                28
              </button>
              <button className="flex items-center gap-1 hover:text-slate-800">
                <Share2 className="w-3.5 h-3.5" />
                45
              </button>
            </div>
            <div className="flex -space-x-1.5 overflow-hidden">
              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-slate-200 text-[9px] font-bold text-center leading-5">AK</span>
              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-indigo-200 text-[9px] font-bold text-center leading-5">SD</span>
              <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white bg-teal-200 text-[9px] font-bold text-center leading-5">+9</span>
            </div>
          </div>
        </div>

        {/* Peer Doubt Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80"
                alt="Priya Nair"
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-slate-900">Priya Nair</h4>
                  <span className="text-[10px] text-slate-400">(3rd Year CS-B)</span>
                </div>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  5 hours ago • <span className="text-primary font-medium">#DBMS #Assignments</span>
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[9px] font-bold rounded-md uppercase">
              Peer Doubt
            </span>
          </div>

          <p className="text-xs text-slate-700 leading-relaxed">
            Does anyone have previous year solved question papers for Prof. Roy&apos;s DBMS mid-term? Willing to share OS concurrency handwritten notes in return! 📝
          </p>

          {/* Attachment Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-primary" />
              <div>
                <p className="text-xs font-bold text-slate-800">OS_Concurrency_Notes_Unit3.pdf</p>
                <p className="text-[10px] text-slate-500">12 replies • 4 shared documents</p>
              </div>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <button className="px-3 py-1.5 bg-primary text-white text-xs font-semibold rounded-xl">
                Reply
              </button>
              <button className="px-3 py-1.5 bg-indigo-50 text-primary text-xs font-semibold rounded-xl">
                Share Notes
              </button>
            </div>
            <button className="text-slate-400 hover:text-slate-600 p-1">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Cultural Fest Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-4 space-y-2">
          <img
            src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80"
            alt="Aurora"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="relative z-10">
            <div className="flex items-center justify-between text-[10px]">
              <span className="px-2 py-0.5 bg-indigo-600 font-bold rounded uppercase">
                Annual Cultural Fest
              </span>
              <span className="text-slate-200 font-medium">Dec 8-10, 2024</span>
            </div>
            <h3 className="text-base font-black mt-2">
              Aurora &apos;24 — Unleash the Groove
            </h3>
            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-300">
                Early bird student passes opening Friday!
              </span>
              <button
                onClick={() => setReminderSet(!reminderSet)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                  reminderSet ? 'bg-emerald-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
              >
                {reminderSet ? 'Reminder Set ✓' : 'Set Reminder'}
              </button>
            </div>
          </div>
        </div>

        {/* Guidelines Card */}
        <div className="bg-white rounded-2xl p-3 border border-slate-100 shadow-subtle flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 text-slate-600">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Campus guidelines active. Keep threads supportive, academic &amp; respectful.</span>
          </div>
          <button className="text-primary font-bold hover:underline">Rules</button>
        </div>
      </div>

      {/* Floating Create Post Button */}
      <div className="pt-2 pb-2">
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-md shadow-indigo-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4" />
          Create Post / Ask Doubts
        </button>
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreatePost} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Campus Post &amp; Doubt</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <select
              value={newPostCategory}
              onChange={(e) => setNewPostCategory(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              <option value="doubt">❓ Peer Doubt</option>
              <option value="coding">💻 Coding &amp; Tech</option>
              <option value="event">🎉 Club Event</option>
              <option value="notice">🏛️ General Discussion</option>
            </select>
            <input
              type="text"
              placeholder="Title or Topic (optional)"
              value={newPostTitle}
              onChange={(e) => setNewPostTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <textarea
              rows={4}
              placeholder="Write your doubt, query, or share resource details..."
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Publish Post
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
