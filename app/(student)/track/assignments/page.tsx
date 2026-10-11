'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Upload, 
  ChevronRight, 
  Plus, 
  Users, 
  ArrowRight, 
  Check, 
  ExternalLink,
  BookOpen,
  Filter
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function AssignmentsAndExamsPage() {
  const [activeSubTab, setActiveSubTab] = useState<'assignments' | 'exams'>('assignments');
  const [filterType, setFilterType] = useState<'all' | 'upcoming' | 'due' | 'submitted'>('all');
  const [submittedCN, setSubmittedCN] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const handleUploadFinal = () => {
    setSubmittedCN(true);
    alert('Computer Networks Lab Assignment 4 successfully submitted!');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Header Switcher Tabs */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setActiveSubTab('assignments')}
          className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'assignments'
              ? 'bg-primary text-white shadow-md shadow-indigo-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          Assignments (4)
        </button>

        <button
          onClick={() => setActiveSubTab('exams')}
          className={`py-2 px-3 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'exams'
              ? 'bg-primary text-white shadow-md shadow-indigo-200'
              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <CalendarIcon className="w-3.5 h-3.5" />
          Examinations (3)
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setFilterType('all')}
          className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
            filterType === 'all' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilterType('upcoming')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
            filterType === 'upcoming' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Upcoming <span className="text-[10px] bg-white/20 px-1 rounded-full">2</span>
        </button>
        <button
          onClick={() => setFilterType('due')}
          className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 transition-all ${
            filterType === 'due' ? 'bg-rose-500 text-white font-bold' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
          }`}
        >
          ● Due Soon <span className="text-[10px] bg-white/20 px-1 rounded-full">1</span>
        </button>
        <button
          onClick={() => setFilterType('submitted')}
          className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
            filterType === 'submitted' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          Submitted 5
        </button>
      </div>

      {/* Urgent Submission Banner */}
      <div className="bg-rose-50 border border-rose-200/80 rounded-3xl p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black text-rose-600 uppercase tracking-wider flex items-center gap-1">
            <Clock className="w-3 h-3" />
            URGENT SUBMISSION
          </span>
          <span className="px-2 py-0.5 bg-rose-500 text-white font-bold text-[10px] rounded-full">
            1h 45m left
          </span>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-snug">
            Computer Networks Lab Assignment 4
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Due Today • 5:00 PM • <span className="text-rose-600 font-semibold">In Progress</span>
          </p>
        </div>

        {/* Attachment Card */}
        <div className="bg-white border border-rose-100 rounded-2xl p-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            <div>
              <p className="font-bold text-slate-900 text-xs">packet_trace_wireshark.pcap</p>
              <p className="text-[10px] text-slate-400">4.2 MB • Saved draft</p>
            </div>
          </div>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>

        {/* Action Button */}
        <button
          onClick={handleUploadFinal}
          disabled={submittedCN}
          className={`w-full py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all ${
            submittedCN
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 hover:bg-rose-700 text-white active:scale-98'
          }`}
        >
          <Upload className="w-3.5 h-3.5" />
          {submittedCN ? 'Submitted & Locked ✓' : 'Upload Final Submission'}
        </button>
      </div>

      {/* Examination Schedule Box */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-4 space-y-3">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary flex items-center gap-1">
              <CalendarIcon className="w-3 h-3" />
              EXAMINATION SCHEDULE
            </span>
            <h4 className="text-sm font-bold text-slate-900 mt-1">
              Mid-Sem Exams start in 11 days
            </h4>
            <p className="text-[10px] text-slate-500 mt-0.5">
              Semester IV Theory Modules • Nov 4 - Nov 8
            </p>
          </div>
          <div className="p-2 bg-indigo-100 text-primary rounded-2xl">
            <CalendarIcon className="w-4 h-4" />
          </div>
        </div>

        {/* 3 Exam Date Cards */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-2 rounded-2xl border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">NOV 4</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">OS</span>
            <span className="text-[9px] text-slate-500">10:00 AM</span>
          </div>

          <div className="bg-white p-2 rounded-2xl border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">NOV 6</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">DBMS</span>
            <span className="text-[9px] text-slate-500">02:00 PM</span>
          </div>

          <div className="bg-white p-2 rounded-2xl border border-indigo-100/60 shadow-2xs">
            <span className="text-[10px] font-bold text-slate-400 block uppercase">NOV 8</span>
            <span className="text-xs font-black text-slate-900 block mt-0.5">CN</span>
            <span className="text-[9px] text-slate-500">10:00 AM</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <span className="text-[11px] text-slate-500 font-medium">
            Hall: Academic Block B (LH-302)
          </span>
          <Link
            href="/track"
            className="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]"
          >
            Open Exam Revision Plan <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Assignment Queue Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-xs font-bold text-slate-900">Assignment Queue</h4>
            <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
              3 active
            </span>
          </div>
          <button className="text-xs font-semibold text-slate-500 hover:text-slate-800 flex items-center gap-1">
            <Filter className="w-3 h-3" />
            Sort by Date
          </button>
        </div>

        {/* Card 1: DBMS Relational Calculus */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[9px] font-bold rounded uppercase">
                High Priority
              </span>
              <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[9px] font-bold rounded">
                10% Internal
              </span>
            </div>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 leading-snug">
              DBMS Relational Calculus &amp; B+ Trees Problem Set
            </h5>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
              <span>⏰ Tomorrow, Oct 25 • 11:59 PM</span>
              <span>•</span>
              <span>👨‍🏫 Dr. Ananya Roy</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-slate-600">
              <span className="font-medium">Progress Checklist</span>
              <span className="font-bold text-primary">3 of 5 questions completed</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '60%' }} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-50">
            <div className="flex items-center gap-1">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80"
                alt="Rahul"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-white"
              />
              <span className="text-[10px] text-slate-400 font-medium">+1</span>
            </div>
            <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-xl text-xs font-semibold flex items-center gap-1">
              Continue Working <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 2: OS Semaphore Synchronization Project */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[9px] font-bold rounded uppercase">
                Medium Priority
              </span>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-[9px] font-bold rounded">
                Group Lab (3)
              </span>
            </div>
            <Users className="w-4 h-4 text-slate-400" />
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 leading-snug">
              Operating Systems Semaphore Synchronization Project
            </h5>
            <p className="text-[10px] text-slate-500 mt-1">
              ⏰ Due: Oct 29 • 4 days left
            </p>
          </div>

          <div className="bg-slate-50 p-2.5 rounded-2xl flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                <span className="w-5 h-5 rounded-full bg-indigo-200 text-[8px] font-bold flex items-center justify-center text-primary">PR</span>
                <span className="w-5 h-5 rounded-full bg-teal-200 text-[8px] font-bold flex items-center justify-center text-teal-800">RH</span>
              </div>
              <span className="text-[11px] text-slate-700 font-medium">Priya &amp; Rohan</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Reviewing draft
            </span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-xs">
            <span className="text-[10px] text-slate-400 font-mono">
              Git repo: sync-semaphores-v2
            </span>
            <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-xl text-xs font-semibold flex items-center gap-1">
              Open Shared Workspace <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Card 3: Agile Sprint Retrospective & Jira Report */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-bold rounded uppercase">
                Normal Priority
              </span>
              <span className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[9px] font-bold rounded">
                Individual
              </span>
            </div>
            <FileText className="w-4 h-4 text-slate-400" />
          </div>

          <div>
            <h5 className="text-xs font-bold text-slate-900 leading-snug">
              Agile Sprint Retrospective &amp; Jira Report
            </h5>
            <p className="text-[10px] text-slate-500 mt-1">
              ⏰ Due: Nov 2 • 8 days left • Software Engineering
            </p>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-xs">
            <span className="text-[11px] text-slate-500">
              Template provided via LMS
            </span>
            <button className="px-3 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-xl text-xs font-semibold flex items-center gap-1">
              Start Assignment <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Add Assignment Button */}
      <div className="pt-2 pb-2">
        <button
          onClick={() => setShowNewModal(true)}
          className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-md shadow-indigo-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4" />
          New Assignment / Task
        </button>
      </div>

      {/* New Assignment Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <h4 className="text-sm font-bold text-slate-900">Add Academic Assignment</h4>
            <input
              type="text"
              placeholder="Assignment Title (e.g. Computer Networks Lab 5)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              autoFocus
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  alert(`Created assignment: ${newTitle}`);
                  setShowNewModal(false);
                }}
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
