'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar as CalendarIcon, 
  Grid, 
  List, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  RefreshCw, 
  ArrowRightLeft, 
  ShieldCheck, 
  Plus, 
  Coffee,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function TimetablePage() {
  const { profile, markSubjectAttendance } = useApp();

  const [activeView, setActiveView] = useState<'day' | 'week' | 'agenda'>('day');
  const [selectedDay, setSelectedDay] = useState(24); // Oct 24 (Thursday)
  const [dbmsMarked, setDbmsMarked] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [syncedGCal, setSyncedGCal] = useState(false);

  const daysOfWeek = [
    { dayName: 'Mon', date: 21 },
    { dayName: 'Tue', date: 22 },
    { dayName: 'Wed', date: 23 },
    { dayName: 'Thu', date: 24, isToday: true },
    { dayName: 'Fri', date: 25 },
    { dayName: 'Sat', date: 26 },
  ];

  const handleMarkDBMS = () => {
    markSubjectAttendance('sub-1', 'present');
    setDbmsMarked(true);
  };

  const handleSyncGCal = () => {
    setSyncedGCal(true);
    setTimeout(() => {
      alert('Timetable synced successfully with your Google Calendar!');
    }, 600);
  };

  return (
    <div className="p-4 space-y-4">
      {/* View Switcher Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setActiveView('day')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'day'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          Day View
        </button>

        <button
          onClick={() => setActiveView('week')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'week'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
          Week Grid
        </button>

        <button
          onClick={() => setActiveView('agenda')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeView === 'agenda'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <List className="w-3.5 h-3.5" />
          Agenda
        </button>
      </div>

      {/* Week Header & Day Picker */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-900">
          <div className="flex items-center gap-1.5">
            <span>Odd Semester W9</span>
            <span className="px-2 py-0.5 bg-indigo-100 text-primary rounded-full text-[10px]">
              WEEK 9
            </span>
          </div>
          <span className="text-slate-400 font-medium">October 2024</span>
        </div>

        {/* Horizontal Calendar Day Strip */}
        <div className="grid grid-cols-6 gap-2">
          {daysOfWeek.map((d) => (
            <button
              key={d.date}
              onClick={() => setSelectedDay(d.date)}
              className={`py-2 px-1 rounded-2xl flex flex-col items-center justify-center transition-all ${
                selectedDay === d.date
                  ? 'bg-primary text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-700 border border-slate-100 hover:bg-slate-50'
              }`}
            >
              <span className={`text-[10px] font-medium ${selectedDay === d.date ? 'text-indigo-200' : 'text-slate-400'}`}>
                {d.dayName}
              </span>
              <span className="text-sm font-black mt-0.5">
                {d.date}
              </span>
              <span className={`w-1 h-1 rounded-full mt-1 ${selectedDay === d.date ? 'bg-white' : 'bg-slate-300'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* In Session Right Now Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-4 shadow-lg shadow-indigo-200 space-y-1.5">
        <div className="flex items-center justify-between">
          <span className="px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-300 animate-pulse"></span>
            IN SESSION RIGHT NOW
          </span>
          <span className="px-2 py-0.5 bg-white/10 rounded-full text-[10px] font-medium">
            32 mins left
          </span>
        </div>

        <h3 className="text-sm font-bold pt-1">
          DBMS: Normalization &amp; Indexing
        </h3>

        <div className="flex items-center gap-3 text-xs text-indigo-100 pt-0.5">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            10:30 – 11:45 AM
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            CS Lab 304 (3rd Floor)
          </span>
        </div>
      </div>

      {/* Thursday Schedule List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Thursday Schedule</h4>
          <span className="text-[10px] font-medium text-slate-400">
            4 Classes • 1 Lab • 1 Break
          </span>
        </div>

        <div className="space-y-3 relative before:absolute before:left-14 before:top-4 before:bottom-4 before:w-0.5 before:bg-slate-200">
          
          {/* Lecture 1: 09:00 - Operating Systems */}
          <div className="flex items-start gap-4 relative">
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-slate-900 block">09:00</span>
              <span className="text-[10px] text-slate-400 block">10:15</span>
              <span className="inline-block w-2 h-2 rounded-full bg-teal-500 mt-2 ring-4 ring-white" />
            </div>

            <div className="flex-1 bg-white rounded-3xl p-3.5 border-l-4 border-l-teal-500 border border-slate-100 shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded">
                    CS-304
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    4 Credits
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Attended
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-900">
                Operating Systems
              </h5>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                <div className="flex items-center gap-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                    alt="Prof Muralidhar"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Prof. K. Muralidhar</span>
                </div>
                <span className="flex items-center gap-1">
                  🏛️ LH-102
                </span>
              </div>
            </div>
          </div>

          {/* Lecture 2: 10:30 - DBMS (LIVE NOW) */}
          <div className="flex items-start gap-4 relative">
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-primary block">10:30</span>
              <span className="text-[10px] text-primary/70 block">11:45</span>
              <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 ring-4 ring-white animate-ping" />
            </div>

            <div className="flex-1 bg-white rounded-3xl p-3.5 border-l-4 border-l-primary border border-slate-100 shadow-subtle space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded">
                    CS-302
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    3 Credits
                  </span>
                </div>
                <span className="px-2.5 py-0.5 bg-primary text-white text-[10px] font-bold rounded-full animate-pulse">
                  ● LIVE NOW
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-900">
                Database Management Systems
              </h5>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80"
                    alt="Dr. Ananya Roy"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Dr. Ananya Roy</span>
                </div>
                <span>🧪 CS Lab 304</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={handleMarkDBMS}
                  disabled={dbmsMarked}
                  className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    dbmsMarked
                      ? 'bg-emerald-600 text-white'
                      : 'bg-primary hover:bg-primary-dark text-white shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {dbmsMarked ? 'Attended ✓' : 'Mark Attendance'}
                </button>
                <Link
                  href="/track/assignments"
                  className="py-2 px-3 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Take Notes
                </Link>
              </div>
            </div>
          </div>

          {/* Break: 12:00 - Lunch Break & Canteen */}
          <div className="flex items-start gap-4 relative">
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-slate-500 block">12:00</span>
              <span className="text-[10px] text-slate-400 block">01:00</span>
              <span className="inline-block w-2 h-2 rounded-full bg-slate-300 mt-2 ring-4 ring-white" />
            </div>

            <div className="flex-1 bg-indigo-50/50 rounded-3xl p-3 border border-indigo-100/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-white text-slate-600 flex items-center justify-center shadow-xs">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Lunch Break &amp; Canteen</h5>
                  <p className="text-[10px] text-slate-500">Auditorium Cafeteria • 60 mins</p>
                </div>
              </div>
              <Link href="/track/expenses" className="text-xs font-bold text-primary hover:underline">
                Menu
              </Link>
            </div>
          </div>

          {/* Lecture 3: 01:15 - Computer Networks */}
          <div className="flex items-start gap-4 relative">
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-slate-900 block">01:15</span>
              <span className="text-[10px] text-slate-400 block">02:30</span>
              <span className="inline-block w-2 h-2 rounded-full bg-indigo-400 mt-2 ring-4 ring-white" />
            </div>

            <div className="flex-1 bg-white rounded-3xl p-3.5 border-l-4 border-l-indigo-400 border border-slate-100 shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded">
                    CS-306
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    4 Credits
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">
                  Upcoming
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-900">
                Computer Networks
              </h5>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-purple-200 text-[9px] font-bold flex items-center justify-center text-purple-800">
                    RV
                  </span>
                  <span>Dr. R. Venkat</span>
                </div>
                <span>🏛️ Room 214</span>
              </div>
            </div>
          </div>

          {/* Lecture 4: 02:45 - SE Agile Lab Practicum */}
          <div className="flex items-start gap-4 relative">
            <div className="w-10 text-right shrink-0">
              <span className="text-xs font-bold text-slate-900 block">02:45</span>
              <span className="text-[10px] text-slate-400 block">04:45</span>
              <span className="inline-block w-2 h-2 rounded-full bg-purple-500 mt-2 ring-4 ring-white" />
            </div>

            <div className="flex-1 bg-white rounded-3xl p-3.5 border-l-4 border-l-purple-500 border border-slate-100 shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded">
                    CS-308
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    2 Credits • 2 Hours
                  </span>
                </div>
                <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">
                  Upcoming
                </span>
              </div>

              <h5 className="text-xs font-bold text-slate-900">
                SE Agile Lab Practicum
              </h5>

              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1.5">
                  <img
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80"
                    alt="Prof Neha Gupta"
                    className="w-4 h-4 rounded-full object-cover"
                  />
                  <span>Prof. Neha Gupta</span>
                </div>
                <span>🖥️ Lab 2 (Software Wing)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Row */}
      <div className="grid grid-cols-2 gap-2 pt-2">
        <button
          onClick={() => setShowSwapModal(true)}
          className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <ArrowRightLeft className="w-3.5 h-3.5 text-primary" />
          Swap / Extra Class
        </button>

        <button
          onClick={handleSyncGCal}
          className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${syncedGCal ? 'animate-spin' : ''}`} />
          {syncedGCal ? 'Synced to G-Cal' : 'Sync G-Calendar'}
        </button>
      </div>

      {/* Daily Attendance Target Card */}
      <div className="bg-indigo-50/60 border border-indigo-100 rounded-3xl p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-slate-900">Daily Attendance Target</h5>
            <p className="text-[10px] text-slate-500">On track for 88.5% aggregate</p>
          </div>
        </div>
        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full">
          SAFE
        </span>
      </div>

      {/* Swap Modal */}
      {showSwapModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Schedule Extra or Compensatory Class</h4>
            <p className="text-xs text-slate-600">Add an adjusted class session or CR reschedule request for Section B.</p>
            <input
              type="text"
              placeholder="e.g. Operating Systems Extra Session (LH-102)"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowSwapModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert('Extra session scheduled on timetable!');
                  setShowSwapModal(false);
                }}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl"
              >
                Confirm Slot
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
