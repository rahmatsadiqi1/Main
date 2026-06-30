export interface Treatment {
  id: string;
  name: string;
  duration: number; // minutes
  description: string;
  category: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  dateOfBirth: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}

export const TREATMENTS: Treatment[] = [
  // Hijama & Cupping
  {
    id: 'hijama-wet-cupping',
    name: 'Hijama (Wet Cupping)',
    duration: 60,
    description: 'Doctor-led wet cupping in a clinical setting with personalised planning and clear aftercare.',
    category: 'Hijama & Cupping',
  },
  {
    id: 'dry-cupping',
    name: 'Dry Cupping',
    duration: 45,
    description: 'Therapeutic dry cupping for muscle tension relief, performed by a qualified clinician.',
    category: 'Hijama & Cupping',
  },
  // IV Drips
  {
    id: 'iv-hydration',
    name: 'IV Hydration Drip',
    duration: 45,
    description: 'Rapid intravenous rehydration to restore fluids and electrolytes quickly.',
    category: 'IV Drips',
  },
  {
    id: 'iv-immunity',
    name: 'IV Immunity Drip',
    duration: 45,
    description: 'High-dose vitamin C and zinc infusion to support and strengthen your immune system.',
    category: 'IV Drips',
  },
  {
    id: 'iv-energy',
    name: 'IV Energy Drip',
    duration: 45,
    description: 'B-vitamin and amino acid infusion to boost energy and combat fatigue.',
    category: 'IV Drips',
  },
  {
    id: 'iv-recovery',
    name: 'IV Recovery Drip',
    duration: 45,
    description: 'Post-workout or illness recovery drip with electrolytes, antioxidants and vitamins.',
    category: 'IV Drips',
  },
  {
    id: 'iv-wellness',
    name: 'IV Wellness Drip',
    duration: 45,
    description: 'Comprehensive Myers\' cocktail infusion for general health and wellbeing.',
    category: 'IV Drips',
  },
  // Hair Restoration
  {
    id: 'prp-hair',
    name: 'PRP Hair Restoration',
    duration: 60,
    description: 'Platelet-rich plasma injections to stimulate natural hair growth and improve density.',
    category: 'Hair Restoration',
  },
  {
    id: 'exosome-hair',
    name: 'Exosome Hair Treatment',
    duration: 60,
    description: 'Advanced exosome therapy for hair density and scalp health in men and women.',
    category: 'Hair Restoration',
  },
  {
    id: 'prp-exosome-combined',
    name: 'PRP + Exosome Combined',
    duration: 75,
    description: 'Combined PRP and exosome treatment for maximum hair restoration results.',
    category: 'Hair Restoration',
  },
  // Blood Tests
  {
    id: 'blood-test-general',
    name: 'General Blood Test Panel',
    duration: 20,
    description: 'Comprehensive blood panel including full blood count, liver, kidney and thyroid function.',
    category: 'Private Blood Tests',
  },
  {
    id: 'blood-test-hormones',
    name: 'Hormone Profile Blood Test',
    duration: 20,
    description: 'Detailed hormone panel for testosterone, oestrogen, FSH, LH and cortisol levels.',
    category: 'Private Blood Tests',
  },
  {
    id: 'blood-test-vitamins',
    name: 'Vitamin & Mineral Blood Test',
    duration: 20,
    description: 'Check vitamin D, B12, iron, ferritin and folate levels with clinical follow-up.',
    category: 'Private Blood Tests',
  },
  // Ear Care
  {
    id: 'ear-wax-removal',
    name: 'Ear Wax Removal (Microsuction)',
    duration: 30,
    description: 'Doctor-led microsuction ear wax removal — no water, no syringing, immediate results.',
    category: 'Ear Care',
  },
  // Surgical Procedures
  {
    id: 'circumcision-infant',
    name: 'Infant Circumcision',
    duration: 30,
    description: 'Safe, doctor-performed infant circumcision with full consent process and aftercare guidance.',
    category: 'Surgical Procedures',
  },
  {
    id: 'circumcision-adult',
    name: 'Adult Circumcision',
    duration: 60,
    description: 'Adult circumcision under local anaesthetic, performed by an experienced clinician.',
    category: 'Surgical Procedures',
  },
  // Joint Injections
  {
    id: 'joint-injection-steroid',
    name: 'Joint Steroid Injection',
    duration: 30,
    description: 'Corticosteroid injection for arthritis, bursitis or joint inflammation and pain relief.',
    category: 'Joint Injections',
  },
  {
    id: 'joint-injection-prp',
    name: 'Joint PRP Injection',
    duration: 45,
    description: 'Platelet-rich plasma injection to promote natural healing and reduce joint pain.',
    category: 'Joint Injections',
  },
];

export const TIME_SLOTS = [
  '08:00 AM', '08:15 AM', '08:30 AM', '08:45 AM',
  '09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM',
  '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM',
  '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM',
  '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM',
  '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM',
  '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM',
  '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM',
  '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM',
  '05:00 PM', '05:15 PM', '05:30 PM',
];
