'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Mail, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  Clock, 
  RotateCcw, 
  AlertCircle,
  ArrowRight,
  UserCheck,
  Building,
  GraduationCap
} from 'lucide-react';

export default function VerifyStudentIdentityPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'upload' | 'provisional'>('email');
  const [email, setEmail] = useState('rahul.s@dtu.ac.in');
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [code, setCode] = useState(['7', '4', '9', '', '', '']);
  const [countdown, setCountdown] = useState(39);
  const [isVerified, setIsVerified] = useState(false);
  const [idUploaded, setIdUploaded] = useState(false);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);

    // auto-focus next input if filled
    if (val && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    setIsVerified(true);
    setTimeout(() => {
      window.location.href = '/home';
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex flex-col justify-between max-w-[440px] mx-auto">
      {/* Top Header */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Link href="/onboarding/program" className="p-2 -ml-2 text-slate-700 hover:text-slate-900 rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-xs font-bold text-slate-800">Id Verification</span>
          <Link href="/home" className="text-xs font-semibold text-slate-500 hover:text-slate-800">
            Skip
          </Link>
        </div>

        {/* Step Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-primary mb-1">
            <span>STEP 4 OF 5</span>
            <span className="text-slate-400 font-medium">Student Verification</span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full" style={{ width: '80%' }} />
          </div>
        </div>

        {/* Header Title */}
        <div className="pt-2">
          <div className="flex items-center gap-1.5 text-primary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Identity Trust Protocol</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">
            Verify your Student Identity
          </h1>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Unlock exclusive student discounts, official college community access, and placement portal rights.
          </p>
        </div>

        {/* Switch Verification Method Tabs */}
        <div className="flex gap-2 pt-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('email')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'email'
                ? 'bg-primary text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            College Email
          </button>
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
              activeTab === 'upload'
                ? 'bg-primary text-white shadow-md shadow-indigo-200'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            ID Card Upload
          </button>
        </div>

        {/* Institutional Domain Email Box */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3.5">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">
                Institutional Domain Email
              </span>
              <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Domain Detected
              </span>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" />
                {isEditingEmail ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-xs font-bold text-slate-900 bg-white border border-slate-300 rounded px-1.5 py-0.5"
                    autoFocus
                  />
                ) : (
                  <span className="text-xs font-bold text-slate-900">{email}</span>
                )}
              </div>
              <button
                onClick={() => setIsEditingEmail(!isEditingEmail)}
                className="text-xs font-bold text-primary hover:underline"
              >
                {isEditingEmail ? 'Save' : 'Change'}
              </button>
            </div>
          </div>

          {/* Mail dispatched notice */}
          <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-3 flex items-start gap-2.5">
            <Mail className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] text-indigo-900 leading-snug">
              Verification 6-digit passcode dispatched to Outlook Webmail.
            </p>
          </div>

          {/* 6-digit Passcode Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-slate-700">Enter 6-digit Code</span>
              <span className="text-slate-400 font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Resend in 00:{countdown > 9 ? countdown : `0${countdown}`}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {code.map((digit, idx) => (
                <input
                  key={idx}
                  id={`digit-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleDigitChange(idx, e.target.value)}
                  className="w-full h-12 text-center text-lg font-black text-slate-900 bg-indigo-50/50 focus:bg-white border border-indigo-100 focus:border-primary rounded-xl focus:outline-none transition-all"
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <button
                onClick={() => setCountdown(60)}
                className="font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Resend Code
              </button>
              <button className="font-bold text-primary hover:underline">
                Trouble receiving?
              </button>
            </div>
          </div>
        </div>

        {/* Scan Physical Student ID Card Box */}
        <div className="bg-indigo-50/40 border border-indigo-100 rounded-3xl p-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-primary flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">Scan Physical Student ID</h4>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                Upload clear photo of physical ID card (front &amp; back) with academic...
              </p>
            </div>
          </div>
          <button
            onClick={() => setIdUploaded(true)}
            className="px-3.5 py-1.5 bg-indigo-100 hover:bg-indigo-200 text-primary rounded-xl text-xs font-bold transition-colors"
          >
            {idUploaded ? 'Uploaded ✓' : 'Upload'}
          </button>
        </div>

        {/* Instant Unlocks Checklist */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-2.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Instant Unlocks Once Verified
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Access official DTU verified campus feed &amp; notices</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Join private CS Dept semester groups &amp; assignment pools</span>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Access placement drive tracker &amp; alumni network</span>
            </div>
          </div>
        </div>

        {/* Official Network Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white p-4">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80"
            alt="DTU Campus"
            className="absolute inset-0 w-full h-full object-cover opacity-30"
          />
          <div className="relative z-10 space-y-1">
            <span className="text-[9px] font-bold uppercase tracking-wider bg-primary/90 px-2 py-0.5 rounded">
              Official Network
            </span>
            <h3 className="text-sm font-black">
              Join 12,400+ verified DTU peers today
            </h3>
          </div>
        </div>

        {/* No College Email Provisional Access */}
        <div className="bg-indigo-50/70 border border-indigo-100 rounded-3xl p-3.5 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-950">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span>Don&apos;t have a college email yet?</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Request provisional 14-day access with your admission slip or fee receipt.
          </p>
          <button className="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-1">
            Submit Admission Slip <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Verify Button */}
      <div className="pt-4 pb-2 space-y-2">
        <button
          onClick={handleVerify}
          className="w-full py-3.5 bg-primary hover:bg-primary-dark text-white rounded-2xl shadow-lg shadow-indigo-300 text-xs font-bold flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          {isVerified ? 'Verification Successful ✓' : 'Verify & Enter CampusLife'}
          <ArrowRight className="w-4 h-4" />
        </button>
        <div className="text-center">
          <Link href="/home" className="text-xs font-semibold text-slate-400 hover:text-slate-600">
            Do this later
          </Link>
        </div>
      </div>
    </div>
  );
}
