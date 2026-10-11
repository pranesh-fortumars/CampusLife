'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Bot, 
  Sparkles, 
  Send, 
  ArrowLeft, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  AlertTriangle, 
  BookOpen, 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Paperclip, 
  Mic, 
  CheckCircle2, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function CampusCopilotScreen() {
  const { profile } = useApp();

  const [inputMsg, setInputMsg] = useState('');
  const [messages, setMessages] = useState<Array<{
    id: string;
    role: 'user' | 'assistant';
    time: string;
    text?: string;
    isCustomAfternoonLayout?: boolean;
  }>>([
    {
      id: 'msg-1',
      role: 'user',
      time: '12:38 PM',
      text: 'What is my plan for this afternoon, and can I afford to skip the 2:45 PM Agile lab?'
    },
    {
      id: 'msg-2',
      role: 'assistant',
      time: '12:38 PM',
      isCustomAfternoonLayout: true
    }
  ]);

  const [reminderSet, setReminderSet] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMsg.trim()) return;

    const userText = inputMsg.trim();
    setInputMsg('');

    const newMsgId = `usr-${Date.now()}`;
    setMessages(prev => [
      ...prev,
      { id: newMsgId, role: 'user', time: 'Just now', text: userText }
    ]);

    setTimeout(() => {
      let aiText = "I've analyzed your academic timetable and attendance thresholds.";
      const lower = userText.toLowerCase();

      if (lower.includes('bunk') || lower.includes('attendance') || lower.includes('skip')) {
        aiText = `Your Software Engineering attendance is 90.0% (27/30). Skipping drops it to 87.1% (27/31), which is still +12.1% above the 75% threshold. However, today is an in-person Sprint 2 Retro evaluation accounting for 10% Continuous Internal marks!`;
      } else if (lower.includes('dbms') || lower.includes('quiz')) {
        aiText = `For DBMS, focus on Relational Calculus and B+ Tree indexing. Your Problem Set is due tomorrow at 11:59 PM. I suggest reserving 2 hours after your 4:45 PM lab today.`;
      }

      setMessages(prev => [
        ...prev,
        { id: `ai-${Date.now()}`, role: 'assistant', time: 'Just now', text: aiText }
      ]);
    }, 600);
  };

  return (
    <div className="p-4 space-y-4 flex flex-col min-h-screen justify-between">
      <div className="space-y-4">
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary to-secondary text-white flex items-center justify-center shadow-md shadow-indigo-200">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-sm font-bold text-slate-900">Campus Copilot</h2>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">
                  Rahul&apos;s Personal Academic Mode...
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[10px] font-bold rounded-full flex items-center gap-1">
              ⚡ ONLINE
            </span>
          </div>

          {/* Live Context Badge */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-2.5 flex items-center gap-2 text-xs text-indigo-950 font-semibold">
            <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
            <span className="truncate">
              Live Context: Sem 6 • CS Dept • 81.4% Overall ...
            </span>
          </div>
        </div>

        {/* Suggested Queries Header & Pills */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-bold text-slate-400 uppercase tracking-wider">
              Suggested Queries
            </span>
            <span className="text-primary font-bold flex items-center gap-1 cursor-pointer">
              🎯 Tap to run
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-0.5">
            <button
              onClick={() => {
                setInputMsg('Plan study routine for DBMS');
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-semibold whitespace-nowrap shadow-2xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              ⚡ Plan study routine for DBMS
            </button>
            <button
              onClick={() => {
                setInputMsg('Can I safely miss tomorrow OS class?');
              }}
              className="px-3 py-1.5 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-semibold whitespace-nowrap shadow-2xs hover:bg-slate-50 flex items-center gap-1.5"
            >
              🎯 Can I safely miss...
            </button>
          </div>
        </div>

        {/* Chat Stream */}
        <div className="space-y-4">
          {messages.map((msg) => {
            if (msg.role === 'user') {
              return (
                <div key={msg.id} className="flex flex-col items-end space-y-1">
                  <div className="flex items-end gap-2 max-w-[90%]">
                    <div className="bg-primary text-white rounded-3xl rounded-br-sm p-3.5 text-xs font-medium leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                    <span className="w-6 h-6 rounded-full bg-indigo-100 text-primary text-[10px] font-black flex items-center justify-center shrink-0">
                      R
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium mr-8 flex items-center gap-1">
                    {msg.time} <span className="text-primary">✓✓</span>
                  </span>
                </div>
              );
            }

            if (msg.isCustomAfternoonLayout) {
              return (
                <div key={msg.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-xs font-bold text-slate-900">
                      Here is your afternoon layout:
                    </h3>
                  </div>

                  {/* Afternoon Schedule Box */}
                  <div className="space-y-2 bg-indigo-50/40 p-3 rounded-2xl border border-indigo-100/60 text-xs">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-primary" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">1:15 PM</span>
                          <span className="px-1.5 py-0.2 bg-slate-200 text-slate-700 text-[9px] font-bold rounded">
                            L-214
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Computer Networks Lecture (Prof. Rao)
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1 border-t border-indigo-100/50">
                      <Clock className="w-4 h-4 text-purple-600" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-slate-900">2:45 PM – 4:45 PM</span>
                          <span className="px-1.5 py-0.2 bg-purple-200 text-purple-800 text-[9px] font-bold rounded">
                            Lab 2
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5">
                          Software Engineering Agile Lab
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Attendance Check: Software Eng. */}
                  <div className="bg-indigo-50/60 rounded-3xl p-4 border border-indigo-100 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-xs font-bold text-slate-900">
                          Attendance Check: Software Eng.
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-bold rounded-full">
                        Safe Buffer
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-primary">
                          90.0%
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          (27/30 held)
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-400 block">Post-skip:</span>
                        <span className="text-xs font-bold text-purple-700">
                          87.1% (27/31)
                        </span>
                      </div>
                    </div>

                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full" style={{ width: '90%' }} />
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-slate-500">
                      <span className="font-semibold text-emerald-700">
                        Safe buffer: +12.1% above 75.0% threshold
                      </span>
                      <span>Min: 75%</span>
                    </div>
                  </div>

                  {/* High Evaluation Impact Alert */}
                  <div className="bg-rose-50/80 border border-rose-200/80 rounded-3xl p-3.5 space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                      <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>High Evaluation Impact</span>
                    </div>
                    <p className="text-[11px] text-slate-700 leading-relaxed">
                      Prof. <strong>Neha Gupta</strong> is evaluating the <strong>Sprint 2 Retro submission</strong> today in person (accounts for 10% Continuous Internal marks).
                    </p>
                    <p className="text-[11px] font-bold text-rose-700 pt-0.5">
                      Recommendation: Attend today&apos;s lab to secure internal grading marks!
                    </p>
                  </div>

                  {/* Quick Action Buttons */}
                  <div className="space-y-2 pt-1">
                    <button
                      onClick={() => {
                        setReminderSet(!reminderSet);
                        alert(reminderSet ? 'Reminder removed' : 'Sprint 2 Reminder set for 2:30 PM!');
                      }}
                      className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                        reminderSet ? 'bg-emerald-600 text-white' : 'bg-primary text-white shadow-sm'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" />
                      {reminderSet ? 'Reminder Set for 2:30 PM ✓' : 'Set Sprint 2 Reminder'}
                    </button>

                    <Link
                      href="/track"
                      className="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      View SE Attendance
                    </Link>

                    <Link
                      href="/track/assignments"
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      Open Lab Notes
                    </Link>
                  </div>

                  {/* Feedback footer */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px] text-slate-400">
                    <span>12:38 PM • Academic Context Synced</span>
                    <div className="flex items-center gap-3">
                      <button className="hover:text-slate-600"><ThumbsUp className="w-3 h-3" /></button>
                      <button className="hover:text-slate-600"><ThumbsDown className="w-3 h-3" /></button>
                      <button className="hover:text-slate-600"><Share2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <div key={msg.id} className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Campus Copilot</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {msg.text}
                </p>
                <span className="text-[10px] text-slate-400 block pt-1 border-t border-slate-50">
                  {msg.time} • AI Assistant
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimer & Bottom Chat Dock */}
      <div className="pt-3 pb-1 space-y-2">
        <div className="bg-indigo-50/50 rounded-2xl p-2 flex items-center gap-2 text-[10px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-primary shrink-0" />
          <span>Campus Copilot provides intelligent estimates based on local logs &amp; syllabus rules.</span>
        </div>

        {/* Chat Form */}
        <form onSubmit={handleSend} className="flex items-center gap-2 bg-white p-1.5 rounded-3xl border border-slate-200 shadow-sm">
          <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
            <Paperclip className="w-4 h-4" />
          </button>
          
          <input
            type="text"
            placeholder="Ask Copilot about courses, attendance, exams..."
            value={inputMsg}
            onChange={(e) => setInputMsg(e.target.value)}
            className="flex-1 bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none px-1"
          />

          <button type="button" className="p-2 text-slate-400 hover:text-slate-600">
            <Mic className="w-4 h-4" />
          </button>

          <button
            type="submit"
            className="p-2.5 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-sm transition-transform active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
