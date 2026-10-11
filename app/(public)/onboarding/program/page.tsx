'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  User, 
  GraduationCap, 
  Building2, 
  Edit2, 
  CheckCircle2, 
  Award, 
  Laptop, 
  ChevronsUpDown, 
  CreditCard, 
  ChevronDown, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Users
} from 'lucide-react';

export default function AcademicProgramSelectionPage() {
  const router = useRouter();
  const [selectedSemester, setSelectedSemester] = useState('Sem 6');
  const [rollNumber, setRollNumber] = useState('21BCS084');
  const [classSection, setClassSection] = useState('Section B');
  const [syncMode, setSyncMode] = useState<'auto' | 'manual'>('auto');
  const [isEditingCollege, setIsEditingCollege] = useState(false);
  const [collegeName, setCollegeName] = useState('Delhi Technological University');

  const semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'];

  const handleContinue = () => {
    router.push('/verify');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center sm:py-6">
      <div className="w-full max-w-[440px] min-h-screen sm:min-h-[920px] bg-white sm:shadow-2xl sm:rounded-[36px] flex flex-col relative overflow-hidden border border-slate-200/80">
        
        {/* Top Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-20">
          <button 
            onClick={() => router.back()} 
            className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-sm font-semibold text-slate-800">Academic Program Selection</h2>
          <div className="flex items-center gap-3">
            <Link href="/home" className="text-xs font-semibold text-slate-600 hover:text-slate-900">
              Skip
            </Link>
            <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <User className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
          
          {/* Step Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-bold tracking-wider uppercase mb-1.5">
              <span className="text-indigo-600">STEP 2 OF 5</span>
              <span className="text-slate-500 font-semibold lowercase first-letter:uppercase">Academic Profile</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full w-[40%] transition-all duration-300"></div>
            </div>
          </div>

          {/* Title & Badge */}
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 border border-indigo-100/80 text-[11px] font-semibold text-indigo-700">
              <GraduationCap className="w-3.5 h-3.5" />
              Auto-ERP Sync Ready
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Connect your college &amp; program
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              Personalizes your semester timetable, ERP attendance sync, and department announcements.
            </p>
          </div>

          {/* University / College Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800">
              <span>University / College</span>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" />
                DTU Portal Linked
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100/80 text-indigo-700 flex items-center justify-center shrink-0">
                  <Building2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {collegeName}
                    </h3>
                    <button 
                      onClick={() => setIsEditingCollege(!isEditingCollege)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    Bawana Rd, Shahbad Daulatpur, New Delhi
                  </p>
                </div>
              </div>

              {/* College Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200/60 text-[10px] font-semibold">
                <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                  Code: DTU-DEL-04
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  Verified Campus
                </span>
                <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                  NAAC A+
                </span>
              </div>
            </div>
          </div>

          {/* Degree Program */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">Degree Program</label>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Award className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Bachelor of Technology (B.Tech)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Undergraduate • 4 Years Full Time
                  </div>
                </div>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Department / Major */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-800 block">Department / Major</label>
            <div className="flex items-center justify-between p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-slate-300 cursor-pointer transition-all">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                  <Laptop className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    Computer Science &amp; Engineering
                  </div>
                  <div className="text-[11px] text-slate-400">
                    School of Computing • Shift 1
                  </div>
                </div>
              </div>
              <ChevronsUpDown className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Current Semester */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Current Semester</span>
              <span className="text-[11px] font-semibold text-indigo-600 cursor-pointer hover:underline">
                Spring 2025 Cycle
              </span>
            </div>
            <div className="grid grid-cols-6 gap-1.5">
              {semesters.map((sem) => (
                <button
                  key={sem}
                  type="button"
                  onClick={() => setSelectedSemester(sem)}
                  className={`py-2 text-center rounded-xl text-xs font-bold transition-all border ${
                    selectedSemester === sem
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-200'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {sem}
                </button>
              ))}
            </div>
          </div>

          {/* Roll Number & Class Section */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Roll Number</label>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <CreditCard className="w-4 h-4 text-slate-500 shrink-0" />
                <input
                  type="text"
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value.toUpperCase())}
                  className="bg-transparent font-bold text-xs text-slate-900 w-full focus:outline-none tracking-wide"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 block">Class Section</label>
              <div className="flex items-center justify-between p-2.5 rounded-2xl bg-slate-50 border border-slate-200/80 cursor-pointer">
                <div>
                  <div className="font-bold text-xs text-slate-900 leading-tight">
                    {classSection}
                  </div>
                  <div className="text-[10px] font-semibold text-emerald-600">
                    CR eligible
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Timetable Configuration */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Timetable Configuration</span>
              <span className="text-[10px] font-bold text-indigo-600 tracking-wider uppercase">
                RECOMMENDED
              </span>
            </div>

            {/* Radio 1: Smart Sync */}
            <div
              onClick={() => setSyncMode('auto')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                syncMode === 'auto'
                  ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-300/40'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    syncMode === 'auto' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                  }`}>
                    {syncMode === 'auto' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Smart Sync via DTU ERP
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-600 text-[9px] font-bold text-white tracking-wider">
                      AUTO
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Directly fetches class schedules, lab rooms, and teacher assignments. Updated dynamically on holiday notifications.
                  </p>
                  <div className="pt-1 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>98% Match Rate • Instant Setup</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Radio 2: Manual */}
            <div
              onClick={() => setSyncMode('manual')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                syncMode === 'manual'
                  ? 'bg-indigo-50/60 border-indigo-300 ring-1 ring-indigo-300/40'
                  : 'bg-white border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    syncMode === 'manual' ? 'border-indigo-600 bg-indigo-600' : 'border-slate-300'
                  }`}>
                    {syncMode === 'manual' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <div>
                  <span className="text-xs font-bold text-slate-900">
                    Setup timetable manually
                  </span>
                  <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
                    Input lecture slots, subject codes, and custom batch groups yourself later.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Peers in CSE-B banner */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/5 border border-indigo-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-300">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">
                  348 DTU Peers in CSE-B
                </h4>
                <p className="text-[10px] text-slate-500 font-medium">
                  Class chat &amp; study pool unlocked upon completion
                </p>
              </div>
            </div>
            {/* Avatar Stack */}
            <div className="flex items-center -space-x-1.5 shrink-0">
              <div className="w-6 h-6 rounded-full bg-purple-200 text-purple-800 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                A
              </div>
              <div className="w-6 h-6 rounded-full bg-indigo-200 text-indigo-800 text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                R
              </div>
              <div className="w-6 h-6 rounded-full bg-cyan-400 text-slate-900 text-[9px] font-bold flex items-center justify-center ring-2 ring-white">
                +9
              </div>
            </div>
          </div>

          {/* Privacy Security Note */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <p className="text-[10px] leading-relaxed text-slate-500">
              Your official roll number is only visible to class reps and college authorities. Grades and attendance remain end-to-end encrypted.
            </p>
          </div>

          {/* CTA Button */}
          <div className="space-y-2 pt-1 pb-6">
            <button
              onClick={handleContinue}
              className="w-full py-3.5 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] text-white font-bold text-xs shadow-lg shadow-indigo-300/40 flex items-center justify-center gap-2 transition-all"
            >
              <span>Continue to Campus Interests</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-center">
              <Link href="/home" className="text-[11px] font-medium text-slate-400 hover:text-slate-600">
                Skip for now
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
