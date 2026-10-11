'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  Star, 
  Code, 
  ShieldCheck, 
  Calendar, 
  ArrowRight, 
  Users, 
  Award, 
  Sparkles, 
  Megaphone, 
  CheckCircle2, 
  Plus, 
  ExternalLink,
  ChevronDown,
  X,
  Palette,
  Briefcase,
  Flame,
  ArrowLeft
} from 'lucide-react';

interface SocietyItem {
  id: string;
  name: string;
  category: 'technical' | 'cultural' | 'sports';
  verified: boolean;
  membersCount: number;
  highlightTag: string;
  tagColor: string;
  eventTitle: string;
  eventMeta: string;
  tags: string[];
  isMember?: boolean;
  role?: string;
  iconBg: string;
  iconText: string;
}

export default function ClubsDirectoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'cultural' | 'sports'>('all');
  const [showCharterModal, setShowCharterModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [charterTitle, setCharterTitle] = useState('');
  const [charterFaculty, setCharterFaculty] = useState('');
  const [appliedRole, setAppliedRole] = useState(false);

  // Societies list
  const [societies, setSocieties] = useState<SocietyItem[]>([
    {
      id: 'gdsc',
      name: 'GDSC DTU',
      category: 'technical',
      verified: true,
      membersCount: 350,
      highlightTag: '18 WORKSHOPS',
      tagColor: 'bg-indigo-50 text-indigo-700',
      eventTitle: 'Kubernetes & Docker Hands-on Lab',
      eventMeta: 'Tomorrow, 4:00 PM • CS Seminar Hall 2',
      tags: ['Flutter', 'Google Cloud', 'Open Source'],
      isMember: true,
      iconBg: 'bg-blue-50 text-blue-600',
      iconText: '◆'
    },
    {
      id: 'pratibimb',
      name: 'Pratibimb — Dramatics',
      category: 'cultural',
      verified: true,
      membersCount: 120,
      highlightTag: '4 NAT. TROPHIES',
      tagColor: 'bg-purple-50 text-purple-700',
      eventTitle: 'Annual Street Auditions open until Oct 28 at OAT. No prior experience required!',
      eventMeta: 'Auditions ongoing • Open Air Theatre',
      tags: ['Street Play (Nukkad)', 'Monologue', 'Scriptwriting'],
      isMember: false,
      iconBg: 'bg-purple-50 text-purple-600',
      iconText: '🎭'
    },
    {
      id: 'ecell',
      name: 'E-Cell DTU',
      category: 'technical',
      verified: true,
      membersCount: 280,
      highlightTag: '₹1.5 CR SEED FUND',
      tagColor: 'bg-emerald-900 text-emerald-100',
      eventTitle: 'Campus Pitch Day with Peak XV Partners • 12 student startups shortlisted for seed grant',
      eventMeta: 'Nov 12 • DTU Incubation Centre',
      tags: ['Pitching', 'Angel Funding', 'Incubation'],
      isMember: false,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconText: '₹'
    },
    {
      id: 'aura',
      name: 'Aura — Design Collective',
      category: 'cultural',
      verified: true,
      membersCount: 195,
      highlightTag: 'FEST BRANDING',
      tagColor: 'bg-indigo-50 text-indigo-700',
      eventTitle: 'Selected as Official Creative Agency for Aurora Cultural Fest 2024',
      eventMeta: 'Design Sprint Ongoing • Tech Block 4',
      tags: ['UI/UX', 'Blender 3D', 'Poster Design'],
      isMember: false,
      iconBg: 'bg-violet-50 text-violet-600',
      iconText: '✦'
    }
  ]);

  const toggleMembership = (id: string) => {
    setSocieties(prev => prev.map(s => 
      s.id === id ? { ...s, isMember: !s.isMember } : s
    ));
  };

  const filteredSocieties = societies.filter(item => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.name.toLowerCase().includes(q) || item.tags.some(t => t.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Top Search & Filter Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search 48 campus clubs, tech societies..."
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200/90 rounded-2xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-xs"
          />
        </div>
        <button 
          onClick={() => setSelectedCategory(selectedCategory === 'technical' ? 'all' : 'technical')}
          className="p-2.5 rounded-2xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors"
          title="Toggle Filters"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>

      {/* Filter Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'all', label: 'All', count: 48 },
          { id: 'technical', label: 'Technical', count: 14 },
          { id: 'cultural', label: 'Cultural', count: 12 },
          { id: 'sports', label: 'Sports', count: 8 }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategory(tab.id as any)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              selectedCategory === tab.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              selectedCategory === tab.id ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-200 text-slate-700'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Hero Featured Society: ACM DTU Chapter */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-subtle overflow-hidden space-y-3">
        {/* Banner with dark cyber theme */}
        <div className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 p-4 text-white overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[9px] font-extrabold tracking-wider flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                RECRUITING FRESHERS
              </span>
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-[9px] font-bold">
                TOP TECHNICAL 2024
              </span>
            </div>

            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300 bg-black/40 px-2 py-0.5 rounded-full backdrop-blur-xs">
              <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
              <span>4.9</span>
              <span className="text-slate-400 font-normal">(142)</span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 pt-1 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-base font-extrabold text-slate-900 leading-tight">
                  ACM DTU Chapter
                </h2>
                <CheckCircle2 className="w-4 h-4 text-indigo-600 fill-indigo-100" />
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Premier Technical &amp; Computing Machinery Society • 480+ Members
              </p>
            </div>

            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0 border border-indigo-100">
              <Code className="w-4 h-4" />
            </div>
          </div>

          {/* Leadership Info */}
          <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100/70 flex items-center gap-2 text-xs">
            <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
            <span className="text-slate-800 font-medium">
              Rahul Sharma (Pres) &amp; Priya Nair (VP)
            </span>
          </div>

          {/* Hackathon Callout */}
          <Link
            href="/community/events/hackcampus"
            className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200/80 flex items-center justify-between hover:bg-indigo-100/80 transition-colors block"
          >
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-indigo-600 text-white">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900">HackCampus 2024</span>
                  <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-[9px] font-bold text-white">
                    36h
                  </span>
                </div>
                <div className="text-[10px] text-slate-500">
                  Flagship Hackathon • ₹2.5L Prize Pool
                </div>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-xl bg-white text-indigo-700 text-xs font-bold border border-indigo-100 shadow-xs">
              In 3 Days
            </span>
          </Link>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => router.push('/community/events/hackcampus')}
              className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              Explore Chapter
            </button>

            <button
              onClick={() => setShowApplyModal(true)}
              className="py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm shadow-indigo-300 flex items-center justify-center gap-1 transition-transform active:scale-98"
            >
              <span>Apply Core Role</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* My Societies Strip */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-extrabold text-slate-900">My Societies</h3>
            <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-[10px] font-bold">
              3 Active
            </span>
          </div>
          <button 
            onClick={() => alert('Manage membership roles and notification alerts')}
            className="text-xs font-semibold text-indigo-600 hover:underline"
          >
            Manage
          </button>
        </div>

        {/* 2 My Societies Mini Cards */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 font-black text-[10px] flex items-center justify-center">
                ACM
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">ACM DTU Chapter</div>
                <span className="px-1.5 py-0.2 rounded bg-emerald-50 text-emerald-700 text-[9px] font-bold">
                  Core Team
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Users className="w-3 h-3" /> 480
              </span>
              <span className="text-emerald-600 font-bold">● Sync Today</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-700 font-black text-[10px] flex items-center justify-center">
                RG
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-slate-900 truncate">Robotics Guild</div>
                <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 text-[9px] font-bold">
                  Member
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Users className="w-3 h-3" /> 210
              </span>
              <span className="text-slate-400">Weekly Meet</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campus Societies Directory */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-extrabold text-slate-900">Campus Societies Directory</h3>
            <p className="text-[10px] text-slate-400">Showing active chapters for 2024-25</p>
          </div>
          <div className="text-xs font-semibold text-slate-500 flex items-center gap-1 cursor-pointer">
            <span>Popular</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>

        {/* List of Society Cards */}
        <div className="space-y-3">
          {filteredSocieties.map((society) => (
            <div
              key={society.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${society.iconBg} flex items-center justify-center font-bold text-base`}>
                    {society.iconText}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{society.name}</h4>
                      {society.verified && <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />}
                    </div>
                    <p className="text-[10px] text-slate-500">
                      {society.category === 'technical' ? 'Technical & Cloud' : 'Cultural & Street Play'} • {society.membersCount}+ members
                    </p>
                  </div>
                </div>

                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${society.tagColor}`}>
                  {society.highlightTag}
                </span>
              </div>

              {/* Event or Notice Highlight Box */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 text-xs">
                <div className="font-bold text-slate-900 text-[11px] leading-snug">
                  {society.eventTitle}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {society.eventMeta}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {society.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                <button 
                  onClick={() => alert(`Opening ${society.name} chapter details & alumni directory.`)}
                  className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
                >
                  View Club
                </button>

                {society.isMember ? (
                  <button 
                    onClick={() => toggleMembership(society.id)}
                    className="py-2 px-3 rounded-xl bg-emerald-50 text-emerald-700 font-bold text-xs flex items-center justify-center gap-1 border border-emerald-200/60"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Member</span>
                  </button>
                ) : (
                  <button 
                    onClick={() => toggleMembership(society.id)}
                    className="py-2 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                  >
                    <span>{society.id === 'pratibimb' ? 'Register for Auditions 🎭' : 'Join Society 👥'}</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charter a New Society Card */}
      <div className="bg-indigo-50/70 rounded-3xl p-4 border border-indigo-200/80 space-y-3">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm shadow-indigo-300">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-900">Charter a New Society</h4>
            <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
              Have a specialized idea? Gather 15 student co-signers and an approved Faculty Advisor to get chartered with DTU Student Senate.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-[11px] text-indigo-700 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Dean Academic Guidelines</span>
          </div>

          <button
            onClick={() => setShowCharterModal(true)}
            className="py-2 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 transition-transform active:scale-95"
          >
            <span>Start Charter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Charter Modal */}
      {showCharterModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">New Society Charter Petition</h3>
              <button onClick={() => setShowCharterModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Proposed Society Name</label>
                <input
                  type="text"
                  placeholder="E.g., Quantum Computing DTU"
                  value={charterTitle}
                  onChange={(e) => setCharterTitle(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Faculty Advisor (Dept / Name)</label>
                <input
                  type="text"
                  placeholder="E.g., Dr. Rajesh Kumar (Dept. of IT)"
                  value={charterFaculty}
                  onChange={(e) => setCharterFaculty(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <p className="text-[10px] text-slate-400">A digital endorsement link will be sent to your advisor via DTU portal.</p>
              <button
                onClick={() => {
                  alert(`Charter draft for "${charterTitle || 'New Society'}" registered with Student Senate!`);
                  setShowCharterModal(false);
                }}
                className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl mt-2"
              >
                Submit Charter to Senate
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Apply Core Role Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Apply for ACM Core Role</h3>
              <button onClick={() => setShowApplyModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            {appliedRole ? (
              <div className="p-6 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <div className="text-xs font-bold text-slate-900">Application Submitted!</div>
                <div className="text-[11px] text-slate-500">Interview slot invitation will be sent to your Outlook Webmail.</div>
              </div>
            ) : (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Track</label>
                  <select className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <option>Technical Lead (Web/AI)</option>
                    <option>Event Operations Lead</option>
                    <option>Sponsorship &amp; PR Coordinator</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Past Experience or GitHub</label>
                  <input
                    type="text"
                    defaultValue="https://github.com/rahul-sharma"
                    className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
                <button
                  onClick={() => {
                    setAppliedRole(true);
                    setTimeout(() => {
                      setAppliedRole(false);
                      setShowApplyModal(false);
                    }, 1200);
                  }}
                  className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl"
                >
                  Submit Application
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
