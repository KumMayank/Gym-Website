'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Dumbbell, UserCheck, Flame, ArrowUpRight } from 'lucide-react';

interface MuscleGroup {
  id: string;
  name: string;
  description: string;
  keyExercises: string[];
  recommendedTrainer: string;
  intensity: 'Low' | 'Medium' | 'High' | 'Extreme';
}

const MUSCLE_DATA: MuscleGroup[] = [
  {
    id: 'chest',
    name: 'Pectorals (Chest)',
    description: 'Target upper, middle, and lower pectoral fibers for chest width and pressing power.',
    keyExercises: ['Incline Barbell Bench Press', 'Weighted Dips', 'Cable Flyes', 'Dumbbell Squeeze Press'],
    recommendedTrainer: 'Vikram Singh',
    intensity: 'High',
  },
  {
    id: 'back',
    name: 'Latissimus Dorsi & Rhomboids (Back)',
    description: 'Build V-taper lat width and dense mid-back thickness for posture and pulling power.',
    keyExercises: ['Weighted Pull-Ups', 'Barbell Bent-Over Rows', 'Single-Arm Dumbbell Rows', 'Seated Cable Rows'],
    recommendedTrainer: 'Marcus D’Souza',
    intensity: 'Extreme',
  },
  {
    id: 'legs',
    name: 'Quadriceps & Hamstrings (Legs)',
    description: 'Build leg quad sweep, hamstring density, and explosive lower-body power.',
    keyExercises: ['Barbell Back Squats', 'Romanian Deadlifts', 'Leg Press Dropsets', 'Bulgarian Split Squats'],
    recommendedTrainer: 'Vikram Singh',
    intensity: 'Extreme',
  },
  {
    id: 'shoulders',
    name: 'Deltoids & Trapezius (Shoulders)',
    description: 'Develop 3D boulder shoulders with lateral raise variations and overhead pressing.',
    keyExercises: ['Overhead Military Press', 'Cable Lateral Raises', 'Rear Delt Flyes', 'Face Pulls'],
    recommendedTrainer: 'Ananya Rao',
    intensity: 'High',
  },
  {
    id: 'core',
    name: 'Abdominals & Obliques (Core)',
    description: 'Strengthen rotational core stability, lumbar spine safety, and abdominal definition.',
    keyExercises: ['Hanging Leg Raises', 'Ab Wheel Rollouts', 'Cable Woodchoppers', 'Plank Variations'],
    recommendedTrainer: 'Ananya Rao',
    intensity: 'Medium',
  },
  {
    id: 'arms',
    name: 'Biceps & Triceps (Arms)',
    description: 'Isolate arm muscle heads for bicep peaks and dense horseshoe triceps.',
    keyExercises: ['EZ-Bar Preacher Curls', 'Skullcrushers', 'Hammer Curls', 'Tricep Rope Pushdowns'],
    recommendedTrainer: 'Priya Nair',
    intensity: 'High',
  },
];

export default function InteractiveMuscleMap() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>(MUSCLE_DATA[0]);

  return (
    <section className="py-24 bg-[#0E0805] relative border-t border-white/5 overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Activity className="w-3.5 h-3.5" />
            <span>INTERACTIVE 3D BIOMETRIC MAP</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            SELECT A <span className="text-[#FF4B1F]">MUSCLE GROUP</span>
          </h2>
          <p className="text-stone-400 text-sm">
            Click any muscle region to reveal targeted exercises, sample routines, and recommended CodeWithGandhi coaches.
          </p>
        </div>

        {/* Layout: Interactive Buttons & Details Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Visual Muscle Target Selector */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {MUSCLE_DATA.map((muscle) => {
              const isSelected = selectedMuscle.id === muscle.id;
              return (
                <button
                  key={muscle.id}
                  onClick={() => setSelectedMuscle(muscle)}
                  className={`p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between h-32 relative overflow-hidden group ${isSelected
                      ? 'bg-gradient-to-tr from-[#FF4B1F] to-[#FF8000] border-[#FF4B1F] shadow-[0_0_25px_rgba(255,75,31,0.5)] scale-105 z-10'
                      : 'glass-card border-white/10 hover:border-[#FF4B1F]/40'
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <Dumbbell className={`w-5 h-5 ${isSelected ? 'text-black' : 'text-[#FF4B1F]'}`} />
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${isSelected ? 'bg-black/30 text-white' : 'bg-white/5 text-stone-400'}`}>
                      {muscle.intensity}
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    <span className={`font-display font-bold text-sm block ${isSelected ? 'text-black font-extrabold' : 'text-white'}`}>
                      {muscle.name.split(' ')[0]}
                    </span>
                    <span className={`text-[11px] font-mono block ${isSelected ? 'text-black/80' : 'text-stone-400'}`}>
                      {muscle.name.split('(')[1]?.replace(')', '') || ''}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Selected Muscle Routine Details Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedMuscle.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-card rounded-3xl p-8 border border-[#FF4B1F]/30 space-y-6 shadow-[0_0_40px_rgba(255,75,31,0.15)] relative"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-xs font-mono text-[#FF4B1F] uppercase tracking-wider">SELECTED TARGET</span>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {selectedMuscle.name}
                    </h3>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-[#FF4B1F]/20 border border-[#FF4B1F]/40 text-[#FF4B1F] text-xs font-bold">
                    {selectedMuscle.intensity} Intensity
                  </div>
                </div>

                <p className="text-sm text-stone-300 leading-relaxed">
                  {selectedMuscle.description}
                </p>

                {/* Key Exercises */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-stone-400 uppercase tracking-wider block">
                    TOP STIMULATION EXERCISES:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedMuscle.keyExercises.map((ex) => (
                      <div key={ex} className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs text-stone-200">
                        <Flame className="w-3.5 h-3.5 text-[#FF4B1F] shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Trainer & CTA */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-emerald-400" />
                    <div className="text-xs">
                      <span className="text-stone-400 block">Recommended Coach:</span>
                      <strong className="text-white font-semibold">{selectedMuscle.recommendedTrainer}</strong>
                    </div>
                  </div>

                  <Link
                    href="/free-trial"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase hover:bg-[#FF8000] transition-colors shadow-lg shadow-[#FF4B1F]/30"
                  >
                    <span>Book PT Workout Session</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
