import Link from 'next/link';
import { ArrowUpRight, Flame, MessageCircle } from 'lucide-react';

export default function CTABanner() {
  return (
    <section className="py-20 bg-[#0B0705] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="relative rounded-3xl p-10 md:p-16 bg-gradient-to-r from-[#FF4B1F] via-[#FF8000] to-[#FF9F45] overflow-hidden shadow-[0_0_60px_rgba(255,75,31,0.4)] flex flex-col lg:flex-row items-center justify-between gap-8">

          {/* Background overlay noise & glow */}
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

          <div className="space-y-4 max-w-xl text-center lg:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/30 backdrop-blur-md text-white text-xs font-mono font-bold uppercase tracking-wider">
              <Flame className="w-4 h-4 text-amber-300" />
              <span>START YOUR JOURNEY</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase leading-tight">
              READY TO FORGE YOUR ULTIMATE SELF?
            </h2>
            <p className="text-white/90 text-sm sm:text-base font-medium">
              Book a complimentary 1-day pass to any of our 4 Bengaluru hubs. Experience competition Eleiko gear, sauna, and expert periodized coaching.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 relative z-10 w-full lg:w-auto">
            <Link
              href="/free-trial"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold text-sm tracking-wider uppercase shadow-2xl hover:bg-stone-900 transition-all hover:scale-105"
            >
              <span>Book Free Trial Pass</span>
              <ArrowUpRight className="w-5 h-5 text-[#FF4B1F]" />
            </Link>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi!%20I%20want%20to%20book%20a%20free%20trial%20session.`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold text-sm hover:bg-white/30 transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp Us</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
