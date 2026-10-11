import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    const query = (message || '').toLowerCase();

    let reply = "I've checked your DTU student records for Semester 6. How can I assist you with your schedule, attendance, or placements?";

    if (query.includes('bunk') || query.includes('attendance') || query.includes('os')) {
      reply = "CRITICAL ALERT: Your Operating Systems attendance is currently at 74.2% (23/31). You must NOT bunk tomorrow's 09:15 AM lecture in LH-102. Attending pushes your record to 75.8% (above the 75% minimum debarment bar). In contrast, DBMS is safe at 86.7% where you can safely miss up to 3 lectures.";
    } else if (query.includes('interview') || query.includes('placement') || query.includes('phonepe')) {
      reply = "Placement Cell Sync confirms PhonePe Technical Round 1 on Tuesday, Oct 29 at 04:30 PM. Since your profile highlights the SmartCampus Parking microservices project, make sure to revise Concurrency, Redis cache invalidation, and REST/gRPC latency optimizations.";
    } else if (query.includes('notice') || query.includes('exam')) {
      reply = "Dean of Academic Affairs released the Mid-Semester Exam schedule starting Nov 4th. Hall tickets require ≥75% attendance. Priority checklist has DBMS quiz prep due today!";
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ reply: 'Assistant temporarily unavailable. Please retry.' }, { status: 500 });
  }
}
