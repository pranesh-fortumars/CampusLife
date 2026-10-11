/**
 * Attendance calculation & simulation engine
 * Strictly handles decimal rounding, zero denominators, and what-if bunking projections.
 */

export interface SubjectAttendanceData {
  id: string;
  code: string;
  name: string;
  credits: number;
  faculty: string;
  attended: number;
  total: number;
  targetPercent?: number; // default 75%
  nextClass?: string;
  location?: string;
}

export function calculateAttendancePercentage(attended: number, completed: number): number {
  if (completed <= 0) return 0;
  const pct = (attended / completed) * 100;
  return Math.round(pct * 10) / 10;
}

export function simulateAttendance(
  attended: number,
  total: number,
  consecutiveToAttend: number
): {
  projectedAttendingPct: number;
  projectedBunkingPct: number;
  crossesSafeZone: boolean;
  recoveryClassesNeededIfBunked: number;
} {
  const target = 75.0;
  
  // Projection if attending next N classes
  const newAttended = attended + consecutiveToAttend;
  const newTotal = total + consecutiveToAttend;
  const projectedAttendingPct = calculateAttendancePercentage(newAttended, newTotal);
  
  // Projection if bunking next 1 class
  const bunkTotal = total + 1;
  const projectedBunkingPct = calculateAttendancePercentage(attended, bunkTotal);
  
  // Recovery if bunked:
  const recoveryClassesNeededIfBunked = calculateClassesNeededToReachTarget(attended, bunkTotal, target);

  return {
    projectedAttendingPct,
    projectedBunkingPct,
    crossesSafeZone: projectedAttendingPct >= target,
    recoveryClassesNeededIfBunked
  };
}

export function calculateBunkAllowance(attended: number, total: number, targetPercent: number = 75.0): number {
  if (total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct < targetPercent) return 0;

  const targetRatio = targetPercent / 100;
  // attended / (total + b) >= targetRatio => b <= (attended - targetRatio * total) / targetRatio
  const maxBunk = Math.floor((attended - targetRatio * total) / targetRatio);
  return Math.max(0, maxBunk);
}

export function calculateClassesNeededToReachTarget(
  attended: number,
  total: number,
  targetPercent: number = 75.0
): number {
  if (total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct >= targetPercent) return 0;

  const targetRatio = targetPercent / 100;
  if (targetRatio >= 1.0) return 999;

  // (attended + x) / (total + x) >= targetRatio
  // x * (1 - targetRatio) >= targetRatio * total - attended
  const needed = Math.ceil((targetRatio * total - attended) / (1 - targetRatio));
  return Math.max(0, needed);
}

export function getAttendanceStatus(percentage: number): {
  label: 'Safe' | 'Excellent' | 'Borderline' | 'Low Attention';
  color: string;
  badgeBg: string;
} {
  if (percentage >= 88) {
    return { label: 'Excellent', color: 'text-emerald-700', badgeBg: 'bg-emerald-100 text-emerald-800' };
  } else if (percentage >= 80) {
    return { label: 'Safe', color: 'text-teal-700', badgeBg: 'bg-teal-100 text-teal-800' };
  } else if (percentage >= 75) {
    return { label: 'Borderline', color: 'text-indigo-700', badgeBg: 'bg-indigo-100 text-indigo-800' };
  } else {
    return { label: 'Low Attention', color: 'text-rose-700', badgeBg: 'bg-rose-100 text-rose-800' };
  }
}
