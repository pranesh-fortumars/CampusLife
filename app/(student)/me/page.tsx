'use client';

import React, { useState } from 'react';
import { 
  User, 
  Edit3, 
  Share2, 
  ShieldCheck, 
  Plus, 
  Calendar, 
  Settings, 
  Download, 
  Bot, 
  Bell, 
  Moon, 
  IndianRupee, 
  Lock, 
  ChevronRight, 
  CheckCircle2, 
  FileText,
  X,
  Sparkles
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function MePage() {
  const { profile, timeline, updateProfile } = useApp();

  const [selectedTimelineFilter, setSelectedTimelineFilter] = useState('all');
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name);
  const [bioInput, setBioInput] = useState(profile.bio);

  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryDesc, setMemoryDesc] = useState('');
  const [memoryTag, setMemoryTag] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput,
      bio: bioInput
    });
    setShowEditProfileModal(false);
  };

  const handleDownloadPortfolio = () => {
    alert('Generating Verified DTU Semester 6 Marksheet & Portfolio (PDF)... Ready!');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Student Profile Card Header */}
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-subtle flex flex-col items-center text-center relative overflow-hidden">
        {/* Verified Profile Photo */}
        <div className="relative mb-2">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-20 h-20 rounded-full object-cover ring-4 ring-indigo-50 shadow-md"
          />
          <div className="absolute bottom-0 right-0 p-1 bg-primary text-white rounded-full ring-2 ring-white">
            <CheckCircle2 className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Student Name & CR badge */}
        <div className="flex items-center gap-1.5 mt-1">
          <h2 className="text-base font-bold text-slate-900">{profile.name}</h2>
          {profile.isCR && (
            <span className="px-1.5 py-0.5 bg-primary text-white text-[9px] font-bold rounded">
              CR
            </span>
          )}
        </div>

        {/* Degree & Year */}
        <p className="text-xs font-semibold text-primary mt-0.5">
          {profile.year}rd Year • {profile.branch}
        </p>

        {/* College & Roll number */}
        <p className="text-[11px] text-slate-500 font-medium mt-1 flex items-center gap-1">
          <span>🎓 {profile.college}</span>
          <span>•</span>
          <span>{profile.rollNumber}</span>
        </p>

        {/* Bio */}
        <p className="text-xs text-slate-600 mt-2.5 max-w-xs leading-relaxed">
          {profile.bio}
        </p>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mt-4 w-full">
          <button
            onClick={() => setShowEditProfileModal(true)}
            className="flex-1 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            Edit Profile
          </button>
          <button
            onClick={() => alert('Student Card Link copied to clipboard!')}
            className="flex-1 py-2 bg-indigo-50 hover:bg-indigo-100 text-primary rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Card
          </button>
        </div>
      </div>

      {/* 4 Stats Grid */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-subtle text-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">CGPA</span>
          <span className="text-base font-black text-indigo-700 block mt-0.5">{profile.cgpa}</span>
          <span className="text-[8px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded">Top 8%</span>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-subtle text-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Attendance</span>
          <span className="text-base font-black text-slate-900 block mt-0.5">{profile.overallAttendance}%</span>
          <span className="text-[8px] font-bold text-teal-700 bg-teal-50 px-1 py-0.2 rounded">Safe &gt;75%</span>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-subtle text-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Projects</span>
          <span className="text-base font-black text-slate-900 block mt-0.5">{profile.projectsCount}</span>
          <span className="text-[8px] font-bold text-purple-700 bg-purple-50 px-1 py-0.2 rounded">2 Live</span>
        </div>

        <div className="bg-white p-2.5 rounded-2xl border border-slate-100 shadow-subtle text-center">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Network</span>
          <span className="text-base font-black text-slate-900 block mt-0.5">{profile.networkCount}</span>
          <span className="text-[8px] font-bold text-blue-700 bg-blue-50 px-1 py-0.2 rounded">DTU Peers</span>
        </div>
      </div>

      {/* Campus Privacy Guard Banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3.5 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Campus Privacy Guard</span>
          </div>
          <span className="px-1.5 py-0.5 bg-emerald-500 text-white text-[9px] font-bold rounded uppercase">
            Active
          </span>
        </div>
        <p className="text-[11px] text-indigo-900/80 leading-relaxed">
          Academic records, attendance metrics, and fee dues are encrypted &amp; private to you. Only showcased projects and club badges are publicly viewable on campus.
        </p>
      </div>

      {/* DTU Journey - College Life Timeline */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              DTU Journey
            </span>
            <h3 className="text-xs font-bold text-slate-900">
              College Life Timeline
            </h3>
          </div>
          <button
            onClick={() => setShowAddMemoryModal(true)}
            className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-primary text-xs font-semibold rounded-xl flex items-center gap-1"
          >
            <Plus className="w-3 h-3" />
            Add Memory
          </button>
        </div>

        {/* Timeline Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {[
            { id: 'all', label: 'All (4 Yrs)' },
            { id: 'sem6', label: 'Sem 6 (Current)' },
            { id: 'sem5', label: 'Sem 5' },
            { id: 'sem4', label: 'Sem 4' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedTimelineFilter(f.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedTimelineFilter === f.id
                  ? 'bg-primary text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Vertical Timeline Tree */}
        <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-indigo-200">
          {timeline.map((item, idx) => (
            <div key={item.id} className="relative space-y-1.5">
              {/* Timeline Bullet Node */}
              <div className={`absolute -left-6 top-1.5 w-3.5 h-3.5 rounded-full ring-4 ring-white ${
                idx === 0
                  ? 'bg-primary'
                  : idx === 1
                  ? 'bg-purple-600'
                  : idx === 2
                  ? 'bg-teal-600'
                  : 'bg-slate-600'
              }`} />

              <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                    {item.period}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    {item.badgeText}
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 leading-snug">
                  {item.title}
                </h4>

                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-indigo-50 text-indigo-800 text-[10px] font-medium rounded-lg">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Settings & Portfolio Hub */}
      <div className="space-y-3 pt-2">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Preferences &amp; Tools
          </span>
          <h3 className="text-xs font-bold text-slate-900">
            Settings &amp; Portfolio Hub
          </h3>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-subtle divide-y divide-slate-100 overflow-hidden">
          {/* Item 1: Copilot AI Settings */}
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Campus Copilot AI Settings</p>
                <p className="text-[10px] text-slate-400">Syllabus ingestion, mock viva tone &amp; permissions</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Item 2: Notification Preferences */}
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-primary flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Notification Preferences</p>
                <p className="text-[10px] text-slate-400">Quiet hours (exam mode), class alert buzzer</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          {/* Item 3: Appearance & Theme */}
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <Moon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Appearance &amp; Theme</p>
                <p className="text-[10px] text-slate-400">System Light default • Dark Navy available</p>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-slate-500">Light &gt;</span>
          </div>

          {/* Item 4: Expense & Budget */}
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Expense &amp; Budget (₹ INR)</p>
                <p className="text-[10px] text-slate-400">Canteen dues, stationery ledger</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded">
              ₹1,420 Due
            </span>
          </div>

          {/* Item 5: Download Semester Portfolio */}
          <div 
            onClick={handleDownloadPortfolio}
            className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-primary flex items-center justify-center">
                <Download className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Download Semester Portfolio</p>
                <p className="text-[10px] text-slate-400">Verified DTU marksheet &amp; PDF resume export</p>
              </div>
            </div>
            <Download className="w-4 h-4 text-primary" />
          </div>

          {/* Item 6: Security & Data Control */}
          <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800">Security &amp; Data Control</p>
                <p className="text-[10px] text-slate-400">2FA device approvals, revoke campus apps</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditProfileModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Edit Student Profile</h3>
              <button onClick={() => setShowEditProfileModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">Full Name</label>
              <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-400 uppercase">Campus Bio</label>
              <textarea
                rows={3}
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowEditProfileModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddMemoryModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900">Add Timeline Memory</h3>
              <button onClick={() => setShowAddMemoryModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Memory title (e.g. Won Hackathon 2024)"
              value={memoryTitle}
              onChange={(e) => setMemoryTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <textarea
              rows={3}
              placeholder="Description of the milestone or event..."
              value={memoryDesc}
              onChange={(e) => setMemoryDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddMemoryModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600 font-medium"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Memory added to DTU College Journey timeline!');
                  setShowAddMemoryModal(false);
                }}
                className="px-4 py-1.5 bg-primary text-white rounded-xl text-xs font-semibold shadow-sm"
              >
                Add Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
