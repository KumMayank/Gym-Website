'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calculator, ShieldAlert, ArrowUpRight, Flame, Droplet, Dumbbell, Activity } from 'lucide-react';

export default function CalculatorsPage() {
  const [activeTab, setActiveTab] = useState<'bmi' | 'bmr' | 'oneRM' | 'water'>('bmi');

  // BMI State
  const [heightCm, setHeightCm] = useState(175);
  const [weightKg, setWeightKg] = useState(75);

  // 1RM State
  const [liftWeight, setLiftWeight] = useState(100);
  const [liftReps, setLiftReps] = useState(5);

  // Calculations
  const bmi = (weightKg / Math.pow(heightCm / 100, 2)).toFixed(1);
  const bmiCategory =
    Number(bmi) < 18.5 ? 'Underweight' : Number(bmi) < 25 ? 'Normal weight' : Number(bmi) < 30 ? 'Overweight' : 'Obese';

  const bmr = Math.round(10 * weightKg + 6.25 * heightCm - 5 * 28 + 5); // Mifflin-St Jeor estimate
  const tdee = Math.round(bmr * 1.55); // Moderate activity multiplier

  // Epley Formula for 1RM: w * (1 + r/30)
  const oneRM = Math.round(liftWeight * (1 + liftReps / 30));

  const recommendedWaterLiters = (weightKg * 0.035).toFixed(1);

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Calculator className="w-3.5 h-3.5" />
            <span>ATHLETIC BIOMETRICS</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            FITNESS <span className="text-[#FF4B1F]">CALCULATORS</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            Scientific biometric estimators for strength, metabolic rate, BMI, and daily hydration targets.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'bmi', label: 'BMI Estimator', icon: Activity },
            { id: 'bmr', label: 'BMR & TDEE Calorie', icon: Flame },
            { id: 'oneRM', label: '1-Rep Max Calculator', icon: Dumbbell },
            { id: 'water', label: 'Water Intake Target', icon: Droplet },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase transition-all ${
                activeTab === tab.id
                  ? 'bg-[#FF4B1F] text-white shadow-lg shadow-[#FF4B1F]/30'
                  : 'glass-card border border-white/10 text-stone-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Calculator Display Panel */}
        <div className="glass-card rounded-3xl p-8 border border-white/10 max-w-2xl mx-auto space-y-6">
          
          {/* BMI Panel */}
          {activeTab === 'bmi' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">Body Mass Index (BMI)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-400">Height (cm): {heightCm}</label>
                  <input
                    type="range"
                    min="140"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="w-full accent-[#FF4B1F]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-400">Weight (kg): {weightKg}</label>
                  <input
                    type="range"
                    min="40"
                    max="160"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="w-full accent-[#FF4B1F]"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-stone-400 block">YOUR BMI</span>
                  <span className="font-num font-extrabold text-4xl text-[#FF4B1F]">{bmi}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-stone-400 block">CATEGORY</span>
                  <span className="font-bold text-lg text-emerald-400">{bmiCategory}</span>
                </div>
              </div>
            </div>
          )}

          {/* BMR / TDEE Panel */}
          {activeTab === 'bmr' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">BMR & Daily TDEE Calories</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-black/40 border border-white/10">
                  <span className="text-xs font-mono text-stone-400 block">Basal Metabolic Rate (BMR)</span>
                  <span className="font-num font-extrabold text-3xl text-amber-400">{bmr} kcal</span>
                  <span className="text-[10px] text-stone-500 block mt-1">Calories burned at absolute rest</span>
                </div>

                <div className="p-6 rounded-2xl bg-black/40 border border-[#FF4B1F]/40">
                  <span className="text-xs font-mono text-stone-400 block">Daily Maintenance TDEE</span>
                  <span className="font-num font-extrabold text-3xl text-[#FF4B1F]">{tdee} kcal</span>
                  <span className="text-[10px] text-stone-500 block mt-1">Includes 4x weekly exercise</span>
                </div>
              </div>
            </div>
          )}

          {/* 1RM Panel */}
          {activeTab === 'oneRM' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">Estimated 1-Repetition Maximum (1RM)</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-400">Lifted Weight (kg)</label>
                  <input
                    type="number"
                    value={liftWeight}
                    onChange={(e) => setLiftWeight(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FF4B1F]"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono text-stone-400">Completed Repetitions</label>
                  <input
                    type="number"
                    value={liftReps}
                    onChange={(e) => setLiftReps(Number(e.target.value))}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-white outline-none focus:border-[#FF4B1F]"
                  />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-black/40 border border-[#FF4B1F]/40 text-center">
                <span className="text-xs font-mono text-stone-400 block">ESTIMATED MAXIMUM 1RM</span>
                <span className="font-num font-black text-5xl text-[#FF4B1F]">{oneRM} KG</span>
              </div>
            </div>
          )}

          {/* Water Intake Panel */}
          {activeTab === 'water' && (
            <div className="space-y-6">
              <h3 className="font-display font-bold text-xl text-white">Daily Hydration Target</h3>
              
              <div className="p-6 rounded-2xl bg-black/40 border border-cyan-500/40 text-center space-y-2">
                <Droplet className="w-8 h-8 text-cyan-400 mx-auto animate-bounce" />
                <span className="text-xs font-mono text-stone-400 block">RECOMMENDED DAILY WATER INTAKE</span>
                <span className="font-num font-black text-4xl text-cyan-400">{recommendedWaterLiters} LITERS</span>
                <span className="text-xs text-stone-400 block">Add +0.5L for every 45 mins of intense workout</span>
              </div>
            </div>
          )}

          {/* Safety Disclaimer & Consultation CTA */}
          <div className="pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-start gap-2.5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
              <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Note: Biometric calculations provide mathematical estimates. For medical clearance or customized periodization, consult a certified Forge master trainer.
              </span>
            </div>

            <Link
              href="/free-trial"
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase hover:bg-[#FF8000] transition-colors shadow-lg shadow-[#FF4B1F]/30"
            >
              <span>Book 1-on-1 Fitness Assessment with Coach</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
