import sahara from '../src/assets/Caregiverprofile/Sarah.jpeg'
import Michael from '../src/assets/Caregiverprofile/Michael.jpeg'
import Emily from '../src/assets/Caregiverprofile/Emily.jpeg'

const CaregiversData = [
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
    description:
      'Sarah is a compassionate Registered Nurse with extensive experience in geriatric care and post-surgery recovery. She is dedicated to providing dignified, respectful care to all her patients.',
    specialties: ['Senior Care', 'Mobility Support', 'Medication Administration', 'Recovery Care'],
    credentials: ['BLS Certified', 'Geriatric Care Certified', 'Background checked'],
    about: "I started my journey in caregiving over a decade ago after caring for my own grandmother. That experience taught me the profound impact that patient, empathetic support can have on a family's well-being. I bring a calm demeanor and a positive attitude to every home I visit.",
    freetime: 'In my free time, I enjoy hiking, reading historical novels, and volunteering at local animal shelters. I also love to cook and often share my favorite healthy recipes with the families I work with.',
    reviewText: 'Sarah was warm, professional, and truly attentive to my mother’s needs. She made us feel supported from day one.',
    
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
    description:
      'Michael is a warm, dependable Certified Nursing Assistant with a strong background in helping elderly clients with daily routines, personal support, and companionship.',
    specialties: ['Daily Living Support', 'Companionship', 'Bathing Assistance', 'Meal Support'],
    credentials: ['CNA License', 'First Aid Certified', 'Background checked'],
    about: 'Michael is known for creating calm, respectful routines for seniors and recovering patients. His compassionate approach and reliability make families feel secure and comfortable.',
    freetime: 'Outside of work, Michael enjoys cycling, playing chess, and attending local community theater productions. He also volunteers at a senior center on weekends.',
    reviewText: 'Michael is patient, respectful, and always on time. He built trust with our family very quickly.',
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
    description: 'Emily is a Licensed Practical Nurse with a strong focus on patient-centered care. She is skilled in medication management, patient monitoring, and providing emotional support to patients and their families.',
    specialties: ['Medication Management', 'Patient Monitoring', 'Basic Life Support', 'Post-Visit Care'],
    credentials: ['LPN License', 'Patient Monitoring Certified', 'Background checked'],
    about: 'Emily supports patients with a balance of clinical skill and compassionate communication. She is especially helpful for short-term recovery, check-ins, and routine health monitoring.',
    freetime: 'In her free time, Emily enjoys reading, gardening, and spending time with her family.',
    reviewText: 'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
  },
]

export default CaregiversData
