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
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    specialties: ['Senior Care', 'Mobility Support', 'Medication Administration', 'Recovery Care'],
    credentials: ['BLS Certified', 'Geriatric Care Certified', 'Background checked'],
    bio: 'Sarah is a dedicated Registered Nurse with over five years of experience in home-based and post-surgical care. She works closely with families to create comfortable, safe routines that support independence and emotional well-being.',
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
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    specialties: ['Daily Living Support', 'Companionship', 'Bathing Assistance', 'Meal Support'],
    credentials: ['CNA License', 'First Aid Certified', 'Background checked'],
    bio: 'Michael is known for creating calm, respectful routines for seniors and recovering patients. His compassionate approach and reliability make families feel secure and comfortable.',
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
    bio: 'Emily supports patients with a balance of clinical skill and compassionate communication. She is especially helpful for short-term recovery, check-ins, and routine health monitoring.',
    reviewText: 'Emily was kind, attentive, and extremely helpful throughout my recovery process. We appreciated her professionalism.',
  },
]

export default CaregiversData
