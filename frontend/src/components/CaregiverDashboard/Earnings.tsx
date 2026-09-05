import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  Download,
  ArrowDownLeft,
  ArrowUpRight,
  CheckCircle2,
  X
} from 'lucide-react';

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  status: 'Completed' | 'Pending';
  amount: string;
  isPayout?: boolean;
}

export const CaregiverEarnings: React.FC = () => {
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const transactions: Transaction[] = [
    {
      id: 'TX-1092',
      title: 'John Doe Family',
      subtitle: 'Earnings • TX-1092',
      date: 'Oct 24, 2026',
      status: 'Pending',
      amount: '+Rs. 14,000.00',
      isPayout: false
    },
    {
      id: 'TX-1091',
      title: 'Alice Smith Family',
      subtitle: 'Earnings • TX-1091',
      date: 'Oct 22, 2026',
      status: 'Completed',
      amount: '+Rs. 10,500.00',
      isPayout: false
    },
    {
      id: 'TX-1090',
      title: 'Platform Payout',
      subtitle: 'Payout to Bank • TX-1090',
      date: 'Oct 20, 2026',
      status: 'Completed',
      amount: '-Rs. 42,000.00',
      isPayout: true
    },
    {
      id: 'TX-1089',
      title: 'Sarah Jenkins',
      subtitle: 'Earnings • TX-1089',
      date: 'Oct 18, 2026',
      status: 'Completed',
      amount: '+Rs. 17,500.00',
      isPayout: false
    }
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setShowWithdrawModal(false);
    }, 1500);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Earnings & Payouts
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Track your income and manage your bank transfers.
          </p>
        </div>

        <div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2"
          >
            <DollarSign className="w-4 h-4" />
            <span>Withdraw Funds</span>
          </button>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Available for Payout (Dark Teal Hero) */}
        <div className="relative overflow-hidden bg-[#0A3D37] text-white rounded-2xl p-6 shadow-sm border border-[#08332E] flex flex-col justify-between">
          {/* Watermark Currency */}
          <div className="absolute -right-3 -bottom-5 text-white/5 font-extrabold text-7xl pointer-events-none select-none">
            Rs.
          </div>

          <div>
            <span className="text-xs font-semibold text-teal-200 uppercase tracking-wider">
              Available for Payout
            </span>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-2">
              Rs. 24,500.00
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-xs text-teal-100/75">
            Next automatic payout: <span className="font-semibold text-white">Oct 28</span>
          </div>
        </div>

        {/* Card 2: Total Earnings */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>Total Earnings</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Rs. 324,000.00
            </div>
          </div>

          <div className="mt-4 text-xs font-semibold text-emerald-600 flex items-center gap-1">
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Card 3: Hours Worked */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs flex flex-col justify-between hover:shadow-xs transition-shadow">
          <div>
            <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>Hours Worked</span>
            </div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 flex items-baseline">
              92 <span className="text-slate-400 font-normal text-base ml-1.5">hrs</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            This month
          </div>
        </div>
      </div>

      {/* Transaction History Table Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden">
        {/* Table Header Row */}
        <div className="p-5 sm:px-6 flex items-center justify-between border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-900">Transaction History</h2>
          <button
            onClick={() => alert('Downloading statement PDF...')}
            className="px-3.5 py-1.5 rounded-xl border border-teal-600 text-teal-700 hover:bg-teal-50 text-xs font-semibold transition-all inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Statement</span>
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-5 sm:px-6">Transaction</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5 sm:px-6 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                  {/* Transaction Info */}
                  <td className="py-4 px-5 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                          tx.isPayout
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-teal-50 text-[#0D9488]'
                        }`}
                      >
                        {tx.isPayout ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownLeft className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm">{tx.title}</div>
                        <div className="text-xs text-slate-400">{tx.subtitle}</div>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-5 text-xs text-slate-600 font-medium">
                    {tx.date}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-5">
                    <span
                      className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
                        tx.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      }`}
                    >
                      {tx.status}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className="py-4 px-5 sm:px-6 text-right">
                    <span
                      className={`font-bold text-sm sm:text-base ${
                        tx.isPayout ? 'text-slate-800' : 'text-[#0D9488]'
                      }`}
                    >
                      {tx.amount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200 relative">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Withdraw Funds</h3>
            <p className="text-xs text-slate-500">
              Transfer available balance to your linked bank account (Visa **** 4242).
            </p>

            <form onSubmit={handleWithdraw} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount to withdraw
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">Rs.</span>
                  <input
                    type="number"
                    defaultValue="24500.00"
                    max="24500"
                    step="100"
                    className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold focus:outline-none focus:border-teal-600 focus:ring-1 focus:ring-teal-600"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Available balance: Rs. 24,500.00</p>
              </div>

              {withdrawSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Transfer initiated successfully!</span>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowWithdrawModal(false)}
                  className="flex-1 py-2 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 rounded-xl bg-[#0D9488] hover:bg-[#0b7970] text-white text-xs font-semibold shadow-xs"
                >
                  Confirm Transfer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaregiverEarnings;
