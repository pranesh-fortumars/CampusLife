'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  TrendingUp, 
  Settings, 
  Search, 
  Bell, 
  HelpCircle, 
  User, 
  Megaphone, 
  Download, 
  ChevronRight, 
  UserPlus, 
  Sliders, 
  CheckCircle2, 
  Eye, 
  ShieldAlert, 
  LogOut, 
  ExternalLink, 
  Check, 
  X, 
  FileText, 
  ArrowUpRight,
  Filter,
  Layers,
  Award
} from 'lucide-react';

interface VerificationStudent {
  id: string;
  name: string;
  roll: string;
  initials: string;
  color: string;
  program: string;
  docType: 'email' | 'id_scan' | 'slip';
  docLabel: string;
  timeAgo: string;
  status: 'approved' | 'pending';
}

export default function CouncilAdminPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'verifications' | 'moderation' | 'events' | 'analytics' | 'settings'>('overview');
  const [selectedAggPeriod, setSelectedAggPeriod] = useState<'today' | '7days' | 'term'>('today');
  const [auroraAuthorized, setAuroraAuthorized] = useState(false);
  const [reviewModalStudent, setReviewModalStudent] = useState<VerificationStudent | null>(null);
  const [broadcastModalOpen, setBroadcastModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  const [verificationQueue, setVerificationQueue] = useState<VerificationStudent[]>([
    {
      id: 'v1',
      name: 'Rahul Sharma',
      roll: '21BCS084',
      initials: 'RS',
      color: 'bg-indigo-100 text-indigo-700',
      program: 'B.Tech CSE 3rd Year (Sem 5)',
      docType: 'email',
      docLabel: 'Institutional Email Verified',
      timeAgo: '14m ago',
      status: 'approved'
    },
    {
      id: 'v2',
      name: 'Ananya Sen',
      roll: '22ECE112',
      initials: 'AS',
      color: 'bg-purple-100 text-purple-700',
      program: 'B.Tech ECE 2nd Year (Sem 3)',
      docType: 'id_scan',
      docLabel: 'Physical ID Scan',
      timeAgo: '35m ago',
      status: 'pending'
    },
    {
      id: 'v3',
      name: 'Vikram Malhotra',
      roll: '23MEC045',
      initials: 'VM',
      color: 'bg-amber-100 text-amber-700',
      program: 'B.Tech ME 1st Year (Sem 1)',
      docType: 'slip',
      docLabel: 'Admission Slip',
      timeAgo: '1h ago',
      status: 'pending'
    },
    {
      id: 'v4',
      name: 'Sneha Patel',
      roll: '21IT098',
      initials: 'SP',
      color: 'bg-teal-100 text-teal-700',
      program: 'B.Tech IT 3rd Year (Sem 5)',
      docType: 'email',
      docLabel: 'Institutional Email Verified',
      timeAgo: '2h ago',
      status: 'approved'
    }
  ]);

  const handleApprove = (id: string) => {
    setVerificationQueue(prev => prev.map(s => s.id === id ? { ...s, status: 'approved' } : s));
    setReviewModalStudent(null);
  };

  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastModalOpen(false);
      setBroadcastMessage('');
    }, 1200);
  };

  // Department attendance aggregates for the bar chart
  const deptData = [
    { name: 'CSE', biometric: 88, app: 84 },
    { name: 'ECE', biometric: 81, app: 78 },
    { name: 'ME', biometric: 76, app: 74 },
    { name: 'IT', biometric: 89, app: 85 },
    { name: 'EE', biometric: 79, app: 76 },
    { name: 'CE', biometric: 75, app: 72 }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row antialiased font-sans">
      
      {/* Left Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0">
        
        {/* Brand / Logo */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-sm text-white tracking-tight">CampusLife</div>
              <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
                ORGANIZER PORTAL
              </div>
            </div>
          </div>
        </div>

        {/* Council Switcher */}
        <div className="p-3">
          <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <Building2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <div className="truncate">
                <div className="text-xs font-bold text-white leading-tight">DTU Council</div>
                <div className="text-[10px] text-slate-400 truncate">Delhi Tech. Univ.</div>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-bold">⇅</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: Layers },
            { id: 'verifications', label: 'Verifications', icon: ShieldCheck, badge: '142' },
            { id: 'moderation', label: 'Moderation', icon: ShieldAlert, badge: '6' },
            { id: 'events', label: 'Events & Clubs', icon: Calendar },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                    isActive ? 'bg-white text-indigo-700' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Back to Student Portal Link */}
        <div className="px-3 py-2">
          <Link
            href="/home"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-indigo-300 hover:text-indigo-200 bg-indigo-950/40 border border-indigo-900/50 hover:bg-indigo-950/70 transition-colors"
          >
            <span>← Student App View</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* User Badge bottom */}
        <div className="p-3 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center justify-center font-bold text-xs shrink-0">
              DA
            </div>
            <div className="truncate">
              <div className="text-xs font-bold text-white truncate">Dean Academic</div>
              <div className="text-[10px] text-slate-400 truncate">superadmin@dtu.ac.in</div>
            </div>
          </div>
          <button title="Log out" className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>

      </aside>

      {/* Main Administrative Dashboard Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-50 text-slate-900">
        
        {/* Top Header Bar */}
        <header className="px-6 py-3.5 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-20 shadow-xs">
          
          {/* Global Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student roll numbers, events, violations, societies..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          {/* Right Header Badges & Actions */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">
              <Building2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Delhi Technological University - Admin Council</span>
            </div>

            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 relative transition-colors">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5 ring-2 ring-white"></span>
            </button>

            <button className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
              <User className="w-4 h-4" />
            </div>
          </div>
        </header>

        {/* Dashboard Content Container */}
        <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* Top Title & Broadcast Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                DTU Central Council / Overview Dashboard
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Executive Council Desk
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  ACADEMIC SESSION 2024-25 (ODD SEM)
                </span>
              </div>
            </div>

            {/* Sub-bar / Actions */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs">
                <Award className="w-4 h-4 text-indigo-600" />
                <span className="font-bold text-slate-900">Dr. S. K. Gupta</span>
                <span className="text-slate-400 font-medium">• Dean of Student Affairs</span>
              </div>

              <button
                onClick={() => setBroadcastModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-indigo-300 transition-transform active:scale-95"
              >
                <Megaphone className="w-4 h-4" />
                <span>Broadcast Notice</span>
              </button>
            </div>
          </div>

          {/* 4 Stat Cards Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Card 1: Verified Students */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Verified Students</span>
                <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                  <User className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">14,820</span>
                <span className="text-xs font-bold text-emerald-600">↑ 12%</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>vs last odd semester</span>
                <span className="font-bold text-indigo-600">DTU LIVE</span>
              </div>
              {/* Sparkline curve */}
              <div className="h-6 w-full pt-1">
                <svg className="w-full h-full text-indigo-600" viewBox="0 0 100 24" fill="none">
                  <path d="M0 20 Q 25 18, 40 12 T 75 14 T 100 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Card 2: Active Campus Clubs */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Active Campus Clubs</span>
                <div className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">48</span>
                <span className="text-xs font-semibold text-slate-500">Registered</span>
              </div>
              <div className="text-[11px] font-semibold text-purple-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                <span>12 major events this week</span>
              </div>
              <div className="pt-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-medium mb-1">
                  <span>Charter renewed: 44/48</span>
                  <span className="font-bold text-slate-700">91.6%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full w-[91.6%]"></div>
                </div>
              </div>
            </div>

            {/* Card 3: Pending Verifications */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Pending Verifications</span>
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <ShieldAlert className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">142</span>
                <span className="text-xs font-semibold text-slate-500">Requests</span>
              </div>
              <div className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/60 text-[10px] font-bold inline-flex items-center gap-1">
                <span className="text-[9px]">TAT SLA ALERT</span>
                <span>Avg 4.2h turnaround</span>
              </div>
              <div className="text-[10px] text-slate-400 truncate pt-1">
                ⚠️ 38 incoming fresh batches...
              </div>
            </div>

            {/* Card 4: Flagged Moderation Items */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Flagged Moderation Items</span>
                <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">6</span>
                <span className="text-xs font-semibold text-slate-500">Under Review</span>
              </div>
              <div className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>99.4% Safe Community Score</span>
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 font-medium">
                <span>Auto-moderated today</span>
                <span className="font-bold text-slate-700">31 posts filtered</span>
              </div>
            </div>

          </div>

          {/* 2-Column Main Workspace */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left 7/12: Verification Queue & Campus Aggregates */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Card 1: Recent Student Verification Queue */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="p-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                      <h2 className="text-sm font-bold text-slate-900">
                        Recent Student Verification Queue
                      </h2>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Live DTU identity validation pipeline &amp; roll number verification logs
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">SHOWING 4 OF 142</span>
                    <span>View All &gt;</span>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="bg-slate-50/60 border-b border-slate-100 text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        <th className="py-2.5 px-4">STUDENT &amp; ROLL NO</th>
                        <th className="py-2.5 px-3">DEPARTMENT &amp; YEAR</th>
                        <th className="py-2.5 px-3">DOCUMENT TYPE</th>
                        <th className="py-2.5 px-3">SUBMITTED</th>
                        <th className="py-2.5 px-4 text-right">ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {verificationQueue.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] ${item.color}`}>
                                {item.initials}
                              </div>
                              <div>
                                <div className="font-bold text-slate-900 leading-tight">
                                  {item.name}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  {item.roll}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="py-3 px-3 text-slate-600 text-[11px]">
                            {item.program}
                          </td>

                          <td className="py-3 px-3">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                              item.docType === 'email'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                : item.docType === 'id_scan'
                                ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                : 'bg-amber-50 text-amber-700 border border-amber-100'
                            }`}>
                              {item.docLabel}
                            </span>
                          </td>

                          <td className="py-3 px-3 text-slate-400 text-[11px]">
                            {item.timeAgo}
                          </td>

                          <td className="py-3 px-4 text-right">
                            {item.status === 'approved' ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Approved
                              </span>
                            ) : (
                              <button
                                onClick={() => setReviewModalStudent(item)}
                                className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] transition-colors shadow-xs"
                              >
                                Review Document
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Card 2: Campus Activity & Attendance Aggregates */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-5 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-4 bg-indigo-600 rounded-full"></span>
                      <h2 className="text-sm font-bold text-slate-900">
                        Campus Activity &amp; Attendance Aggregates
                      </h2>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Daily active student logins, biometric sync &amp; lecture engagement per engineering department
                    </p>
                  </div>

                  {/* Tabs: Today | 7 Days | Term Avg */}
                  <div className="flex items-center p-0.5 bg-slate-100 rounded-xl text-xs font-semibold">
                    {(['today', '7days', 'term'] as const).map((period) => (
                      <button
                        key={period}
                        onClick={() => setSelectedAggPeriod(period)}
                        className={`px-3 py-1 rounded-lg text-[11px] capitalize transition-all ${
                          selectedAggPeriod === period
                            ? 'bg-white text-indigo-700 font-bold shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        {period === '7days' ? '7 Days' : period === 'term' ? 'Term Avg' : 'Today'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bar Chart Representation */}
                <div className="pt-2">
                  <div className="h-44 flex items-end justify-between gap-4 px-2 pb-2 border-b border-slate-200">
                    {deptData.map((d) => (
                      <div key={d.name} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                        <div className="w-full flex items-end justify-center gap-1.5 h-full">
                          {/* Biometric bar (Blue) */}
                          <div
                            className="w-4 sm:w-5 bg-indigo-600 rounded-t-md transition-all duration-500 hover:opacity-90 relative group"
                            style={{ height: `${d.biometric}%` }}
                          >
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded pointer-events-none transition-opacity">
                              {d.biometric}%
                            </span>
                          </div>
                          {/* App active bar (Purple) */}
                          <div
                            className="w-4 sm:w-5 bg-purple-500 rounded-t-md transition-all duration-500 hover:opacity-90 relative group"
                            style={{ height: `${d.app}%` }}
                          >
                            <span className="opacity-0 group-hover:opacity-100 absolute -top-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] px-1 py-0.5 rounded pointer-events-none transition-opacity">
                              {d.app}%
                            </span>
                          </div>
                        </div>
                        <span className="text-[11px] font-bold text-slate-700">{d.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Chart Legend & Validation Footnote */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                    <div className="flex items-center gap-4 text-[11px]">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-indigo-600"></span>
                        <span className="text-slate-600">Biometric Class Attendance (Avg: 83.4%)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-sm bg-purple-500"></span>
                        <span className="text-slate-600">CampusLife App Active Session Rate</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>All 6 faculties above statutory 75% NAAC mandate</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Right 5/12: Urgent Alerts, Upcoming Events, Executive Actions */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Card 1: Urgent Incident & Moderation Alerts */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-rose-500 rounded-full"></span>
                    <h2 className="text-sm font-bold text-slate-900">
                      Urgent Incident &amp; Moderation Alerts
                    </h2>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">
                    3 ACTIONABLE
                  </span>
                </div>

                {/* Alert 1 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-rose-100 text-rose-700">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs text-slate-900">Resell Price Gouging</span>
                    </div>
                    <span className="text-[10px] text-slate-400">8m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Marketplace listing: Duplicate textbook resell claim marked 180% above standard price ceiling.
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <button className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-[10px] transition-colors">
                      Delist Item
                    </button>
                    <button className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold text-[10px] hover:bg-slate-50 transition-colors">
                      Inspect
                    </button>
                  </div>
                </div>

                {/* Alert 2 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded-md bg-indigo-100 text-indigo-700">
                        <ShieldCheck className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold text-xs text-slate-900">Fest Pass Scalping Prevented</span>
                    </div>
                    <span className="text-[10px] text-slate-400">22m ago</span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    2 concert passes automatically blocked by anti-scalp heuristic engine. Account access restricted for 24h.
                  </p>
                  <div className="text-[10px] font-semibold text-emerald-600 flex items-center gap-1 pt-0.5">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Auto-Resolved by Guardrail</span>
                  </div>
                </div>

              </div>

              {/* Card 2: Upcoming Fests & Events */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-4 bg-purple-600 rounded-full"></span>
                    <h2 className="text-sm font-bold text-slate-900">
                      Upcoming Fests &amp; Events
                    </h2>
                  </div>
                  <Link href="/community" className="text-xs font-semibold text-indigo-600 hover:underline">
                    All Events &gt;
                  </Link>
                </div>

                {/* Event 1: HackCampus */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100">
                      HACKATHON
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Venue Approved
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">HackCampus DTU 2024</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Organized by ACM Student Chapter • Audi Hall B
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                    <span className="font-semibold text-slate-700">👥 420 Registered</span>
                    <span className="text-indigo-600 font-bold">Starts in 3 Days</span>
                  </div>
                </div>

                {/* Event 2: Aurora '24 */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
                  <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-100">
                      CULTURAL FEST
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-100">
                      BUDGET PENDING
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">Aurora &apos;24 Cultural Fest</h3>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Student Council • Open Air Theatre (OAT)
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <div>
                      <div className="text-[10px] text-slate-400">Requested Allocation</div>
                      <div className="text-xs font-extrabold text-slate-900">₹1,50,000</div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setAuroraAuthorized(!auroraAuthorized)}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          auroraAuthorized
                            ? 'bg-emerald-600 text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                      >
                        {auroraAuthorized ? 'Authorized ✓' : 'Authorize'}
                      </button>
                      <button className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* Card 3: Executive Actions */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
                <h2 className="text-sm font-bold text-slate-900">
                  Executive Actions
                </h2>

                <div className="space-y-2">
                  {/* Action 1: Export NAAC Report */}
                  <button 
                    onClick={() => alert('NAAC / NIRF Institutional attendance sheets downloaded as dtu_naac_2024.xlsx')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Export NAAC / NIRF Audit Report
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Institutional attendance sheets &amp; metrics (.xlsx)
                        </div>
                      </div>
                    </div>
                    <Download className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Action 2: Add Club Organizer */}
                  <button 
                    onClick={() => alert('Delegate elevated lead permissions modal')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
                        <UserPlus className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Add New Club Organizer
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Delegate elevated lead permissions
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>

                  {/* Action 3: Semester Roll-Over Config */}
                  <button 
                    onClick={() => alert('Semester Roll-Over Configuration options')}
                    className="w-full p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 flex items-center justify-between text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-teal-50 text-teal-600">
                        <Sliders className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">
                          Semester Roll-Over Config
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Set selective enrollment &amp; timetable locks
                        </div>
                      </div>
                    </div>
                    <Settings className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Verification Document Review Modal */}
      {reviewModalStudent && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 text-slate-900 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Review Verification Record</h3>
                <p className="text-xs text-slate-500">{reviewModalStudent.name} • {reviewModalStudent.roll}</p>
              </div>
              <button onClick={() => setReviewModalStudent(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document preview simulate */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Document Type:</span>
                <span className="font-bold text-indigo-700">{reviewModalStudent.docLabel}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Department / Batch:</span>
                <span className="font-bold text-slate-800">{reviewModalStudent.program}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-600">Submission Timestamp:</span>
                <span className="text-slate-500">{reviewModalStudent.timeAgo}</span>
              </div>
              <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-slate-900">DTU Registrar Registry Matched</div>
                <div className="text-[11px] text-slate-500">Identity matches official student registration file</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleApprove(reviewModalStudent.id)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                <span>Approve Identity</span>
              </button>
              <button
                onClick={() => setReviewModalStudent(null)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Notice Modal */}
      {broadcastModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 text-slate-900 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Broadcast Campus Notice</h3>
              </div>
              <button onClick={() => setBroadcastModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {broadcastSent ? (
              <div className="p-6 text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div className="text-sm font-bold text-slate-900">Notice Broadcasted to 14,820 Students</div>
                <div className="text-xs text-slate-500">Pushed to mobile notifications &amp; Community feed</div>
              </div>
            ) : (
              <form onSubmit={handleBroadcast} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Notice Content</label>
                  <textarea
                    rows={4}
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                    placeholder="E.g., Mid-Semester exam admit cards are now active. Ensure attendance minimums are satisfied..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    required
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>Target: All Undergraduates &amp; Postgraduates</span>
                  <span>Instant push sync</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-colors"
                  >
                    Send Instant Broadcast
                  </button>
                  <button
                    type="button"
                    onClick={() => setBroadcastModalOpen(false)}
                    className="py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
