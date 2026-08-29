export interface MetricCard {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

export interface UserItem {
  id: string;
  name: string;
  email: string;
  role: 'Family' | 'Caregiver';
  status: 'Active' | 'Suspended' | 'Pending';
  joinedDate: string;
}

export interface VerificationItem {
  id: string;
  applicant: string;
  risk: string;
  type: 'RN License' | 'Background Check' | 'CNA Certification';
  status: 'Pending Review' | 'Action Required' | 'Approved';
}

export interface TransactionItem {
  id: string;
  date: string;
  from: string;
  to: string;
  type: 'Job Payment' | 'Payout' | 'Deposit' | 'Refund';
  amount: string;
  fee: string;
  status: 'Completed' | 'Processing';
}