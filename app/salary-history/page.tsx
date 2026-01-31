'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  IndianRupee, ArrowLeft, Filter, Download, 
  CheckCircle, Clock, XCircle, Calendar
} from 'lucide-react';

interface SalaryTransaction {
  amount: number;
  paymentMonth: string;
  paymentDate: string;
  paymentMode: string;
  referenceId: string;
  status: 'pending' | 'paid' | 'failed';
  remarks?: string;
}

type FilterPeriod = 'monthly' | 'quarterly' | 'half_yearly' | 'yearly' | 'all';

export default function SalaryHistoryPage() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<any>(null);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('yearly');

  useEffect(() => {
    const teacherData = localStorage.getItem('teacher');
    if (!teacherData) {
      router.push('/login');
      return;
    }
    setTeacher(JSON.parse(teacherData));
  }, [router]);

  // Mock salary transaction data - replace with API call
  const allTransactions: SalaryTransaction[] = [
    { amount: 47200, paymentMonth: '2024-02', paymentDate: '2024-03-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2024-02-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2024-01', paymentDate: '2024-02-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2024-01-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-12', paymentDate: '2024-01-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-12-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-11', paymentDate: '2023-12-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-11-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-10', paymentDate: '2023-11-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-10-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-09', paymentDate: '2023-10-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-09-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-08', paymentDate: '2023-09-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-08-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-07', paymentDate: '2023-08-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-07-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-06', paymentDate: '2023-07-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-06-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-05', paymentDate: '2023-06-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-05-001', status: 'paid' },
    { amount: 47200, paymentMonth: '2023-04', paymentDate: '2023-05-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-04-001', status: 'paid' },
    { amount: 45000, paymentMonth: '2023-03', paymentDate: '2023-04-01', paymentMode: 'bank_transfer', referenceId: 'SAL-2023-03-001', status: 'paid' },
  ];

  // Filter transactions based on selected period
  const getFilteredTransactions = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return allTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.paymentMonth + '-01');
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();

      switch (filterPeriod) {
        case 'monthly':
          return transactionMonth === currentMonth && transactionYear === currentYear;
        
        case 'quarterly':
          const currentQuarter = Math.floor(currentMonth / 3);
          const transactionQuarter = Math.floor(transactionMonth / 3);
          return transactionQuarter === currentQuarter && transactionYear === currentYear;
        
        case 'half_yearly':
          const currentHalf = currentMonth < 6 ? 0 : 1;
          const transactionHalf = transactionMonth < 6 ? 0 : 1;
          return transactionHalf === currentHalf && transactionYear === currentYear;
        
        case 'yearly':
          return transactionYear === currentYear;
        
        case 'all':
          return true;
        
        default:
          return true;
      }
    });
  };

  const transactions = getFilteredTransactions();

  const getFilterLabel = () => {
    const now = new Date();
    switch (filterPeriod) {
      case 'monthly':
        return now.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
      case 'quarterly':
        const quarter = Math.floor(now.getMonth() / 3) + 1;
        return `Q${quarter} ${now.getFullYear()}`;
      case 'half_yearly':
        const half = now.getMonth() < 6 ? 'First Half' : 'Second Half';
        return `${half} ${now.getFullYear()}`;
      case 'yearly':
        return now.getFullYear().toString();
      case 'all':
        return 'All Time';
      default:
        return '';
    }
  };

  // Calculate statistics
  const totalPaid = transactions.filter(t => t.status === 'paid').reduce((sum, t) => sum + t.amount, 0);
  const totalPending = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);
  const paidCount = transactions.filter(t => t.status === 'paid').length;

  if (!teacher) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9FA] to-[#FEFEFE]">
      <Header />

      <div className="px-4 md:px-8 py-6 max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <Link 
            href="/profile"
            className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#1897C6] transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-[#535359] mb-1">Salary History</h1>
            <p className="text-sm text-[#6B7280]">Complete transaction history and payment records</p>
          </div>
        </div>

        {/* Filter Options */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-[#1897C6]" />
              <div>
                <h3 className="text-sm font-bold text-[#535359]">Filter Period</h3>
                <p className="text-xs text-[#6B7280] mt-0.5">{getFilterLabel()}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setFilterPeriod('monthly')}
                variant={filterPeriod === 'monthly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'monthly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Monthly
              </Button>
              <Button
                onClick={() => setFilterPeriod('quarterly')}
                variant={filterPeriod === 'quarterly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'quarterly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Quarterly
              </Button>
              <Button
                onClick={() => setFilterPeriod('half_yearly')}
                variant={filterPeriod === 'half_yearly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'half_yearly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Half Yearly
              </Button>
              <Button
                onClick={() => setFilterPeriod('yearly')}
                variant={filterPeriod === 'yearly' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'yearly' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                Yearly
              </Button>
              <Button
                onClick={() => setFilterPeriod('all')}
                variant={filterPeriod === 'all' ? 'default' : 'outline'}
                className={`h-9 text-xs ${
                  filterPeriod === 'all' 
                    ? 'bg-[#1897C6] hover:bg-[#1897C6]/90 text-white' 
                    : 'bg-transparent border-[#E5E7EB] text-[#535359] hover:border-[#1897C6]'
                }`}
              >
                All Time
              </Button>
            </div>
          </div>
        </Card>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle size={20} className="text-green-600" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase tracking-wide font-semibold">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">₹{totalPaid.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">{paidCount} successful transactions</p>
          </Card>

          <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 bg-gradient-to-br from-yellow-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock size={20} className="text-yellow-600" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase tracking-wide font-semibold">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">₹{totalPending.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">{transactions.filter(t => t.status === 'pending').length} pending transactions</p>
          </Card>

          <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <IndianRupee size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-[#6B7280] uppercase tracking-wide font-semibold">Average Salary</p>
                <p className="text-2xl font-bold text-blue-600">₹{transactions.length > 0 ? Math.round(totalPaid / paidCount).toLocaleString('en-IN') : 0}</p>
              </div>
            </div>
            <p className="text-xs text-[#6B7280]">Per month average</p>
          </Card>
        </div>

        {/* Transaction List */}
        <Card className="border border-[#E5E7EB] shadow-sm rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-[#535359]">All Transactions</h2>
              <p className="text-xs text-[#6B7280] mt-1">{transactions.length} transactions found</p>
            </div>
            <Button
              variant="outline"
              className="h-9 text-xs bg-transparent border-[#E5E7EB]"
            >
              <Download size={14} className="mr-2" />
              Export
            </Button>
          </div>

          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-[#E5E7EB] mb-4" />
                <p className="text-[#6B7280] font-medium">No transactions found for the selected period</p>
                <p className="text-sm text-[#9CA3AF] mt-1">Try selecting a different time period</p>
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <div key={index} className="border border-[#E5E7EB] rounded-lg p-4 hover:border-[#1897C6]/30 transition-colors">
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <p className="text-lg md:text-xl font-bold text-[#535359]">₹{transaction.amount.toLocaleString('en-IN')}</p>
                          <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            transaction.status === 'paid' 
                              ? 'bg-green-100 text-green-700' 
                              : transaction.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {transaction.status.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-[#6B7280] mb-1">
                          {new Date(transaction.paymentMonth + '-01').toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>
                    <div className="pt-3 border-t border-[#E5E7EB] space-y-1">
                      <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                        <Calendar size={12} />
                        <span>Paid: {new Date(transaction.paymentDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                      </div>
                      <p className="text-xs text-[#6B7280] capitalize">
                        Mode: {transaction.paymentMode.replace('_', ' ')}
                      </p>
                      <p className="text-xs text-[#6B7280] font-mono break-all">
                        Ref: {transaction.referenceId}
                      </p>
                      {transaction.remarks && (
                        <p className="text-xs text-[#6B7280] italic">{transaction.remarks}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
