export type User = {
  id: string
  name: string
  email: string
  phone: string
  avatar: string
  password: string
  role: 'family' | 'caregiver' | 'admin'
}

const UsersData: User[] = [
  {
    id: 'usr_101',
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    phone: '0712554567',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=160&q=80',
    password: '1234',
    role: 'family',
  },
  {
    id: 'usr_102',
    name: 'Sarah Jenkins',
    email: 'sarah@example.com',
    phone: '0712554568',
    avatar: 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788630765/Sarah.jpg',
    password: '1234',
    role: 'caregiver',
  },
  {
    id: 'usr_103',
    name: 'William Smith',
    email: 'william@example.com',
    phone: '0712554569',
    avatar: '',
    password: '1234',
    role: 'family',
  },
  {
    id: 'usr_104',
    name: 'Michael Lee',
    email: 'michael@example.com',
    phone: '0712554570',
    avatar: 'https://res.cloudinary.com/i7mccbnx/image/upload/v1788631373/Michael.jpg',
    password: '1234',
    role: 'caregiver',
  },
  {
    id: 'usr_105',
    name: 'System Admin',
    email: 'admin@admin.com',
    phone: '0712554571',
    avatar: '',
    password: 'admin',
    role: 'admin',
  },
]

export default UsersData