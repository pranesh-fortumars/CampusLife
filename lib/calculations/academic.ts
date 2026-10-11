/**
 * Academic GPA/CGPA and Marks Engine
 */

export interface GradeScaleItem {
  grade: string;
  gradePoints: number;
  minScore: number;
  maxScore: number;
}

export const DEFAULT_INDIAN_10_POINT_SCALE: GradeScaleItem[] = [
  { grade: 'O', gradePoints: 10, minScore: 90, maxScore: 100 },
  { grade: 'A+', gradePoints: 9, minScore: 80, maxScore: 89 },
  { grade: 'A', gradePoints: 8, minScore: 70, maxScore: 79 },
  { grade: 'B+', gradePoints: 7, minScore: 60, maxScore: 69 },
  { grade: 'B', gradePoints: 6, minScore: 50, maxScore: 59 },
  { grade: 'C', gradePoints: 5, minScore: 40, maxScore: 49 },
  { grade: 'F', gradePoints: 0, minScore: 0, maxScore: 39 },
];

export function calculateSGPA(courses: { credits: number; gradePoints: number }[]): number {
  const totalCredits = courses.reduce((acc, c) => acc + c.credits, 0);
  if (totalCredits === 0) return 0;
  const weightedPoints = courses.reduce((acc, c) => acc + (c.credits * c.gradePoints), 0);
  return Math.round((weightedPoints / totalCredits) * 100) / 100;
}

export function calculateCGPA(semesters: { totalCredits: number; sgpa: number }[]): number {
  const totalCredits = semesters.reduce((acc, s) => acc + s.totalCredits, 0);
  if (totalCredits === 0) return 0;
  const totalPoints = semesters.reduce((acc, s) => acc + (s.totalCredits * s.sgpa), 0);
  return Math.round((totalPoints / totalCredits) * 100) / 100;
}
