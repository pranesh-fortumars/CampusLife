'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ArrowLeft, 
  Search, 
  Bell, 
  User, 
  Clock, 
  MapPin, 
  Users, 
  Download, 
  Share2, 
  Wallet, 
  Sun, 
  Wifi, 
  Utensils, 
  Zap, 
  Calendar, 
  FileText, 
  AlertCircle, 
  Check, 
  Copy, 
  ExternalLink,
  QrCode,
  Sparkles
} from 'lucide-react';

export default function HackCampusPassPage() {
  const router = useRouter();
  const [copiedWifi, setCopiedWifi] = useState(false);
  const [boostBrightness, setBoostBrightness] = useState(false);
  const [rotatingToken, setRotatingToken] = useState('HC24-X91A');
  const [countdown, setCountdown] = useState({ hours: 14, minutes: 28, seconds: 5 });
  const [copiedLink, setCopiedLink] = useState(false);

  // Live countdown ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyWifi = () => {
    navigator.clipboard?.writeText('SSID: DTU_GUEST_HACK | Pass: hackcampus2024');
    setCopiedWifi(true);
    setTimeout(() => setCopiedWifi(false), 2000);
  };

  const handleShare = () => {
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleRotateToken = () => {
    const randomHex = Math.random().toString(36).substring(2, 6).toUpperCase();
    setRotatingToken(`HC24-${randomHex}`);
  };

  return (
    <div className={`p-4 space-y-4 pb-28 transition-all ${boostBrightness ? 'brightness-110 filter' : ''}`}>
      
      {/* Top Header Navigation */}
      <div className="flex items-center justify-between pb-1">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 p-1 -ml-1 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
        <span className="text-xs font-bold text-slate-800">Hacker Pass &amp; Entry</span>
        <button 
          onClick={handleShare}
          className="p-1.5 text-slate-600 hover:text-indigo-600 rounded-lg hover:bg-slate-100 transition-colors"
          title="Share Pass"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Main Hackathon Card Container */}
      <div className="bg-white rounded-[28px] border border-slate-200/80 shadow-lg overflow-hidden">
        
        {/* Banner with Event Atmosphere Image */}
        <div className="relative bg-slate-900 text-white p-5 pt-6 pb-6 overflow-hidden">
          {/* Subtle Cyber Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 opacity-90 z-0"></div>
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/20 rounded-full blur-2xl z-0 pointer-events-none"></div>

          <div className="relative z-10 space-y-3">
            {/* Badges Row */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] font-bold tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                CONFIRMED ATTENDEE
              </span>
              <span className="text-[11px] font-mono font-bold text-indigo-300 tracking-wider">
                Pass #HC-24-8102
              </span>
            </div>

            {/* Title & Organization */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-indigo-600 text-[10px] font-extrabold uppercase tracking-wider text-white">
                  ACM DTU CHAPTER
                </span>
                <span className="text-[11px] text-slate-300 font-semibold flex items-center gap-1">
                  <Clock className="w-3 h-3 text-indigo-400" />
                  36h Sprint
                </span>
              </div>
              <h1 className="text-2xl font-black text-white tracking-tight">
                HackCampus 2024
              </h1>
              <p className="text-[11px] text-slate-300 mt-0.5 font-medium">
                Annual National Collegiate Hackathon &amp; Innovation Expo
              </p>
            </div>
          </div>
        </div>

        {/* Pass Tier Strip (Purple Gradient) */}
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white p-4">
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
                OFFICIAL ENTRY PASS
              </div>
              <div className="font-extrabold text-white text-sm">
                Hacker Pass (Tier 1)
              </div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-bold text-indigo-200 uppercase tracking-wider">
                Meals &amp; Swag Kit
              </div>
              <div className="font-extrabold text-emerald-300 text-sm">
                All Access
              </div>
            </div>

            <div className="pt-2 border-t border-indigo-500/40">
              <div className="text-[10px] text-indigo-200">Attendee</div>
              <div className="font-bold text-white">Rahul Sharma</div>
            </div>
            <div className="pt-2 border-t border-indigo-500/40 text-right">
              <div className="text-[10px] text-indigo-200">Roll Number</div>
              <div className="font-mono font-bold text-white">21BCS084</div>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        <div className="p-5 bg-gradient-to-b from-indigo-50/40 to-white text-center space-y-4">
          
          {/* Countdown Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
            <span>
              Check-in opens in: {countdown.hours}h {countdown.minutes}m {countdown.seconds < 10 ? `0${countdown.seconds}` : countdown.seconds}s
            </span>
          </div>

          {/* High-Resolution QR Graphic Box */}
          <div className="mx-auto w-56 h-56 p-3 bg-white rounded-3xl shadow-md border-2 border-indigo-100 flex flex-col items-center justify-center relative group">
            {/* Simulated Clean Dynamic QR Matrix */}
            <div className="w-full h-full relative flex items-center justify-center p-2">
              <svg viewBox="0 0 100 100" className="w-full h-full text-slate-900">
                {/* 3 Large Corner Position Squares */}
                <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                
                <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />

                <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="6" />
                <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />

                {/* Simulated Data Blocks & Pattern */}
                <rect x="37" y="10" width="8" height="6" rx="1" fill="currentColor" />
                <rect x="49" y="10" width="14" height="6" rx="1" fill="currentColor" />
                <rect x="37" y="20" width="18" height="6" rx="1" fill="currentColor" />
                
                <rect x="10" y="37" width="18" height="6" rx="1" fill="currentColor" />
                <rect x="34" y="34" width="32" height="32" rx="6" fill="#4f46e5" />
                <rect x="40" y="40" width="20" height="20" rx="3" fill="white" />
                <rect x="46" y="46" width="8" height="8" rx="2" fill="#4f46e5" />

                <rect x="72" y="38" width="12" height="6" rx="1" fill="currentColor" />
                <rect x="68" y="50" width="20" height="6" rx="1" fill="currentColor" />

                <rect x="38" y="70" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="48" y="70" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="58" y="70" width="6" height="6" rx="1" fill="currentColor" />
                <rect x="72" y="70" width="16" height="16" rx="3" fill="#059669" />

                <rect x="38" y="80" width="18" height="6" rx="1" fill="currentColor" />
              </svg>
            </div>

            {/* Rotating token label */}
            <div 
              onClick={handleRotateToken}
              className="mt-1 flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200 cursor-pointer hover:bg-slate-100"
              title="Click to refresh rotating token"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Live Rotating Token: {rotatingToken}</span>
            </div>
          </div>

          {/* Brightness Booster button */}
          <div>
            <button
              onClick={() => setBoostBrightness(!boostBrightness)}
              className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-colors ${
                boostBrightness
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>{boostBrightness ? 'Brightness Boost Active' : 'Tap to boost screen brightness for kiosk'}</span>
            </button>
          </div>

          {/* Pass Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-1 border-t border-slate-100">
            <button
              onClick={() => alert('Downloaded HackCampus2024_RahulSharma_Pass.pdf')}
              className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex flex-col items-center gap-1 transition-colors"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Save PDF</span>
            </button>

            <button
              onClick={handleShare}
              className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex flex-col items-center gap-1 transition-colors"
            >
              <Share2 className="w-4 h-4 text-slate-600" />
              <span>{copiedLink ? 'Link Copied!' : 'Share Pass'}</span>
            </button>

            <button
              onClick={() => alert('Pass added to Apple Wallet / Google Wallet')}
              className="py-2 px-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex flex-col items-center gap-1 transition-colors"
            >
              <Wallet className="w-4 h-4 text-slate-600" />
              <span>Apple/G-Wallet</span>
            </button>
          </div>
        </div>

      </div>

      {/* Date & Main Venue Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold">
            <Calendar className="w-4 h-4" />
            <span>Date &amp; Time</span>
          </div>
          <div className="text-xs font-black text-slate-900 leading-tight">
            Nov 16-17, 2024
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            09:00 AM IST (36h Sprint)
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1">
          <div className="flex items-center gap-1.5 text-indigo-600 text-xs font-bold">
            <MapPin className="w-4 h-4" />
            <span>Main Venue</span>
          </div>
          <div className="text-xs font-black text-slate-900 leading-tight">
            Main Auditorium
          </div>
          <div className="text-[10px] text-slate-400 font-medium">
            &amp; CS Labs (Block 3)
          </div>
        </div>
      </div>

      {/* Assigned Squad Box */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase">Assigned Squad</div>
              <div className="text-sm font-black text-slate-900">ByteCraft</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 font-bold text-xs border border-indigo-100">
            Table #428 (Hall 2)
          </span>
        </div>

        {/* Squad Members */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2.5 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
            Rahul (Lead)
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            Priya S.
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            Rohan M.
          </span>
          <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
            Kabir V.
          </span>
        </div>
      </div>

      {/* Hackathon Schedule Timeline */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">Hackathon Schedule</h2>
          <span className="text-[11px] font-bold text-indigo-600">Day 1 • Saturday</span>
        </div>

        <div className="space-y-3 border-l-2 border-indigo-100 pl-4 ml-1">
          
          {/* Step 1 */}
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 absolute -left-[21px] top-1 ring-4 ring-indigo-50"></span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">Hacker Registration &amp; Kit Collection</h3>
              <span className="text-[11px] font-bold text-indigo-600">09:00 AM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Show this Digital QR at the registration desks in the Foyer.
            </p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-[21px] top-1"></span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">Opening Ceremony &amp; Keynote</h3>
              <span className="text-[11px] font-semibold text-slate-500">10:30 AM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Main Auditorium. Problem statement tracks unveil.
            </p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-[21px] top-1"></span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">Hacking Period Commences</h3>
              <span className="text-[11px] font-semibold text-slate-500">11:00 AM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Clock starts! Head to assigned desk #428.
            </p>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-[21px] top-1"></span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">Mentorship Sync Round 1</h3>
              <span className="text-[11px] font-semibold text-slate-500">04:00 PM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Domain experts review architecture and codebases.
            </p>
          </div>

          {/* Step 5 */}
          <div className="relative">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-300 absolute -left-[21px] top-1"></span>
            <div className="flex items-baseline justify-between">
              <h3 className="text-xs font-bold text-slate-900">Midnight Pizza &amp; Energy Boost</h3>
              <span className="text-[11px] font-semibold text-slate-500">12:00 AM</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Token 2 required at Cafeteria Courtyard.
            </p>
          </div>

        </div>
      </div>

      {/* Campus Hacker Essentials */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
        <h2 className="text-sm font-extrabold text-slate-900">Campus Hacker Essentials</h2>

        {/* Wi-Fi Credentials */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
              <Wifi className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Wi-Fi Credentials</div>
              <div className="text-[11px] text-slate-500 font-mono">
                SSID: DTU_GUEST_HACK • Pass: hackcampus2024
              </div>
            </div>
          </div>
          <button
            onClick={handleCopyWifi}
            className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-indigo-600 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
          >
            {copiedWifi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedWifi ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        {/* Meal Pass Tokens */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-600">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-xs font-bold text-slate-900">Meal Pass Tokens</div>
            </div>
            <span className="text-[11px] font-bold text-teal-700">5 Available</span>
          </div>
          <p className="text-[11px] text-slate-500">
            3 Full Meals (Lunch, Dinner, Breakfast) + 2 Midnight Refreshments.
          </p>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="px-2.5 py-1 rounded-lg bg-teal-500 text-white font-bold text-[10px]">
              L1 Active
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px]">
              D1 Ready
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px]">
              M1 Ready
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px]">
              D2 Ready
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-200 text-slate-600 font-bold text-[10px]">
              L2 Ready
            </span>
          </div>
        </div>

        {/* Power Strips & Hardware Lab */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-50 text-purple-600 shrink-0 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Power Strips &amp; Hardware Lab</div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
              Each team table has 4 grounded outlets. Embedded IoT devices &amp; soldering stations located at CS Lab 304.
            </p>
          </div>
        </div>

      </div>

      {/* Location & Entry Gates */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-slate-900">Location &amp; Entry Gates</h2>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Navigate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="p-3 rounded-xl bg-gradient-to-r from-teal-50 to-indigo-50 border border-teal-100/80 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>Auditorium Gate 2 (Check-in Desks)</span>
          </div>
          <p className="text-[11px] text-slate-500 pl-5">
            DTU Campus, Shahbad Daulatpur, Main Bawana Rd, Delhi 110042
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 pt-1">
        <button
          onClick={() => alert('Calendar event added for Nov 16-17: HackCampus 2024 at DTU!')}
          className="w-full py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-300/40 flex items-center justify-center gap-2 transition-transform active:scale-98"
        >
          <Calendar className="w-4 h-4" />
          <span>Add to Google Calendar</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => alert('HackCampus Code of Conduct: Mutual respect, original work, zero harassment.')}
            className="py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Code of Conduct</span>
          </button>

          <button
            onClick={() => alert('SOS Helpdesk: Call DTU Control Room (+91 11 2787 1018) or reach Hall B Lead.')}
            className="py-2.5 px-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            <span>SOS / Helpdesk</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-slate-400 pt-2">
          Questions? Join Discord <span className="font-bold text-indigo-600">#hackcampus-support</span> or find volunteers in neon vests.
        </p>
      </div>

    </div>
  );
}
