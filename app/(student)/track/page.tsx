'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  GraduationCap, 
  Calendar, 
  FileText, 
  ChevronDown, 
  RefreshCw, 
  Sliders, 
  Minus, 
  Plus, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Clock, 
  Filter, 
  Sparkles, 
  Settings,
  ChevronRight,
  ShieldCheck,
  X,
  ShoppingBag,
  Wallet
} from 'lucide-react';
import { useApp } from '@/lib/data/store';
import { 
  calculateAttendancePercentage, 
  calculateBunkAllowance, 
  calculateClassesNeededToReachTarget,
  simulateAttendance,
  getAttendanceStatus 
} from '@/lib/calculations/attendance';

export default function TrackPage() {
  const { profile, subjects, markSubjectAttendance, markTodayAllAttended } = useApp();
  
  // Track Subnav Tab
  const [activeSubTab, setActiveSubTab] = useState<'academics' | 'timetable' | 'assignments'>('academics');
  
  // Semester Switcher
  const [selectedSemester, setSelectedSemester] = useState(6);
  const [showSemDropdown, setShowSemDropdown] = useState(false);

  // What-If Simulator state
  const [simulatorSubjectId, setSimulatorSubjectId] = useState('sub-2'); // default Operating Systems
  const [consecutiveClasses, setConsecutiveClasses] = useState(3);
  const [isRefreshingERP, setIsRefreshingERP] = useState(false);

  // Subject logging modal
  const [selectedSubjectToLog, setSelectedSubjectToLog] = useState<string | null>(null);
  const [showManageModal, setShowManageModal] = useState(false);

  // Get active subject under test
  const subjectUnderTest = subjects.find(s => s.id === simulatorSubjectId) || subjects[1];
  
  const simResults = simulateAttendance(
    subjectUnderTest.attended,
    subjectUnderTest.total,
    consecutiveClasses
  );

  const handleERPRefresh = () => {
    setIsRefreshingERP(true);
    setTimeout(() => {
      setIsRefreshingERP(false);
    }, 800);
  };

  const handleLogAttendance = (status: 'present' | 'absent') => {
    if (!selectedSubjectToLog) return;
    markSubjectAttendance(selectedSubjectToLog, status);
    setSelectedSubjectToLog(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Subnav Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        <button
          onClick={() => setActiveSubTab('academics')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeSubTab === 'academics'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          Academics
        </button>

        <Link
          href="/track/timetable"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        >
          <Calendar className="w-3.5 h-3.5" />
          Timetable
        </Link>

        <Link
          href="/track/assignments"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        >
          <FileText className="w-3.5 h-3.5" />
          Assignments &amp; Exams
        </Link>

        <Link
          href="/track/marketplace"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          Marketplace
        </Link>

        <Link
          href="/track/expenses"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        >
          <Wallet className="w-3.5 h-3.5" />
          Expenses
        </Link>
      </div>

      {/* Main Academics Content */}
      {activeSubTab === 'academics' && (
        <>
          {/* Top Semester Summary Card */}
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3.5">
            <div className="flex items-center justify-between relative">
              <div>
                <span className="text-sm font-bold text-slate-900">
                  Semester {selectedSemester}
                </span>
                <span className="text-xs text-slate-400 font-medium ml-1.5">
                  • Spring 2024
                </span>
              </div>

              {/* Switch Semester dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSemDropdown(!showSemDropdown)}
                  className="flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary text-xs font-semibold rounded-xl transition-colors"
                >
                  Switch
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {showSemDropdown && (
                  <div className="absolute right-0 top-full mt-1.5 w-32 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-20">
                    {[1, 2, 3, 4, 5, 6].map(sem => (
                      <button
                        key={sem}
                        onClick={() => {
                          setSelectedSemester(sem);
                          setShowSemDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs ${
                          selectedSemester === sem ? 'font-bold text-primary bg-indigo-50' : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        Semester {sem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3 Metric Box Columns */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-indigo-50/50 p-2.5 rounded-2xl border border-indigo-100/60 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">CGPA</span>
                <span className="text-lg font-black text-indigo-700 block mt-0.5">8.64</span>
                <span className="text-[9px] text-slate-500 font-medium">Cumulative</span>
              </div>

              <div className="bg-indigo-50/50 p-2.5 rounded-2xl border border-indigo-100/60 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SGPA</span>
                <span className="text-lg font-black text-slate-900 block mt-0.5">8.78</span>
                <span className="text-[9px] text-slate-500 font-medium">Sem 5 Record</span>
              </div>

              <div className="bg-emerald-50/50 p-2.5 rounded-2xl border border-emerald-100/60 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">OVERALL ATT.</span>
                <span className="text-lg font-black text-emerald-700 block mt-0.5">{profile.overallAttendance}%</span>
                <span className="text-[9px] text-emerald-600 font-medium">Min 75.0% bar</span>
              </div>
            </div>

            {/* Verification subtext */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-50 text-[10px]">
              <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Self-tracked logs • ERP verified as of Oct 22</span>
              </div>
              <button
                onClick={handleERPRefresh}
                className="font-bold text-primary hover:underline flex items-center gap-1"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshingERP ? 'animate-spin' : ''}`} />
                ERP Refresh
              </button>
            </div>
          </div>

          {/* Attendance What-If Simulator Card */}
          <div className="bg-white rounded-3xl p-4 border border-indigo-100 shadow-sm shadow-indigo-50/60 space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-xl">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    Attendance What-If Simulator
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    Predict your margin before bunking or attending
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 bg-purple-100 text-purple-700 font-bold text-[10px] rounded-full">
                Interactive
              </span>
            </div>

            {/* Subject under test selector */}
            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/60 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">
                  Subject under test:
                </span>
                <select
                  value={simulatorSubjectId}
                  onChange={(e) => setSimulatorSubjectId(e.target.value)}
                  className="bg-transparent font-bold text-xs text-slate-900 border-none p-0 focus:outline-none cursor-pointer"
                >
                  {subjects.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.code})
                    </option>
                  ))}
                </select>
              </div>

              {/* Current percentage badge */}
              <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${
                calculateAttendancePercentage(subjectUnderTest.attended, subjectUnderTest.total) < 75
                  ? 'bg-rose-100 text-rose-700'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                {calculateAttendancePercentage(subjectUnderTest.attended, subjectUnderTest.total) < 75 && (
                  <AlertTriangle className="w-3 h-3 text-rose-600" />
                )}
                {calculateAttendancePercentage(subjectUnderTest.attended, subjectUnderTest.total)}% Current
              </div>
            </div>

            {/* Interactive Counter for Consecutive classes */}
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-semibold text-slate-700">
                Consecutive classes to attend:
              </span>
              <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
                <button
                  onClick={() => setConsecutiveClasses(Math.max(1, consecutiveClasses - 1))}
                  className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-sm flex items-center justify-center transition-transform active:scale-90"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center font-bold text-primary text-sm">
                  {consecutiveClasses}
                </span>
                <button
                  onClick={() => setConsecutiveClasses(consecutiveClasses + 1)}
                  className="w-7 h-7 bg-white hover:bg-slate-50 text-slate-700 rounded-lg shadow-sm flex items-center justify-center transition-transform active:scale-90"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Green Alert Box: If you attend next N classes */}
            <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="p-1 bg-emerald-500 text-white rounded-full mt-0.5">
                <TrendingUp className="w-3 h-3" />
              </div>
              <div className="text-[11px] leading-relaxed text-emerald-950">
                <span className="font-bold">
                  If you attend next {consecutiveClasses} classes:
                </span>
                <p className="text-emerald-800 mt-0.5">
                  Attendance rises to <strong className="font-bold text-emerald-900">{simResults.projectedAttendingPct}%</strong> {
                    simResults.crossesSafeZone ? '(Crosses safe zone threshold 75%)' : '(Still below 75% threshold)'
                  }
                </p>
              </div>
            </div>

            {/* Red Alert Box: If you bunk next class */}
            <div className="bg-rose-50/80 border border-rose-200/80 rounded-2xl p-3 flex items-start gap-2.5">
              <div className="p-1 bg-rose-500 text-white rounded-full mt-0.5">
                <AlertTriangle className="w-3 h-3" />
              </div>
              <div className="text-[11px] leading-relaxed text-rose-950">
                <span className="font-bold">
                  If you bunk next class: Drops to <strong className="font-bold text-rose-900">{simResults.projectedBunkingPct}%</strong>
                </span>
                <p className="text-rose-800 mt-0.5">
                  Requires {simResults.recoveryClassesNeededIfBunked || 2} consecutive attends to recover above minimum debar mark.
                </p>
              </div>
            </div>

            {/* Bottom note & Reset */}
            <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium pt-0.5">
              <span>Estimated calculation • Excludes official institutional waivers</span>
              <button
                onClick={() => setConsecutiveClasses(3)}
                className="font-bold text-primary hover:underline"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Enrolled Subjects Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">
                  Enrolled Subjects ({subjects.length})
                </h3>
                <p className="text-[10px] text-slate-400">
                  Semester 6 Theory &amp; Lab tracks
                </p>
              </div>
              <button className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-xs font-medium">
                <Filter className="w-3 h-3" />
                All
              </button>
            </div>

            {/* Subject List */}
            <div className="space-y-3">
              {subjects.map((subj) => {
                const pct = calculateAttendancePercentage(subj.attended, subj.total);
                const status = getAttendanceStatus(pct);
                const bunkCount = calculateBunkAllowance(subj.attended, subj.total, 75.0);
                const neededCount = calculateClassesNeededToReachTarget(subj.attended, subj.total, 75.0);

                return (
                  <div
                    key={subj.id}
                    className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {subj.code} • {subj.credits} CREDITS {subj.isElective ? '• ELECTIVE' : ''}
                        </span>
                        <Link 
                          href={subj.code.includes('302') || subj.name.toLowerCase().includes('database') ? '/track/subjects/dbms' : `/track/subjects/${subj.id}`}
                          className="text-sm font-bold text-slate-900 leading-snug hover:text-indigo-600 transition-colors flex items-center gap-1 group"
                        >
                          <span>{subj.name}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                        </Link>
                        <p className="text-[11px] text-slate-500 font-medium">
                          {subj.faculty}
                        </p>
                      </div>

                      {/* Status badge */}
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 ${status.badgeBg}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {status.label}
                      </span>
                    </div>

                    {/* Metric row */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          {pct}%
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          ({subj.attended} / {subj.total} attended)
                        </span>
                      </div>

                      {/* Can bunk or Needs attend pill */}
                      {pct >= 75 ? (
                        <span className="px-2.5 py-1 bg-teal-50 text-teal-800 text-[11px] font-semibold rounded-xl">
                          Can bunk {bunkCount} {bunkCount === 1 ? 'class' : 'classes'} {status.label === 'Borderline' ? 'safely' : ''}
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-rose-50 text-rose-800 text-[11px] font-semibold rounded-xl">
                          Needs {neededCount} attend to reach 75%
                        </span>
                      )}
                    </div>

                    {/* Progress bar */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          pct >= 88
                            ? 'bg-emerald-600'
                            : pct >= 80
                            ? 'bg-teal-600'
                            : pct >= 75
                            ? 'bg-indigo-600'
                            : 'bg-rose-600'
                        }`}
                        style={{ width: `${Math.min(pct, 100)}%` }}
                      />
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-50">
                      <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Next: {subj.nextSchedule}</span>
                      </div>
                      <button
                        onClick={() => setSelectedSubjectToLog(subj.id)}
                        className="font-bold text-primary hover:underline flex items-center gap-1 text-[11px]"
                      >
                        Log Record
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons at bottom of Track page */}
          <div className="space-y-2 pt-2 pb-2">
            <button
              onClick={markTodayAllAttended}
              className="w-full py-3 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-md shadow-indigo-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Mark Today&apos;s Attendance
            </button>

            <button
              onClick={() => setShowManageModal(true)}
              className="w-full py-2.5 bg-indigo-50/70 hover:bg-indigo-100 text-slate-700 border border-indigo-100 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-500" />
              Manage Subjects &amp; Thresholds
            </button>
          </div>
        </>
      )}

      {/* Timetable Subtab */}
      {activeSubTab === 'timetable' && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle">
            <h3 className="text-sm font-bold text-slate-900">Weekly Lecture Schedule</h3>
            <p className="text-xs text-slate-500 mt-1">Semester 6 • CS Section B</p>

            <div className="mt-4 space-y-2.5">
              {[
                { day: 'Thursday (Today)', slots: ['09:15 AM: Operating Systems (LH-102)', '10:30 AM: DBMS Lab (CS Lab 304)', '02:00 PM: Computer Networks (Room 204)'] },
                { day: 'Friday', slots: ['10:15 AM: Software Engineering (Hall 3)', '11:30 AM: Computer Networks (Room 204)', '03:00 PM: Project Lab Capstone'] },
                { day: 'Monday', slots: ['09:15 AM: Operating Systems (LH-102)', '03:00 PM: Machine Learning Elective (Lab 2)'] }
              ].map((item, i) => (
                <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                  <span className="text-xs font-bold text-primary">{item.day}</span>
                  {item.slots.map((s, idx) => (
                    <div key={idx} className="text-xs text-slate-700 pl-2 border-l-2 border-indigo-300">
                      {s}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Assignments Subtab */}
      {activeSubTab === 'assignments' && (
        <div className="space-y-3">
          <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Pending Academic Deliverables</h3>
            <div className="space-y-2">
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-2xl">
                <span className="text-[10px] font-bold text-rose-600 uppercase">Due Today 5:00 PM</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Computer Networks Lab Assignment 4</p>
                <p className="text-[11px] text-slate-600 mt-1">Wireshark packet trace TCP 3-way handshake (.pcap file)</p>
              </div>
              <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-2xl">
                <span className="text-[10px] font-bold text-indigo-600 uppercase">Mid-Semester Exam</span>
                <p className="text-xs font-bold text-slate-900 mt-0.5">Operating Systems Mid-Term</p>
                <p className="text-[11px] text-slate-600 mt-1">Starts Nov 4th • Syllabus: Processes, Threads, CPU Scheduling &amp; Concurrency</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Log Record Modal */}
      {selectedSubjectToLog && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Log Attendance Record</h3>
              <button onClick={() => setSelectedSubjectToLog(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Record attendance for today&apos;s session of {subjects.find(s => s.id === selectedSubjectToLog)?.name}:
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleLogAttendance('present')}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                ✓ Mark Present
              </button>
              <button
                onClick={() => handleLogAttendance('absent')}
                className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-sm"
              >
                ✕ Mark Absent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Subjects Modal */}
      {showManageModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Attendance Thresholds</h3>
              <button onClick={() => setShowManageModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-600">
              Default university minimum threshold: <strong>75.0%</strong>. Medical waiver margin: <strong>10.0%</strong>.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setShowManageModal(false)}
                className="w-full py-2 bg-primary text-white rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
