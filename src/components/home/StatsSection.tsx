'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Award, Sparkles, Activity, Clock } from 'lucide-react';
import { GYM_BRANCHES } from '@/lib/data/gymData';

export default function StatsSection() {
  const [selectedBranch, setSelectedBranch] = useState(GYM_BRANCHES[0]);

  const stats = [
    { icon: Users, label: 'Active Iron Members', value: '3,850+' },
    { icon: Shield, label: 'Certified Master Coaches', value: '28+' },
    { icon: Award, label: 'Total Arena Sq Ft', value: '45,000' },
    { icon: Sparkles, label: 'Verified Transformations', value: '1,200+' },
  ];

  return (
    <section className="relative py-16 bg-gradient-to-b from-[#0B0705] via-[#120B08] to-[#0B0705] border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Animated Counter Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-6 rounded-3xl flex flex-col items-center text-center group hover:-translate-y-1 transition-transform duration-300"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 flex items-center justify-center text-[#FF4B1F] mb-3 group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="font-num font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {stat.value}
              </span>
              <span className="text-xs text-stone-400 font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Live Gym Crowd Meter */}
        <div
          className="glass-card rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="space-y-2 max-w-md">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                <span>LIVE GYM CROWD METER</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                Check Branch Capacity Before You Visit
              </h3>
              <p className="text-sm text-stone-400">
                Real-time RFID check-in sensor stream across Bengaluru branches.
              </p>
            </div>

            {/* Branch Selector & Gauge */}
            <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4 bg-black/40 p-4 rounded-2xl border border-white/5">
              
              <div className="flex flex-col gap-1 w-full sm:w-auto">
                <label className="text-[10px] font-mono text-stone-400 uppercase">Select Branch:</label>
                <select
                  value={selectedBranch.id}
                  onChange={(e) => {
                    const found = GYM_BRANCHES.find((b) => b.id === e.target.value);
                    if (found) setSelectedBranch(found);
                  }}
                  className="bg-[#1F130E] text-white text-xs font-semibold px-3 py-2 rounded-xl border border-white/10 outline-none focus:border-[#FF4B1F]"
                >
                  {GYM_BRANCHES.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
              </div>

              {/* Meter Status */}
              <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-white/10 pt-3 sm:pt-0 sm:pl-4 w-full sm:w-auto justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] text-stone-400 font-mono uppercase">Current Occupancy</span>
                  <span className="text-lg font-bold text-white font-num">
                    {selectedBranch.currentCount} / {selectedBranch.capacity}
                  </span>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  <span>{selectedBranch.crowdStatus}</span>
                </div>
              </div>

            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-stone-400">
            <Clock className="w-3.5 h-3.5 text-[#FF4B1F]" />
            <span>Best time to visit for peak equipment availability: <strong className="text-stone-200">1:30 PM - 4:30 PM</strong></span>
          </div>

        </div>

      </div>
    </section>
  );
}
