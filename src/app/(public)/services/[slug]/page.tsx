import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Check, Flame, ShieldCheck } from 'lucide-react';
import { GYM_SERVICES } from '@/lib/data/gymData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = GYM_SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found' };
  return {
    title: `${service.title} | FORGE ATHLETICS Bengaluru`,
    description: service.summary,
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = GYM_SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  // JSON-LD Schema
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': service.title,
    'description': service.description,
    'provider': {
      '@type': 'HealthClub',
      'name': 'Forge Athletics Bengaluru',
    },
    'areaServed': 'Bengaluru',
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-6 space-y-10">
        
        {/* Banner Image */}
        <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          <Image
            src={service.imageUrl}
            alt={service.title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0705] via-[#0B0705]/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="px-3 py-1 rounded-full bg-[#FF4B1F] text-white text-xs font-mono font-bold uppercase">
              {service.category}
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
              {service.title}
            </h1>
          </div>
        </div>

        {/* Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-2xl text-white">Discipline Overview</h2>
              <p className="text-stone-300 text-sm leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
              <h2 className="font-display font-bold text-2xl text-white">Key Performance Benefits</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.benefits.map((b) => (
                  <div key={b} className="flex items-center gap-2 text-sm text-stone-200">
                    <Check className="w-4 h-4 text-[#FF4B1F] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="glass-card rounded-3xl p-8 border border-[#FF4B1F]/40 space-y-6 shadow-[0_0_30px_rgba(255,75,31,0.15)] sticky top-28">
              <h3 className="font-display font-bold text-xl text-white">Train in this Zone</h3>
              <p className="text-xs text-stone-400">
                Included in all Quarterly and Annual Titan passes across Indiranagar, Koramangala, HSR & Whitefield.
              </p>

              <Link
                href="/free-trial"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FF8000] transition-colors"
              >
                <span>Book Trial Session</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
