'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart2, 
  Code, 
  Briefcase, 
  Sparkles, 
  ExternalLink, 
  Plus, 
  Star, 
  Filter, 
  ChevronRight, 
  Download, 
  Award, 
  Trophy, 
  CheckCircle, 
  Calendar, 
  Building2,
  Clock,
  Flame,
  Check,
  X
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function GrowthPage() {
  const { profile, projects, skills, applications, addSkill, addProject } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'skills' | 'projects'>('overview');
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [showAddProjModal, setShowAddProjModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'Intermediate' | 'Proficient' | 'Advanced'>('Proficient');
  const [newProjTitle, setNewProjTitle] = useState('');
  const [newProjTagline, setNewProjTagline] = useState('');
  const [newProjTech, setNewProjTech] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  const handleCreateSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;
    addSkill(newSkillName.trim(), newSkillLevel);
    setNewSkillName('');
    setShowAddSkillModal(false);
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjTitle.trim()) return;
    const stack = newProjTech.split(',').map(s => s.trim()).filter(Boolean);
    addProject(newProjTitle.trim(), stack, newProjTagline.trim());
    setNewProjTitle('');
    setNewProjTagline('');
    setNewProjTech('');
    setShowAddProjModal(false);
  };

  const handleExportCV = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Rahul_Sharma_DTU_Resume.pdf generated and ready for placement cell sync!');
    }, 1000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Top Student Hero Image Container */}
      <div className="relative w-full h-64 rounded-3xl overflow-hidden bg-gradient-to-b from-indigo-600 via-indigo-700 to-primary flex items-center justify-center shadow-lg shadow-indigo-200">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        
        {/* Arch profile visual */}
        <div className="relative w-48 h-56 rounded-t-full rounded-b-3xl overflow-hidden border-4 border-white/90 shadow-2xl">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Subnav Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <BarChart2 className="w-3.5 h-3.5" />
          Overview
        </button>

        <button
          onClick={() => setActiveTab('skills')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
            activeTab === 'skills'
              ? 'bg-primary text-white shadow-sm shadow-indigo-200'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Code className="w-3.5 h-3.5" />
          Skills Matrix
        </button>

        <Link
          href="/growth/portfolio"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
        >
          <Briefcase className="w-3.5 h-3.5" />
          Project Portfolio
        </Link>
      </div>

      {/* PLACEMENT BENCHMARK - Readiness Score Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Placement Benchmark
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              Readiness Score
            </h3>
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-bold text-[10px] rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            Top 15% in Cohort
          </span>
        </div>

        {/* Gauge & Metrics Split */}
        <div className="flex items-center gap-4">
          {/* Circular Gauge */}
          <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-primary transition-all duration-1000"
                strokeDasharray={`${profile.readinessScore}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-base font-black text-slate-900 leading-none">
                {profile.readinessScore}%
              </span>
              <span className="text-[9px] text-slate-400 font-medium">Ready</span>
            </div>
          </div>

          {/* 4 Metric Sub-stats */}
          <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Resume Comp.</span>
              <span className="font-bold text-slate-900">{profile.resumeScore}%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Tech Projects</span>
              <span className="font-bold text-slate-900">{profile.projectsCount} <span className="text-[10px] text-slate-400 font-normal">(1 to goal)</span></span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Skills Verified</span>
              <span className="font-bold text-slate-900">{profile.skillsVerifiedCount} / {profile.skillsTotalCount} core</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">LeetCode Streak</span>
              <span className="font-bold text-purple-600 flex items-center gap-0.5">
                {profile.leetcodeStreak}d <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
              </span>
            </div>
          </div>
        </div>

        {/* Resume Copilot AI CTA */}
        <div className="bg-purple-50 hover:bg-purple-100/80 transition-colors border border-purple-100 rounded-2xl p-3 flex items-center justify-between cursor-pointer">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-purple-950">Resume Copilot AI</h4>
              <p className="text-[10px] text-purple-700">Add ML system metrics for +6% score boost</p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-purple-500" />
        </div>
      </div>

      {/* Active Projects Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Active Projects</h3>
            <p className="text-[10px] text-slate-400">Validated technical work &amp; repo integrations</p>
          </div>
          <button 
            onClick={() => setShowAddProjModal(true)}
            className="text-[11px] font-bold text-primary hover:underline flex items-center gap-0.5"
          >
            All {projects.length} <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-3">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-2.5"
            >
              <div className="flex items-start justify-between">
                <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1 ${
                  proj.statusColor === 'emerald'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                }`}>
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {proj.statusBadge}
                </span>
                <Code className="w-4 h-4 text-slate-400" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {proj.title}
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                  {proj.tagline}
                </p>
              </div>

              {/* Progress bar if in progress */}
              {proj.progressPercent && proj.progressPercent < 100 && (
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>Socket.io Synchronization Phase</span>
                    <span className="font-bold">{proj.progressPercent}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${proj.progressPercent}%` }} />
                  </div>
                </div>
              )}

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5">
                {proj.techStack.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-medium rounded-lg">
                    {t}
                  </span>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
                <span className="text-[11px] text-slate-500 font-medium">
                  {proj.role}
                </span>
                {proj.demoUrl ? (
                  <a
                    href={proj.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1 bg-primary text-white rounded-xl text-xs font-semibold flex items-center gap-1 hover:bg-primary-dark transition-colors"
                  >
                    Demo <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold hover:bg-slate-200">
                    View Tasks
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Matrix Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Skills Matrix</h3>
            <p className="text-[10px] text-slate-400">Assessed via labs &amp; peer code reviews</p>
          </div>
          <button
            onClick={() => setShowAddSkillModal(true)}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary text-xs font-semibold rounded-xl flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Skill
          </button>
        </div>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3.5">
          {skills.map((skill) => (
            <div key={skill.id} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-indigo-50 text-primary flex items-center justify-center font-bold text-xs">
                    <Code className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  skill.level === 'Advanced'
                    ? 'bg-emerald-100 text-emerald-800'
                    : skill.level === 'Proficient'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {skill.level}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium pl-8">
                <span>★ {skill.rating} / 5.0 • {skill.endorsements}</span>
              </div>

              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden pl-8">
                <div 
                  className={`h-full rounded-full ${
                    skill.level === 'Advanced' ? 'bg-emerald-500' : skill.level === 'Proficient' ? 'bg-primary' : 'bg-blue-500'
                  }`}
                  style={{ width: `${(skill.rating / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Pipeline Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-slate-900">Internship Pipeline</h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
              {applications.length} Active
            </span>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <Filter className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[10px] text-slate-400 -mt-2">Fall &amp; Summer 2024 hiring cycle</p>

        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
          {/* Stage 1: Applied */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                Applied
              </span>
              <span className="text-[10px] text-slate-500">3 Companies</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['Microsoft', 'Razorpay', 'Swiggy'].map(c => (
                <span key={c} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-medium rounded-xl shadow-2xs">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Stage 2: OA */}
          <div className="p-3 bg-purple-50/70 rounded-2xl border border-purple-100 space-y-2.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-purple-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                Online Assessment (OA)
              </span>
              <span className="text-[10px] font-semibold text-purple-700">2 Pending</span>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-purple-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900">Zomato • SDE Intern</span>
                <p className="text-[10px] text-purple-600 font-medium">Due in 19 hours (HackerRank)</p>
              </div>
              <button className="px-3 py-1 bg-primary text-white text-[11px] font-semibold rounded-lg shadow-sm">
                Start Test
              </button>
            </div>

            <div className="bg-white p-2.5 rounded-xl border border-purple-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-slate-900">Atlassian • Systems Intern</span>
                <p className="text-[10px] text-slate-500">Window closes Oct 31</p>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-lg uppercase">
                Ready
              </span>
            </div>
          </div>

          {/* Stage 3: Interview Scheduled */}
          <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                Interview Scheduled
              </span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 bg-emerald-600 text-white rounded uppercase">
                Priority
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-emerald-100 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900">PhonePe</h5>
                  <p className="text-[11px] text-slate-600">Round 1: Technical &amp; System Concepts</p>
                </div>
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-xs">
                  Pe
                </div>
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-50">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Tuesday, Oct 29 • 04:30 PM
                </span>
                <span className="font-bold text-primary hover:underline cursor-pointer">
                  Prep Notes →
                </span>
              </div>
            </div>
          </div>

          <button className="w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200">
            <Briefcase className="w-3.5 h-3.5" />
            Open Full Kanban Workspace
          </button>
        </div>
      </div>

      {/* Milestones & Honors Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Milestones &amp; Honors</h3>
            <p className="text-[10px] text-slate-400">Campus accolades &amp; verified credentials</p>
          </div>
          <Award className="w-4 h-4 text-primary" />
        </div>

        <div className="space-y-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex items-start gap-3">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl mt-0.5">
              <Trophy className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Hackathon Finalist</h4>
                <span className="text-[10px] text-slate-400">Dec 2023</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Smart India Hackathon (SIH) — Finished 4th of 120 national teams with IoT Waste Fleet prototype.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex items-start gap-3">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-xl mt-0.5">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">AWS Cloud Practitioner</h4>
                <span className="text-[10px] text-slate-400">Aug 2023</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Amazon Web Services Credential ID CLF-C02-892101. Validated core cloud infrastructure concepts.
              </p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-100 shadow-subtle flex items-start gap-3">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-xl mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">Top Open-Source Contributor</h4>
                <span className="text-[10px] text-slate-400">Semester 5</span>
              </div>
              <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">
                Awarded by College Developer Student Club for 32 merged PRs on the central campus timetable app.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Placement Cell Sync Dock */}
      <div className="bg-white rounded-3xl p-3 border border-indigo-100 shadow-sm flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-slate-900 block leading-tight">Placement Cell Sync</span>
          <span className="text-[10px] text-slate-400 font-medium">Last synced today at 09:30 AM</span>
        </div>
        <button
          onClick={handleExportCV}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-bold shadow-md shadow-indigo-300 flex items-center gap-1.5 transition-all active:scale-95"
        >
          <Download className={`w-3.5 h-3.5 ${isExporting ? 'animate-bounce' : ''}`} />
          {isExporting ? 'Exporting...' : 'Export CV'}
        </button>
      </div>

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateSkill} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-4">
            <h3 className="text-sm font-bold text-slate-900">Add Skill to Matrix</h3>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">Skill Name</label>
              <input
                type="text"
                placeholder="e.g. Next.js, Docker, Kubernetes"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                autoFocus
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">Proficiency Level</label>
              <select
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="Intermediate">Intermediate (3.0/5.0)</option>
                <option value="Proficient">Proficient (4.0/5.0)</option>
                <option value="Advanced">Advanced (4.5/5.0)</option>
              </select>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddSkillModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Save Skill
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddProjModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateProject} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Add Project</h3>
            <input
              type="text"
              placeholder="Project Title"
              value={newProjTitle}
              onChange={(e) => setNewProjTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              autoFocus
            />
            <input
              type="text"
              placeholder="Tagline / Short description"
              value={newProjTagline}
              onChange={(e) => setNewProjTagline(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <input
              type="text"
              placeholder="Technologies (comma separated, e.g. Python, OpenCV)"
              value={newProjTech}
              onChange={(e) => setNewProjTech(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddProjModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Create Project
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
