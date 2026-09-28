'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, QrCode, Calendar, Activity, Trophy, CreditCard, ShieldCheck, Flame, ArrowUpRight } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function MemberDashboard() {
  const [activeTab, setActiveTab] = useState<'pass' | 'bookings' | 'progress'>('pass');

  // Demo member state
  const member = {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@gmail.com',
    plan: 'Annual Elite Titan',
    status: 'Active',
    expiryDate: '24 Sep 2027',
    qrPass: 'CodeWithGandhi-MEM-994821',
    attendanceCount: 42,
    streakDays: 5,
    recentBookings: [
      { class: 'CrossFit WOD', time: 'Tomorrow, 06:30 AM', trainer: 'Marcus D’Souza' },
      { class: 'Vinyasa Yoga', time: 'Friday, 09:00 AM', trainer: 'Priya Nair' },
    ],
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-10">

        {/* Header Profile Bar */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF9F45] p-1 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-[#1F130E] flex items-center justify-center font-display font-extrabold text-2xl text-white">
                {member.name.charAt(0)}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-extrabold text-2xl text-white">{member.name}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
                  {member.status}
                </span>
              </div>
              <span className="text-xs text-stone-400 font-mono">
                {member.plan} • Valid until {member.expiryDate}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <span className="text-[10px] font-mono text-stone-400 block">WORKOUT STREAK</span>
              <span className="font-num font-black text-2xl text-[#FF4B1F] flex items-center gap-1">
                <Flame className="w-5 h-5 fill-current" />
                {member.streakDays} DAYS
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          {[
            { id: 'pass', label: 'QR Check-in Pass', icon: QrCode },
            { id: 'bookings', label: 'Class Bookings', icon: Calendar },
            { id: 'progress', label: 'Progress & Lift Log', icon: Activity },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold uppercase transition-all ${activeTab === t.id
                  ? 'bg-[#FF4B1F] text-white shadow-lg shadow-[#FF4B1F]/30'
                  : 'text-stone-400 hover:text-white'
                }`}
            >
              <t.icon className="w-4 h-4" />
              <span>{t.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'pass' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

            {/* Digital Pass Card */}
            <div className="glass-card rounded-3xl p-8 border border-[#FF4B1F]/40 text-center space-y-6 shadow-[0_0_40px_rgba(255,75,31,0.2)]">
              <span className="text-xs font-mono text-[#FF4B1F] uppercase tracking-wider block">CONTACTLESS QR CHECK-IN PASS</span>

              {/* QR Code SVG Display */}
              <div className="w-48 h-48 bg-white p-4 rounded-2xl mx-auto flex items-center justify-center border-4 border-[#FF4B1F]">
                <div className="w-full h-full bg-stone-900 rounded-lg flex flex-col items-center justify-center p-2 text-white font-mono text-[10px] text-center">
                  <QrCode className="w-24 h-24 text-white" />
                  <span className="mt-1 font-bold">{member.qrPass}</span>
                </div>
              </div>

              <div className="text-xs text-stone-400">
                Scan this QR code at any CodeWithGandhi Bengaluru turnstile sensor for instant entry.
              </div>
            </div>

            {/* Quick Membership Details */}
            <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-xl text-white">Membership Details</h3>
              <div className="space-y-3 text-xs text-stone-300 font-mono">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Pass ID:</span>
                  <span className="text-white font-bold">{member.qrPass}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Tier:</span>
                  <span className="text-[#FF4B1F] font-bold">{member.plan}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Total Check-ins:</span>
                  <span className="text-white font-bold">{member.attendanceCount} Sessions</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Sauna Access:</span>
                  <span className="text-emerald-400 font-bold">UNLIMITED</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-xl text-white">Upcoming Class Reservations</h3>
            <div className="space-y-3">
              {member.recentBookings.map((b, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-sm">
                  <div>
                    <h4 className="font-bold text-white">{b.class}</h4>
                    <span className="text-xs text-stone-400 font-mono">{b.time} • Coach: {b.trainer}</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                    CONFIRMED
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            <h3 className="font-display font-bold text-xl text-white">Personal Record (PR) Lift Log</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-xs font-mono text-stone-400 block">SQUAT PR</span>
                <span className="font-num font-extrabold text-3xl text-[#FF4B1F]">140 KG</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-xs font-mono text-stone-400 block">BENCH PRESS</span>
                <span className="font-num font-extrabold text-3xl text-amber-400">105 KG</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/10">
                <span className="text-xs font-mono text-stone-400 block">DEADLIFT PR</span>
                <span className="font-num font-extrabold text-3xl text-emerald-400">180 KG</span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
