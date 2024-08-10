import { filterExpense } from '@/app/_components/frontendData/sharedFunction/totalDebts';
import { ExtendedExpense } from '@/app/_components/frontendData/sharedFunction/types';

interface SplitExpenseResult {
  [userId: string]: {
    [expenseId: string]: number;
  };
}

function splitExpense(expenses: ExtendedExpense[]): SplitExpenseResult {
  let { totalDebts } = filterExpense(expenses);
  const splitDebt: SplitExpenseResult = {};

  // Helper function to find the user with maximum positive debt and maximum negative debt
  const getMaxDebtorCreditor = (debts: { [userId: string]: number }) => {
    const creditors = Object.keys(debts).filter((userId) => debts[userId] > 0);
    const debtors = Object.keys(debts).filter((userId) => debts[userId] < 0);

    if (creditors.length === 0 || debtors.length === 0) {
      return { creditor: null, debtor: null };
    }

    const creditor = creditors.reduce(
      (maxUserId, userId) => (debts[userId] > debts[maxUserId] ? userId : maxUserId),
      creditors[0]
    );
    const debtor = debtors.reduce(
      (minUserId, userId) => (debts[userId] < debts[minUserId] ? userId : minUserId),
      debtors[0]
    );

    return { creditor, debtor };
  };

  // Process until all debts are settled
  while (Object.values(totalDebts).some((amount) => Math.abs(amount) > 0.01)) {
    const { creditor, debtor } = getMaxDebtorCreditor(totalDebts);

    if (!creditor || !debtor) {
      break; // Exit loop if there's no valid creditor or debtor
    }

    // Compute the amount to settle
    const debtAmount = Math.min(totalDebts[creditor], -totalDebts[debtor]);

    // Initialize splitDebt for creditor and debtor if not already done
    if (!splitDebt[creditor]) splitDebt[creditor] = {};
    if (!splitDebt[debtor]) splitDebt[debtor] = {};

    // Record the debt
    splitDebt[creditor][debtor] = (splitDebt[creditor][debtor] || 0) + debtAmount;
    splitDebt[debtor][creditor] = (splitDebt[debtor][creditor] || 0) - debtAmount;

    // Update the total debts
    totalDebts[creditor] -= debtAmount;
    totalDebts[debtor] += debtAmount;
  }

  // Remove entries with undefined keys
  Object.keys(splitDebt).forEach((key) => {
    if (!splitDebt[key] || Object.keys(splitDebt[key]).length === 0) {
      delete splitDebt[key];
    }
  });

  return splitDebt;
}

export { splitExpense };