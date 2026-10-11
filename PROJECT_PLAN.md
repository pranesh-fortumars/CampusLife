# CAMPUSLIFE — Project Architecture & Implementation Plan

## Overview
CampusLife is a modern, full-stack college student super app built specifically with realistic Indian academic systems (Semesters, CGPA/SGPA, Attendance thresholds, Internal exams, Clubs, Placements, Rupee expenses, Timetables) and adaptable worldwide.

## Tech Stack
- **Framework**: Next.js 14+ (App Router) / React 18+ / TypeScript
- **Styling**: Tailwind CSS, Lucide Icons, Glassmorphism, Custom Design System matching provided high-fidelity screen designs
- **Database & Data Layer**: Client-server persistence with Supabase schema compatibility, local mock persistence engine with seed data, Supabase RLS migrations, and API routes
- **Charts & Calculations**: Recharts, Decimal-safe attendance calculators, What-If simulator, SGPA/CGPA projection engine
- **Environment**: Local isolated dependencies configured via `.npmrc` referencing `e:\CampusLife\.npm-cache`

## Key Modules
1. **Track (Academics & Attendance)**
   - Attendance What-If Simulator with live interactive calculations (+/- classes, bunk margin)
   - Subject tracking (DBMS, OS, CN, Software Eng, ML) with attendance percentages, safe/warning badges, next class info
   - Timetable view & Today's Schedule
   - Assignments & Exam schedule
2. **Growth (Career, Skills, Placements)**
   - Placement Benchmark & Readiness score (78% Ready, LeetCode streak, resume completeness)
   - Active Projects showcase with live demo links and tech stacks
   - Skills matrix with verified endorsements
   - Internship Kanban pipeline (Applied, OA, Interview Scheduled)
   - Milestones & Honors (Hackathon finalist, AWS cert, open source)
3. **Home Dashboard**
   - Live session indicator (Starts in 22 mins, DBMS Lab)
   - Quick counters (Classes remaining, Pending assignments, Tasks to-do, Day expenses)
   - Academic Attendance Health card with action threshold
   - Priority Checklist with interactive checkbox status
   - Campus Pulse Today (Hackathons, study clubs)
   - Quick Action Dock
4. **Community**
   - College noticeboard (Official verified notices from Dean)
   - Technical Societies / HackCampus event cards with registrations
   - Peer Doubt solver with study note exchange & PDF attachments
   - Cultural fests & reminder alerts
   - Post creation and doubt asking modals
5. **Me (Profile & College Life Timeline)**
   - Verified student badge, DTU profile (Rahul Sharma, CR)
   - Privacy Guard status (Active encrypted personal data)
   - College Life Timeline across 4 years (Sem 1 to Sem 6 milestones)
   - Settings & Portfolio hub (AI Copilot settings, notifications, theme, expense summaries)
6. **Student Finances & Expense Manager**
   - Rupee-based tracking, daily expense breakdown, canteen & printout tags
7. **Campus Copilot AI Assistant**
   - Smart college assistant for attendance planning, resume reviews, exam checklists
