'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, CheckCircle2, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { GYM_BRANCHES } from '@/lib/data/gymData';

export default function FreeTrialPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    branchId: GYM_BRANCHES[0].id,
    preferredDate: '',
    slot: '07:00 AM',
    goal: 'Muscle Hypertrophy & Strength',
    parQChecked: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  const selectedBranch = GYM_BRANCHES.find((b) => b.id === formData.branchId) || GYM_BRANCHES[0];

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>COMPLIMENTARY 1-DAY PASS</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-white">
            BOOK YOUR <span className="text-[#FF4B1F]">FREE TRIAL</span>
          </h1>
          <p className="text-stone-400 text-sm max-w-lg mx-auto">
            Experience competition Eleiko gear, sauna recovery, and a complimentary 1-on-1 coach assessment.
          </p>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="glass-card rounded-3xl p-8 border border-white/10 space-y-6">
            
            {/* Branch Picker */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#FF4B1F]" />
                Select Bengaluru Arena:
              </label>
              <select
                value={formData.branchId}
                onChange={(e) => setFormData({ ...formData, branchId: e.target.value })}
                className="w-full bg-[#1F130E] text-white text-sm font-semibold px-4 py-3 rounded-2xl border border-white/10 outline-none focus:border-[#FF4B1F]"
              >
                {GYM_BRANCHES.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name} ({b.area})
                  </option>
                ))}
              </select>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-400">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Vikram Sharma"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-400">Mobile Phone (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
                />
              </div>
            </div>

            {/* Date & Slot Picker */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#FF4B1F]" />
                  Preferred Trial Date
                </label>
                <input
                  type="date"
                  required
                  value={formData.preferredDate}
                  onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-[#FF4B1F]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-stone-400 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#FF4B1F]" />
                  Time Slot
                </label>
                <select
                  value={formData.slot}
                  onChange={(e) => setFormData({ ...formData, slot: e.target.value })}
                  className="w-full bg-[#1F130E] text-white text-sm font-semibold px-4 py-2.5 rounded-xl border border-white/10 outline-none focus:border-[#FF4B1F]"
                >
                  <option value="06:30 AM">Morning: 06:30 AM - 08:00 AM</option>
                  <option value="08:30 AM">Morning: 08:30 AM - 10:00 AM</option>
                  <option value="05:30 PM">Evening: 05:30 PM - 07:00 PM</option>
                  <option value="07:30 PM">Evening: 07:30 PM - 09:00 PM</option>
                </select>
              </div>
            </div>

            {/* PAR-Q Health Disclaimer Checkbox */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer text-xs text-stone-300">
                <input
                  type="checkbox"
                  required
                  checked={formData.parQChecked}
                  onChange={(e) => setFormData({ ...formData, parQChecked: e.target.checked })}
                  className="mt-0.5 accent-[#FF4B1F] w-4 h-4 rounded"
                />
                <span>
                  PAR-Q Safety Consent: I confirm that I do not have unmanaged cardiovascular conditions or severe medical injuries preventing moderate-to-vigorous athletic exercise.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(255,75,31,0.5)] hover:scale-105 transition-all"
            >
              Confirm Free Trial Booking
            </button>

          </form>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-3xl p-10 border border-emerald-500/40 text-center space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.2)]"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-white">
                TRIAL PASS CONFIRMED!
              </h2>
              <p className="text-stone-300 text-sm">
                We have registered your session for <strong className="text-white">{selectedBranch.name}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left text-xs space-y-1.5 max-w-md mx-auto font-mono">
              <p>Name: <span className="text-white">{formData.name}</span></p>
              <p>Date: <span className="text-[#FF4B1F]">{formData.preferredDate || 'Tomorrow'}</span> ({formData.slot})</p>
              <p>Branch: <span className="text-white">{selectedBranch.address}</span></p>
            </div>

            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210'}?text=Hi!%20My%20name%20is%20${encodeURIComponent(formData.name)}.%20I%20just%20booked%20a%20Free%20Trial%20Pass%20for%20${encodeURIComponent(selectedBranch.name)}.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-emerald-500 text-black font-bold text-xs uppercase tracking-wider hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/30"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>Get WhatsApp Pass & Directions</span>
            </a>
          </motion.div>
        )}

      </div>
    </div>
  );
}
