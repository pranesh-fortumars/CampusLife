# CampusLife — College Student Super App

> **Your college life. All in one place.**

CampusLife is a comprehensive, production-oriented student super app designed for Indian universities (Semesters, CGPA/SGPA, 75% Attendance thresholds, Internal exams, Clubs, Placements, Rupee expenses, Timetables) and adaptable globally.

---

## 📱 High-Fidelity Modules Aligned With Design Mockups

1. **Track (Academics & Attendance Tracker)**
   - **Attendance What-If Simulator**: Predict margin before bunking or attending. Interactive counter (`-` / `+` consecutive classes), real-time projection of percentage crossing the safe 75% zone, and recovery count required if a lecture is missed.
   - **Semester Academics Summary**: Cumulative CGPA (8.64), Semester SGPA (8.78), and Overall Attendance (81.4%) with live ERP sync status.
   - **Enrolled Subjects Tracking**: DBMS, Operating Systems, Computer Networks, Software Engineering, and Machine Learning Elective with real-time "Can bunk X classes" / "Needs X attend to reach 75%" badges.
   - **Weekly Timetable & Lecture Schedule**: Day & room-wise view (LH-102, CS Lab 304, Room 204).

2. **Growth (Career, Skills, Placements & Projects)**
   - **Placement Benchmark & Readiness Score**: Radial gauge showing 78% Ready (Top 15% in cohort), LeetCode streak (18d 🔥), Resume score (90%).
   - **Resume Copilot AI integration**: Suggestions for boost metrics.
   - **Active Projects Portfolio**: Live tags (Deployed, Milestone 3/4), tech stack tags (Python, React, MQTT, OpenCV, Node.js, MongoDB).
   - **Skills Matrix**: Assessed via labs & peer reviews with star ratings and endorsements.
   - **Internship Pipeline Kanban**: Stages for Applied (Microsoft, Razorpay, Swiggy), Online Assessment (Zomato HackerRank, Atlassian), and Interview Scheduled (PhonePe Technical Round 1).
   - **Milestones & Honors**: Smart India Hackathon finalist, AWS Cloud Practitioner, Top Open-Source Contributor.
   - **Placement Cell Sync & PDF Resume Export**.

3. **Home (Student Daily Command Center)**
   - **Class In Session / Next Lecture**: Real-time timer ("Starts in 22 mins"), Dr. Ananya Roy, 1-tap "Mark Attended" button.
   - **4 Quick Metric Cards**: Classes Today (3 remaining), Assignments (2 pending), Tasks & Prep (4 to-do), Day Expenses (₹420 spent).
   - **Academic Attendance Health**: Progress gauge with 75% debarment threshold line and low attendance warning alert.
   - **Priority Checklist**: Interactive checkboxes with urgency badges (Due 5:00 PM, High Priority, Closes Tonight).
   - **Campus Pulse Today**: TechKriti '24 AI & Robotics Hackathon, Algorithm Problem Solvers club.
   - **Floating Action Dock**: 1-tap "Mark Attendance", "Add Task", "Expense".

4. **Community (Campus Social & Academic Exchange)**
   - **North Campus Hub**: Student network header with college verification.
   - **Official Notices**: Dean of Academic Affairs examination schedule with verified notice badge, linked personal attendance, and PDF download.
   - **Clubs & Societies**: ACM Student Chapter HackCampus 2024 registration card.
   - **Peer Doubts & Resource Exchange**: Question paper requests and notes exchange with attachments (e.g., `OS_Concurrency_Notes_Unit3.pdf`).
   - **Campus Cultural Fests**: Aurora '24 event card with reminder toggle.

5. **Me (Profile & College Life Timeline)**
   - **Verified Student ID**: Rahul Sharma (CR - Class Representative, Section B, B.Tech CSE, DTU 219CS094).
   - **Campus Privacy Guard**: Encrypted personal academic metrics with selective project showcase.
   - **4-Year College Journey Timeline**: Sem 1 (Orientation) to Sem 6 (Class Representative & Capstone) with badges.
   - **Preferences & Portfolio Hub**: Copilot settings, notifications, theme switch, rupee expense dues, verified marksheet export.

---

## 🛠️ Local Setup & Execution

### Isolated Local Cache
Per requirements, all dependencies and package caches are isolated inside the project directory (`.npm-cache` and `.npmrc`) without modifying system root folders or C: drive.

```bash
# 1. Install dependencies (isolated in project)
npm install --cache "e:\CampusLife\.npm-cache"

# 2. Run unit tests verifying calculation engines
npm test

# 3. Launch the development server
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 🗄️ Database Architecture (Supabase / PostgreSQL)

- `supabase/migrations/20241011_initial_schema.sql`: Full normalized tables for `profiles`, `colleges`, `subjects`, `attendance_records`, `timetable_entries`, `assignments`, `tasks`, `posts`, `projects`, `skills`, `job_applications`, `timeline_memories`, `expenses`, with Row Level Security (RLS) policies.
- `supabase/seed.sql`: Seed data matching Rahul Sharma at DTU.
