'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote, MessageSquare } from 'lucide-react';
import { GYM_REVIEWS } from '@/lib/data/gymData';

export default function ReviewsSection() {
  return (
    <section className="py-24 bg-[#0B0705] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>MEMBER TESTIMONIALS</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            WHAT OUR <span className="text-[#FF4B1F]">ATHLETES SAY</span>
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GYM_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="glass-card rounded-3xl p-8 border border-white/10 relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[#FF4B1F]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(review.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-stone-200 leading-relaxed font-normal italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-6 border-t border-white/10 flex items-center gap-4 mt-6">
                <div className="w-12 h-12 rounded-full overflow-hidden relative border border-[#FF4B1F]/40">
                  <Image
                    src={review.avatarUrl}
                    alt={review.authorName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-display font-bold text-white text-base">
                    {review.authorName}
                  </h4>
                  <span className="text-xs text-stone-400 font-mono block">
                    {review.branchName} • Verified Member
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
