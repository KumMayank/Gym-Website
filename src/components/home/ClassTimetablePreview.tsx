'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, ArrowUpRight, Flame } from 'lucide-react';

interface ClassItem {
  id: string;
  time: string;
  title: string;
  category: string;
  intensity: string;
  trainer: string;
  room: string;
  spotsLeft: number;
}

const SCHEDULE: ClassItem[] = [
  { id: '1', time: '06:30 AM', title: 'CrossFit WOD & Metabolic Surge', category: 'CrossFit', intensity: 'Extreme', trainer: 'Marcus D’Souza', room: 'Studio A', spotsLeft: 3 },
  { id: '2', time: '07:30 AM', title: 'High-Octane Spin & Cardio Blast', category: 'Spin', intensity: 'High', trainer: 'Ananya Rao', room: 'Spin Arena', spotsLeft: 5 },
  { id: '3', time: '09:00 AM', title: 'Vinyasa Flow & Hip Mobility', category: 'Yoga', intensity: 'Low', trainer: 'Priya Nair', room: 'Zen Loft', spotsLeft: 8 },
  { id: '4', time: '05:30 PM', title: 'Heavy Hypertrophy & Powerlifting', category: 'Strength', intensity: 'Extreme', trainer: 'Vikram Singh', room: 'Power Zone', spotsLeft: 2 },
  { id: '5', time: '06:30 PM', title: 'Boxing & MMA Striking Conditioning', category: 'Boxing', intensity: 'High', trainer: 'Marcus D’Souza', room: 'Combat Cage', spotsLeft: 4 },
  { id: '6', time: '07:30 PM', title: 'Aqua Hydro Cardio & Lap Training', category: 'Aqua', intensity: 'Medium', trainer: 'Ananya Rao', room: 'Indoor Pool', spotsLeft: 6 },
];

export default function ClassTimetablePreview() {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = ['All', 'CrossFit', 'Spin', 'Yoga', 'Strength', 'Boxing'];

  const filtered = activeCategory === 'All'
    ? SCHEDULE
    : SCHEDULE.filter((c) => c.category === activeCategory);

  return (
    <section className="py-24 bg-[#0E0805] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
              <Calendar className="w-3.5 h-3.5" />
              <span>LIVE DAILY TIMETABLE</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              TODAY&apos;S <span className="text-[#FF4B1F]">CLASS SCHEDULE</span>
            </h2>
          </div>

          <Link
            href="/schedule"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-300 hover:text-[#FF4B1F] transition-colors group"
          >
            <span>View Full Weekly Timetable</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4B1F]" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#FF4B1F] text-white shadow-lg shadow-[#FF4B1F]/30'
                  : 'bg-white/5 border border-white/10 text-stone-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="space-y-3">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-[#FF4B1F]/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-stone-200 font-mono text-sm font-bold">
                  <Clock className="w-4 h-4 text-[#FF4B1F]" />
                  <span>{item.time}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base text-white">{item.title}</h3>
                    <span className="px-2 py-0.5 rounded-full bg-[#FF4B1F]/20 text-[#FF4B1F] text-[10px] font-bold">
                      {item.intensity}
                    </span>
                  </div>
                  <span className="text-xs text-stone-400 font-mono mt-0.5 block">
                    Coach: {item.trainer} • {item.room}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between border-t md:border-t-0 border-white/5 pt-3 md:pt-0">
                <span className="text-xs text-emerald-400 font-mono font-semibold">
                  🔥 {item.spotsLeft} spots remaining
                </span>

                <Link
                  href={`/schedule?book=${item.id}`}
                  className="px-4 py-2 rounded-full bg-white/10 hover:bg-[#FF4B1F] text-white text-xs font-bold uppercase transition-all"
                >
                  Reserve Spot
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
