import Link from 'next/link';
import { MapPin, Phone, Clock, Navigation, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { GYM_BRANCHES } from '@/lib/data/gymData';

export const metadata = {
  title: 'Locations & Branches in Bengaluru | FORGE ATHLETICS',
  description: 'Find Forge Athletics arenas in Indiranagar, Koramangala, HSR Layout, and Whitefield. Directions, parking, metro access, operating hours, and contact information.',
};

export default function LocationPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HealthClub',
    'name': 'Forge Athletics Bengaluru Flagship',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '100ft Road, 12th Main Corner, Indiranagar',
      'addressLocality': 'Bengaluru',
      'addressRegion': 'Karnataka',
      'postalCode': '560038',
      'addressCountry': 'IN',
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 12.9784,
      'longitude': 77.6408,
    },
    'telephone': '+91-80-4910-8800',
    'openingHours': 'Mo-Sa 05:30-22:30, Su 06:00-20:00',
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <MapPin className="w-3.5 h-3.5" />
            <span>4 BENGALURU LOCATIONS</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            LOCATIONS & <span className="text-[#FF4B1F]">ARENAS</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-xl mx-auto">
            All memberships grant unlimited multi-branch access across Bengaluru locations.
          </p>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {GYM_BRANCHES.map((b) => (
            <div key={b.id} className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FF4B1F]/20 text-[#FF4B1F] text-xs font-mono font-bold">
                  {b.area}
                </span>
                <span className="text-xs text-stone-400 font-mono">Capacity: {b.capacity}</span>
              </div>

              <h3 className="font-display font-bold text-2xl text-white">{b.name}</h3>
              <p className="text-sm text-stone-300 leading-relaxed">{b.address}</p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-stone-400">
                  <Phone className="w-3.5 h-3.5 text-[#FF4B1F]" />
                  <span>{b.phone}</span>
                </div>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(b.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[#FF4B1F] font-bold uppercase hover:underline"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Get Directions</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
