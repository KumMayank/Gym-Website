-- CodeWithGandhi ATHLETICS - Supabase PostgreSQL Schema & Seed Data DDL
-- Enables Row Level Security (RLS) & realistic demo data for Bengaluru Gym Studio

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    role TEXT CHECK (role IN ('member', 'trainer', 'admin')) DEFAULT 'member',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Branches Table
CREATE TABLE IF NOT EXISTS public.branches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    area TEXT NOT NULL,
    address TEXT NOT NULL,
    city TEXT DEFAULT 'Bengaluru',
    geo_lat DOUBLE PRECISION,
    geo_lng DOUBLE PRECISION,
    phone TEXT,
    crowd_status TEXT CHECK (crowd_status IN ('low', 'moderate', 'high')) DEFAULT 'moderate',
    capacity INT DEFAULT 200,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Plans Table
CREATE TABLE IF NOT EXISTS public.plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    duration_months INT NOT NULL,
    price_inr NUMERIC(10, 2) NOT NULL,
    gst_percent NUMERIC(5, 2) DEFAULT 18.00,
    features TEXT[] DEFAULT '{}',
    badge TEXT,
    is_popular BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Memberships Table
CREATE TABLE IF NOT EXISTS public.memberships (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.plans(id) ON DELETE RESTRICT,
    start_date DATE NOT NULL DEFAULT CURRENT_DATE,
    end_date DATE NOT NULL,
    status TEXT CHECK (status IN ('active', 'frozen', 'expired')) DEFAULT 'active',
    razorpay_sub_id TEXT,
    qr_code_pass TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    category TEXT NOT NULL,
    benefits TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Trainers Table
CREATE TABLE IF NOT EXISTS public.trainers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name TEXT NOT NULL,
    specialization TEXT NOT NULL,
    experience_years INT NOT NULL,
    bio TEXT NOT NULL,
    avatar_url TEXT NOT NULL,
    instagram TEXT,
    rating NUMERIC(3, 2) DEFAULT 4.95,
    available_slots TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Classes Table
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    intensity TEXT CHECK (intensity IN ('Low', 'Medium', 'High', 'Extreme')) DEFAULT 'High',
    trainer_id UUID REFERENCES public.trainers(id) ON DELETE SET NULL,
    duration_mins INT DEFAULT 60,
    max_capacity INT DEFAULT 25,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Class Sessions Table
CREATE TABLE IF NOT EXISTS public.class_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    room TEXT DEFAULT 'Studio A',
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE NOT NULL,
    current_bookings INT DEFAULT 0,
    online_meet_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID REFERENCES public.class_sessions(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT CHECK (status IN ('confirmed', 'waitlist', 'cancelled')) DEFAULT 'confirmed',
    checked_in BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Attendance Table
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    branch_id UUID REFERENCES public.branches(id) ON DELETE CASCADE,
    checkin_time TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Trial Bookings Table
CREATE TABLE IF NOT EXISTS public.trial_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT NOT NULL,
    branch_id UUID REFERENCES public.branches(id) ON DELETE RESTRICT,
    preferred_date DATE NOT NULL,
    preferred_slot TEXT NOT NULL,
    goal TEXT NOT NULL,
    par_q_passed BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. Payments Table
CREATE TABLE IF NOT EXISTS public.payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    plan_id UUID REFERENCES public.plans(id) ON DELETE SET NULL,
    amount NUMERIC(10, 2) NOT NULL,
    razorpay_order_id TEXT NOT NULL,
    razorpay_payment_id TEXT,
    status TEXT CHECK (status IN ('created', 'captured', 'failed', 'refunded')) DEFAULT 'created',
    invoice_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. Reviews Table
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_name TEXT NOT NULL,
    avatar_url TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT NOT NULL,
    branch_name TEXT DEFAULT 'Indiranagar Flagship',
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. Transformations Table
CREATE TABLE IF NOT EXISTS public.transformations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_name TEXT NOT NULL,
    goal_category TEXT NOT NULL,
    before_image TEXT NOT NULL,
    after_image TEXT NOT NULL,
    weight_lost_kg NUMERIC(4, 1),
    body_fat_diff TEXT,
    duration_months INT NOT NULL,
    story TEXT NOT NULL,
    trainer_name TEXT NOT NULL,
    consent_verified BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. Announcements Table
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tag TEXT CHECK (tag IN ('urgent', 'event', 'batch', 'offer')) DEFAULT 'event',
    active_until DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 16. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    goal TEXT,
    source TEXT DEFAULT 'website_chatbot',
    status TEXT CHECK (status IN ('new', 'contacted', 'converted')) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 17. Contact Messages Table
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    branch TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 18. Workouts Table
CREATE TABLE IF NOT EXISTS public.workouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    difficulty TEXT CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Intermediate',
    target_muscle TEXT NOT NULL,
    equipment TEXT NOT NULL,
    video_url TEXT,
    instructions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 19. Diet Plans Table
CREATE TABLE IF NOT EXISTS public.diet_plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    diet_type TEXT CHECK (diet_type IN ('veg', 'non-veg', 'vegan')) DEFAULT 'veg',
    calories INT NOT NULL,
    protein_g INT NOT NULL,
    carbs_g INT NOT NULL,
    fat_g INT NOT NULL,
    meals JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 20. Progress Logs Table
CREATE TABLE IF NOT EXISTS public.progress_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    log_date DATE DEFAULT CURRENT_DATE,
    weight_kg NUMERIC(5, 2) NOT NULL,
    body_fat_pct NUMERIC(4, 1),
    chest_cm NUMERIC(5, 1),
    waist_cm NUMERIC(5, 1),
    arms_cm NUMERIC(5, 1),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress_logs ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "Public read plans" ON public.plans FOR SELECT USING (true);
CREATE POLICY "Public read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public read trainers" ON public.trainers FOR SELECT USING (true);
CREATE POLICY "Public read classes" ON public.classes FOR SELECT USING (true);
CREATE POLICY "Public read sessions" ON public.class_sessions FOR SELECT USING (true);
CREATE POLICY "Public read branches" ON public.branches FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read transformations" ON public.transformations FOR SELECT USING (true);
CREATE POLICY "Public read announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Public read workouts" ON public.workouts FOR SELECT USING (true);

-- SEED DATA FOR DEMO APPLICATION

-- Seed Branches
INSERT INTO public.branches (name, area, address, geo_lat, geo_lng, phone, crowd_status) VALUES
('CodeWithGandhi Indiranagar Flagship', 'Indiranagar', '100ft Road, 12th Main Corner, Indiranagar, Bengaluru - 560038', 12.9784, 77.6408, '+91 80 4910 8800', 'moderate'),
('CodeWithGandhi Koramangala Hub', 'Koramangala', '80ft Peripheral Road, Block 4, Koramangala, Bengaluru - 560034', 12.9352, 77.6245, '+91 80 4910 8801', 'high'),
('CodeWithGandhi HSR Performance Center', 'HSR Layout', '27th Main, Sector 1, HSR Layout, Bengaluru - 560102', 12.9121, 77.6446, '+91 80 4910 8802', 'low'),
('CodeWithGandhi Whitefield Arena', 'Whitefield', 'ITPL Main Road, Near Graphite India, Whitefield, Bengaluru - 560066', 12.9833, 77.7289, '+91 80 4910 8803', 'moderate')
ON CONFLICT DO NOTHING;

-- Seed Plans
INSERT INTO public.plans (title, slug, duration_months, price_inr, gst_percent, features, badge, is_popular) VALUES
('Monthly Iron Pass', 'monthly-pass', 1, 3999, 18.00, ARRAY['All Gym & Cardio Zones', '1 Complimentary PT Session', 'Steam & Sauna Access', 'Locker & Shower Access'], NULL, false),
('Quarterly CodeWithGandhi Pass', 'quarterly-pass', 3, 9999, 18.00, ARRAY['All 4 Bengaluru Branches', '3 PT Consultations', 'InBody Composition Scan', 'Group Classes Included', 'Steam & Locker Access'], '15% OFF', false),
('Annual Elite Titan', 'annual-titan', 12, 24999, 18.00, ARRAY['Unlimited Access to All Branches', '12 Personal Training Sessions', 'Monthly Nutritionist Diet Plan', 'Free Guest Pass (2/month)', 'Freeze Membership up to 45 Days', 'VIP Locker & Free Towel Service'], 'MOST POPULAR', true),
('Couple Annual CodeWithGandhi', 'couple-annual', 12, 44999, 18.00, ARRAY['Full Access for 2 Members', 'Dual PT Fitness Assessment', 'Custom Couple Diet Coaching', 'Unlimited Group Fitness Classes'], 'BEST VALUE', false)
ON CONFLICT DO NOTHING;

-- Seed Services
INSERT INTO public.services (title, slug, summary, description, image_url, category, benefits) VALUES
('Personal Training', 'personal-training', 'Dedicated 1-on-1 coaching customized for your biomechanics and goal.', 'Our elite master trainers craft periodized workout regimes using advanced biomechanics, heart rate tracking, and body composition analytics.', 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80', '1-on-1', ARRAY['Customized Workout Programming', 'Real-time Form Correction', 'Nutrition & Macro Guidance', 'Faster Goal Achievement']),
('Strength & Conditioning', 'strength-conditioning', 'Build raw strength, explosive muscle, and athletic endurance with Olympic lifting racks.', 'Equipped with Eleiko plates, Rogue power cages, and specialized bars for powerlifting, bodybuilding, and athletic conditioning.', 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80', 'Strength', ARRAY['Increased Bone Density', 'Maximum Power Output', 'Hypertrophy & Fat Loss', 'Injury Resistance']),
('Group Fitness Classes', 'group-classes', 'High-energy community workouts including HIIT, CrossFit, Yoga, Boxing & Spin.', 'Train in our acoustic-insulated mega studio driven by concert lighting, immersive audio, and top-tier instructors.', 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80', 'Group', ARRAY['High Calorie Burn', 'Community Support', 'Diverse Workout Routines', 'Fun Dynamic Environment']),
('Hydro-Fitness & Swimming', 'swimming-recovery', 'Semi-Olympic temperature-controlled indoor swimming pool for aqua workouts.', 'Clean 25-meter pool with ozone filtration system for low-impact cardio, recovery laps, and aquatic endurance training.', 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80', 'Cardio', ARRAY['Low Impact Joint Workout', 'Full Body Muscle Toning', 'Enhanced Lung Capacity', 'Active Recovery'])
ON CONFLICT DO NOTHING;

-- Seed Trainers
INSERT INTO public.trainers (display_name, specialization, experience_years, bio, avatar_url, instagram, rating) VALUES
('Vikram Singh', 'Hypertrophy & Powerlifting', 9, 'Former National Powerlifting Champion specializing in progressive overload, squating mechanics, and prep coaching.', 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80', '@CodeWithGandhi', 4.98),
('Ananya Rao', 'Functional HIIT & Calisthenics', 7, 'Certified ACSM master trainer with expertise in bodyweight mastery, core stability, and athletic metabolic conditioning.', 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80', '@ananya.fitsolution', 4.96),
('Marcus D’Souza', 'CrossFit & Olympic Weightlifting', 11, 'CrossFit L2 coach who has trained over 1,500 athletes in snatch technique, clean & jerk, and endurance WODs.', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80', '@marcus_CodeWithGandhi', 4.99),
('Priya Nair', 'Vinyasa Yoga & Mobility Recovery', 6, 'RYT-500 Yoga teacher specializing in hip mobility, spinal decompressions, post-workout recovery, and breathwork.', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80', '@priya_mobility', 4.92)
ON CONFLICT DO NOTHING;

-- Seed Reviews
INSERT INTO public.reviews (author_name, rating, comment, branch_name) VALUES
('Rohan Mehta', 5, 'CodeWithGandhi Indiranagar is without a doubt the best high-end gym in South India. The Eleiko equipment, orange glow aesthetic, and recovery sauna are top tier!', 'Indiranagar Flagship'),
('Deepika Sharma', 5, 'Lost 12 kg in 4 months under Vikram’s personal training. The 3D progress tracking in their portal keeps me disciplined every week!', 'Koramangala Hub'),
('Siddharth Iyer', 5, 'The CrossFit WODs with Marcus are insane! The atmosphere is electric, lighting is crazy good, and the crowd meter feature lets me avoid rush hours.', 'HSR Performance Center'),
('Kavya Kulkarni', 5, 'Cleanest gym in Bengaluru hands down. The women-only batch for functional training made me feel super comfortable.', 'Whitefield Arena')
ON CONFLICT DO NOTHING;

-- Seed Transformations
INSERT INTO public.transformations (member_name, goal_category, before_image, after_image, weight_lost_kg, body_fat_diff, duration_months, story, trainer_name) VALUES
('Aditya Verma', 'Fat Loss & Recomp', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80', 16.5, '-14%', 5, 'Transformed my sedentary desk job lifestyle into a peak athletic build with personalized macro coaching and strength sessions.', 'Vikram Singh'),
('Sneha Reddy', 'Muscle Gain & Toning', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80', 0.0, '-8% BF (+5kg Muscle)', 6, 'Built posture, eliminated back pain, and gained confidence lifting heavy weights with proper form.', 'Ananya Rao')
ON CONFLICT DO NOTHING;

-- Seed Announcements
INSERT INTO public.announcements (title, content, tag) VALUES
('🔥 New Rogue Eleiko Power Racks Arrived at Indiranagar!', 'Upgraded our main weight room with 6 brand new Rogue Monster Racks and calibrated steel plates.', 'urgent'),
('⚡ Bangalore Summer CrossFit Challenge 2026 Registration Open', 'Join our 3-week team WOD competition. Cash prizes up to ₹1,50,000 for top 3 teams!', 'event'),
('🧘 Sunset Roof Yoga & Mobility Session this Sunday', 'Free entry for all active members at Koramangala rooftop studio from 5:30 PM onwards.', 'batch')
ON CONFLICT DO NOTHING;
