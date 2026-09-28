'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Users, QrCode, DollarSign, MessageCircle, Check, Bell, Flame } from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function AdminDashboard() {
  const [scanCode, setScanCode] = useState('');
  const [scanResult, setScanResult] = useState<string | null>(null);

  const stats = [
    { label: 'Active Gym Members', value: '3,850' },
    { label: 'Monthly Revenue (INR)', value: '₹14,80,000' },
    { label: 'Today Check-ins', value: '412' },
    { label: 'Expiring Subscriptions (7 Days)', value: '18' },
  ];

  const expiringMembers = [
    { name: 'Kiran Kumar', plan: 'Monthly Iron Pass', phone: '919876543210', expiryDays: 2 },
    { name: 'Pooja Hegde', plan: 'Quarterly Pass', phone: '919876543211', expiryDays: 4 },
    { name: 'Rahul Dravid', plan: 'Annual Titan', phone: '919876543212', expiryDays: 5 },
  ];

  const handleScan = () => {
    if (!scanCode) return;
    setScanResult(`ACCESS GRANTED: Verified Member (${scanCode.toUpperCase()})`);
    setTimeout(() => setScanResult(null), 4000);
    setScanCode('');
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/20 text-[#FF4B1F] text-xs font-mono font-bold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>FORGE ADMIN MANAGEMENT PORTAL</span>
            </div>
            <h1 className="font-display font-extrabold text-3xl text-white mt-1">
              SYSTEM DASHBOARD
            </h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="glass-card p-6 rounded-3xl border border-white/10">
              <span className="text-xs text-stone-400 font-mono uppercase block">{s.label}</span>
              <span className="font-num font-black text-3xl text-white mt-2 block">{s.value}</span>
            </div>
          ))}
        </div>

        {/* QR Scanner Simulator & Expiring Members */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* QR Scanner */}
          <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#FF4B1F]" />
              <span>Turnstile QR Code Scanner</span>
            </h3>

            <div className="space-y-3">
              <input
                type="text"
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value)}
                placeholder="Scan or Enter Member Pass ID..."
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-[#FF4B1F]"
              />
              <button
                onClick={handleScan}
                className="w-full py-3 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FF8000] transition-colors"
              >
                Log Check-in Attendance
              </button>
            </div>

            {scanResult && (
              <div className="p-4 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold text-center">
                {scanResult}
              </div>
            )}
          </div>

          {/* Expiring Subscriptions with 1-Click WhatsApp Reminder */}
          <div className="lg:col-span-7 glass-card rounded-3xl p-8 border border-white/10 space-y-4">
            <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
              <Bell className="w-5 h-5 text-amber-400" />
              <span>Expiring Memberships (1-Click Reminders)</span>
            </h3>

            <div className="space-y-3">
              {expiringMembers.map((m) => (
                <div key={m.name} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-white text-sm">{m.name}</h4>
                    <span className="text-stone-400 font-mono">{m.plan} • Expires in {m.expiryDays} days</span>
                  </div>

                  <a
                    href={`https://wa.me/${m.phone}?text=Hi%20${encodeURIComponent(m.name)}!%20Your%20Forge%20Athletics%20membership%20is%20expiring%20in%20${m.expiryDays}%20days.%20Click%20here%20to%20renew%20online.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500 hover:text-black transition-all font-bold"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Reminder</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
