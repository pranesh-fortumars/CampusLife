# CampusLife — College Student Super App

<p align="center">
  <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop&q=80" alt="CampusLife Banner" width="100%" style="border-radius: 16px;" />
</p>

> **Your college life. All in one place.**  
> Real-time Attendance Simulator • Academics & Timetables • Campus Community • Placement Hub • Cross-Platform PWA & Native Android APK

[![Live Production Web App](https://img.shields.io/badge/Live%20Deployment-Vercel-black?style=for-the-badge&logo=vercel)](https://campus-life-self.vercel.app)
[![Framework](https://img.shields.io/badge/Next.js-14.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Capacitor](https://img.shields.io/badge/Capacitor-Android%20Mobile-119EFF?style=for-the-badge&logo=capacitor)](https://capacitorjs.com)
[![Firebase Backend](https://img.shields.io/badge/Firebase-Firestore%20%26%20Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)

🌐 **Live Web Application**: [https://campus-life-self.vercel.app](https://campus-life-self.vercel.app)

---

## 🌟 Key Capabilities

### 📱 1. Track (Academics & Attendance Engine)
- **Attendance What-If Simulator**: Predict percentage margin before bunking or attending. Interactive counter (`-` / `+` consecutive classes), real-time projection of percentage crossing the mandatory 75% threshold, and exact recovery count required if a lecture is missed.
- **Academic Dashboard**: Cumulative CGPA (8.64), Semester SGPA (8.78), and Overall Attendance (81.4%) with live ERP sync.
- **Deep-Dive Subject Explorer**: DBMS (CS-302), Operating Systems, Computer Networks, Software Engineering, and Electives with lecture notes, exam papers, and wayfinding.
- **Timetable & Dynamic Schedule**: Day, slot, and lecture-hall level view (`LH-102`, `CS Lab 304`).

### 🚀 2. Growth (Career, Placement Hub & Portfolio)
- **Placement Readiness Radar**: Real-time readiness score (78% Ready • Top 15% in cohort), LeetCode streak counter (18d 🔥), and AI Resume score.
- **Internship Pipeline Kanban**: Multi-stage tracker for Applied, Online Assessment (OA), and Interview rounds with PhonePe, Zomato, Atlassian, and Microsoft.
- **Student Portfolio & Project Showcase**: Verified live deployment links, tech stack badges, and peer endorsements.

### 🏛️ 3. Campus Community & Lifestyle
- **Verified Student Feed**: Official administrative notices (Dean of Academic Affairs) with downloadable exam PDFs and club activities.
- **Clubs Directory & Audio Huddles**: Technical societies (ACM Chapter), cultural fests (Aurora '24), and virtual study rooms.
- **Student Marketplace (Campus Trade)**: Peer-to-peer textbook and gadget exchange.
- **Executive Council Desk (`/admin`)**: Admin dashboard for verification approvals, broadcast alerts, and council moderation.

---

## ⚡ Native Mobile & PWA Architecture

### 📲 Cross-Platform PWA
- **Service Worker (`public/sw.js`)**: Offline caching for core routes (`/track`, `/growth`, `/community`) and instantaneous background page loads.
- **Native Install Prompt (`components/pwa/PwaRegister.tsx`)**: Auto-detects mobile browsers and prompts students to install CampusLife directly to their home screen.

### 🤖 Native Android (Capacitor)
- **Real-Time Cloud Synchronization**: The native Android application wraps the live Vercel production deployment (`https://campus-life-m34k.vercel.app`).
- **Zero-Redownload Updates**: Any code pushed to `main` is instantly reflected on users' installed APKs on launch!

```bash
# Sync web changes to native Android project
npx cap sync android

# Open in Android Studio to build APK
npx cap open android
```

---

## 🔥 Backend & Database Architecture

### Firebase Backend (`campuslife-9c2f1`)
- **Firestore Collections**: Real-time listeners for `profiles`, `subjects`, `tasks`, `posts`, and `expenses`.
- **Firebase Analytics**: SSR-safe event tracking and telemetry.
- **Client Fallback**: Local storage persistence ensures complete offline availability when network is unavailable.

### Supabase / PostgreSQL Schema
- Normalized relational schema in `supabase/migrations/20241011_initial_schema.sql` with Row Level Security (RLS) policies for enterprise institutional setups.

---

## 🛠️ Local Development & Setup

### Isolated Project Cache
All packages and npm caches are strictly contained inside the project folder (`.npm-cache` via `.npmrc`), preventing global cache pollution or writes to system drives.

```bash
# 1. Install dependencies
npm install

# 2. Run unit tests
npm test

# 3. Start local development server
npm run dev

# 4. Production build
npm run build
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Deployment Pipeline

Every push to the `main` branch automatically triggers continuous deployment on Vercel:

```bash
git add .
git commit -m "feat: your new feature"
git push origin main
```

- **Production URL**: [https://campus-life-self.vercel.app](https://campus-life-self.vercel.app)
- **Android APK**: Automatically synced with the live URL on app restart.
