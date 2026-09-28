'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, Flame, Shield, ArrowUpRight, Percent, FileText } from 'lucide-react';
import { GYM_PLANS } from '@/lib/data/gymData';
import { formatINR } from '@/lib/utils';

export default function PlansSection() {
  const [includeGST, setIncludeGST] = useState(true);

  return (
    <section className="py-24 bg-[#0B0705] relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>TRANSPARENT PRICING</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            MEMBERSHIP <span className="text-[#FF4B1F]">TIERS & ACCESS</span>
          </h2>
          <p className="text-stone-400 text-sm">
            No hidden maintenance charges or admission fees. Includes GST invoice PDF download.
          </p>

          {/* GST Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            <button
              onClick={() => setIncludeGST(true)}
              className={`px-4 py-1.5 rounded-full transition-all ${includeGST ? 'bg-[#FF4B1F] text-white font-bold' : 'text-stone-400'}`}
            >
              Inclusive of 18% GST
            </button>
            <button
              onClick={() => setIncludeGST(false)}
              className={`px-4 py-1.5 rounded-full transition-all ${!includeGST ? 'bg-[#FF4B1F] text-white font-bold' : 'text-stone-400'}`}
            >
              Base Price (Excl. Tax)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {GYM_PLANS.map((plan) => {
            const finalPrice = includeGST
              ? Math.round(plan.priceInr * (1 + plan.gstPercent / 100))
              : plan.priceInr;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -8 }}
                className={`glass-card rounded-3xl p-8 border flex flex-col justify-between relative ${
                  plan.isPopular
                    ? 'border-[#FF4B1F] bg-gradient-to-b from-[#1F130E] to-[#0E0805] shadow-[0_0_40px_rgba(255,75,31,0.25)] scale-105 z-10'
                    : 'border-white/10 hover:border-[#FF4B1F]/40'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white font-bold text-[10px] uppercase tracking-widest shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div className="space-y-6">
                  {/* Title & Price */}
                  <div>
                    <h3 className="font-display font-extrabold text-xl text-white">
                      {plan.title}
                    </h3>
                    <div className="mt-4 flex items-baseline gap-1">
                      <span className="font-num font-black text-3xl text-white">
                        {formatINR(finalPrice)}
                      </span>
                      <span className="text-xs text-stone-400 font-mono">
                        / {plan.durationMonths} {plan.durationMonths === 1 ? 'mo' : 'mos'}
                      </span>
                    </div>
                    {includeGST && (
                      <span className="text-[10px] text-stone-500 block mt-1 font-mono">
                        Includes ₹{Math.round(plan.priceInr * 0.18)} GST (18%)
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 pt-4 border-t border-white/10">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-xs text-stone-300">
                        <Check className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Checkout CTA */}
                <div className="pt-8 space-y-3">
                  <Link
                    href={`/checkout?plan=${plan.slug}`}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white shadow-lg shadow-[#FF4B1F]/40 hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-[#FF4B1F] hover:text-white'
                    }`}
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-stone-500 font-mono">
                    <Shield className="w-3 h-3 text-emerald-400" />
                    <span>UPI, Cards, Netbanking & EMI</span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
