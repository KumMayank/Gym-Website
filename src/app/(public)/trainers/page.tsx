import Link from 'next/link';
import Image from 'next/image';
import { Star, Award, Camera, ArrowUpRight } from 'lucide-react';
import { GYM_TRAINERS } from '@/lib/data/gymData';

export const metadata = {
  title: 'Master Coaches & Trainers | FORGE ATHLETICS Bengaluru',
  description: 'Meet our certified ACSM, CrossFit & powerlifting coaches. Periodized strength coaching, biomechanics form correction, and 1-on-1 personal training.',
};

export default function TrainersPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Award className="w-3.5 h-3.5" />
            <span>ELITE ATHLETIC COACHES</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            MASTER <span className="text-[#FF4B1F]">TRAINERS</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            Every coach undergoes 200+ hours of biomechanics certification and periodization training.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {GYM_TRAINERS.map((trainer) => (
            <div
              key={trainer.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between"
            >
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={trainer.avatarUrl}
                  alt={trainer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-xs text-amber-400 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{trainer.rating}</span>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-white group-hover:text-[#FF4B1F] transition-colors">
                    {trainer.name}
                  </h3>
                  <span className="text-xs text-[#FF4B1F] font-mono block mt-0.5">
                    {trainer.specialization} • {trainer.experienceYears} Yrs Exp
                  </span>
                </div>

                <p className="text-xs text-stone-400 line-clamp-3 leading-relaxed">
                  {trainer.bio}
                </p>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/free-trial?trainer=${encodeURIComponent(trainer.name)}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-[#FF4B1F] uppercase"
                  >
                    <span>Book Session</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#FF4B1F]" />
                  </Link>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
