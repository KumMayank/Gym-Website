'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Flame } from 'lucide-react';
import { GYM_SERVICES } from '@/lib/data/gymData';

export default function ServicesGrid() {
  return (
    <section className="py-24 bg-[#0B0705] relative overflow-hidden">

      {/* Background Subtle ECG heartbeat glow */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
              <Flame className="w-3.5 h-3.5" />
              <span>THE CodeWithGandhi ZONES</span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
              WORLD-CLASS ATHLETIC <br />
              <span className="text-[#FF4B1F]">TRAINING DISCIPLINES</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-stone-300 hover:text-[#FF4B1F] transition-colors group"
          >
            <span>View All 12+ Training Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#FF4B1F]" />
          </Link>
        </div>

        {/* 3D Tilt Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GYM_SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between relative hover:-translate-y-2 transition-transform duration-300"
            >
              {/* Image with overlay */}
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0805] via-[#0E0805]/40 to-transparent" />

                {/* Category tag */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-xs font-medium text-stone-300">
                  {service.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FF4B1F] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-sm text-stone-400 leading-relaxed line-clamp-2">
                    {service.summary}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  {service.benefits.slice(0, 2).map((b) => (
                    <div key={b} className="flex items-center gap-2 text-xs text-stone-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4B1F]" />
                      <span>{b}</span>
                    </div>
                  ))}
                </div>

                {/* Card CTA Link */}
                <div className="pt-4 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF4B1F] hover:text-[#FF8000] transition-colors"
                  >
                    <span>Explore Discipline</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
