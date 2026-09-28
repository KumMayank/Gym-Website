import { MessageCircle } from 'lucide-react';

export default function WhatsAppStickyButton() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210';
  return (
    <a
      href={`https://wa.me/${number}?text=Hi!%20I'm%20interested%20in%20Forge%20Athletics%20memberships.`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-24 right-6 z-40 w-12 h-12 rounded-full bg-emerald-500 text-black flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform"
      aria-label="Chat on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6 fill-current text-white" />
    </a>
  );
}
