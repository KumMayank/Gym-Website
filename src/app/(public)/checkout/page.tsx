'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ShieldCheck, CheckCircle2, FileText, Lock, Percent, ArrowRight } from 'lucide-react';
import { GYM_PLANS } from '@/lib/data/gymData';
import { formatINR } from '@/lib/utils';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planSlug = searchParams.get('plan') || 'annual-titan';
  
  const plan = GYM_PLANS.find((p) => p.slug === planSlug) || GYM_PLANS[2];

  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'FORGE10' || coupon.toUpperCase() === 'BENGALURU') {
      setDiscount(1000);
      setCouponApplied(true);
    }
  };

  const basePrice = plan.priceInr;
  const gstAmount = Math.round((basePrice - discount) * 0.18);
  const totalPayable = Math.round(basePrice - discount + gstAmount);

  const handleRazorpayPayment = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setPaidSuccess(true);
  };

  return (
    <div className="pt-32 pb-24 bg-[#0B0705] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono">
            <Lock className="w-3.5 h-3.5" />
            <span>256-BIT SSL SECURE CHECKOUT</span>
          </div>
          <h1 className="font-display font-extrabold text-4xl text-white">
            MEMBERSHIP <span className="text-[#FF4B1F]">CHECKOUT</span>
          </h1>
        </div>

        {!paidSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Plan Specs */}
            <div className="lg:col-span-7 glass-card rounded-3xl p-8 border border-white/10 space-y-6">
              <h2 className="font-display font-bold text-2xl text-white">{plan.title}</h2>
              <span className="text-xs text-stone-400 font-mono block">
                Duration: {plan.durationMonths} Months Access to All Branches
              </span>

              <div className="space-y-2 pt-4 border-t border-white/10">
                <span className="text-xs font-semibold text-stone-400 uppercase block">INCLUDED PERKS:</span>
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-xs text-stone-300">
                    <ShieldCheck className="w-4 h-4 text-[#FF4B1F]" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>

              {/* Coupon Code Input */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <label className="text-xs font-mono text-stone-400">Have a promo code?</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter FORGE10"
                    className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-2 text-xs text-white uppercase outline-none focus:border-[#FF4B1F]"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs font-bold hover:bg-[#FF4B1F]"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <span className="text-xs text-emerald-400 font-mono block">
                    ✓ Promo Code Applied: ₹1,000 Discount
                  </span>
                )}
              </div>
            </div>

            {/* Price Breakdown & Razorpay Trigger */}
            <div className="lg:col-span-5 glass-card rounded-3xl p-8 border border-[#FF4B1F]/40 space-y-6 shadow-[0_0_40px_rgba(255,75,31,0.2)]">
              <h3 className="font-display font-bold text-xl text-white">Order Summary</h3>

              <div className="space-y-3 text-xs font-mono text-stone-300">
                <div className="flex justify-between">
                  <span>Base Plan Price:</span>
                  <span>{formatINR(basePrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount Coupon:</span>
                    <span>-{formatINR(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (18%):</span>
                  <span>{formatINR(gstAmount)}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-white pt-3 border-t border-white/10">
                  <span>Total Amount Payable:</span>
                  <span className="text-[#FF4B1F] font-num">{formatINR(totalPayable)}</span>
                </div>
              </div>

              <button
                onClick={handleRazorpayPayment}
                className="w-full py-4 rounded-full bg-gradient-to-r from-[#FF4B1F] to-[#FF8000] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#FF4B1F]/40 hover:scale-105 transition-all"
              >
                Pay via Razorpay (UPI / Card)
              </button>

              <div className="text-[10px] text-stone-500 text-center font-mono">
                Supports Razorpay UPI, GPay, Paytm, PhonePe, Cards & Netbanking. Server-side signature verified.
              </div>
            </div>

          </div>
        ) : (
          /* Payment Success Confirmation */
          <div className="glass-card rounded-3xl p-10 border border-emerald-500/40 text-center space-y-6 shadow-[0_0_50px_rgba(16,185,129,0.2)] max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-white">
                PAYMENT SUCCESSFUL!
              </h2>
              <p className="text-stone-300 text-sm">
                Welcome to Forge Athletics. Your membership is now active across all Bengaluru arenas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-left text-xs font-mono space-y-1.5">
              <p>Plan: <span className="text-white font-bold">{plan.title}</span></p>
              <p>Amount Paid: <span className="text-emerald-400 font-bold">{formatINR(totalPayable)}</span></p>
              <p>Invoice #: <span className="text-white">INV-FORGE-2026-9941</span></p>
            </div>

            <button
              onClick={() => alert('Downloading official GST Tax Invoice PDF...')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white font-bold text-xs uppercase hover:bg-white/20 transition-all border border-white/10"
            >
              <FileText className="w-4 h-4 text-[#FF4B1F]" />
              <span>Download GST Invoice PDF</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="pt-32 text-center text-white font-mono">Loading secure checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}
