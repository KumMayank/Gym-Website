export interface GymBranch {
  id: string;
  name: string;
  area: string;
  address: string;
  phone: string;
  crowdStatus: 'low' | 'moderate' | 'high';
  capacity: number;
  currentCount: number;
}

export interface GymPlan {
  id: string;
  title: string;
  slug: string;
  durationMonths: number;
  priceInr: number;
  gstPercent: number;
  features: string[];
  badge?: string;
  isPopular?: boolean;
}

export interface GymTrainer {
  id: string;
  name: string;
  specialization: string;
  experienceYears: number;
  bio: string;
  avatarUrl: string;
  instagram: string;
  rating: number;
  reviewsCount: number;
}

export interface GymService {
  id: string;
  title: string;
  slug: string;
  summary: string;
  description: string;
  imageUrl: string;
  category: string;
  benefits: string[];
}

export interface GymReview {
  id: string;
  authorName: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  branchName: string;
  date: string;
}

export interface GymTransformation {
  id: string;
  memberName: string;
  goalCategory: string;
  beforeImage: string;
  afterImage: string;
  weightLostKg: number;
  bodyFatDiff: string;
  durationMonths: number;
  story: string;
  trainerName: string;
}

export const GYM_BRANCHES: GymBranch[] = [
  {
    id: 'b1',
    name: 'CodeWithGandhi Indiranagar Flagship',
    area: 'Indiranagar',
    address: '100ft Road, 12th Main Corner, Indiranagar, Bengaluru - 560038',
    phone: '+91 80 4910 8800',
    crowdStatus: 'moderate',
    capacity: 250,
    currentCount: 112,
  },
  {
    id: 'b2',
    name: 'CodeWithGandhi Koramangala Hub',
    area: 'Koramangala',
    address: '80ft Peripheral Road, Block 4, Koramangala, Bengaluru - 560034',
    phone: '+91 80 4910 8801',
    crowdStatus: 'high',
    capacity: 220,
    currentCount: 184,
  },
  {
    id: 'b3',
    name: 'CodeWithGandhi HSR Performance Center',
    area: 'HSR Layout',
    address: '27th Main, Sector 1, HSR Layout, Bengaluru - 560102',
    phone: '+91 80 4910 8802',
    crowdStatus: 'low',
    capacity: 200,
    currentCount: 45,
  },
  {
    id: 'b4',
    name: 'CodeWithGandhi Whitefield Arena',
    area: 'Whitefield',
    address: 'ITPL Main Road, Near Graphite India, Whitefield, Bengaluru - 560066',
    phone: '+91 80 4910 8803',
    crowdStatus: 'moderate',
    capacity: 300,
    currentCount: 130,
  }
];

export const GYM_PLANS: GymPlan[] = [
  {
    id: 'p1',
    title: 'Monthly Iron Pass',
    slug: 'monthly-pass',
    durationMonths: 1,
    priceInr: 3999,
    gstPercent: 18,
    features: [
      'All Gym & Cardio Zones Access',
      '1 Complimentary 1-on-1 PT Session',
      'Steam Room & Finnish Sauna',
      'Digital Locker & High-speed WiFi',
      'Full Gym Crowd Meter Access',
    ],
  },
  {
    id: 'p2',
    title: 'Quarterly CodeWithGandhi Pass',
    slug: 'quarterly-pass',
    durationMonths: 3,
    priceInr: 9999,
    gstPercent: 18,
    badge: '15% OFF',
    features: [
      'Access to All 4 Bengaluru Branches',
      '3 Personal Trainer Consultations',
      'InBody 770 Composition Scan',
      'Unlimited Group HIIT & Spin Classes',
      'Steam & Locker Access',
      'WhatsApp Trainer Support',
    ],
  },
  {
    id: 'p3',
    title: 'Annual Elite Titan',
    slug: 'annual-titan',
    durationMonths: 12,
    priceInr: 24999,
    gstPercent: 18,
    badge: 'MOST POPULAR',
    isPopular: true,
    features: [
      'Unlimited Access across All Branches',
      '12 Personal Training Sessions (1/month)',
      'Monthly Customized Nutrition & Macro Plan',
      'Free Guest Pass (2 Redemptions/month)',
      'Freeze Membership up to 45 Days Free',
      'VIP Reserved Locker & Laundry Service',
      'Complimentary CodeWithGandhi Gym Merchandise Kit',
    ],
  },
  {
    id: 'p4',
    title: 'Couple Annual CodeWithGandhi',
    slug: 'couple-annual',
    durationMonths: 12,
    priceInr: 44999,
    gstPercent: 18,
    badge: 'BEST VALUE',
    features: [
      'Full Access for 2 Members',
      'Dual Personal Trainer Assessments',
      'Customized Couple Meal Planning',
      'Unlimited Group Classes (Yoga, MMA, CrossFit)',
      'VIP Sauna & Recovery Access',
    ],
  },
];

export const GYM_SERVICES: GymService[] = [
  {
    id: 's1',
    title: 'Personal Training',
    slug: 'personal-training',
    summary: 'Dedicated 1-on-1 coaching customized for your biomechanics and athletic goal.',
    description: 'Our certified master trainers craft periodized strength & physique regimes, guiding every single rep with precision form, biomechanical adjustments, and real-time heart rate monitoring.',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=80',
    category: 'Coaching',
    benefits: ['1-on-1 Customized Programming', 'Biomechanical Form Optimization', 'Macro & Supplementation Advice', 'Accelerated Fat Loss & Muscle Hypertrophy'],
  },
  {
    id: 's2',
    title: 'Strength & Conditioning',
    slug: 'strength-conditioning',
    summary: 'Build raw power, explosive strength, and fatigue resistance with Rogue power racks.',
    description: 'State-of-the-art facility equipped with Eleiko calibrated plates, competition benches, heavy dumbbell dumbbells up to 60kg, and specialty bars for powerlifters and athletes.',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80',
    category: 'Strength',
    benefits: ['Increased Bone Density & Joint Integrity', 'Maximum Power Output & Explosiveness', 'Hypertrophy & Physique Sculpting', 'Injury Prevention Engineering'],
  },
  {
    id: 's3',
    title: 'Group Fitness Classes',
    slug: 'group-classes',
    summary: 'High-octane community workouts including HIIT, CrossFit WODs, Zumba & Spin.',
    description: 'Experience intense sweat sessions in our acoustic-engineered studio driven by dynamic concert rim lighting, high-frequency sound, and top-tier group fitness leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80',
    category: 'Group',
    benefits: ['High Calorie Burn (Up to 800 kcal/hr)', 'Community Accountability & Vibe', 'Dynamic Varied Workouts', 'Endorphin & Energy Boost'],
  },
  {
    id: 's4',
    title: 'Swimming & Hydro Recovery',
    slug: 'swimming-recovery',
    summary: 'Semi-Olympic temperature-controlled indoor swimming pool for aqua cardio & recovery.',
    description: 'Clean 25-meter indoor pool with zero-chlorine ozone filtration system, ideal for low-impact cardio conditioning, active recovery laps, and joint therapy.',
    imageUrl: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80',
    category: 'Aqua',
    benefits: ['Zero Impact on Joints', 'Full Body Muscle Tone & Endurance', 'Enhanced Cardiorespiratory Capacity', 'Soothing Active Recovery'],
  },
  {
    id: 's5',
    title: 'Cardio & Endurance Zone',
    slug: 'cardio-endurance',
    summary: 'Treadmills, curved runners, Woodway treadmills, StairMasters & Concept2 rowers.',
    description: 'Engineered cardio gallery featuring individual entertainment screens, heart rate metrics, and oxygen-rich climate control for maximum stamina building.',
    imageUrl: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=80',
    category: 'Cardio',
    benefits: ['Stamina & VO2 Max Improvement', 'Heart Health & Vascular Circulation', 'Rapid Fat Loss', 'Low-impact Interval Training'],
  },
  {
    id: 's6',
    title: 'Physio & Cryo Recovery Studio',
    slug: 'physio-recovery',
    summary: 'Post-workout physical therapy, percussive massage, contrast baths & dry sauna.',
    description: 'Accelerate recovery and repair muscle tissue with professional sports physiotherapists, Theragun treatment, cold compression plunge, and infrared sauna units.',
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    category: 'Recovery',
    benefits: ['Reduced Delayed Onset Muscle Soreness (DOMS)', 'Fast Micro-tear Muscle Repair', 'Improved Mobility & Range of Motion', 'Lactic Acid Flush'],
  },
];

export const GYM_TRAINERS: GymTrainer[] = [
  {
    id: 't1',
    name: 'Vikram Singh',
    specialization: 'Hypertrophy & Powerlifting',
    experienceYears: 9,
    bio: 'Former National Powerlifting medalist specializing in biomechanics, deadlift mechanics, and contest prep.',
    avatarUrl: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=800&q=80',
    instagram: '@vikram_CodeWithGandhi',
    rating: 4.98,
    reviewsCount: 142,
  },
  {
    id: 't2',
    name: 'Ananya Rao',
    specialization: 'Functional HIIT & Calisthenics',
    experienceYears: 7,
    bio: 'Certified ACSM master trainer with expertise in explosive bodyweight movements, core stability, and athletic metabolic conditioning.',
    avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=800&q=80',
    instagram: '@ananya.fitsolution',
    rating: 4.96,
    reviewsCount: 98,
  },
  {
    id: 't3',
    name: 'Marcus D’Souza',
    specialization: 'CrossFit & Olympic Lifting',
    experienceYears: 11,
    bio: 'CrossFit Level 2 Coach who has mentored 1,500+ athletes in snatch technique, clean & jerk, and endurance WODs.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    instagram: '@marcus_CodeWithGandhi',
    rating: 4.99,
    reviewsCount: 215,
  },
  {
    id: 't4',
    name: 'Priya Nair',
    specialization: 'Vinyasa Yoga & Mobility',
    experienceYears: 6,
    bio: 'RYT-500 Yoga master focusing on hip mobility, spinal decompressions, post-workout fascial release, and breathwork.',
    avatarUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    instagram: '@priya_mobility',
    rating: 4.92,
    reviewsCount: 86,
  },
];

export const GYM_REVIEWS: GymReview[] = [
  {
    id: 'r1',
    authorName: 'Rohan Mehta',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'CodeWithGandhi Indiranagar is hands down the most cinematic, high-end gym in South India. The Eleiko equipment, rim-light aesthetic, and sauna are unmatched!',
    branchName: 'Indiranagar Flagship',
    date: '2 days ago',
  },
  {
    id: 'r2',
    authorName: 'Deepika Sharma',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Lost 12 kg in 4 months with Vikram’s personal training. The 3D progress tracking on the member portal keeps me disciplined every single week.',
    branchName: 'Koramangala Hub',
    date: '1 week ago',
  },
  {
    id: 'r3',
    authorName: 'Siddharth Iyer',
    avatarUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The CrossFit WODs with Marcus are insane! The atmosphere is electric, orange lighting is crazy good, and live crowd meter saves me time.',
    branchName: 'HSR Performance Center',
    date: '2 weeks ago',
  },
  {
    id: 'r4',
    authorName: 'Kavya Kulkarni',
    avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Cleanest gym in Bengaluru! The women-only batch for functional training made me feel super empowered and comfortable.',
    branchName: 'Whitefield Arena',
    date: '3 weeks ago',
  },
];

export const GYM_TRANSFORMATIONS: GymTransformation[] = [
  {
    id: 'tf1',
    memberName: 'Aditya Verma',
    goalCategory: 'Fat Loss & Recomp',
    beforeImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=600&q=80',
    weightLostKg: 16.5,
    bodyFatDiff: '-14% Body Fat',
    durationMonths: 5,
    story: 'Reversed sedentary office lifestyle and built a defined physique with macro coaching and 4x weekly strength sessions.',
    trainerName: 'Vikram Singh',
  },
  {
    id: 'tf2',
    memberName: 'Sneha Reddy',
    goalCategory: 'Muscle Toning & Strength',
    beforeImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    afterImage: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80',
    weightLostKg: 0,
    bodyFatDiff: '-8% BF (+5kg Lean Muscle)',
    durationMonths: 6,
    story: 'Eliminated lower back stiffness from long sitting hours and achieved a 100kg deadlift milestone.',
    trainerName: 'Ananya Rao',
  },
];
