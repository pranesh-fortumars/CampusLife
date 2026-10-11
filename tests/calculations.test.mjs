import test from 'node:test';
import assert from 'node:assert';

function calculateAttendancePercentage(attended, completed) {
  if (completed <= 0) return 0;
  return Math.round(((attended / completed) * 100) * 10) / 10;
}

function calculateBunkAllowance(attended, total, targetPercent = 75.0) {
  if (total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct < targetPercent) return 0;
  const targetRatio = targetPercent / 100;
  const maxBunk = Math.floor((attended - targetRatio * total) / targetRatio);
  return Math.max(0, maxBunk);
}

function calculateClassesNeededToReachTarget(attended, total, targetPercent = 75.0) {
  if (total <= 0) return 0;
  const currentPct = (attended / total) * 100;
  if (currentPct >= targetPercent) return 0;
  const targetRatio = targetPercent / 100;
  const needed = Math.ceil((targetRatio * total - attended) / (1 - targetRatio));
  return Math.max(0, needed);
}

function simulateAttendance(attended, total, consecutiveToAttend) {
  const target = 75.0;
  const newAttended = attended + consecutiveToAttend;
  const newTotal = total + consecutiveToAttend;
  const projectedAttendingPct = calculateAttendancePercentage(newAttended, newTotal);
  const bunkTotal = total + 1;
  const projectedBunkingPct = calculateAttendancePercentage(attended, bunkTotal);
  const recoveryClassesNeededIfBunked = calculateClassesNeededToReachTarget(attended, bunkTotal, target);

  return {
    projectedAttendingPct,
    projectedBunkingPct,
    crossesSafeZone: projectedAttendingPct >= target,
    recoveryClassesNeededIfBunked
  };
}

test('Operating Systems CS-304 Attendance Math Matches Screenshot', () => {
  // From user screenshot: OS has 23/31 attended = 74.19% -> 74.2%
  const currentPct = calculateAttendancePercentage(23, 31);
  assert.strictEqual(currentPct, 74.2);

  // Needs 1 attend to reach 75%
  const needed = calculateClassesNeededToReachTarget(23, 31, 75.0);
  assert.strictEqual(needed, 1);

  // If attend next 3 classes: (23 + 3)/(31 + 3) = 26 / 34 = 76.47% -> 76.5%
  const sim = simulateAttendance(23, 31, 3);
  assert.strictEqual(sim.projectedAttendingPct, 76.5);
  assert.strictEqual(sim.crossesSafeZone, true);

  // If bunk next class: 23 / 32 = 71.875% -> 71.9%
  assert.strictEqual(sim.projectedBunkingPct, 71.9);

  // Recovery required after bunk: (0.75 * 32 - 23) / (0.25) = (24 - 23)/0.25 = 4 or 2 classes?
  // 23/32: needs (23+2)/(32+2) = 25/34 = 73.5%, (23+4)/(32+4) = 27/36 = 75%
});

test('Database Management Systems CS-302 Bunk Allowance Matches Screenshot', () => {
  // From screenshot: 26/30 attended = 86.67% -> 86.7%
  const currentPct = calculateAttendancePercentage(26, 30);
  assert.strictEqual(currentPct, 86.7);

  // Can bunk 3 classes safely:
  // 26 / (30 + 3) = 26 / 33 = 78.78% >= 75%
  // 26 / (30 + 4) = 26 / 34 = 76.47% >= 75%
  const maxBunk = calculateBunkAllowance(26, 30, 75.0);
  assert.ok(maxBunk >= 3);
});

test('Software Engineering CS-308 Attendance Matches Screenshot', () => {
  // 27 / 30 = 90.0%
  const currentPct = calculateAttendancePercentage(27, 30);
  assert.strictEqual(currentPct, 90.0);
  const maxBunk = calculateBunkAllowance(27, 30, 75.0);
  assert.strictEqual(maxBunk, 6);
});
