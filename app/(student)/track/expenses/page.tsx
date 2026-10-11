'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sliders, 
  Plus, 
  FileDown, 
  Utensils, 
  Train, 
  Printer, 
  BookOpen, 
  Coffee, 
  TrendingUp, 
  AlertCircle, 
  CreditCard,
  Users,
  X
} from 'lucide-react';
import { useApp } from '@/lib/data/store';

export default function ExpensesBudgetPage() {
  const { profile, addExpense } = useApp();

  const [showAddModal, setShowAddModal] = useState(false);
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('Food & Canteen');
  const [settledFlatTab, setSettledFlatTab] = useState(false);

  const [transactions, setTransactions] = useState([
    { id: 1, title: 'Canteen South Indian Thali', time: 'Today, 1:15 PM', tag: 'Food', amount: -90, icon: 'food' },
    { id: 2, title: 'CS Lab Manual Printout', time: 'Today, 10:10 AM', tag: 'Print', amount: -45, icon: 'print' },
    { id: 3, title: 'Delhi Metro SmartCard Recharge', time: 'Yesterday', tag: 'Transit', amount: -200, icon: 'transit' },
    { id: 4, title: 'Mid-sem Reference Guide', time: '22 Oct', tag: 'Academics', amount: -120, icon: 'book' },
    { id: 5, title: 'Split from Rohan (Chai & Snacks)', time: '21 Oct', tag: 'Received', amount: 65, icon: 'split' },
  ]);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = parseFloat(expenseAmount);
    if (isNaN(amt) || amt <= 0) return;

    addExpense(amt, expenseCategory, expenseTitle);
    setTransactions([
      {
        id: Date.now(),
        title: expenseTitle || 'College Expense',
        time: 'Just now',
        tag: expenseCategory === 'Food & Canteen' ? 'Food' : 'Print',
        amount: -amt,
        icon: 'food'
      },
      ...transactions
    ]);

    setExpenseAmount('');
    setExpenseTitle('');
    setShowAddModal(false);
  };

  const handleExportPDF = () => {
    alert('Generating October_Student_Expense_Report.pdf... Downloaded!');
  };

  return (
    <div className="p-4 space-y-4">
      {/* Privacy Guard Banner */}
      <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-2.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-indigo-950 font-medium">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Encrypted on device. Not shared with c...</span>
        </div>
        <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-bold rounded uppercase">
          PRIVATE
        </span>
      </div>

      {/* October Budget Overview Card */}
      <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-subtle space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900">October Budget</h3>
            <span className="px-2 py-0.5 bg-indigo-50 text-primary text-[10px] font-bold rounded-full">
              7 Days Left
            </span>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Amount & Pace */}
        <div className="flex items-baseline justify-between">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">₹5,420</span>
              <span className="text-xs font-semibold text-slate-400">/ ₹8,000</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5 flex items-center gap-1">
              <span>✓ 67.7% used</span>
              <span>•</span>
              <span>On Track</span>
            </p>
          </div>

          <div className="bg-indigo-50/60 p-2 rounded-2xl border border-indigo-100/60 text-right">
            <span className="text-[9px] font-bold text-slate-400 block uppercase">Safe Daily Pace</span>
            <span className="text-sm font-black text-primary block">₹368<span className="text-[10px] font-normal text-slate-500">/day</span></span>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full" style={{ width: '67.7%' }} />
        </div>

        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500 pt-0.5">
          <span>Remaining: <strong className="text-slate-800">₹2,580</strong></span>
          <span>Target: ₹8,000</span>
        </div>
      </div>

      {/* Split Tab Card */}
      <div className="bg-purple-50/60 border border-purple-100 rounded-3xl p-3.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.2 bg-purple-200 text-purple-800 text-[9px] font-black rounded uppercase">
                SPLIT TAB
              </span>
              <h4 className="text-xs font-bold text-slate-900">Flat 302 Canteen ...</h4>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5">
              You are owed <strong className="text-purple-900 font-bold">₹340</strong> by Rohan &amp; Kabir
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setSettledFlatTab(true);
            alert('Flat 302 tab marked as settled!');
          }}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
            settledFlatTab
              ? 'bg-emerald-600 text-white'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm'
          }`}
        >
          {settledFlatTab ? 'Settled ✓' : 'Settle Up'}
        </button>
      </div>

      {/* Category Breakdown Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Category Breakdown</h4>
          <button className="text-xs font-bold text-primary hover:underline">
            Edit Caps
          </button>
        </div>

        <div className="flex gap-2.5 overflow-x-auto no-scrollbar pb-1">
          {/* Card 1: Food & Canteen */}
          <div className="min-w-[145px] bg-white rounded-3xl p-3 border border-slate-100 shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-1.5 bg-blue-50 text-blue-600 rounded-xl">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-full">
                71%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Food &amp; Canteen</span>
              <span className="text-sm font-black text-slate-900">₹2,850</span>
              <span className="text-[9px] text-slate-400 block">Limit ₹4,000</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: '71%' }} />
            </div>
          </div>

          {/* Card 2: Metro / Commute */}
          <div className="min-w-[145px] bg-white rounded-3xl p-3 border border-slate-100 shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-1.5 bg-indigo-50 text-primary rounded-xl">
                <Train className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-full">
                63%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Metro / Commute</span>
              <span className="text-sm font-black text-slate-900">₹950</span>
              <span className="text-[9px] text-slate-400 block">Limit ₹1,500</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-600 rounded-full" style={{ width: '63%' }} />
            </div>
          </div>

          {/* Card 3: Print & Xerox */}
          <div className="min-w-[145px] bg-white rounded-3xl p-3 border border-slate-100 shadow-subtle space-y-2">
            <div className="flex items-center justify-between">
              <div className="p-1.5 bg-purple-50 text-purple-600 rounded-xl">
                <Printer className="w-3.5 h-3.5" />
              </div>
              <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded-full">
                85%
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block font-medium">Print &amp; Xerox</span>
              <span className="text-sm font-black text-slate-900">₹620</span>
              <span className="text-[9px] text-slate-400 block">Limit ₹800</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons: Add Expense & Export PDF */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => setShowAddModal(true)}
          className="py-3 px-3 bg-primary hover:bg-primary-dark text-white rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-indigo-300 active:scale-98 transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Expense
        </button>

        <button
          onClick={handleExportPDF}
          className="py-3 px-3 bg-indigo-50 hover:bg-indigo-100 text-primary border border-indigo-100 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
        >
          <FileDown className="w-4 h-4" />
          Export PDF
        </button>
      </div>

      {/* Recent Transactions List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-slate-900">Recent Transactions</h4>
          <span className="text-[10px] text-slate-400 font-medium">5 this week</span>
        </div>

        <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-subtle divide-y divide-slate-50">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs ${
                  tx.icon === 'food'
                    ? 'bg-blue-50 text-blue-600'
                    : tx.icon === 'print'
                    ? 'bg-purple-50 text-purple-600'
                    : tx.icon === 'transit'
                    ? 'bg-indigo-50 text-primary'
                    : tx.icon === 'book'
                    ? 'bg-teal-50 text-teal-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}>
                  {tx.icon === 'food' && '🍔'}
                  {tx.icon === 'print' && '📄'}
                  {tx.icon === 'transit' && '🚇'}
                  {tx.icon === 'book' && '📚'}
                  {tx.icon === 'split' && '💵'}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{tx.title}</h5>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {tx.time} • <span className="font-semibold text-slate-600">{tx.tag}</span>
                  </p>
                </div>
              </div>

              <span className={`text-xs font-black ${tx.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                {tx.amount > 0 ? `+₹${tx.amount}` : `-₹${Math.abs(tx.amount)}`}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddExpense} className="bg-white rounded-3xl p-5 max-w-sm w-full shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-slate-900">Record Expense</h4>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Amount (₹)</label>
              <input
                type="number"
                placeholder="e.g. 90"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold"
                autoFocus
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Item / Description</label>
              <input
                type="text"
                placeholder="e.g. South Indian Thali"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                <option value="Food & Canteen">Food &amp; Canteen</option>
                <option value="Metro / Commute">Metro / Commute</option>
                <option value="Print & Xerox">Print &amp; Xerox</option>
                <option value="Books & Stationery">Books &amp; Stationery</option>
              </select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
