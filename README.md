# FORGE ATHLETICS - 3D Styled Premium Gym & Member Portal (Bengaluru)

Production-grade, SEO-optimized, 3D-styled web application and member/admin portal built for **FORGE ATHLETICS** — a luxury fitness studio with flagship arenas in Indiranagar, Koramangala, HSR Layout, and Whitefield, Bengaluru.

---

## 🚀 Tech Stack

* **Framework:** Next.js 15 (App Router, Server Actions, Dynamic Route Handlers)
* **Language:** TypeScript
* **Styling & UI:** Tailwind CSS, Glassmorphic design tokens (`#0B0705` espresso black, `#FF4B1F` hot orange-red, `#FF9F45` ember amber), `lucide-react`
* **Animation & Motion:** Framer Motion (page reveals, tilt cards, modal transitions), `@studio-freight/lenis` smooth scroll
* **3D Engine:** `@react-three/fiber`, `@react-three/drei`, `three` (Client-only lazy-loaded WebGL canvas with mouse parallax & floating metallic weight plates)
* **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Auth, Storage)
* **Payments:** Razorpay Node SDK (Order creation, HMAC signature verification, GST 18% calculation, Instant PDF invoice generator)
* **AI Concierge:** Streaming AI Chatbot API route (`/api/chat`) with RAG gym knowledge base & WhatsApp lead escalation
* **SEO:** Next.js Metadata API, JSON-LD structured schemas (`HealthClub`, `Service`, `Event`, `Person`, `Review`), `next-sitemap`

---

## ⚡ Quick Start & Setup

### 1. Prerequisites
* Node.js v18.17+ or v20+
* npm or pnpm
* Supabase Account & Razorpay Merchant Account

### 2. Installation & Running Locally

```bash
# Clone or navigate to directory
cd "d:/react-projects/gym website"

# Install dependencies
npm install

# Copy Environment Variables
cp .env.example .env.local

# Run Development Server
npm run dev -- -p 3005
```

Open [http://localhost:3005](http://localhost:3005) in your browser.

---

## 🗄️ Database Setup (Supabase)

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase Dashboard.
3. Paste and run the entire SQL contents from [`supabase/schema.sql`](file:///d:/react-projects/gym%20website/supabase/schema.sql).
4. Copy your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` into your `.env.local` file.

---

## 💳 Razorpay Payment & Webhook Integration

1. Register at [razorpay.com](https://razorpay.com) for API Keys (`RAZORPAY_KEY_ID` & `RAZORPAY_KEY_SECRET`).
2. Add webhook URL in Razorpay Dashboard: `https://yourdomain.com/api/webhooks/razorpay` with event `payment.captured`.
3. Server-side payment verification is handled in `/api/razorpay/verify/route.ts`.

---

## 🤖 AI Chatbot Assistant

The floating concierge widget (`AIChatbot.tsx`) uses a streaming endpoint at `/api/chat`. It handles quick inquiries about:
- Membership pricing & GST breakdown
- Operating hours & Live crowd status
- Free Trial registration & PAR-Q questionnaire
- WhatsApp escalation ("Talk to Human")

---

## ☁️ Production Deployment Guide

### Vercel Deployment
1. Push codebase to GitHub / GitLab.
2. Import project into Vercel Dashboard.
3. Set environment variables from `.env.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
4. Click **Deploy**.

---

## 📋 Owner Verification Checklist

- [x] Configure Razorpay Production Live Keys
- [x] Link Domain (e.g., `forgeathletics.in`) on Vercel
- [x] Connect Google Business Profile & Google Maps API key
- [x] Set WhatsApp Business phone number in `NEXT_PUBLIC_WHATSAPP_NUMBER`
- [x] Submit `sitemap.xml` to Google Search Console
