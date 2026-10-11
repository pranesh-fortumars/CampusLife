/**
 * Finance & Rupee Expense Splitting Calculations
 */

export interface SplitResult {
  userId: string;
  userName: string;
  amountOwed: number;
}

export function splitExpenseEqually(
  totalAmount: number,
  participants: { userId: string; userName: string }[]
): SplitResult[] {
  if (participants.length === 0) return [];
  const share = Math.round((totalAmount / participants.length) * 100) / 100;
  return participants.map(p => ({
    userId: p.userId,
    userName: p.userName,
    amountOwed: share
  }));
}

export function calculateBudgetStatus(
  monthlyBudget: number,
  totalSpent: number
): {
  remaining: number;
  percentageUsed: number;
  isOverBudget: boolean;
  statusColor: string;
} {
  const remaining = monthlyBudget - totalSpent;
  const percentageUsed = monthlyBudget > 0 ? Math.round((totalSpent / monthlyBudget) * 100) : 100;
  return {
    remaining: Math.max(0, remaining),
    percentageUsed,
    isOverBudget: remaining < 0,
    statusColor: remaining < 0 ? 'text-red-600' : percentageUsed > 80 ? 'text-amber-600' : 'text-emerald-600'
  };
}
