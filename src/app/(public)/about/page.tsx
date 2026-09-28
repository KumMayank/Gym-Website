import Image from 'next/image';
import { Flame, ShieldCheck, Trophy, Users } from 'lucide-react';

export const metadata = {
  title: 'About Us & Mission | FORGE ATHLETICS Bengaluru',
  description: 'Learn about Forge Athletics story, competition equipment brands, certified periodization coaches, and community initiatives in Bengaluru.',
};

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 space-y-12">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>OUR BRAND STORY</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            FORGED IN <span className="text-[#FF4B1F]">BENGALURU</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            Founded in 2021 to redefine commercial gym standards in South India through scientific periodization, competition equipment, and recovery engineering.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
          <h2 className="font-display font-extrabold text-2xl text-white">The Forge Philosophy</h2>
          <p className="text-stone-300 text-sm leading-relaxed">
            We believe that serious athletic results cannot be achieved on low-quality plastic machines. At Forge Athletics, every barbell is Eleiko, every power rack is Rogue, every recovery plunge is ozone-purified, and every trainer is certified in exercise biomechanics.
          </p>
        </div>

      </div>
    </div>
  );
}
