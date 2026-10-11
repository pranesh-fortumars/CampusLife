'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Share2, 
  FileText, 
  Star, 
  ExternalLink, 
  GitFork, 
  Code2, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  QrCode, 
  Cpu, 
  Database, 
  Layers, 
  ArrowLeft,
  X,
  Sparkles,
  ChevronRight,
  GitBranch
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  status: string;
  statusColor: string;
  category: 'web' | 'systems';
  description: string;
  progressPct?: number;
  progressNote?: string;
  metricLabel?: string;
  metricValue?: string;
  metricBadge?: string;
  tags: string[];
  stars: number;
}

export default function ProjectPortfolioPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'web' | 'systems'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Form state
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');

  const [projects, setProjects] = useState<ProjectItem[]>([
    {
      id: 'p1',
      title: 'CampusLife Peer Notes & Vault',
      subtitle: 'Beta Testing (CSE Dept)',
      status: 'In Progress',
      statusColor: 'text-purple-600',
      category: 'web',
      description: 'Collaborative academic repository with OCR search, verified professor lecture notes, and semester-wise past year solutions.',
      progressPct: 85,
      progressNote: 'Launching campus-wide next week',
      tags: ['Next.js 14', 'Tailwind', 'PostgreSQL', 'Meilisearch'],
      stars: 184
    },
    {
      id: 'p2',
      title: 'Distributed Cache & Raft Store',
      subtitle: 'Open Source Engine',
      status: 'Completed',
      statusColor: 'text-emerald-600',
      category: 'systems',
      description: 'Built-from-scratch Go implementation of Raft consensus protocol with distributed log replication, state snapshotting, and WAL storage.',
      metricLabel: 'Benchmarked Latency',
      metricValue: 'Sub-2ms write latency (5 nodes)',
      metricBadge: 'High Perf',
      tags: ['Golang', 'gRPC', 'Protobuf', 'Docker'],
      stars: 512
    },
    {
      id: 'p3',
      title: 'EdTech Real-Time Quiz Engine',
      subtitle: 'Socket Mesh',
      status: 'Milestone 3/4',
      statusColor: 'text-amber-600',
      category: 'web',
      description: 'Real-time adaptive testing platform featuring sub-second synchronization, WebSocket live polling, and Redis sliding leaderboard.',
      tags: ['Node.js', 'Express', 'MongoDB', 'Socket.io', 'Redis'],
      stars: 124
    }
  ]);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;

    const newP: ProjectItem = {
      id: `p-${Date.now()}`,
      title: newProjectName.trim(),
      subtitle: 'New Repository',
      status: 'In Progress',
      statusColor: 'text-indigo-600',
      category: 'web',
      description: newProjectDesc.trim() || 'Custom collegiate technical engineering initiative.',
      tags: newProjectTech.split(',').map(t => t.trim()).filter(Boolean),
      stars: 1
    };

    setProjects([newP, ...projects]);
    setShowAddModal(false);
    setNewProjectName('');
    setNewProjectDesc('');
    setNewProjectTech('');
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const filteredProjects = projects.filter(p => {
    if (selectedFilter === 'all') return true;
    return p.category === selectedFilter;
  });

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Profile Header Box */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-subtle p-4 space-y-3.5">
        
        {/* Top Info Row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Rahul Sharma"
                className="w-14 h-14 rounded-2xl object-cover ring-2 ring-indigo-100"
              />
              <span className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white absolute -bottom-1 -right-1 flex items-center justify-center text-[9px] text-white font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base font-black text-slate-900 leading-tight">
                  Rahul Sharma
                </h1>
                <span className="px-1.5 py-0.2 rounded bg-indigo-600 text-[9px] font-extrabold text-white">
                  PRO
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                3rd Year B.Tech CSE • DTU
              </p>
              <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Open to Summer &apos;25 SDE Internships</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => alert('Official Verified Student Portfolio QR: UID DTU-2022-CSE-098')}
            className="p-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
            title="View Verified QR"
          >
            <QrCode className="w-5 h-5" />
          </button>
        </div>

        {/* 4 Quick Metric Badges */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-sm font-black text-slate-900">{projects.length + 2}</div>
            <div className="text-[10px] text-slate-400 font-medium">Projects</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-sm font-black text-indigo-600">2</div>
            <div className="text-[10px] text-slate-400 font-medium">Live DTU</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-sm font-black text-purple-600">3</div>
            <div className="text-[10px] text-slate-400 font-medium">Hack Wins</div>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-sm font-black text-amber-500 flex items-center justify-center gap-0.5">
              <span>1.2k</span>
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
            </div>
            <div className="text-[10px] text-slate-400 font-medium">GH Stars</div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className="flex items-center gap-2 pt-0.5">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-300 transition-transform active:scale-98"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>

          <button
            onClick={handleShare}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? 'Copied!' : 'Share'}</span>
          </button>

          <Link
            href="/growth"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Readiness Tracker"
          >
            <FileText className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* Filter Repositories */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-slate-800">
          <span className="uppercase text-[10px] text-slate-400">FILTER REPOSITORIES</span>
          <span className="text-[11px] text-indigo-600">{projects.length + 1} total</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({projects.length + 1})
          </button>

          <button
            onClick={() => setSelectedFilter('web')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'web'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Full-Stack &amp; Web (3)
          </button>

          <button
            onClick={() => setSelectedFilter('systems')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
              selectedFilter === 'systems'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Systems &amp; IoT (2)
          </button>
        </div>
      </div>

      {/* FEATURED MASTERPIECE CARD (SmartCampus Parking) */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-subtle overflow-hidden space-y-3">
        
        {/* Banner with Architecture Visual */}
        <div className="relative bg-slate-900 p-4 text-white overflow-hidden min-h-[140px] flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 opacity-95"></div>
          
          {/* Subtle Grid overlay */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-indigo-300 text-[10px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FEATURED MASTERPIECE</span>
            </div>
            <span className="text-[10px] font-medium text-slate-400">
              Production Deployed
            </span>
          </div>

          <div className="relative z-10 flex flex-wrap gap-1.5 pt-6">
            <span className="px-2 py-0.5 rounded-md bg-teal-500/20 border border-teal-400/40 text-teal-300 text-[10px] font-extrabold">
              DEPLOYED IN DTU
            </span>
            <span className="px-2 py-0.5 rounded-md bg-purple-500/20 border border-purple-400/40 text-purple-300 text-[10px] font-extrabold">
              HackCampus 1st Prize
            </span>
            <span className="px-2 py-0.5 rounded-md bg-indigo-500/30 text-indigo-200 text-[10px] font-bold">
              Team Lead
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-4 pt-1 space-y-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
              SmartCampus Parking IoT &amp; Automated Allocation
            </h2>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Computer vision &amp; MQTT edge gateway for university vehicle triage
            </p>
          </div>

          {/* Verified Campus Impact Box */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Campus Impact</span>
            </div>
            <p className="text-[11px] text-emerald-900 leading-relaxed">
              Eliminated 25-minute car parking queues at DTU North Gate. Formal adoption by DTU Proctorial Board for 1,400 daily vehicle transits.
            </p>
          </div>

          {/* Tech Stack Chips */}
          <div className="flex flex-wrap gap-1.5">
            {['Python', 'OpenCV', 'FastAPI', 'React Native', 'MQTT', 'Docker'].map((tech) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[10px] font-mono font-medium"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer with Team & Demo Button */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 overflow-hidden">
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-indigo-600 text-white text-[9px] font-bold text-center leading-6">RS</span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-purple-600 text-white text-[9px] font-bold text-center leading-6">PN</span>
                <span className="inline-block h-6 w-6 rounded-full ring-2 ring-white bg-teal-600 text-white text-[9px] font-bold text-center leading-6">KV</span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium">
                Rahul (Lead), Priya, Kabir
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                &lt;&gt; 420 ★
              </span>
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs transition-colors"
              >
                <span>Demo</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Curated Technical Projects List */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold text-slate-900">Curated Technical Projects</h3>
          <span className="text-[10px] text-slate-400">Production &amp; Core Systems</span>
        </div>

        <div className="space-y-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3"
            >
              {/* Top row */}
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{project.title}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-slate-500 mt-0.5">
                    <span className={`font-bold ${project.statusColor}`}>● {project.status}</span>
                    <span>• {project.subtitle}</span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <p className="text-[11px] text-slate-600 leading-relaxed">
                {project.description}
              </p>

              {/* Progress Bar (if in progress) */}
              {project.progressPct && (
                <div className="p-2.5 rounded-xl bg-indigo-50/60 border border-indigo-100/70 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-600">Development Progress</span>
                    <span className="text-indigo-700">{project.progressPct}% Completed</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${project.progressPct}%` }}
                    />
                  </div>
                  <div className="text-[9px] text-slate-400 italic mt-0.5">
                    {project.progressNote}
                  </div>
                </div>
              )}

              {/* Latency Box (if benchmarked) */}
              {project.metricValue && (
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400">{project.metricLabel}</div>
                    <div className="text-xs font-bold text-slate-900">{project.metricValue}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100">
                    {project.metricBadge}
                  </span>
                </div>
              )}

              {/* Tags & Stars */}
              <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap gap-1">
                  {project.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-md font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-500 shrink-0 flex items-center gap-1">
                  ⭐ {project.stars}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Faculty Endorsements Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">Faculty Endorsements</h3>
              <p className="text-[10px] text-slate-400">Verified DTU Academic Council Registry</p>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold text-[9px] border border-emerald-200">
            VERIFIED
          </span>
        </div>

        {/* Endorsement 1 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[10px] flex items-center justify-center">
                AR
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Prof. Dr. Ananya Roy</div>
                <div className="text-[10px] text-slate-400">HOD, Dept. of Computer Engineering</div>
              </div>
            </div>
            <Award className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <p className="text-[11px] text-slate-600 italic leading-relaxed">
            &ldquo;Rahul demonstrated exceptional distributed systems acumen in the parking IoT pilot. His codebase conforms with departmental integrity guidelines.&rdquo;
          </p>
        </div>

        {/* Endorsement 2 */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-[10px] flex items-center justify-center">
                SR
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">Dr. S. Rao</div>
                <div className="text-[10px] text-slate-400">Faculty Advisor, DTU Hackathon Guild</div>
              </div>
            </div>
            <Award className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <p className="text-[11px] text-slate-600 italic leading-relaxed">
            &ldquo;Consistent winner in collegiate hackathons with a focus on genuine real-world problem solving and reliable code architectures.&rdquo;
          </p>
        </div>

        <div className="text-[10px] text-slate-400 text-center pt-1 border-t border-slate-100">
          Institutional Project Integrity Verified • UID: <span className="font-mono text-slate-600">DTU-2022-CSE-098</span>
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateProject} className="bg-white rounded-3xl max-w-sm w-full p-5 text-slate-900 shadow-2xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">Add Technical Project</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="E.g., High-Throughput L7 Load Balancer"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Architecture Summary</label>
                <textarea
                  rows={3}
                  placeholder="Engineered with Go &amp; eBPF..."
                  value={newProjectDesc}
                  onChange={(e) => setNewProjectDesc(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tech Stack (comma separated)</label>
                <input
                  type="text"
                  placeholder="Go, Docker, eBPF, Prometheus"
                  value={newProjectTech}
                  onChange={(e) => setNewProjectTech(e.target.value)}
                  className="w-full p-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl mt-2"
              >
                Publish to Portfolio
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}
