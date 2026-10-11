import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  addDoc, 
  query, 
  orderBy, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';
import { 
  StudentProfile, 
  SubjectItem, 
  TaskItem, 
  FeedPost, 
  TimelineMemory,
  ProjectItem,
  SkillItem,
  JobApplication
} from '../data/initialData';

// Collections
const PROFILES_COL = 'profiles';
const SUBJECTS_COL = 'subjects';
const TASKS_COL = 'tasks';
const POSTS_COL = 'posts';
const TIMELINE_COL = 'timeline';
const EXPENSES_COL = 'expenses';
const PROJECTS_COL = 'projects';
const SKILLS_COL = 'skills';
const APPLICATIONS_COL = 'job_applications';

/**
 * Profile Services
 */
export async function syncProfileToFirebase(profile: StudentProfile) {
  try {
    const profileRef = doc(db, PROFILES_COL, profile.id);
    await setDoc(profileRef, {
      ...profile,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn('Firebase profile sync fallback:', err);
    return false;
  }
}

export async function fetchProfileFromFirebase(userId: string): Promise<StudentProfile | null> {
  try {
    const snap = await getDoc(doc(db, PROFILES_COL, userId));
    if (snap.exists()) {
      return snap.data() as StudentProfile;
    }
  } catch (err) {
    console.warn('Firebase profile read error:', err);
  }
  return null;
}

/**
 * Attendance & Subjects Services
 */
export async function syncSubjectsToFirebase(userId: string, subjects: SubjectItem[]) {
  try {
    for (const sub of subjects) {
      await setDoc(doc(db, PROFILES_COL, userId, SUBJECTS_COL, sub.id), {
        ...sub,
        updatedAt: serverTimestamp()
      }, { merge: true });
    }
    return true;
  } catch (err) {
    console.warn('Firebase subjects sync fallback:', err);
    return false;
  }
}

export async function logAttendanceToFirebase(userId: string, subjectId: string, status: 'present' | 'absent') {
  try {
    const subRef = doc(db, PROFILES_COL, userId, SUBJECTS_COL, subjectId);
    const snap = await getDoc(subRef);
    if (snap.exists()) {
      const current = snap.data() as SubjectItem;
      await updateDoc(subRef, {
        attended: status === 'present' ? current.attended + 1 : current.attended,
        total: current.total + 1,
        updatedAt: serverTimestamp()
      });
    }
  } catch (err) {
    console.warn('Firebase attendance log fallback:', err);
  }
}

/**
 * Tasks Services
 */
export async function syncTaskToFirebase(userId: string, task: TaskItem) {
  try {
    await setDoc(doc(db, PROFILES_COL, userId, TASKS_COL, task.id), {
      ...task,
      updatedAt: serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Firebase task sync fallback:', err);
  }
}

export async function toggleTaskInFirebase(userId: string, taskId: string, completed: boolean) {
  try {
    const taskRef = doc(db, PROFILES_COL, userId, TASKS_COL, taskId);
    await updateDoc(taskRef, {
      completed,
      updatedAt: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firebase task toggle fallback:', err);
  }
}

/**
 * Community Feed Services
 */
export async function createPostInFirebase(post: FeedPost) {
  try {
    await setDoc(doc(db, POSTS_COL, post.id), {
      ...post,
      createdAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn('Firebase post creation fallback:', err);
    return false;
  }
}

export async function toggleLikePostInFirebase(postId: string, newLikesCount: number, isLiked: boolean) {
  try {
    const postRef = doc(db, POSTS_COL, postId);
    await updateDoc(postRef, {
      likes: newLikesCount,
      isLiked
    });
  } catch (err) {
    console.warn('Firebase like fallback:', err);
  }
}

/**
 * Expenses Services
 */
export async function logExpenseToFirebase(userId: string, amount: number, category: string, note?: string) {
  try {
    await addDoc(collection(db, PROFILES_COL, userId, EXPENSES_COL), {
      amount,
      category,
      note: note || '',
      timestamp: serverTimestamp()
    });
  } catch (err) {
    console.warn('Firebase expense log fallback:', err);
  }
}
