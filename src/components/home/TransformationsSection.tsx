'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { GYM_TRANSFORMATIONS } from '@/lib/data/gymData';

export default function TransformationsSection() {
  const [activeTab, setActiveTab] = useState('all');
  const [sliderPos, setSliderPos] = useState(50);
  const currentItem = GYM_TRANSFORMATIONS[0];

  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = (x / rect.width) * 100;
    setSliderPos(percent);
  };

  return (
    <section className="py-24 bg-[#0B0705] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5" />
              <span>REAL BENGALURU MEMBERS</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              PROVEN BODY <span className="text-[#FF4B1F]">TRANSFORMATIONS</span>
            </h2>
          </div>
        </div>

        {/* Transformation Showcase Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Interactive Draggable Before/After Image Slider */}
          <div className="lg:col-span-7">
            <div
              onMouseMove={handleSliderMove}
              onTouchMove={handleSliderMove}
              className="relative h-[380px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl cursor-ew-resize select-none group"
            >
              {/* After Image (Full width background) */}
              <div className="absolute inset-0">
                <Image
                  src={currentItem.afterImage}
                  alt="After transformation"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-emerald-500/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                  AFTER ({currentItem.durationMonths} MONTHS)
                </div>
              </div>

              {/* Before Image (Clipped overlay) */}
              <div
                className="absolute inset-y-0 left-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={currentItem.beforeImage}
                    alt="Before transformation"
                    fill
                    className="object-cover filter grayscale contrast-125"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md text-white text-xs font-bold uppercase tracking-wider">
                    BEFORE DAY 1
                  </div>
                </div>
              </div>

              {/* Slider Handle Divider */}
              <div
                className="absolute inset-y-0 w-1 bg-[#FF4B1F] shadow-[0_0_15px_#FF4B1F] flex items-center justify-center pointer-events-none"
                style={{ left: `${sliderPos}%` }}
              >
                <div className="w-9 h-9 rounded-full bg-[#FF4B1F] text-white flex items-center justify-center font-bold text-xs shadow-lg border-2 border-black">
                  ↔
                </div>
              </div>
            </div>
            <p className="text-center text-xs font-mono text-stone-500 mt-3">
              Drag left or right on the image to compare before & after
            </p>
          </div>

          {/* Right: Member Story & Metric Breakdown */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CONSENT VERIFIED TRANSFORMATION</span>
            </div>

            <h3 className="font-display font-extrabold text-3xl text-white">
              {currentItem.memberName}
            </h3>

            {/* Metrics Chips */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Weight Reduced</span>
                <span className="font-num font-extrabold text-2xl text-[#FF4B1F]">
                  -{currentItem.weightLostKg} KG
                </span>
              </div>
              <div className="glass-card p-4 rounded-2xl border border-white/10">
                <span className="text-[10px] font-mono text-stone-400 uppercase block">Body Fat Shift</span>
                <span className="font-num font-extrabold text-2xl text-amber-400">
                  {currentItem.bodyFatDiff}
                </span>
              </div>
            </div>

            <p className="text-sm text-stone-300 leading-relaxed font-normal">
              &ldquo;{currentItem.story}&rdquo;
            </p>

            <div className="pt-2 text-xs text-stone-400 border-t border-white/10 flex items-center justify-between">
              <span>Goal Category: <strong className="text-white">{currentItem.goalCategory}</strong></span>
              <span>Coach: <strong className="text-[#FF4B1F]">{currentItem.trainerName}</strong></span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
