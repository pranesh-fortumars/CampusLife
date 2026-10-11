'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  Volume2, 
  VolumeX, 
  Volume1, 
  Headphones, 
  CloudRain, 
  Coffee, 
  Users, 
  Flame, 
  CheckSquare, 
  Square, 
  Plus, 
  ChevronDown, 
  Sparkles, 
  ArrowLeft,
  Target,
  Clock,
  BookOpen
} from 'lucide-react';

export default function DeepWorkStudyRoomPage() {
  const router = useRouter();
  
  // Active subject state
  const [selectedSubject, setSelectedSubject] = useState('CS-302: Database Management Systems');
  const [showSubjectMenu, setShowSubjectMenu] = useState(false);
  const [mode, setMode] = useState<'pomodoro' | 'deepwork' | 'sprint'>('deepwork');

  // Timer state
  const totalSecondsByMode = {
    pomodoro: 25 * 60,
    deepwork: 50 * 60,
    sprint: 90 * 60
  };

  const [secondsLeft, setSecondsLeft] = useState(38 * 60 + 45); // 38:45 from mockup
  const [isRunning, setIsRunning] = useState(true);
  const [sessionCount, setSessionCount] = useState(2);
  const [totalSessions, setTotalSessions] = useState(4);

  // Sound state
  const [ambientSound, setAmbientSound] = useState<'library' | 'rain' | 'cafe'>('library');
  const [volume, setVolume] = useState(65);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // High-fives
  const [highFiveCount, setHighFiveCount] = useState(14);
  const [sentHighFive, setSentHighFive] = useState(false);

  // Milestones tasks
  const [milestones, setMilestones] = useState([
    { id: 'm1', text: 'Review B+ Tree insertion & leaf node overflow edge cases', completed: true },
    { id: 'm2', text: 'Solve 5 BCNF decomposition questions from Tutorial Sheet 4', completed: false },
    { id: 'm3', text: 'Write summary formula sheet for Mid-Sem storage & index sizing', completed: false }
  ]);
  const [newSubTask, setNewSubTask] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  // Timer ticker
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  // Mode change handler
  const handleModeChange = (newMode: 'pomodoro' | 'deepwork' | 'sprint') => {
    setMode(newMode);
    setSecondsLeft(totalSecondsByMode[newMode]);
    setIsRunning(true);
  };

  const handleReset = () => {
    setSecondsLeft(totalSecondsByMode[mode]);
    setIsRunning(false);
  };

  const handleSkip = () => {
    setSessionCount(prev => Math.min(prev + 1, totalSessions));
    setSecondsLeft(totalSecondsByMode[mode]);
  };

  const toggleMilestone = (id: string) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m));
  };

  const handleAddMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubTask.trim()) return;
    setMilestones(prev => [...prev, { id: `m-${Date.now()}`, text: newSubTask.trim(), completed: false }]);
    setNewSubTask('');
    setShowAddTask(false);
  };

  const handleHighFive = () => {
    setHighFiveCount(prev => prev + 1);
    setSentHighFive(true);
    setTimeout(() => setSentHighFive(false), 2000);
  };

  // Formatting mm:ss
  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const currentTotal = totalSecondsByMode[mode];
  const progressRatio = Math.max(0, Math.min(1, 1 - (secondsLeft / currentTotal)));
  const strokeDashoffset = 440 - (440 * progressRatio);

  const completedCount = milestones.filter(m => m.completed).length;

  return (
    <div className="p-4 space-y-4 pb-28">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between text-xs pb-1">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Link href="/track" className="hover:text-slate-900">Track</Link>
          <span>&gt;</span>
          <span className="text-slate-900 font-bold">Deep Work &amp; Study Room</span>
        </div>
        <Link 
          href="/track/subjects/dbms" 
          className="text-xs font-semibold text-indigo-600 hover:underline"
        >
          Subject Details
        </Link>
      </div>

      {/* Active Target Banner */}
      <div className="p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-1.5 relative">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            ACTIVE TARGET
          </span>

          <div className="relative">
            <button
              onClick={() => setShowSubjectMenu(!showSubjectMenu)}
              className="flex items-center gap-1 text-[11px] font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg"
            >
              <span>Change Subject</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            {showSubjectMenu && (
              <div className="absolute right-0 top-full mt-1.5 w-64 bg-white rounded-xl shadow-lg border border-slate-200 py-1 z-30 text-xs">
                {[
                  'CS-302: Database Management Systems',
                  'CS-304: Operating Systems',
                  'CS-306: Computer Networks',
                  'CS-308: Software Engineering'
                ].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setSelectedSubject(s);
                      setShowSubjectMenu(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium hover:bg-slate-50 ${
                      selectedSubject === s ? 'text-indigo-600 font-bold bg-indigo-50/50' : 'text-slate-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <h2 className="text-sm font-extrabold text-slate-900 leading-snug">
          {selectedSubject}
        </h2>

        <div className="flex items-start gap-1.5 text-[11px] text-slate-500">
          <Target className="w-3.5 h-3.5 text-indigo-500 shrink-0 mt-0.5" />
          <span>Goal: Complete B+ Tree Indexing &amp; 3NF Normalization exercises</span>
        </div>
      </div>

      {/* Timer Mode Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold">
        <button
          onClick={() => handleModeChange('pomodoro')}
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            mode === 'pomodoro' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Pomodoro (25/5)
        </button>

        <button
          onClick={() => handleModeChange('deepwork')}
          className={`flex-1 py-1.5 text-center rounded-xl transition-all flex items-center justify-center gap-1 ${
            mode === 'deepwork' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>⚡ Deep Work (50/10)</span>
        </button>

        <button
          onClick={() => handleModeChange('sprint')}
          className={`flex-1 py-1.5 text-center rounded-xl transition-all ${
            mode === 'sprint' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Exam Sprint
        </button>
      </div>

      {/* Circular Timer Section */}
      <div className="bg-white rounded-[28px] border border-slate-200/90 shadow-subtle p-6 flex flex-col items-center justify-center space-y-4">
        
        {/* SVG Circular Progress Ring */}
        <div className="relative w-56 h-56 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="text-slate-100"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              className="text-indigo-600 transition-all duration-1000 ease-linear"
              strokeWidth="10"
              strokeDasharray="440"
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
            />
          </svg>

          {/* Center Digital Display */}
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-4xl font-black text-slate-900 tracking-tight font-mono">
              {timeFormatted}
            </span>
            <span className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold tracking-wider border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              IN THE FLOW
            </span>
          </div>
        </div>

        {/* Session Progress Subtitle */}
        <div className="text-center">
          <div className="text-xs font-bold text-slate-800">
            Session {sessionCount} of {totalSessions}
          </div>
          <div className="text-[11px] text-slate-400 mt-0.5">
            Deep Focus Mode • 11m 15s elapsed
          </div>
        </div>

        {/* Timer Controls Row */}
        <div className="flex items-center gap-4 pt-1">
          {/* Reset */}
          <button
            onClick={handleReset}
            className="w-11 h-11 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-transform active:scale-90"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pause / Play */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="py-3 px-8 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-300 flex items-center gap-2 transition-transform active:scale-95"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Resume</span>
              </>
            )}
          </button>

          {/* Skip / Next */}
          <button
            onClick={handleSkip}
            className="w-11 h-11 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 flex items-center justify-center transition-transform active:scale-90"
            title="Skip to next session"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Atmospheric Sound Section */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold text-slate-900">Atmospheric Sound</span>
          </div>

          {/* Slider */}
          <div className="flex items-center gap-2 w-32">
            <Volume1 className="w-3.5 h-3.5 text-slate-400" />
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full accent-indigo-600 h-1 bg-slate-200 rounded-lg cursor-pointer"
            />
            <Volume2 className="w-3.5 h-3.5 text-slate-400" />
          </div>
        </div>

        {/* Ambient Sound Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setAmbientSound('library')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              ambientSound === 'library'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Headphones className="w-3.5 h-3.5" />
            <span>Library Silence</span>
          </button>

          <button
            onClick={() => setAmbientSound('rain')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              ambientSound === 'rain'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <CloudRain className="w-3.5 h-3.5" />
            <span>Gentle Rain</span>
          </button>

          <button
            onClick={() => setAmbientSound('cafe')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              ambientSound === 'cafe'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Campus Cafe</span>
          </button>
        </div>
      </div>

      {/* DTU Central Library Virtual Room */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
              <h3 className="text-xs font-extrabold text-slate-900">
                DTU Central Library Virtual Room
              </h3>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              42 campus peers quietly studying together
            </p>
          </div>

          <button
            onClick={handleHighFive}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 ${
              sentHighFive
                ? 'bg-emerald-500 text-white'
                : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700'
            }`}
          >
            <span>High-Five 🙌</span>
            <span className="text-[10px] font-mono opacity-80">({highFiveCount})</span>
          </button>
        </div>

        {/* Peer rows */}
        <div className="space-y-2">
          {[
            { name: 'Priya N.', task: 'DBMS Revision', streak: '45m streak', color: 'bg-purple-100 text-purple-700' },
            { name: 'Kabir V.', task: 'Operating Systems', streak: '1h 20m streak', color: 'bg-indigo-100 text-indigo-700' },
            { name: 'Tanmay G.', task: 'Microcontrollers Lab', streak: '30m streak', color: 'bg-teal-100 text-teal-700' }
          ].map((peer, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full ${peer.color} font-bold text-[10px] flex items-center justify-center shrink-0`}>
                  {peer.name.slice(0, 2)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 leading-tight">{peer.name}</div>
                  <div className="text-[10px] text-slate-500">{peer.task}</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 text-[10px] font-semibold">
                {peer.streak}
              </span>
            </div>
          ))}
        </div>

        <p className="text-[10px] text-slate-400 text-center pt-1">
          +39 other classmates silently in the zone • Join with video off
        </p>
      </div>

      {/* 3 Metric Progress Boxes */}
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Total Focus</span>
          <div className="text-sm font-black text-slate-900">2h 15m</div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-600 rounded-full w-[64%]"></div>
          </div>
          <span className="text-[9px] text-slate-400 block">64% of 3h 30m</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Completed</span>
          <div className="text-sm font-black text-slate-900">3 Blocks</div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-600 rounded-full w-[75%]"></div>
          </div>
          <span className="text-[9px] text-slate-400 block">Goal: 4 blocks</span>
        </div>

        <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-slate-400 block uppercase">Streak</span>
          <div className="text-sm font-black text-slate-900 flex items-center gap-1">
            <span>5 Days</span>
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          </div>
          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 rounded-full w-full"></div>
          </div>
          <span className="text-[9px] font-bold text-emerald-600 block">Personal Best!</span>
        </div>
      </div>

      {/* Target Milestones Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckSquare className="w-4 h-4 text-indigo-600" />
            <h3 className="text-xs font-bold text-slate-900">Target Milestones</h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 text-[10px] font-bold">
            {completedCount} of {milestones.length} Done
          </span>
        </div>

        {/* Tasks list */}
        <div className="space-y-2">
          {milestones.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleMilestone(item.id)}
              className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <div className="mt-0.5 shrink-0 text-indigo-600">
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 fill-indigo-600 text-white" />
                ) : (
                  <Square className="w-4 h-4 text-slate-300" />
                )}
              </div>
              <span className={`text-xs leading-relaxed ${
                item.completed ? 'line-through text-slate-400 font-normal' : 'text-slate-800 font-medium'
              }`}>
                {item.text}
              </span>
            </div>
          ))}
        </div>

        {/* Add sub task */}
        {showAddTask ? (
          <form onSubmit={handleAddMilestone} className="flex gap-2 pt-1">
            <input
              type="text"
              placeholder="Enter new milestone or formula..."
              value={newSubTask}
              onChange={(e) => setNewSubTask(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
              autoFocus
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-indigo-600 text-white font-bold text-xs rounded-xl"
            >
              Add
            </button>
          </form>
        ) : (
          <button
            onClick={() => setShowAddTask(true)}
            className="w-full py-2.5 rounded-xl bg-indigo-50/70 hover:bg-indigo-100/70 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Session Sub-Task</span>
          </button>
        )}
      </div>

    </div>
  );
}
