'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { GYM_BRANCHES } from '@/lib/data/gymData';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    branch: GYM_BRANCHES[0].name,
    message: '',
    honeypot: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.honeypot) return; // Honeypot spam check
    setSubmitted(true);
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-12">
        
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <Mail className="w-3.5 h-3.5" />
            <span>WE ARE HERE TO HELP</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            GET IN <span className="text-[#FF4B1F]">TOUCH</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-lg mx-auto">
            Have questions about corporate wellness, personal coaching, or branch amenities?
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/10 space-y-4">
            
            {/* Honeypot hidden input */}
            <input
              type="text"
              name="website_url"
              value={form.honeypot}
              onChange={(e) => setForm({ ...form, honeypot: e.target.value })}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-400">Full Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-stone-400">Email Address *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-mono text-stone-400">Your Message *</label>
              <textarea
                rows={4}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#FF4B1F] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#FF8000] transition-colors shadow-lg"
            >
              Send Message to Forge Staff
            </button>
          </form>
        ) : (
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/40 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h2 className="font-display font-bold text-2xl text-white">MESSAGE SENT!</h2>
            <p className="text-xs text-stone-300">Our Indiranagar front desk team will contact you within 2 hours.</p>
          </div>
        )}

      </div>
    </div>
  );
}
