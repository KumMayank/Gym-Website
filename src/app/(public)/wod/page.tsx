'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Play as PlayIcon, Pause as PauseIcon, RotateCcw as ResetIcon, Timer as TimerIcon } from 'lucide-react';

export default function WODPage() {
  const [seconds, setSeconds] = useState(1200); // 20 mins WOD timer
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((sec) => sec - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const wodExercises = [
    { reps: '400m Run', move: 'Warmup Metabolic Sprint' },
    { reps: '21 - 15 - 9 Reps', move: 'Barbell Thrusters (42.5kg / 30kg)' },
    { reps: '21 - 15 - 9 Reps', move: 'Kettlebell Swings (24kg / 16kg)' },
    { reps: '21 - 15 - 9 Reps', move: 'Toes-To-Bar or Knee Raises' },
    { reps: '400m Run', move: 'Finisher Sprint to Cap' },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <TimerIcon className="w-3.5 h-3.5" />
            <span>DAILY CROSSFIT & CONDITIONING</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            WORKOUT OF THE <span className="text-[#FF4B1F]">DAY (WOD)</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-lg mx-auto">
            Today&apos;s programmed metabolic workout by CrossFit Master Coach Marcus D&apos;Souza.
          </p>
        </div>

        {/* Built-in Interval Countdown Timer */}
        <div className="glass-card rounded-3xl p-8 border border-[#FF4B1F]/40 text-center space-y-6 shadow-[0_0_40px_rgba(255,75,31,0.2)]">
          <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block">20-MINUTE TIME CAP TIMER</span>
          
          <div className="font-num font-black text-6xl sm:text-8xl text-[#FF4B1F] tracking-tight">
            {formatTime(seconds)}
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FF8000] transition-all shadow-lg"
            >
              {isActive ? <PauseIcon className="w-4 h-4" /> : <PlayIcon className="w-4 h-4 fill-current" />}
              <span>{isActive ? 'Pause Timer' : 'Start WOD Timer'}</span>
            </button>

            <button
              onClick={() => {
                setIsActive(false);
                setSeconds(1200);
              }}
              className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-stone-300 border border-white/10"
              title="Reset Timer"
            >
              <ResetIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* WOD Breakdown Card */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
          <h2 className="font-display font-bold text-2xl text-white flex items-center gap-2">
            <span>WOD: &ldquo;THE BENGALURU BURN&rdquo;</span>
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[#FF4B1F]/20 text-[#FF4B1F]">20 Min Cap</span>
          </h2>

          <div className="space-y-3 pt-2">
            {wodExercises.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between text-sm">
                <span className="font-mono text-[#FF4B1F] font-bold">{item.reps}</span>
                <span className="text-white font-medium">{item.move}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
