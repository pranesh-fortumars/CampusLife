'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  BookOpen, 
  FileText, 
  CheckSquare, 
  IndianRupee, 
  AlertTriangle, 
  ArrowRight, 
  Calendar,
  Users,
  Sparkles,
  Plus,
  Check,
  ChevronRight,
  TrendingUp,
  Receipt
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function HomePage() {
  const { 
    profile, 
    tasks, 
    subjects, 
    toggleTask, 
    markSubjectAttendance, 
    markTodayAllAttended, 
    addTask,
    addExpense 
  } = useApp();

  const [dbmsMarked, setDbmsMarked] = useState(false);
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [newTaskInput, setNewTaskInput] = useState('');
  const [expenseAmountInput, setExpenseAmountInput] = useState('');
  const [expenseCategoryInput, setExpenseCategoryInput] = useState('Canteen');
  const [registeredHackathon, setRegisteredHackathon] = useState(false);
  const [joinedAlgoClub, setJoinedAlgoClub] = useState(false);

  const pendingTasks = tasks.filter(t => !t.completed);

  const handleMarkDbms = () => {
    markSubjectAttendance('sub-1', 'present');
    setDbmsMarked(true);
  };

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;
    addTask(newTaskInput.trim(), 'tasks', 'URGENT');
    setNewTaskInput('');
    setShowAddTaskModal(false);
  };

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(expenseAmountInput);
    if (isNaN(amount) || amount <= 0) return;
    addExpense(amount, expenseCategoryInput);
    setExpenseAmountInput('');
    setShowAddExpenseModal(false);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Greeting Banner */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Good morning, Rahul 👋
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
            <span>📅 Thursday, 24 October</span>
            <span>•</span>
            <span>Semester 6</span>
          </p>
        </div>
        <div className="px-2.5 py-1 bg-emerald-50 border border-emerald-200 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-[11px] font-bold text-emerald-700">
            {profile.overallAttendance}% SAFE
          </span>
        </div>
      </div>

      {/* Next Class / Class In Session Hero Card */}
      <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm shadow-indigo-50/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/60 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
        
        <div className="flex items-center justify-between mb-2.5">
          <span className="px-2.5 py-0.5 bg-indigo-50 text-indigo-700 font-semibold text-[11px] rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-ping"></span>
            Starts in 22 mins
          </span>
          <span className="text-[11px] font-medium text-slate-400">
            Lecture 2 of 4
          </span>
        </div>

        <h2 className="text-base font-bold text-slate-900 leading-snug">
          Database Management Systems (DBMS)
        </h2>

        <div className="mt-2 space-y-1 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>10:30 AM – 11:45 AM</span>
            <span className="text-slate-300">•</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>CS Lab 304, Block B</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[11px]">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <span>Dr. Ananya Roy • Dept. of CSE</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <button
            onClick={handleMarkDbms}
            disabled={dbmsMarked}
            className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-sm ${
              dbmsMarked
                ? 'bg-emerald-600 text-white shadow-emerald-200'
                : 'bg-primary hover:bg-primary-dark text-white shadow-indigo-200 active:scale-98'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {dbmsMarked ? 'Attendance Recorded (27/31)' : 'Mark Attended'}
          </button>
          
          <Link
            href="/track"
            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors"
            title="View Timetable"
          >
            <Calendar className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* 4 Quick Stat Metric Cards */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Classes Today</span>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900 leading-tight">3 remaining</div>
            <div className="text-[10px] text-slate-400 font-medium">1 completed</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Assignments</span>
            <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-rose-600 leading-tight">2 pending</div>
            <div className="text-[10px] text-rose-500 font-medium">1 urgent due 5 PM</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Tasks & Prep</span>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <CheckSquare className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900 leading-tight">{pendingTasks.length} to-do</div>
            <div className="text-[10px] text-slate-400 font-medium">2 high priority</div>
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-slate-500">Day Expenses</span>
            <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg">
              <Receipt className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="mt-2">
            <div className="text-lg font-bold text-slate-900 leading-tight">₹{profile.expenseSpentToday} spent</div>
            <div className="text-[10px] text-slate-400 font-medium">Canteen + Printout</div>
          </div>
        </div>
      </div>

      {/* Academic Attendance Health Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border-2 border-primary border-t-transparent animate-spin-slow flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-primary" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Academic Attendance Health</h3>
              <p className="text-[10px] text-slate-400">Min. threshold: 75.0%</p>
            </div>
          </div>
          <span className="text-xl font-black text-indigo-700 tracking-tight">
            {profile.overallAttendance}%
          </span>
        </div>

        {/* Attendance progress bar */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-slate-100 rounded-full relative overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(profile.overallAttendance, 100)}%` }}
            />
            {/* 75% red marker */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-rose-500 z-10" 
              style={{ left: '75%' }}
              title="75% Debarment threshold"
            />
          </div>
        </div>

        {/* Debarment / Low Attention warning box */}
        <div className="bg-rose-50/90 border border-rose-100 rounded-2xl p-3 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-[11px] leading-relaxed text-rose-900">
            <span className="font-bold">Operating Systems is at 74.2%</span>
            <p className="text-rose-700 mt-0.5">
              1 lecture below 75%. Attend tomorrow’s OS lecture at 09:15 AM to hit 75.8%.
            </p>
          </div>
        </div>

        <Link
          href="/track"
          className="text-xs font-semibold text-primary hover:text-indigo-800 flex items-center justify-center gap-1.5 pt-1 transition-colors"
        >
          View Subject-wise Attendance
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Priority Checklist */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-slate-800">Priority Checklist</h3>
          </div>
          <span className="text-[11px] font-medium text-slate-400">
            {pendingTasks.length} remaining
          </span>
        </div>

        <div className="space-y-2">
          {tasks.map(task => (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                task.completed
                  ? 'bg-slate-50/70 border-slate-200/50 opacity-60'
                  : 'bg-indigo-50/30 hover:bg-indigo-50/60 border-indigo-100/70'
              }`}
            >
              <div 
                className={`w-4 h-4 rounded border mt-0.5 flex items-center justify-center transition-colors ${
                  task.completed ? 'bg-primary border-primary text-white' : 'border-slate-300 bg-white'
                }`}
              >
                {task.completed && <Check className="w-3 h-3 stroke-[3]" />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold text-slate-800 ${task.completed ? 'line-through text-slate-400' : ''}`}>
                    {task.title}
                  </span>
                  {task.badgeText && !task.completed && (
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      task.badgeVariant === 'urgent'
                        ? 'bg-rose-500 text-white'
                        : task.badgeVariant === 'high'
                        ? 'bg-purple-600 text-white'
                        : task.badgeVariant === 'closing'
                        ? 'bg-sky-500 text-white'
                        : 'bg-slate-200 text-slate-700'
                    }`}>
                      {task.badgeText}
                    </span>
                  )}
                </div>
                {task.details && (
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    {task.details}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Campus Pulse Today */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-slate-800">Campus Pulse Today</h3>
          </div>
          <Link href="/community" className="text-[11px] font-semibold text-primary hover:underline">
            Explore All
          </Link>
        </div>

        {/* Hackathon Featured Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-subtle group">
          <div className="relative h-32 w-full bg-slate-900 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80"
              alt="TechKriti '24"
              className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white text-[10px]">
              <span className="px-2 py-0.5 bg-primary/90 font-medium rounded-md backdrop-blur-sm">
                Auditorium Main Hall
              </span>
              <span className="flex items-center gap-1 font-medium bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm">
                <Users className="w-3 h-3" />
                184 registered
              </span>
            </div>
          </div>

          <div className="p-3.5 space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-primary tracking-wide uppercase text-[10px]">
                Coding Club Exclusive
              </span>
              <span className="text-slate-400 font-medium">• Today at 4:00 PM</span>
            </div>

            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              TechKriti &apos;24: AI &amp; Robotics Hackathon
            </h4>

            <p className="text-[11px] text-slate-600 leading-relaxed">
              Cash prizes worth ₹40,000 + Internship fast-track with campus incubation cell.
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Free Entry
              </span>
              <button
                onClick={() => setRegisteredHackathon(true)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  registeredHackathon
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-indigo-50 hover:bg-indigo-100 text-primary'
                }`}
              >
                {registeredHackathon ? 'Registered ✓' : 'View Schedule'}
              </button>
            </div>
          </div>
        </div>

        {/* Algorithm Club Banner */}
        <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-800">Algorithm Problem Solvers</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">Meet at 3:30 PM • Library Room 2 (Dynamic Prog...)</p>
            </div>
          </div>
          <button
            onClick={() => setJoinedAlgoClub(!joinedAlgoClub)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
              joinedAlgoClub ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white hover:bg-slate-800'
            }`}
          >
            {joinedAlgoClub ? 'Joined' : 'Join'}
          </button>
        </div>
      </div>

      {/* Floating Bottom Action Dock */}
      <div className="sticky bottom-14 z-20 pt-2 pb-1 flex items-center gap-2">
        <button
          onClick={markTodayAllAttended}
          className="flex-1 py-2.5 px-3 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-lg shadow-indigo-300/40 text-xs font-bold flex items-center justify-center gap-1.5 active:scale-98 transition-all"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Mark Attendance
        </button>

        <button
          onClick={() => setShowAddTaskModal(true)}
          className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl shadow-sm text-xs font-semibold flex items-center gap-1 active:scale-98 transition-all"
        >
          <CheckSquare className="w-3.5 h-3.5 text-slate-500" />
          Add Task
        </button>

        <button
          onClick={() => setShowAddExpenseModal(true)}
          className="py-2.5 px-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl shadow-sm text-xs font-semibold flex items-center gap-1 active:scale-98 transition-all"
        >
          <IndianRupee className="w-3.5 h-3.5 text-slate-500" />
          Expense
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddTaskModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateTask} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add Priority Task</h3>
            <input
              type="text"
              placeholder="e.g., Read OS Concurrency Chapter 4"
              value={newTaskInput}
              onChange={(e) => setNewTaskInput(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddTaskModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Save Task
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Expense Modal */}
      {showAddExpenseModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateExpense} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Log College Expense</h3>
            <div className="space-y-2">
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Amount (₹)</label>
                <input
                  type="number"
                  placeholder="e.g. 150"
                  value={expenseAmountInput}
                  onChange={(e) => setExpenseAmountInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>
              <div>
                <label className="text-[10px] font-semibold text-slate-400 uppercase">Category</label>
                <select
                  value={expenseCategoryInput}
                  onChange={(e) => setExpenseCategoryInput(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="Canteen">Canteen / Mess</option>
                  <option value="Printout">Printout &amp; Xeroxing</option>
                  <option value="Books">Books &amp; Stationery</option>
                  <option value="Hostel">Hostel &amp; Commute</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddExpenseModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-teal-600 text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Add Expense
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
