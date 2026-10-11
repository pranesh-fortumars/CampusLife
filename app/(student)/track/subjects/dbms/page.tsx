'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Bookmark, 
  GraduationCap, 
  FlaskConical, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Sparkles, 
  Users, 
  FileText, 
  Download, 
  Heart, 
  MessageSquare, 
  Upload, 
  Check, 
  Lock, 
  ChevronRight, 
  ExternalLink,
  BookOpen,
  Hourglass,
  Layers
} from 'lucide-react';

export default function DBMSSubjectDetailPage() {
  const router = useRouter();
  const [isBookmarked, setIsBookmarked] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'materials' | 'assignments'>('overview');
  const [downloadedItem, setDownloadedItem] = useState<string | null>(null);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [joinedStudyHub, setJoinedStudyHub] = useState(false);

  const handleDownload = (id: string, fileName: string) => {
    setDownloadedItem(id);
    setTimeout(() => {
      alert(`Downloaded "${fileName}" to campus cache.`);
      setDownloadedItem(null);
    }, 600);
  };

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => router.back()}
          className="p-1 -ml-1 text-slate-700 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`p-1.5 rounded-xl border transition-colors ${
              isBookmarked
                ? 'bg-indigo-50 border-indigo-200 text-indigo-600'
                : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Subject Header & Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-md bg-indigo-600 text-white font-mono font-bold text-xs tracking-wider">
            CS-302
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-xs">
            4 Credits
          </span>
        </div>

        <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">
          Database Management Systems
        </h1>

        <p className="text-xs text-slate-500 font-medium">
          Prof. Dr. Ananya Roy • Dept. of Computer Science
        </p>

        {/* Feature Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="px-2.5 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200/60 text-[11px] font-bold flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
            Semester V Core
          </span>
          <span className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-800 border border-purple-200/60 text-[11px] font-bold flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-purple-600" />
            Lab Included
          </span>
        </div>
      </div>

      {/* 2 Stat Cards Row (Attendance & Next Lecture) */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Attendance Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>

          <div>
            <div className="text-2xl font-black text-slate-900">86.7%</div>
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mt-1.5">
              <div className="h-full bg-emerald-600 rounded-full w-[86.7%]"></div>
            </div>
          </div>

          <div className="pt-0.5">
            <div className="text-[10px] text-slate-400 font-medium">26/30 attended</div>
            <div className="text-[11px] font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
              <span>✈️</span>
              <span>3 safe bunks left</span>
            </div>
          </div>
        </div>

        {/* Next Lecture Card */}
        <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500">Next Lecture</span>
            <span className="px-1.5 py-0.5 rounded bg-rose-50 text-rose-600 font-extrabold text-[9px] tracking-wider border border-rose-200">
              LIVE SOON
            </span>
          </div>

          <div>
            <div className="text-xs font-black text-slate-900">Today, 10:30 AM</div>
            <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-400" />
              <span>CS Lab 304</span>
            </div>
          </div>

          <div className="pt-1">
            <button
              onClick={() => setShowRoomModal(true)}
              className="w-full py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              <span>Find Room</span>
            </button>
          </div>
        </div>

      </div>

      {/* Ask DBMS Copilot Banner */}
      <div className="p-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-md shadow-indigo-300/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white shrink-0">
            <Sparkles className="w-5 h-5 text-indigo-200" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">
              Ask DBMS Copilot
            </h3>
            <p className="text-[10px] text-indigo-200">
              Instant SQL &amp; BCNF query tutor
            </p>
          </div>
        </div>

        <Link
          href="/copilot"
          className="px-3.5 py-1.5 rounded-xl bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs shadow-sm transition-transform active:scale-95 shrink-0"
        >
          Launch
        </Link>
      </div>

      {/* 3 Navigation Tabs: Overview, Study Materials, Assignments */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview
        </button>

        <button
          onClick={() => setActiveTab('materials')}
          className={`flex-1 py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
            activeTab === 'materials'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Study Materials (14)
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex-1 py-1.5 text-center rounded-xl text-xs font-bold transition-all ${
            activeTab === 'assignments'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Assignments (3)
        </button>
      </div>

      {/* Tab 1 Content: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          
          {/* Syllabus Breakdown Section */}
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Syllabus Breakdown</h3>
                <p className="text-[10px] text-slate-400">Mid-Sem syllabus 68% accomplished</p>
              </div>
              <button 
                onClick={() => alert('Mid-Sem Examination Coverage: Units 1-3 will be evaluated. Minimum 30 marks required.')}
                className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold rounded-xl flex items-center gap-1 transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Exam View</span>
              </button>
            </div>

            {/* Units List */}
            <div className="space-y-3">
              
              {/* Unit 1 */}
              <div className="space-y-1.5">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Unit 1: ER Modeling &amp; Relational Algebra
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Entities, Keys, ER-to-Relational mapping, Tuple Calculus
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px]">
                    100%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                </div>
              </div>

              {/* Unit 2 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="p-0.5 rounded-full bg-emerald-100 text-emerald-600 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Unit 2: SQL, Complex Joins &amp; Triggers
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Subqueries, View Materialization, Stored Procedures, PL/SQL
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px]">
                    100%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-full"></div>
                </div>
              </div>

              {/* Unit 3 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="p-0.5 rounded-full bg-indigo-100 text-indigo-600 mt-0.5">
                      <Hourglass className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Unit 3: Normalization &amp; Dependencies
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        1NF, 2NF, 3NF, BCNF, Lossless Join &amp; Dependency Preservation
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700 font-bold text-[9px]">
                    75% IN PROGRESS
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-600 rounded-full w-[75%]"></div>
                </div>
              </div>

              {/* Unit 4 */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-2">
                    <div className="p-0.5 rounded-full bg-slate-100 text-slate-400 mt-0.5">
                      <Lock className="w-3 h-3" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-700">
                        Unit 4: Transaction Processing &amp; ACID
                      </h4>
                      <p className="text-[10px] text-slate-400">
                        Concurrency Control, 2PL, Serializability, Deadlocks
                      </p>
                    </div>
                  </div>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 font-bold text-[9px]">
                    UPCOMING
                  </span>
                </div>
              </div>

            </div>
          </div>

          {/* Subject Study Group Banner */}
          <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center -space-x-2 shrink-0">
                <div className="w-7 h-7 rounded-full bg-purple-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  +32
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900">Subject Study Group</h4>
                <p className="text-[10px] text-slate-500">34 active peers online right now</p>
              </div>
            </div>

            <button
              onClick={() => setJoinedStudyHub(!joinedStudyHub)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors ${
                joinedStudyHub
                  ? 'bg-emerald-600 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {joinedStudyHub ? 'Hub Joined ✓' : 'Join Hub'}
            </button>
          </div>

          {/* Faculty & Peer Repository */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900">Faculty &amp; Peer Repository</h3>
                <p className="text-[10px] text-slate-400">Curated, peer-reviewed notes &amp; archives</p>
              </div>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:underline"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload</span>
              </button>
            </div>

            {/* Document 1: Official Slides */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Prof. Roy Official Lecture Slides (Units 1-3).pdf
                  </h4>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px]">
                    <span className="px-1.5 py-0.5 rounded bg-teal-50 text-teal-700 font-bold border border-teal-100 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified Faculty
                    </span>
                    <span className="text-slate-400">12.4 MB</span>
                    <span className="text-slate-400">• Updated 2d ago</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload('doc-1', 'Prof. Roy Official Lecture Slides')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors shrink-0 ml-2"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Document 2: Normalization Solved Examples */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Normalization &amp; Functional Dependency Solved Examples
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    By Priya Nair (CR) • 4.2 MB
                  </div>
                  <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-rose-500 fill-current" />
                      48
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      12 comments
                    </span>
                    <span className="text-indigo-600 font-semibold">
                      Handwritten Clean
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload('doc-2', 'Normalization & FD Solved Examples')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors shrink-0 ml-2"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Document 3: Previous 5 Years Mid-Sem Papers */}
            <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between hover:border-slate-300 transition-colors">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 shrink-0">
                  <Layers className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    Previous 5 Years Mid-Sem &amp; End-Sem Papers with Answer Key
                  </h4>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    ACM Student Chapter • 18.1 MB
                  </div>
                  <div className="flex items-center gap-2 mt-1 text-[10px]">
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      240+ downloads this term
                    </span>
                    <span className="text-purple-600 font-bold">
                      Solved Solutions
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload('doc-3', 'Previous 5 Years Mid-Sem Papers')}
                className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 transition-colors shrink-0 ml-2"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* Tab 2: Study Materials */}
      {activeTab === 'materials' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900">All 14 Study Materials &amp; Slides</h3>
          <p className="text-[11px] text-slate-500">Includes instructor lecture handouts, past lab codes, and cheat-sheets.</p>
          <div className="space-y-2 pt-1 text-xs">
            {[
              { title: 'Lecture 1: Database Architecture 3-Tier.pdf', size: '3.1 MB', author: 'Prof. Ananya Roy' },
              { title: 'Lecture 2: Relational Schema Mapping.pdf', size: '2.8 MB', author: 'Prof. Ananya Roy' },
              { title: 'Lab 1-4: MySQL Practice Sheet & Queries.sql', size: '420 KB', author: 'TA Rohan' },
              { title: 'BCNF & 3NF Decomposition Cheatsheet.pdf', size: '1.2 MB', author: 'ACM Chapter' }
            ].map((mat, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">{mat.title}</div>
                  <div className="text-[10px] text-slate-400">{mat.author} • {mat.size}</div>
                </div>
                <Download className="w-4 h-4 text-slate-400 cursor-pointer hover:text-indigo-600" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Assignments */}
      {activeTab === 'assignments' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
          <h3 className="text-xs font-bold text-slate-900">DBMS Course Assignments (3)</h3>
          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Lab Assignment 4: PL/SQL Triggers &amp; Procedures</div>
                <div className="text-[10px] text-slate-500">Due in 2 days • CS Lab 304</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-indigo-600 text-white font-bold text-[10px]">
                Pending
              </span>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
              <div>
                <div className="font-bold text-slate-900">Assignment 3: BCNF Normalization Proofs</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Submitted &amp; Graded (10/10)</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                Completed
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Find Room Modal */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3 text-center">
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">CS Lab 304 — Wayfinding</h3>
            <p className="text-xs text-slate-500">
              Block 3, Third Floor (School of Computing). Turn left after the main elevators.
            </p>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-left text-xs space-y-1">
              <div><strong className="text-slate-800">Faculty:</strong> Prof. Dr. Ananya Roy</div>
              <div><strong className="text-slate-800">Capacity:</strong> 60 Workstations with Oracle 19c</div>
            </div>
            <button
              onClick={() => setShowRoomModal(false)}
              className="w-full py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-md"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Upload DBMS Notes or Papers</h3>
            <p className="text-xs text-slate-500">Share verified summaries with your DTU classmates.</p>
            <input
              type="file"
              className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => {
                  alert('Uploaded document submitted for peer review!');
                  setShowUploadModal(false);
                }}
                className="flex-1 py-2 bg-indigo-600 text-white font-bold text-xs rounded-xl"
              >
                Upload File
              </button>
              <button
                onClick={() => setShowUploadModal(false)}
                className="py-2 px-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
