import { NextResponse } from 'next/server';
import { simulateAttendance, calculateAttendancePercentage } from '@/lib/calculations/attendance';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { attended, total, consecutiveClasses } = body;

    if (typeof attended !== 'number' || typeof total !== 'number') {
      return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
    }

    const currentPct = calculateAttendancePercentage(attended, total);
    const simulation = simulateAttendance(attended, total, consecutiveClasses || 3);

    return NextResponse.json({
      currentPct,
      ...simulation
    });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
