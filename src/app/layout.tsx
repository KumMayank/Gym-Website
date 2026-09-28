import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/layout/LenisProvider';
import BarbellScrollProgress from '@/components/3d/BarbellScrollProgress';
import AIChatbot from '@/components/chatbot/AIChatbot';
import WhatsAppStickyButton from '@/components/shared/WhatsAppStickyButton';

export const metadata: Metadata = {
  title: 'CODEWITHGANDHI | 3D Premium Gym & Fitness Studio Bengaluru',
  description: 'Experience Bengaluru’s premier 3D-styled athletic conditioning facility. Eleiko gear, infrared recovery saunas, 1-on-1 personal training, group fitness & hydro workouts.',
  keywords: ['gym in bengaluru', 'indiranagar gym', 'koramangala gym', 'hsr layout gym', 'personal trainer bengaluru', 'crossfit bengaluru', '3d gym'],
  authors: [{ name: 'CodeWithGandhi Team' }],
  openGraph: {
    title: 'CODEWITHGANDHI | Premium 3D Fitness Club Bengaluru',
    description: 'CodeWithGandhi in Sweat • Temper Your Iron. Premium fitness studio with branches in Indiranagar, Koramangala, HSR Layout & Whitefield.',
    url: 'https://CodeWithGandhi.in',
    siteName: 'CodeWithGandhi Bengaluru',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'CodeWithGandhi',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#0B0705] text-[#F5F0EB] antialiased selection:bg-[#FF4B1F] selection:text-white">
        <LenisProvider>
          <BarbellScrollProgress />
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
          <WhatsAppStickyButton />
          <AIChatbot />
        </LenisProvider>
      </body>
    </html>
  );
}
