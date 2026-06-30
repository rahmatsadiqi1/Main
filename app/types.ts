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
  {
    id: 'general-consultation',
    name: 'General Consultation',
    duration: 15,
    description: 'Standard GP consultation for general health concerns.',
    category: 'General',
  },
  {
    id: 'long-consultation',
    name: 'Long Consultation',
    duration: 30,
    description: 'Extended GP consultation for complex or multiple concerns.',
    category: 'General',
  },
  {
    id: 'blood-pressure',
    name: 'Blood Pressure Check',
    duration: 15,
    description: 'Routine blood pressure monitoring and management.',
    category: 'Cardiovascular',
  },
  {
    id: 'ecg',
    name: 'ECG (Electrocardiogram)',
    duration: 20,
    description: 'Heart rhythm and electrical activity assessment.',
    category: 'Cardiovascular',
  },
  {
    id: 'diabetes-management',
    name: 'Diabetes Management',
    duration: 30,
    description: 'Diabetes review, HbA1c check and management plan.',
    category: 'Chronic Disease',
  },
  {
    id: 'chronic-disease',
    name: 'Chronic Disease Management',
    duration: 30,
    description: 'Review and management of ongoing chronic conditions.',
    category: 'Chronic Disease',
  },
  {
    id: 'wound-care',
    name: 'Wound Care / Dressing',
    duration: 20,
    description: 'Professional wound assessment and dressing changes.',
    category: 'Procedures',
  },
  {
    id: 'vaccination',
    name: 'Vaccination / Immunisation',
    duration: 15,
    description: 'Routine and travel vaccinations for all ages.',
    category: 'Preventive',
  },
  {
    id: 'health-assessment',
    name: 'Health Assessment',
    duration: 45,
    description: 'Comprehensive health check and risk factor screening.',
    category: 'Preventive',
  },
  {
    id: 'mental-health',
    name: 'Mental Health Consultation',
    duration: 30,
    description: 'Mental health assessment, support and care planning.',
    category: 'Mental Health',
  },
  {
    id: 'womens-health',
    name: "Women's Health",
    duration: 30,
    description: 'Pap smear, contraception, menopause and breast health.',
    category: "Women's Health",
  },
  {
    id: 'childrens-health',
    name: "Children's Health",
    duration: 20,
    description: 'Paediatric consultations, immunisations and development checks.',
    category: "Children's Health",
  },
  {
    id: 'spirometry',
    name: 'Spirometry (Lung Function)',
    duration: 20,
    description: 'Breathing test to assess lung capacity and function.',
    category: 'Respiratory',
  },
  {
    id: 'skin-check',
    name: 'Skin Cancer Check',
    duration: 30,
    description: 'Full-body skin examination for early detection of skin cancer.',
    category: 'Dermatology',
  },
  {
    id: 'repeat-scripts',
    name: 'Repeat Prescription',
    duration: 10,
    description: 'Renewal of existing medications and prescriptions.',
    category: 'General',
  },
  {
    id: 'referral',
    name: 'Specialist Referral',
    duration: 15,
    description: 'Referral letter and coordination with specialist services.',
    category: 'General',
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
