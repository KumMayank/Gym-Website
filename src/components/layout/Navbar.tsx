'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, ArrowUpRight, MessageCircle, User } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Classes', href: '/schedule' },
    { name: 'Trainers', href: '/trainers' },
    { name: 'Plans', href: '/plans' },
    { name: 'Calculators', href: '/calculators' },
    { name: 'Location', href: '/location' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Floating Pill Container */}
        <nav
          className={`w-full flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            scrolled
              ? 'bg-[#120B08]/90 backdrop-blur-xl border border-[#FF4B1F]/30 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
              : 'bg-[#120B08]/60 backdrop-blur-md border border-white/10'
          }`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#FF4B1F] to-[#FF9F45] flex items-center justify-center shadow-[0_0_15px_#FF4B1F] group-hover:scale-110 transition-transform">
              <Flame className="w-5 h-5 text-black fill-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl tracking-wider text-white flex items-center gap-1">
                CODE <span className="text-[#FF4B1F]">WITH</span> <span>GANDHI</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-stone-400 uppercase -mt-1">
                BENGALURU
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-stone-300 hover:text-[#FF4B1F] transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#FF4B1F] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp Link */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi%20Forge%20Gym!%20I%20want%20to%20know%20more%20about%20membership%20plans.`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact via WhatsApp"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 text-emerald-400 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
            </a>

            {/* Dashboard / Login */}
            <Link
              href="/dashboard"
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:border-[#FF4B1F]/50 hover:bg-[#FF4B1F]/10 text-stone-200 transition-all"
              title="Member Dashboard"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* Free Trial Button */}
            <Link
              href="/free-trial"
              className="group relative inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(255,75,31,0.4)] hover:shadow-[0_0_30px_rgba(255,75,31,0.7)] hover:scale-105 transition-all"
            >
              <span>Free Trial</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full bg-white/5 border border-white/10 text-stone-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#FF4B1F]" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden mt-3 max-w-7xl mx-auto px-4"
          >
            <div className="bg-[#120B08]/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl flex flex-col gap-4">
              <div className="flex flex-col gap-3 border-b border-white/10 pb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-semibold text-stone-200 hover:text-[#FF4B1F] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-sm text-stone-300"
                >
                  <User className="w-4 h-4 text-[#FF4B1F]" />
                  Member Portal
                </Link>

                <Link
                  href="/free-trial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase"
                >
                  Book Free Trial
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
