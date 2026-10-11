'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Home, 
  CalendarCheck2, 
  Users2, 
  TrendingUp, 
  User, 
  Search, 
  Bell, 
  GraduationCap,
  Sparkles,
  Plus,
  X,
  CheckCircle2,
  AlertCircle,
  Send,
  Bot
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export function ShellLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { profile, tasks, markTodayAllAttended, addTask, addExpense } = useApp();
  
  // Modals
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCopilot, setShowCopilot] = useState(false);
  const [copilotInput, setCopilotInput] = useState('');
  const [copilotMessages, setCopilotMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    {
      role: 'ai',
      text: "Hey Rahul! I'm your Campus Copilot. I can simulate your attendance, draft project outlines, summarize syllabus notes, or review your placement prep. How can I help today?"
    }
  ]);

  // Quick Action modal
  const [showActionModal, setShowActionModal] = useState<'attendance' | 'task' | 'expense' | null>(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseNote, setExpenseNote] = useState('');

  const getSubTitle = () => {
    if (pathname.includes('/track')) return 'Track';
    if (pathname.includes('/community')) return 'Community';
    if (pathname.includes('/growth')) return 'Growth';
    if (pathname.includes('/me')) return 'Me';
    return 'Home';
  };

  const handleSendCopilot = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!copilotInput.trim()) return;

    const userMsg = copilotInput.trim();
    setCopilotMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setCopilotInput('');

    // Contextual smart response based on current college situation
    setTimeout(() => {
      let aiReply = "Here is what I found for your semester record:";
      const lower = userMsg.toLowerCase();
      if (lower.includes('bunk') || lower.includes('attendance') || lower.includes('os')) {
        aiReply = `Your Operating Systems (CS-304) attendance is currently 74.2% (23/31). You must NOT bunk tomorrow's 09:15 AM lecture in LH-102! Attending tomorrow will push your attendance to 75.8% (above the 75.0% minimum debar mark). In contrast, DBMS is at 86.7% where you can safely bunk up to 3 lectures.`;
      } else if (lower.includes('placement') || lower.includes('interview') || lower.includes('resume')) {
        aiReply = `Your Placement Readiness is at 78% (Top 15% in DTU cohort). You have PhonePe Technical Round 1 coming up on Tuesday, Oct 29 at 04:30 PM. I recommend reviewing Concurrency in Go and Distributed Transactions since your resume highlights the SmartCampus Parking microservices capstone!`;
      } else if (lower.includes('exam') || lower.includes('mid-term') || lower.includes('notice')) {
        aiReply = `Dean of Academic Affairs released the Mid-Semester Exam schedule starting Nov 4th. Hall tickets require ≥75% attendance. Priority checklist has DBMS quiz prep due today!`;
      } else {
        aiReply = `I've analyzed your academic records for Semester 6. You have 3 classes remaining today, 2 pending assignments, and ₹420 spent today. Would you like me to help schedule your study hours for the DBMS quiz?`;
      }
      setCopilotMessages(prev => [...prev, { role: 'ai', text: aiReply }]);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between items-center sm:py-4">
      {/* Container simulating high-fidelity mobile application shell while remaining completely responsive */}
      <div className="w-full max-w-[440px] min-h-screen sm:min-h-[920px] bg-slate-50 sm:shadow-2xl sm:rounded-[36px] flex flex-col relative overflow-hidden border border-slate-200/80">
        
        {/* Top App Header */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 py-3 border-b border-slate-100 flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-md shadow-indigo-200">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 text-base leading-tight tracking-tight flex items-center gap-1.5">
                CampusLife
              </div>
              <div className="text-[11px] font-medium text-slate-500 leading-none">
                {getSubTitle()}
              </div>
            </div>
          </Link>

          {/* Top action icons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSearch(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 stroke-[2.2]" />
            </button>
            
            <button 
              onClick={() => setShowNotifications(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5 stroke-[2.2]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
            </button>

            <Link href="/me" className="relative ml-1">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/30"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
            </Link>
          </div>
        </header>

        {/* Main Scrollable Content */}
        <main className="flex-1 pb-24 overflow-y-auto">
          {children}
        </main>

        {/* Floating Copilot AI Button */}
        <button
          onClick={() => setShowCopilot(true)}
          className="fixed sm:absolute bottom-20 right-4 z-30 p-3 bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-full shadow-lg shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-semibold"
          title="Open Campus Copilot"
        >
          <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="hidden xs:inline">Copilot</span>
        </button>

        {/* Bottom 5-Tab Navigation Bar */}
        <nav className="fixed sm:absolute bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-100 px-3 py-2 flex items-center justify-around">
          <Link
            href="/home"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              pathname === '/home' || pathname === '/'
                ? 'text-primary font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-[10px]">Home</span>
          </Link>

          <Link
            href="/track"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              pathname.startsWith('/track')
                ? 'text-primary font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <CalendarCheck2 className="w-5 h-5" />
            <span className="text-[10px]">Track</span>
          </Link>

          <Link
            href="/community"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              pathname.startsWith('/community')
                ? 'text-primary font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users2 className="w-5 h-5" />
            <span className="text-[10px]">Community</span>
          </Link>

          <Link
            href="/growth"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              pathname.startsWith('/growth')
                ? 'text-primary font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <TrendingUp className="w-5 h-5" />
            <span className="text-[10px]">Growth</span>
          </Link>

          <Link
            href="/me"
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-all ${
              pathname.startsWith('/me')
                ? 'text-primary font-semibold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px]">Me</span>
          </Link>
        </nav>

        {/* Global Search Modal */}
        {showSearch && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm p-4 flex flex-col justify-start">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col gap-3 mt-8">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-sm text-slate-800">Quick Campus Search</span>
                <button onClick={() => setShowSearch(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search subjects, notes, events, peers, hackathons..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl text-xs text-slate-800 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Popular Searches</p>
                <div className="flex flex-wrap gap-1.5">
                  {['Operating Systems', 'DBMS Quiz', 'HackCampus 2024', 'PhonePe Interview', 'TechKriti'].map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Notification Center Modal */}
        {showNotifications && (
          <div className="absolute inset-0 z-50 bg-slate-900/40 backdrop-blur-sm p-4 flex flex-col">
            <div className="bg-white rounded-2xl p-4 shadow-xl border border-slate-100 flex flex-col gap-3 mt-8 max-h-[80%] overflow-y-auto">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-sm text-slate-800">Notifications & Alerts</span>
                <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2.5">
                <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex gap-3">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-rose-900">Low Attendance Warning</p>
                    <p className="text-[11px] text-rose-700 mt-0.5">Operating Systems is at 74.2%. Attend tomorrow at 09:15 AM to avoid exam debarment.</p>
                  </div>
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl flex gap-3">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-indigo-900">Mid-Sem Schedule Published</p>
                    <p className="text-[11px] text-indigo-700 mt-0.5">Dean of Academic Affairs released dates starting Nov 4th. Download PDF on Community tab.</p>
                  </div>
                </div>
                <div className="p-3 bg-teal-50 border border-teal-100 rounded-xl flex gap-3">
                  <TrendingUp className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-semibold text-teal-900">Placement Assessment Due</p>
                    <p className="text-[11px] text-teal-700 mt-0.5">Zomato SDE Intern HackerRank test closes in 19 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campus Copilot AI Modal */}
        {showCopilot && (
          <div className="absolute inset-0 z-50 bg-slate-900/50 backdrop-blur-sm p-3 flex flex-col justify-end">
            <div className="bg-white rounded-3xl p-4 shadow-2xl border border-slate-200 flex flex-col max-h-[85vh] h-[580px]">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900">Campus Copilot AI</p>
                    <p className="text-[10px] text-emerald-600 font-medium">● Connected with DTU Sem 6 Context</p>
                  </div>
                </div>
                <button onClick={() => setShowCopilot(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Stream */}
              <div className="flex-1 overflow-y-auto py-3 space-y-3">
                {copilotMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-indigo-600 text-white rounded-br-none shadow-sm'
                          : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="py-2 flex gap-1.5 overflow-x-auto no-scrollbar">
                {[
                  "Can I bunk OS class tomorrow?",
                  "Prepare for PhonePe interview",
                  "Summarize DBMS quiz topics"
                ].map((sug, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCopilotInput(sug);
                    }}
                    className="shrink-0 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-[10px] rounded-full font-medium"
                  >
                    {sug}
                  </button>
                ))}
              </div>

              {/* Input field */}
              <form onSubmit={handleSendCopilot} className="pt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Copilot anything..."
                  value={copilotInput}
                  onChange={(e) => setCopilotInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
