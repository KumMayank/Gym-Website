'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ArrowLeft, Check, Flame, Trophy } from 'lucide-react';
import { GYM_PLANS, GYM_TRAINERS } from '@/lib/data/gymData';
import { formatINR } from '@/lib/utils';

export default function PlanQuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    goal: '',
    experience: '',
    daysPerWeek: '',
    budget: '',
  });

  const questions = [
    {
      key: 'goal',
      title: 'What is your primary fitness goal?',
      options: [
        { label: 'Fat Loss & Physique Recomp', desc: 'Burn fat while sculpting tight lean muscle mass' },
        { label: 'Muscle Hypertrophy & Bulk', desc: 'Build raw muscle size and strength density' },
        { label: 'Powerlifting & Athletic Strength', desc: 'Maximize squat, bench press and deadlift numbers' },
        { label: 'General Fitness & Flexibility', desc: 'Improve cardiovascular health, mobility and energy' },
      ],
    },
    {
      key: 'experience',
      title: 'What is your training experience level?',
      options: [
        { label: 'Complete Beginner (0 - 6 months)', desc: 'Need guidance on proper lifting form and routine' },
        { label: 'Intermediate lifter (1 - 3 years)', desc: 'Know basic lifts, looking for periodized progress' },
        { label: 'Advanced Athlete (3+ years)', desc: 'High intensity lifting, Eleiko gear & competition prep' },
      ],
    },
    {
      key: 'daysPerWeek',
      title: 'How many days per week can you train?',
      options: [
        { label: '2 - 3 Days / Week', desc: 'Full body sessions or upper/lower splits' },
        { label: '4 - 5 Days / Week', desc: 'Push / Pull / Legs athletic split' },
        { label: '6 Days / Week', desc: 'Dedicated high frequency periodization' },
      ],
    },
  ];

  const handleSelect = (optionLabel: string) => {
    const currentKey = questions[step].key as keyof typeof answers;
    const updated = { ...answers, [currentKey]: optionLabel };
    setAnswers(updated);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setStep(questions.length); // Result screen
    }
  };

  const recommendedPlan = GYM_PLANS[2]; // Annual Elite Titan
  const recommendedTrainer = GYM_TRAINERS[0];

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI PLAN RECOMENDER QUIZ</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            FIND YOUR <span className="text-[#FF4B1F]">PERFECT PLAN</span>
          </h1>
          <p className="text-stone-400 text-sm">
            Answer 3 quick questions to receive a customized membership & coach recommendation.
          </p>
        </div>

        {/* Wizard Panel */}
        {step < questions.length ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="glass-card rounded-3xl p-8 border border-white/10 space-y-6"
          >
            <div className="flex items-center justify-between text-xs font-mono text-stone-400 border-b border-white/10 pb-4">
              <span>QUESTION {step + 1} OF {questions.length}</span>
              <span className="text-[#FF4B1F] font-bold">{Math.round(((step + 1) / questions.length) * 100)}% COMPLETE</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-white">
              {questions[step].title}
            </h2>

            <div className="space-y-3">
              {questions[step].options.map((opt) => (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  className="w-full text-left p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-[#FF4B1F] hover:bg-[#FF4B1F]/10 transition-all flex items-center justify-between group"
                >
                  <div className="space-y-1">
                    <span className="font-display font-bold text-base text-white group-hover:text-[#FF4B1F] block">
                      {opt.label}
                    </span>
                    <span className="text-xs text-stone-400 block">{opt.desc}</span>
                  </div>
                  <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-[#FF4B1F] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="inline-flex items-center gap-2 text-xs text-stone-400 hover:text-white pt-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Question</span>
              </button>
            )}

          </motion.div>
        ) : (
          /* Result Card */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-8 border border-[#FF4B1F]/40 space-y-6 shadow-[0_0_50px_rgba(255,75,31,0.25)] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF9F45] flex items-center justify-center text-black mx-auto shadow-[0_0_20px_#FF4B1F]">
              <Trophy className="w-8 h-8 fill-current" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono text-[#FF4B1F] uppercase tracking-wider">YOUR TAILORED FIT</span>
              <h2 className="font-display font-extrabold text-3xl text-white">
                RECOMMENDED: {recommendedPlan.title}
              </h2>
              <p className="text-stone-300 text-sm max-w-md mx-auto">
                Based on your goal ({answers.goal}), we recommend our flagship Annual Titan pass with 1-on-1 coaching by {recommendedTrainer.name}.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-white text-lg">{recommendedPlan.title}</span>
                <span className="font-num font-black text-2xl text-[#FF4B1F]">
                  {formatINR(Math.round(recommendedPlan.priceInr * 1.18))}
                </span>
              </div>
              <div className="space-y-1 text-xs text-stone-300">
                {recommendedPlan.features.slice(0, 4).map((f) => (
                  <div key={f} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#FF4B1F]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/checkout?plan=${recommendedPlan.slug}`}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FF8000] transition-colors shadow-lg shadow-[#FF4B1F]/30"
              >
                Claim Quiz Discount & Proceed
              </Link>
              
              <button
                onClick={() => setStep(0)}
                className="text-xs text-stone-400 hover:text-white"
              >
                Retake Quiz
              </button>
            </div>

          </motion.div>
        )}

      </div>
    </div>
  );
}
