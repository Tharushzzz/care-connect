export interface ServiceTypeOption {
  id: 'elderly' | 'child' | 'special'
  title: string
  description: string
}

export interface CareRequirementOption {
  id: string
  label: string
}

export interface BookingDetails {
  serviceType: 'elderly' | 'child' | 'special'
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  selectedRequirements: string[]
  streetAddress: string
  city: string
  zipCode: string
  additionalNotes: string
}

export const ServiceTypesData: ServiceTypeOption[] = [
  {
    id: 'elderly',
    title: 'Elderly Care',
    description: 'Specialized assistance for senior family members',
  },
  {
    id: 'child',
    title: 'Child Care',
    description: 'Safe and attentive care for infants and kids',
  },
  {
    id: 'special',
    title: 'Special Needs',
    description: 'Tailored medical and personal support',
  },
]

export const CareRequirementsData: CareRequirementOption[] = [
  { id: 'req_1', label: 'Medication Administration' },
  { id: 'req_2', label: 'Mobility Assistance' },
  { id: 'req_3', label: 'Meal Preparation' },
  { id: 'req_4', label: 'Companionship' },
  { id: 'req_5', label: 'Light Housekeeping' },
]

export const defaultBookingData: BookingDetails = {
  serviceType: 'elderly',
  startDate: '2026-08-28',
  endDate: '2026-08-30',
  startTime: '09:00',
  endTime: '17:00',
  selectedRequirements: ['Medication Administration', 'Mobility Assistance'],
  streetAddress: '123 Galle Road',
  city: 'Colombo 03',
  zipCode: '00300',
  additionalNotes: '',
}

export default defaultBookingData