import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Flame } from 'lucide-react';
import { GYM_SERVICES } from '@/lib/data/gymData';

export const metadata = {
  title: 'All Services & Zones | FORGE ATHLETICS Bengaluru',
  description: 'Explore 12+ elite athletic training disciplines: Personal Training, Strength & Conditioning, CrossFit WODs, Hydro Swimming Pool, Cardio Gallery & Physio Recovery.',
};

export default function ServicesPage() {
  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Flame className="w-3.5 h-3.5" />
            <span>ATHLETIC DISCIPLINES</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            THE FORGE <span className="text-[#FF4B1F]">ZONES & SERVICES</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            From competition Eleiko power racks to temperature-controlled hydro pools and infrared recovery saunas.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {GYM_SERVICES.map((service) => (
            <div
              key={service.id}
              className="glass-card rounded-3xl overflow-hidden border border-white/10 group flex flex-col justify-between"
            >
              <div className="relative h-60 w-full overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0805] via-transparent to-transparent" />
              </div>

              <div className="p-6 space-y-4">
                <h3 className="font-display font-bold text-xl text-white group-hover:text-[#FF4B1F] transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-stone-400 leading-relaxed">
                  {service.description}
                </p>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4B1F] uppercase tracking-wider"
                  >
                    <span>View Zone Specs</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
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
