'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Camera, Award, ArrowUpRight, Flame } from 'lucide-react';
import { GYM_TRAINERS } from '@/lib/data/gymData';

export default function TrainersSection() {
  return (
    <section className="py-24 bg-[#0E0805] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
              <Award className="w-3.5 h-3.5" />
              <span>ELITE ATHLETIC COACHES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              MEET THE <span className="text-[#FF4B1F]">CodeWithGandhi MASTERS</span>
            </h2>
          </div>
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-300 hover:text-[#FF4B1F] transition-colors group"
          >
            <span>View All Coaches & Profiles</span>
            <ArrowUpRight className="w-4 h-4 text-[#FF4B1F]" />
          </Link>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GYM_TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group relative flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Image Container */}
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={trainer.avatarUrl}
                  alt={trainer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0805] via-transparent to-transparent" />

                {/* Rating Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{trainer.rating}</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#FF4B1F] transition-colors">
                    {trainer.name}
                  </h3>
                  <span className="text-xs text-[#FF4B1F] font-mono block mt-0.5">
                    {trainer.specialization} • {trainer.experienceYears} Yrs Exp
                  </span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                  {trainer.bio}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <a
                    href={`https://instagram.com/${trainer.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#FF4B1F] transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#FF4B1F]" />
                    <span>{trainer.instagram}</span>
                  </a>

                  <Link
                    href={`/free-trial?trainer=${encodeURIComponent(trainer.name)}`}
                    className="p-2 rounded-full bg-white/5 hover:bg-[#FF4B1F] text-stone-300 hover:text-white transition-all"
                    title="Book PT Session"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
