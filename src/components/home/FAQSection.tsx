'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'Where are CodeWithGandhi gym branches located in Bengaluru?',
    answer: 'We have 4 flagship centers in Bengaluru: Indiranagar (100ft Road), Koramangala (80ft Peripheral Road), HSR Layout (27th Main), and Whitefield (ITPL Main Road). All memberships grant multi-branch access.',
  },
  {
    question: 'What are the operating hours of CodeWithGandhi?',
    answer: 'Our arenas are open Monday to Saturday from 5:30 AM to 10:30 PM, and Sundays from 6:00 AM to 8:00 PM.',
  },
  {
    question: 'How do I book a free 1-day trial session?',
    answer: 'Simply click "Book Free Trial" on our navbar, choose your preferred branch and time slot, complete our quick 60-second health PAR-Q questionnaire, and receive an instant WhatsApp confirmation pass.',
  },
  {
    question: 'Are group fitness classes and sauna access included in the membership?',
    answer: 'Yes! All Quarterly, Annual, and Couple membership passes include unlimited access to group HIIT, Spin, Yoga, CrossFit WODs, as well as our Finnish sauna and steam facilities.',
  },
  {
    question: 'Can I freeze or pause my gym membership if I travel?',
    answer: 'Yes. Annual Elite Titan members can freeze their membership for up to 45 days free of cost directly from the member dashboard.',
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#0E0805] relative border-t border-white/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF4B1F]/10 border border-[#FF4B1F]/30 text-[#FF4B1F] text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>GOT QUESTIONS?</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            FREQUENTLY ASKED <span className="text-[#FF4B1F]">QUESTIONS</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="glass-card rounded-2xl border border-white/10 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-base sm:text-lg text-white hover:text-[#FF4B1F] transition-colors"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-[#FF4B1F] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-sm text-stone-300 leading-relaxed border-t border-white/5">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
