'use client';

import { motion } from 'framer-motion';
import { ShieldAlert, Zap, Cpu, HeartPulse, Flame, CheckCircle2 } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    {
      icon: Zap,
      title: 'Competition Eleiko & Rogue Gear',
      desc: 'Zero plastic plates. Calibrated steel powerlifting plates, Rogue Monster racks, and competition bars.',
    },
    {
      icon: Cpu,
      title: '3D Biometric & InBody 770 Scan',
      desc: 'Track visceral fat, segmental lean mass, and skeletal muscle density directly inside your member portal.',
    },
    {
      icon: HeartPulse,
      title: 'Infrared Sauna & Cold Plunge',
      desc: 'Accelerate muscular recovery and flush lactic acid in our Finnish dry saunas and cold therapy units.',
    },
    {
      icon: ShieldAlert,
      title: 'Certified ACSM / CrossFit Coaches',
      desc: 'No rookie trainers. Every coach undergoes 200+ hours of biomechanics and periodization training.',
    },
  ];

  return (
    <section className="py-24 bg-[#0B0705] relative border-t border-white/5 overflow-hidden">

      {/* Heartbeat ECG Line Divider */}
      <div className="w-full flex items-center justify-center my-6 opacity-30">
        <svg className="w-full h-12 text-[#FF4B1F]" viewBox="0 0 1200 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 50H400L420 20L440 80L460 10L480 90L500 50H1200" stroke="currentColor" strokeWidth="3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>THE CodeWithGandhi DIFFERENCE</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WHY BENGALURU ATHLETES <br />
            <span className="text-[#FF4B1F]">CHOOSE CodeWithGandhi</span>
          </h2>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="glass-card rounded-3xl p-8 border border-white/10 space-y-4 group hover:border-[#FF4B1F]/40"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 flex items-center justify-center text-[#FF4B1F] group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(255,75,31,0.2)]">
                <f.icon className="w-7 h-7" />
              </div>

              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FF4B1F] transition-colors">
                {f.title}
              </h3>

              <p className="text-sm text-stone-400 leading-relaxed font-normal">
                {f.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
