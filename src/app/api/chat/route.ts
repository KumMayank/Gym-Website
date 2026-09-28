import { NextRequest, NextResponse } from 'next/server';
import { GYM_PLANS, GYM_BRANCHES, GYM_SERVICES, GYM_TRAINERS } from '@/lib/data/gymData';

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastUserMsg = messages[messages.length - 1]?.content?.toLowerCase() || '';

    let reply = '';

    if (lastUserMsg.includes('plan') || lastUserMsg.includes('fee') || lastUserMsg.includes('price')) {
      reply = `Our membership tiers at Forge Athletics Bengaluru:\n` +
        GYM_PLANS.map((p) => `• ${p.title}: ₹${Math.round(p.priceInr * 1.18)} incl. 18% GST (${p.durationMonths} mos)`).join('\n') +
        `\n\nWould you like me to reserve a Free Trial Pass or connect you with a coach?`;
    } else if (lastUserMsg.includes('timing') || lastUserMsg.includes('hours') || lastUserMsg.includes('open')) {
      reply = `Forge Athletics operating hours:\n• Mon - Sat: 5:30 AM – 10:30 PM\n• Sun: 6:00 AM – 8:00 PM\n\nLive Crowd Meter peak hours are 6-9 AM & 6-9 PM.`;
    } else if (lastUserMsg.includes('location') || lastUserMsg.includes('branch') || lastUserMsg.includes('where')) {
      reply = `We have 4 flagship arenas in Bengaluru:\n` +
        GYM_BRANCHES.map((b) => `• ${b.name}: ${b.address}`).join('\n');
    } else if (lastUserMsg.includes('trainer') || lastUserMsg.includes('coach')) {
      reply = `Our master coaches:\n` +
        GYM_TRAINERS.map((t) => `• ${t.name} (${t.specialization}, ${t.experienceYears} yrs exp)`).join('\n');
    } else if (lastUserMsg.includes('pain') || lastUserMsg.includes('doctor') || lastUserMsg.includes('injury') || lastUserMsg.includes('medicine')) {
      reply = `⚠️ Safety Disclaimer: I cannot provide medical diagnosis or treatment advice. If you have an injury or pain, please consult a medical practitioner or speak with our certified physio recovery coach.`;
    } else {
      reply = `Welcome to FORGE ATHLETICS! I can help you with Membership Plans, Class Timetable, Trainer Booking, Branch Locations, or Free Trial registration. What is your primary fitness goal (Fat Loss, Muscle Gain, Powerlifting, Hydro Recovery)?`;
    }

    return NextResponse.json({ role: 'assistant', content: reply });
  } catch (error) {
    return NextResponse.json({ error: 'Chatbot service error' }, { status: 500 });
  }
}
