import { Download, Search, ChevronDown } from 'lucide-react';

interface Transaction {
  id: string;
  date: string;
  from: string;
  to: string;
  type: string;
  amount: string;
  fee: string;
  status: 'Completed' | 'Processing';
}

const transactionsData: Transaction[] = [
  {
    id: 'TRX-9021',
    date: 'Oct 24, 2026, 14:32',
    from: 'Family: John Doe',
    to: 'Caregiver: Sarah J.',
    type: 'Job Payment',
    amount: '$140.00',
    fee: 'Fee: $14.00',
    status: 'Completed',
  },
  {
    id: 'TRX-9020',
    date: 'Oct 24, 2026, 11:15',
    from: 'Platform Escrow',
    to: 'Caregiver: David C.',
    type: 'Payout',
    amount: '$420.00',
    fee: 'Fee: $0.00',
    status: 'Processing',
  },
  {
    id: 'TRX-9019',
    date: 'Oct 23, 2026, 09:42',
    from: 'Family: Alice S.',
    to: 'Platform Escrow',
    type: 'Deposit',
    amount: '$200.00',
    fee: 'Fee: $10.00',
    status: 'Completed',
  },
  {
    id: 'TRX-9018',
    date: 'Oct 22, 2026, 16:20',
    from: 'Family: Mark T.',
    to: 'Caregiver: Maria R.',
    type: 'Refund',
    amount: '$75.00',
    fee: 'Fee: -$7.50',
    status: 'Completed',
  },
];

export default function Transactions() {
  return (
    <div className="admin-page">

      {/* Heading */}
      <div className="page-heading-row">
        <div>
          <h2>Platform Financials</h2>
          <p>
            Monitor payments, payouts, and platform revenue.
          </p>
        </div>

        <button className="export-button">
          <Download size={16} />
          Export CSV
        </button>
      </div>

      {/* Financial summary cards */}
      <div className="financial-cards">

        <div className="financial-card">
          <p>Total Processing Volume</p>
          <h3>$124.5k</h3>
          <span>Last 30 days</span>
        </div>

        <div className="financial-card">
          <p>Platform Revenue (Net)</p>
          <h3>$12.4k</h3>
          <span className="positive">
            ~10% effective rate
          </span>
        </div>

        <div className="financial-card">
          <p>Pending Payouts</p>
          <h3>$8.2k</h3>
          <span>To 42 Caregivers</span>
        </div>

        <div className="financial-card">
          <p>Disputes / Refunds</p>
          <h3>$450</h3>
          <span className="warning">
            3 active disputes
          </span>
        </div>

      </div>

      {/* Transactions table */}
      {/* Transactions table */}
<div className="admin-table-card">

  <div className="transaction-toolbar">

    <div className="transaction-search">
      <Search size={18} />
      <input
        type="text"
        placeholder="Search TRX ID or name"
      />
    </div>

    <button className="transaction-type-button">
      All Types
      <ChevronDown size={16} />
    </button>

  </div>

  <div className="table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Transaction ID & Date</th>
                <th>Details (From → To)</th>
                <th>Type</th>
                <th>Amount / Fee</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {transactionsData.map((transaction) => (

                <tr key={transaction.id}>

                  <td>
                    <div className="transaction-id">
                      {transaction.id}
                    </div>

                    <div className="transaction-date">
                      {transaction.date}
                    </div>
                  </td>

                  <td>
                    <div className="transaction-from">
                      {transaction.from}
                    </div>

                    <div className="transaction-to">
                      → {transaction.to}
                    </div>
                  </td>

                  <td>
                    {transaction.type}
                  </td>

                  <td>
                    <div className="transaction-amount">
                      {transaction.amount}
                    </div>

                    <div className="transaction-fee">
                      {transaction.fee}
                    </div>
                  </td>

                  <td>
                    <span
                      className={`status-badge ${
                        transaction.status === 'Completed'
                          ? 'status-active'
                          : 'status-processing'
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>

                </tr>

              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}