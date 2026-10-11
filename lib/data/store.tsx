'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StudentProfile,
  SubjectItem,
  TaskItem,
  ProjectItem,
  SkillItem,
  JobApplication,
  TimelineMemory,
  FeedPost,
  initialProfile,
  initialSubjects,
  initialTasks,
  initialProjects,
  initialSkills,
  initialApplications,
  initialTimeline,
  initialPosts
} from './initialData';
import {
  syncProfileToFirebase,
  logAttendanceToFirebase,
  syncTaskToFirebase,
  toggleTaskInFirebase,
  createPostInFirebase,
  toggleLikePostInFirebase,
  logExpenseToFirebase
} from '../firebase/services';

interface AppContextType {
  profile: StudentProfile;
  subjects: SubjectItem[];
  tasks: TaskItem[];
  projects: ProjectItem[];
  skills: SkillItem[];
  applications: JobApplication[];
  timeline: TimelineMemory[];
  posts: FeedPost[];
  
  // Attendance actions
  markSubjectAttendance: (subjectId: string, status: 'present' | 'absent') => void;
  markTodayAllAttended: () => void;
  
  // Tasks actions
  toggleTask: (taskId: string) => void;
  addTask: (title: string, category?: 'academic' | 'tasks' | 'prep' | 'career', badge?: string) => void;
  
  // Finance actions
  addExpense: (amount: number, category: string, note?: string) => void;
  
  // Community actions
  toggleLikePost: (postId: string) => void;
  toggleBookmarkPost: (postId: string) => void;
  createPost: (content: string, category: 'notice' | 'coding' | 'doubt' | 'event', title?: string) => void;
  
  // Career / Skills actions
  addSkill: (name: string, level?: 'Intermediate' | 'Proficient' | 'Advanced') => void;
  addProject: (title: string, techStack: string[], tagline: string) => void;
  
  // Profile update
  updateProfile: (updates: Partial<StudentProfile>) => void;
  
  // Reset demo
  resetToDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'campuslife_store_v1';

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<StudentProfile>(initialProfile);
  const [subjects, setSubjects] = useState<SubjectItem[]>(initialSubjects);
  const [tasks, setTasks] = useState<TaskItem[]>(initialTasks);
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects);
  const [skills, setSkills] = useState<SkillItem[]>(initialSkills);
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [timeline, setTimeline] = useState<TimelineMemory[]>(initialTimeline);
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.profile) setProfile(parsed.profile);
        if (parsed.subjects) setSubjects(parsed.subjects);
        if (parsed.tasks) setTasks(parsed.tasks);
        if (parsed.projects) setProjects(parsed.projects);
        if (parsed.skills) setSkills(parsed.skills);
        if (parsed.applications) setApplications(parsed.applications);
        if (parsed.timeline) setTimeline(parsed.timeline);
        if (parsed.posts) setPosts(parsed.posts);
      }
    } catch {
      // ignore parsing error
    }
  }, []);

  // Sync to localStorage
  const persistState = (newSubj = subjects, newProf = profile, newTsk = tasks, newPst = posts) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        profile: newProf,
        subjects: newSubj,
        tasks: newTsk,
        projects,
        skills,
        applications,
        timeline,
        posts: newPst
      }));
    } catch {
      // ignore quota errors
    }
  };

  const recalcOverallAttendance = (subjList: SubjectItem[]) => {
    const totalAttended = subjList.reduce((acc, s) => acc + s.attended, 0);
    const totalClasses = subjList.reduce((acc, s) => acc + s.total, 0);
    const rate = totalClasses > 0 ? Math.round(((totalAttended / totalClasses) * 100) * 10) / 10 : 81.4;
    return rate;
  };

  const markSubjectAttendance = (subjectId: string, status: 'present' | 'absent') => {
    const updated = subjects.map(s => {
      if (s.id === subjectId) {
        return {
          ...s,
          attended: status === 'present' ? s.attended + 1 : s.attended,
          total: s.total + 1
        };
      }
      return s;
    });
    setSubjects(updated);

    const newRate = recalcOverallAttendance(updated);
    const updatedProf = { ...profile, overallAttendance: newRate };
    setProfile(updatedProf);
    persistState(updated, updatedProf);

    // Sync to Firebase
    logAttendanceToFirebase(profile.id, subjectId, status);
    syncProfileToFirebase(updatedProf);
  };

  const markTodayAllAttended = () => {
    const updated = subjects.map(s => ({
      ...s,
      attended: s.attended + 1,
      total: s.total + 1
    }));
    setSubjects(updated);

    const newRate = recalcOverallAttendance(updated);
    const updatedProf = { ...profile, overallAttendance: newRate };
    setProfile(updatedProf);
    persistState(updated, updatedProf);

    // Sync to Firebase
    updated.forEach(s => logAttendanceToFirebase(profile.id, s.id, 'present'));
    syncProfileToFirebase(updatedProf);
  };

  const toggleTask = (taskId: string) => {
    const updated = tasks.map(t => {
      if (t.id === taskId) {
        const nextCompleted = !t.completed;
        toggleTaskInFirebase(profile.id, taskId, nextCompleted);
        return { ...t, completed: nextCompleted };
      }
      return t;
    });
    setTasks(updated);
    persistState(subjects, profile, updated);
  };

  const addTask = (title: string, category: 'academic' | 'tasks' | 'prep' | 'career' = 'tasks', badge = 'NEW') => {
    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title,
      completed: false,
      category,
      badgeText: badge,
      badgeVariant: 'normal'
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    persistState(subjects, profile, updated);

    // Sync to Firebase
    syncTaskToFirebase(profile.id, newTask);
  };

  const addExpense = (amount: number, category: string, note?: string) => {
    const updatedProf = {
      ...profile,
      expenseSpentToday: profile.expenseSpentToday + amount
    };
    setProfile(updatedProf);
    persistState(subjects, updatedProf);

    // Sync to Firebase
    logExpenseToFirebase(profile.id, amount, category, note);
  };

  const toggleLikePost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        const isLiked = !p.isLiked;
        const newLikes = isLiked ? p.likes + 1 : Math.max(0, p.likes - 1);
        toggleLikePostInFirebase(postId, newLikes, isLiked);
        return {
          ...p,
          isLiked,
          likes: newLikes
        };
      }
      return p;
    });
    setPosts(updated);
    persistState(subjects, profile, tasks, updated);
  };

  const toggleBookmarkPost = (postId: string) => {
    const updated = posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          isBookmarked: !p.isBookmarked
        };
      }
      return p;
    });
    setPosts(updated);
    persistState(subjects, profile, tasks, updated);
  };

  const createPost = (content: string, category: 'notice' | 'coding' | 'doubt' | 'event', title?: string) => {
    const newPost: FeedPost = {
      id: `post-${Date.now()}`,
      authorName: profile.name,
      authorRole: `${profile.year}th Year ${profile.section} ${profile.isCR ? '• CR' : ''}`,
      authorAvatar: profile.avatarUrl,
      timeAgo: 'Just now',
      category,
      title: title || 'Campus Discussion',
      content,
      likes: 1,
      isLiked: true,
      comments: 0,
      shares: 0,
      tags: [category.toUpperCase()]
    };
    const updated = [newPost, ...posts];
    setPosts(updated);
    persistState(subjects, profile, tasks, updated);

    // Sync to Firebase
    createPostInFirebase(newPost);
  };

  const addSkill = (name: string, level: 'Intermediate' | 'Proficient' | 'Advanced' = 'Intermediate') => {
    const newSkill: SkillItem = {
      id: `sk-${Date.now()}`,
      name,
      level,
      rating: level === 'Advanced' ? 4.5 : level === 'Proficient' ? 4.0 : 3.0,
      endorsements: 'Self Added'
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const addProject = (title: string, techStack: string[], tagline: string) => {
    const newProj: ProjectItem = {
      id: `proj-${Date.now()}`,
      title,
      statusBadge: 'IN PROGRESS',
      statusColor: 'blue',
      tagline,
      techStack,
      role: 'Lead Dev',
      progressPercent: 20
    };
    setProjects(prev => [newProj, ...prev]);
    setProfile(prev => ({ ...prev, projectsCount: prev.projectsCount + 1 }));
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    const updated = { ...profile, ...updates };
    setProfile(updated);
    persistState(subjects, updated);
  };

  const resetToDemo = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setProfile(initialProfile);
    setSubjects(initialSubjects);
    setTasks(initialTasks);
    setProjects(initialProjects);
    setSkills(initialSkills);
    setApplications(initialApplications);
    setTimeline(initialTimeline);
    setPosts(initialPosts);
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        subjects,
        tasks,
        projects,
        skills,
        applications,
        timeline,
        posts,
        markSubjectAttendance,
        markTodayAllAttended,
        toggleTask,
        addTask,
        addExpense,
        toggleLikePost,
        toggleBookmarkPost,
        createPost,
        addSkill,
        addProject,
        updateProfile,
        resetToDemo
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
