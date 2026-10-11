'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Calculator, 
  Calendar, 
  TrendingUp, 
  Clock, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle2, 
  CheckSquare, 
  Square, 
  Sparkles, 
  Download, 
  Share2, 
  BookOpen, 
  Flame, 
  ArrowRight,
  ShieldCheck,
  Award,
  ExternalLink,
  ChevronDown,
  FileText
} from 'lucide-react';

export default function ExamRevisionPlannerPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'simulator' | 'roadmap'>('simulator');
  
  // Interactive SGPA Simulator state
  const [simulatedSGPA, setSimulatedSGPA] = useState(9.20);
  const currentCGPA = 8.64;
  const earnedCredits = 112;
  const semCredits = 22;

  // Calculate resulting CGPA: ((currentCGPA * earnedCredits) + (simulatedSGPA * semCredits)) / (earnedCredits + semCredits)
  const resultingCGPA = Number(
    (((currentCGPA * earnedCredits) + (simulatedSGPA * semCredits)) / (earnedCredits + semCredits)).toFixed(2)
  );

  // Subject checklist states
  const [checklist, setChecklist] = useState({
    os_sync: true,
    os_deadlock: false,
    os_paging: false,
    db_bplus: true,
    db_relalg: true,
    db_bcnf: false
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Subnav Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
        <button
          onClick={() => setActiveTab('simulator')}
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            activeTab === 'simulator'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          CGPA &amp; Marks Simulator
        </button>

        <button
          onClick={() => setActiveTab('roadmap')}
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            activeTab === 'roadmap'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Revision Plan
        </button>
      </div>

      {/* Mid-Semester Exam Window Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-teal-50 via-indigo-50 to-purple-50 border border-teal-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-teal-600 text-white shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900 leading-tight">
              Mid-Semester Exam Window
            </div>
            <div className="text-[10px] text-slate-500">
              Nov 4 – Nov 12 • 11 Days countdown
            </div>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded-full bg-teal-100 text-teal-800 text-[10px] font-extrabold tracking-wider border border-teal-200">
          ON SCHEDULE
        </span>
      </div>

      {/* TARGET PROJECTION HUB (Target CGPA Simulator) */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-subtle p-4 space-y-3.5">
        
        {/* Title & Cohort Tag */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
              TARGET PROJECTION HUB
            </span>
            <h2 className="text-sm font-black text-slate-900">
              Target CGPA Simulator
            </h2>
          </div>

          <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[10px] font-bold border border-indigo-100 flex items-center gap-1">
            <Award className="w-3 h-3 text-indigo-600" />
            <span>Top 5% Cohort</span>
          </span>
        </div>

        {/* 3 Metric Boxes Row */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2.5 rounded-2xl bg-indigo-50/60 border border-indigo-100/70">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Current CGPA</div>
            <div className="text-lg font-black text-indigo-700 mt-0.5">8.64</div>
            <div className="text-[9px] text-slate-500">{earnedCredits} Credits Earned</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/60">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Goal Target</div>
            <div className="text-lg font-black text-slate-900 mt-0.5">8.80</div>
            <div className="text-[9px] text-indigo-600 font-bold">+0.16 Needed</div>
          </div>

          <div className="p-2.5 rounded-2xl bg-purple-50/60 border border-purple-100/70">
            <div className="text-[10px] text-slate-400 font-semibold uppercase">Sem 6 Target</div>
            <div className="text-lg font-black text-purple-700 mt-0.5">{simulatedSGPA.toFixed(2)}</div>
            <div className="text-[9px] text-slate-500">{semCredits} Active Credits</div>
          </div>
        </div>

        {/* Graduation Progress to 8.80 Goal */}
        <div className="space-y-1.5 pt-1 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700">Graduation Progress to 8.80 Goal</span>
            <span className="font-extrabold text-indigo-600">78% Milestoned</span>
          </div>

          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full w-[78%]"></div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>Current Base: 8.64</span>
            <span className="text-indigo-600 font-bold">Safe Zone: 8.92+ SGPA</span>
            <span>Target: 8.80</span>
          </div>
        </div>

        {/* Interactive SGPA Slider Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-800">
              <Calculator className="w-3.5 h-3.5 text-indigo-600" />
              <span>Simulate Sem 6 SGPA:</span>
            </div>
            <span className="px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-mono font-bold text-xs">
              {simulatedSGPA.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min="8.00"
            max="10.00"
            step="0.05"
            value={simulatedSGPA}
            onChange={(e) => setSimulatedSGPA(Number(e.target.value))}
            className="w-full accent-indigo-600 h-1.5 bg-slate-200 rounded-lg cursor-pointer"
          />

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium">
            <span>8.00 (Minimum)</span>
            <span>9.00 (Honors)</span>
            <span>10.00 (Max &apos;O&apos; Grades)</span>
          </div>

          {/* Result Output Card */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-[10px] text-slate-400 font-medium">Resulting Overall CGPA:</div>
              <div className="text-base font-black text-slate-900">{resultingCGPA}</div>
            </div>

            <div className="text-right">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                resultingCGPA >= 8.70 ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-amber-50 text-amber-700'
              }`}>
                {resultingCGPA >= 8.70 ? 'SAFE MILESTONE' : 'NEEDS ELEVATION'}
              </span>
              <div className="text-[9px] text-slate-400 mt-0.5">
                Needs: 3 A+ &amp; 2 O Grades
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center gap-1.5 pt-0.5">
            <span className="text-[10px] text-slate-400 font-semibold">PRESETS:</span>
            <button
              onClick={() => setSimulatedSGPA(9.00)}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[10px] font-bold text-slate-700"
            >
              SGPA 9.00 → CGPA 8.70
            </button>
            <button
              onClick={() => setSimulatedSGPA(9.25)}
              className="px-2 py-0.5 rounded-md bg-white border border-slate-200 hover:bg-slate-100 text-[10px] font-bold text-slate-700"
            >
              SGPA 9.25 → CGPA 8.74
            </button>
          </div>
        </div>

      </div>

      {/* Subject Target Marks Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900">Subject Target Marks</h3>
            <p className="text-[10px] text-slate-400">
              Minimum scores required to guarantee target letter grade
            </p>
          </div>
          <button className="text-xs font-semibold text-indigo-600 flex items-center gap-0.5">
            <span>Weightage</span>
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>

        {/* 4 Subject Target Cards */}
        <div className="space-y-3">
          
          {/* Subject 1: DBMS */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-teal-50 text-teal-700 font-bold text-xs">
                  DB
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">DBMS</h4>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] font-mono font-bold text-slate-600">
                      CS-302
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Database Management Systems • 4 Credits</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-black text-xs border border-teal-200">
                Target: &apos;O&apos;
              </span>
            </div>

            {/* Scores row */}
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">Internal</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">19/20</span>
                <span className="text-[9px] text-emerald-600 font-bold">95% Safe</span>
              </div>

              <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[9px] text-slate-400 block font-medium">Mid-Sem Min</span>
                <span className="font-extrabold text-indigo-700 block mt-0.5">26/30</span>
                <span className="text-[9px] text-indigo-600 font-bold">Target Score</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">End-Sem Min</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">44/50</span>
                <span className="text-[9px] text-slate-400">Proj. Required</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] pt-0.5">
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                +5 marks safe margin buffer
              </span>
              <Link href="/track/subjects/dbms" className="text-indigo-600 font-bold hover:underline">
                Details &gt;
              </Link>
            </div>
          </div>

          {/* Subject 2: OS (High Priority Alert) */}
          <div className="bg-white rounded-2xl border-l-4 border-l-rose-500 border border-slate-200/80 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-rose-50 text-rose-700 font-bold text-xs">
                  OS
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Operating Systems</h4>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] font-mono font-bold text-slate-600">
                      CS-304
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Core Systems • 4 Credits</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-black text-xs border border-purple-200">
                Target: &apos;A+&apos;
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">Internal</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">15/20</span>
                <span className="text-[9px] text-rose-600 font-bold">75% Border</span>
              </div>

              <div className="p-2 rounded-xl bg-rose-50/60 border border-rose-200">
                <span className="text-[9px] text-slate-400 block font-medium">Mid-Sem Min</span>
                <span className="font-extrabold text-rose-700 block mt-0.5">24/30</span>
                <span className="text-[9px] text-rose-600 font-bold">Strict Target</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">End-Sem Min</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">41/50</span>
                <span className="text-[9px] text-slate-400">Proj. Required</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-rose-50 text-rose-800 text-[10px] font-medium flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span>High priority — First exam in 11 days. Needs intensive revision.</span>
            </div>
          </div>

          {/* Subject 3: Computer Networks */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs">
                  CN
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Computer Networks</h4>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] font-mono font-bold text-slate-600">
                      CS-306
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Protocols &amp; Architecture • 3 Credits</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-black text-xs border border-purple-200">
                Target: &apos;A+&apos;
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">Internal</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">17/20</span>
                <span className="text-[9px] text-slate-500">85% Steady</span>
              </div>

              <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[9px] text-slate-400 block font-medium">Mid-Sem Min</span>
                <span className="font-extrabold text-indigo-700 block mt-0.5">25/30</span>
                <span className="text-[9px] text-indigo-600 font-bold">Target Score</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">End-Sem Min</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">42/50</span>
                <span className="text-[9px] text-slate-400">Proj. Required</span>
              </div>
            </div>
          </div>

          {/* Subject 4: Software Engineering */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-3.5 space-y-2.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs">
                  SE
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-slate-900">Software Engineering</h4>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-[9px] font-mono font-bold text-slate-600">
                      CS-308
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400">Agile &amp; Systems Design • 3 Credits</p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded bg-teal-50 text-teal-700 font-black text-xs border border-teal-200">
                Target: &apos;O&apos;
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">Internal</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">19/20</span>
                <span className="text-[9px] text-emerald-600 font-bold">95% Excellent</span>
              </div>

              <div className="p-2 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[9px] text-slate-400 block font-medium">Mid-Sem Min</span>
                <span className="font-extrabold text-indigo-700 block mt-0.5">27/30</span>
                <span className="text-[9px] text-indigo-600 font-bold">Target Score</span>
              </div>

              <div className="p-2 rounded-xl bg-slate-50">
                <span className="text-[9px] text-slate-400 block font-medium">End-Sem Min</span>
                <span className="font-extrabold text-slate-900 block mt-0.5">46/50</span>
                <span className="text-[9px] text-slate-400">Proj. Required</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Revision Roadmap Section */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900">Revision Roadmap</h3>
            <p className="text-[10px] text-slate-400">Mid-Sem Exam Roadmap • Starts Nov 4 (11 Days Left)</p>
          </div>
          <Calendar className="w-4 h-4 text-slate-400" />
        </div>

        {/* Sprint 1: OS Core */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 text-[9px] font-extrabold uppercase">
                FIRST PAPER • NOV 4
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Sprint: Operating Systems Core</h4>
              <p className="text-[10px] text-slate-400">Sprint Days 4-6 • Focus on critical scoring topics</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-rose-600">80%</span>
              <span className="text-[9px] text-slate-400 block">Readiness</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div 
              onClick={() => toggleCheck('os_sync')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.os_sync ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.os_sync ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Process Sync &amp; Race Conditions
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Done</span>
            </div>

            <div 
              onClick={() => toggleCheck('os_deadlock')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.os_deadlock ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.os_deadlock ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Deadlock Prevention Algorithms (Banker&apos;s)
                </span>
              </div>
              <span className="text-[10px] text-rose-600 font-bold">Est. 1.5h</span>
            </div>

            <div 
              onClick={() => toggleCheck('os_paging')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.os_paging ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.os_paging ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Paging &amp; Segmentation Address Calc
                </span>
              </div>
              <span className="text-[10px] text-rose-600 font-bold">Est. 2h</span>
            </div>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <Link
              href="/track/subjects/dbms"
              className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Open Priya&apos;s OS Summary Flashcards</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Sprint 2: DBMS */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[9px] font-extrabold uppercase">
                EXAM 2 • NOV 6
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Sprint: DBMS &amp; Relational Models</h4>
              <p className="text-[10px] text-slate-400">Sprint Days 1-3 • 75% prepared</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-indigo-600">75%</span>
              <span className="text-[9px] text-slate-400 block">Readiness</span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div 
              onClick={() => toggleCheck('db_bplus')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.db_bplus ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.db_bplus ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  B+ Trees &amp; Indexing Mechanisms
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Done</span>
            </div>

            <div 
              onClick={() => toggleCheck('db_relalg')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.db_relalg ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.db_relalg ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  Relational Algebra &amp; Advanced SQL
                </span>
              </div>
              <span className="text-[10px] font-bold text-emerald-600">Done</span>
            </div>

            <div 
              onClick={() => toggleCheck('db_bcnf')}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                {checklist.db_bcnf ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-300" />}
                <span className={checklist.db_bcnf ? 'line-through text-slate-400' : 'text-slate-800 font-medium'}>
                  3NF &amp; BCNF Decomposition Proofs
                </span>
              </div>
              <span className="text-[10px] text-indigo-600 font-bold">Est. 2h Left</span>
            </div>
          </div>
        </div>

        {/* Sprint 3: CN */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[9px] font-extrabold uppercase">
                EXAM 3 • NOV 8
              </span>
              <h4 className="text-xs font-bold text-slate-900 mt-1">Sprint: Computer Networks</h4>
              <p className="text-[10px] text-slate-400">Sprint Days 7-8 • Transport &amp; Data Link</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-black text-blue-600">65%</span>
              <span className="text-[9px] text-slate-400 block">Readiness</span>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
            <span className="text-slate-700 font-medium">Up Next: Sliding Window &amp; TCP Handshake</span>
            <button 
              onClick={() => router.push('/track/focus')}
              className="px-2.5 py-1 bg-indigo-600 text-white font-bold text-[10px] rounded-lg shadow-xs"
            >
              Start Sprint
            </button>
          </div>
        </div>

      </div>

      {/* Study Session Streak Card */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-4 shadow-md">
        <img
          src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=80"
          alt="Desk Setup"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black">
              <span>Study Session Streak: 4 Days</span>
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <p className="text-[11px] text-slate-300 mt-0.5">
              Daily target: 3 hours revision completed today
            </p>
          </div>

          <Link
            href="/track/focus"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-transform active:scale-95 shrink-0"
          >
            <span>Start Timer</span>
            <Clock className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* High-Yield Tools & Export */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <h3 className="text-xs font-extrabold text-slate-900">High-Yield Tools &amp; Export</h3>

        {/* Tool 1 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Generate Mock Practice Test</div>
              <div className="text-[10px] text-slate-400">Campus Copilot speed quiz (15 Qs) from DTU pattern</div>
            </div>
          </div>
          <Link
            href="/copilot"
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs"
          >
            Start Quiz
          </Link>
        </div>

        {/* Tool 2 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Past 5 Years Solved Mid-Sem PDF</div>
              <div className="text-[10px] text-slate-400">Verified by toppers with marking scheme breakdown</div>
            </div>
          </div>
          <button
            onClick={() => alert('Downloaded DTU_MidSem_5Years_Solved_Pack.pdf (18.1 MB)')}
            className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF</span>
          </button>
        </div>

        {/* Tool 3 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Export Target Sheet</div>
              <div className="text-[10px] text-slate-400">Sync formulas to Google Sheets or printable revision</div>
            </div>
          </div>
          <button
            onClick={() => alert('Synced to Google Drive / Excel Sheet: DTU_Rahul_Sem6_Target_Tracker.xlsx')}
            className="px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-700 hover:bg-teal-100 font-bold text-xs rounded-xl flex items-center gap-1"
          >
            <span>Sync</span>
          </button>
        </div>
      </div>

      {/* DTU Ordinance Grading Scale Footnote */}
      <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-2.5 text-[10px] text-slate-500 leading-relaxed">
        <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p>
          Calculations follow the DTU Ordinance 10-Point Grading Scale with relative statistical moderation. A letter grade of &apos;O&apos; corresponds to 10 points; &apos;A+&apos; to 9 points; and &apos;A&apos; to 8 points.
        </p>
      </div>

    </div>
  );
}
