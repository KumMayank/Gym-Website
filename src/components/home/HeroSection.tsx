'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Star, ArrowUpRight, Flame, X } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamic import for R3F Canvas to ensure zero LCP blocking
const HeroCanvas = dynamic(() => import('@/components/3d/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-transparent" />,
});

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (e.clientX / innerWidth - 0.5) * 30,
        y: (e.clientY / innerHeight - 0.5) * 30,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const serviceChips = [
    { label: 'Personal Training', href: '/services/personal-training' },
    { label: 'Strength & Power', href: '/services/strength-conditioning' },
    { label: 'Group HIIT & Spin', href: '/services/group-classes' },
    { label: 'Aqua Pool', href: '/services/swimming-recovery' },
    { label: 'Cardio Gallery', href: '/services/cardio-endurance' },
    { label: 'Physio Recovery', href: '/services/physio-recovery' },
  ];

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0B0705]">

      {/* 3D WebGL Canvas Layer (Client Lazy Loaded) */}
      <HeroCanvas />

      {/* Layer 1: Giant Outlined Background Text with Parallax */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0"
        style={{
          x: mousePos.x * -0.5,
          y: mousePos.y * -0.5,
        }}
      >
        <span className="font-display font-black text-[22vw] leading-none uppercase text-outline-giant opacity-40 font-num">
          CodeWithGandhi
        </span>
      </motion.div>

      {/* Orange Radial Glow Behind Athlete */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-gradient-to-tr from-[#FF4B1F]/30 to-[#FF9F45]/20 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* Main Content & Athlete Cutout Layer */}
      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto">

        {/* Left Column: Headline, Copy & CTAs */}
        <div className="lg:col-span-7 space-y-6">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#FF4B1F]/40 shadow-[0_0_15px_rgba(255,75,31,0.2)]">
            <Flame className="w-4 h-4 text-[#FF4B1F]" />
            <span className="text-xs font-semibold text-stone-200 uppercase tracking-widest">
              BENGALURU&apos;S PREMIER 3D ATHLETIC HUB
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-white">
            FORGED IN SWEAT. <br />
            <span className="bg-gradient-to-r from-[#FF4B1F] via-[#FF8000] to-[#FF9F45] bg-clip-text text-transparent glow-text-orange">
              TEMPER YOUR IRON.
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-stone-300 max-w-xl leading-relaxed font-normal">
            Step into Bengaluru&apos;s most advanced fitness arena. Equipped with Eleiko competition gear, 3D biometric tracking, infrared recovery saunas, and 1-on-1 athletic periodization.
          </p>

          {/* CTAs Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            {/* Join Now Pill Button */}
            <Link
              href="/plans"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,75,31,0.5)] hover:shadow-[0_0_45px_rgba(255,75,31,0.8)] hover:scale-105 transition-all"
            >
              <span>Join CodeWithGandhi Today</span>
              <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>

            {/* Watch Video Modal Trigger */}
            <button
              onClick={() => setVideoOpen(true)}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full bg-white/5 border border-white/10 hover:border-[#FF4B1F]/50 text-white font-semibold text-sm hover:bg-white/10 transition-all group"
            >
              <div className="w-8 h-8 rounded-full bg-[#FF4B1F]/20 flex items-center justify-center text-[#FF4B1F] group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
              <span>Watch Arena Tour</span>
            </button>
          </div>

          {/* Social Proof Rating & Avatars */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 max-w-lg">
            {/* Avatar stack */}
            <div className="flex -space-x-3">
              {['r1', 'r2', 'r3', 'r4'].map((img, i) => (
                <div key={img} className="w-10 h-10 rounded-full border-2 border-[#0B0705] overflow-hidden relative">
                  <Image
                    src={`https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80&sig=${i}`}
                    alt="Member avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* Rating text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
                <span className="text-white font-bold text-sm ml-1">4.98 / 5</span>
              </div>
              <span className="text-xs text-stone-400 font-medium">
                Based on 1,740+ verified Google Reviews in Indiranagar & Koramangala
              </span>
            </div>
          </div>

        </div>

        {/* Right Column: Layered Parallax Athlete Cutout */}
        <div className="lg:col-span-5 relative flex justify-center items-center">

          <motion.div
            className="relative w-full max-w-md h-[460px] sm:h-[560px]"
            style={{
              x: mousePos.x * 0.4,
              y: mousePos.y * 0.4,
            }}
          >
            {/* Glowing Ember Backing Card */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-b from-[#1F130E] to-[#0E0805] border border-[#FF4B1F]/30 shadow-[0_0_50px_rgba(255,75,31,0.2)] overflow-hidden" />

            {/* Athlete PNG Image Cutout (Overlapping frame) */}
            <div className="absolute inset-0 flex items-end justify-center pointer-events-none">
              <Image
                src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=900&q=80"
                alt="CodeWithGandhi Cutout"
                width={500}
                height={650}
                priority
                className="object-cover h-full w-auto rounded-3xl mix-blend-luminosity hover:mix-blend-normal transition-all duration-500 shadow-2xl"
              />
            </div>
          </motion.div>
        </div>

      </div>

      {/* Bottom Service Chips Bar */}
      <div className="max-w-7xl mx-auto px-6 w-full pt-10 z-20">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <span className="text-xs font-mono text-stone-500 uppercase tracking-widest mr-2">
            EXPLORE ZONES:
          </span>
          {serviceChips.map((chip) => (
            <Link
              key={chip.label}
              href={chip.href}
              className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#FF4B1F] text-xs font-semibold text-stone-300 hover:text-white hover:bg-[#FF4B1F]/10 transition-all shadow-sm"
            >
              {chip.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          >
            <div className="relative w-full max-w-4xl bg-[#140D0A] border border-white/20 rounded-3xl p-6 overflow-hidden">
              <button
                onClick={() => setVideoOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-red-500/20 text-stone-200"
              >
                <X className="w-6 h-6" />
              </button>
              <h3 className="font-display text-xl font-bold text-white mb-4">
                CodeWithGandhi BENGALURU ARENA TOUR
              </h3>
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative flex items-center justify-center">
                <iframe
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                  title="CodeWithGandhi Gym Video Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
