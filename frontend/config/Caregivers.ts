import sahara from '../src/assets/Caregiverprofile/Sarah.jpeg'
import Michael from '../src/assets/Caregiverprofile/Michael.jpeg'
import Emily from '../src/assets/Caregiverprofile/Emily.jpeg'

export type Review = {
  id: number
  reviewerName: string
  rating: number
  date: string
  comment: string
}

export type Caregiver = {
  id: number
  profileImage: string
  name: string
  role: string
  location: string
  experience: string
  rating: number
  reviews: number
  rate: string
  availability: string
  availableDates: string[]
  verified: boolean
  description: string
  specialties: string[]
  credentials: string[]
  about: string
  freetime: string
  reviewText: string
  reviewsData: Review[]
}

const CaregiversData: Caregiver[] = [
  {
    id: 1,
    profileImage: sahara,
    name: 'Sarah Jenkins',
    role: 'Registered Nurse (RN)',
    location: 'San Francisco, CA',
    experience: '5 years experience',
    rating: 4.9,
    reviews: 124,
    rate: '$35/hr',
    availability: 'Available today',
    availableDates: ['Aug 27, 2026', 'Aug 28, 2026', 'Aug 30, 2026', 'Sep 01, 2026', 'Sep 03, 2026'],
    verified: true,
    description:
      'Sarah is a compassionate Registered Nurse with extensive experience in geriatric care and post-surgery recovery. She is dedicated to providing dignified, respectful care to all her patients.',
    specialties: ['Senior Care', 'Mobility Support', 'Medication Administration', 'Recovery Care'],
    credentials: ['BLS Certified', 'Geriatric Care Certified', 'Background checked'],
    about: "I started my journey in caregiving over a decade ago after caring for my own grandmother. That experience taught me the profound impact that patient, empathetic support can have on a family's well-being. I bring a calm demeanor and a positive attitude to every home I visit.",
    freetime: 'In my free time, I enjoy hiking, reading historical novels, and volunteering at local animal shelters. I also love to cook and often share my favorite healthy recipes with the families I work with.',
    reviewText: 'Sarah was warm, professional, and truly attentive to my mother’s needs. She made us feel supported from day one.',
    reviewsData: [
      {
        id: 1,
        reviewerName: 'Linda M.',
        rating: 5,
        date: 'Aug 2026',
        comment: 'Sarah was warm, professional, and truly attentive to my mother’s needs. She made us feel supported from day one.',
      },
      {
        id: 2,
        reviewerName: 'Carlos R.',
        rating: 5,
        date: 'Jul 2026',
        comment: 'Excellent communication and very gentle care during post-surgery recovery. Highly recommended.',
      },
      {
        id: 3,
        reviewerName: 'Ayesha K.',
        rating: 4,
        date: 'Jun 2026',
        comment: 'Dependable and kind. She kept detailed notes that helped our family coordinate care easily.',
      },
    ],

  },
  {
    id: 2,
    profileImage: Michael,
    name: 'Michael Lee',
    role: 'Certified Nursing Assistant',
    location: 'Oakland, CA',
    experience: '4 years experience',
    rating: 4.8,
    reviews: 96,
    rate: '$26/hr',
    availability: 'Available tomorrow',
    availableDates: ['Aug 28, 2026', 'Aug 29, 2026', 'Aug 31, 2026', 'Sep 02, 2026', 'Sep 04, 2026'],
    verified: true,
    description:
      'Michael is a warm, dependable Certified Nursing Assistant with a strong background in helping elderly clients with daily routines, personal support, and companionship.',
    specialties: ['Daily Living Support', 'Companionship', 'Bathing Assistance', 'Meal Support'],
    credentials: ['CNA License', 'First Aid Certified', 'Background checked'],
    about: 'Michael is known for creating calm, respectful routines for seniors and recovering patients. His compassionate approach and reliability make families feel secure and comfortable.',
    freetime: 'Outside of work, Michael enjoys cycling, playing chess, and attending local community theater productions. He also volunteers at a senior center on weekends.',
    reviewText: 'Michael is patient, respectful, and always on time. He built trust with our family very quickly.',
    reviewsData: [
      {
        id: 1,
        reviewerName: 'Priya S.',
        rating: 5,
        date: 'Aug 2026',
        comment: 'Michael is patient, respectful, and always on time. He built trust with our family very quickly.',
      },
      {
        id: 2,
        reviewerName: 'James T.',
        rating: 4,
        date: 'Jul 2026',
        comment: 'Very supportive with daily routines and meal prep. My father felt comfortable with him right away.',
      },
      {
        id: 3,
        reviewerName: 'Sofia L.',
        rating: 5,
        date: 'May 2026',
        comment: 'Professional and calm under pressure. We appreciated his consistency and clear updates.',
      },
    ],
  },
  {
    id: 3,
    profileImage: Emily,
    name: 'Emily Davis',
    role: 'Licensed Practical Nurse (LPN)',
    location: 'San Francisco, CA',
    experience: '3 years experience',
    rating: 4.7,
    reviews: 82,
    rate: '$30/hr',
    availability: 'Available this week',
    availableDates: ['Aug 29, 2026', 'Aug 30, 2026', 'Sep 01, 2026', 'Sep 03, 2026', 'Sep 05, 2026'],
    verified: false,
    description: 'Emily is a Licensed Practical Nurse with a strong focus on patient-centered care. She is skilled in medication management, patient monitoring, and providing emotional support to patients and their families.',
    specialties: ['Medication Management', 'Patient Monitoring', 'Basic Life Support', 'Post-Visit Care'],
    credentials: ['LPN License', 'Patient Monitoring Certified', 'Background checked'],
    about: 'Emily supports patients with a balance of clinical skill and compassionate communication. She is especially helpful for short-term recovery, check-ins, and routine health monitoring.',
    freetime: 'In her free time, Emily enjoys reading, gardening, and spending time with her family.',
    reviewText: 'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
    reviewsData: [
      {
        id: 1,
        reviewerName: 'Noah P.',
        rating: 5,
        date: 'Aug 2026',
        comment: 'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
      },
      {
        id: 2,
        reviewerName: 'Grace W.',
        rating: 4,
        date: 'Jun 2026',
        comment: 'She explained medications clearly and made follow-up routines easy to manage.',
      },
      {
        id: 3,
        reviewerName: 'Ethan B.',
        rating: 5,
        date: 'Apr 2026',
        comment: 'Great bedside manner and strong clinical judgment. We felt safe and cared for.',
      },
    ],
  },
]

export default CaregiversData
