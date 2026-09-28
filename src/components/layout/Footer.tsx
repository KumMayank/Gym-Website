import Link from 'next/link';
import { Flame, MapPin, Phone, Mail, Camera, Video, Share2, MessageCircle, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#070403] border-t border-white/10 pt-16 pb-12 overflow-hidden text-stone-400">
      {/* Background Ember Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF4B1F]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">

          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF9F45] flex items-center justify-center shadow-[0_0_15px_#FF4B1F]">
                <Flame className="w-6 h-6 text-black fill-black" />
              </div>
              <span className="font-display font-extrabold text-2xl text-white tracking-wider">
                CodeWithGandhi <span className="text-[#FF4B1F]">FITNESS</span>
              </span>
            </Link>

            <p className="text-sm text-stone-400 max-w-sm leading-relaxed">
              Bengaluru&apos;s premier 3D-styled athletic conditioning facility. Built with competition Eleiko gear, infrared recovery saunas, and 1-on-1 sports performance coaching.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#FF4B1F] hover:border-[#FF4B1F] transition-all"
                aria-label="Instagram"
              >
                <Camera className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#FF4B1F] hover:border-[#FF4B1F] transition-all"
                aria-label="YouTube"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-[#FF4B1F] hover:border-[#FF4B1F] transition-all"
                aria-label="Twitter"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 hover:bg-emerald-500 hover:text-black transition-all"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider text-outline-sm">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-[#FF4B1F] transition-colors">All Services</Link></li>
              <li><Link href="/schedule" className="hover:text-[#FF4B1F] transition-colors">Class Timetable</Link></li>
              <li><Link href="/plans" className="hover:text-[#FF4B1F] transition-colors">Membership Plans</Link></li>
              <li><Link href="/calculators" className="hover:text-[#FF4B1F] transition-colors">Fitness Calculators</Link></li>
              <li><Link href="/quiz" className="hover:text-[#FF4B1F] transition-colors">Find My Plan Quiz</Link></li>
              <li><Link href="/wod" className="hover:text-[#FF4B1F] transition-colors">Workout of the Day</Link></li>
            </ul>
          </div>

          {/* Bengaluru Branches */}
          <div className="space-y-3">
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider">
              Bengaluru Hubs
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                <span>Indiranagar 100ft Road</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                <span>Koramangala 80ft Road</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                <span>HSR Sector 1, 27th Main</span>
              </li>
              <li className="flex items-start gap-1.5">
                <MapPin className="w-4 h-4 text-[#FF4B1F] shrink-0 mt-0.5" />
                <span>Whitefield ITPL Main Road</span>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-wider">
              Hours & Contact
            </h3>
            <div className="text-sm space-y-2">
              <p><span className="text-white font-medium">Mon - Sat:</span> 5:30 AM - 10:30 PM</p>
              <p><span className="text-white font-medium">Sun:</span> 6:00 AM - 8:00 PM</p>
              <p className="flex items-center gap-2 pt-2 text-xs">
                <Phone className="w-3.5 h-3.5 text-[#FF4B1F]" />
                +91 80 4910 8800
              </p>
              <p className="flex items-center gap-2 text-xs">
                <Mail className="w-3.5 h-3.5 text-[#FF4B1F]" />
                CodeWithGandhi@gmail.com
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs gap-4 text-stone-500">
          <p>© {new Date().getFullYear()} CODE WITH GANDHI BENGALURU. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-stone-300 transition-colors">Contact Support</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
