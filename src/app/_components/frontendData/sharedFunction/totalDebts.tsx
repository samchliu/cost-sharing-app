import {
  Expense,
  Debts,
  TotalDebts,
  ExtendedExpense,
} from '@/app/_components/frontendData/sharedFunction/types';

interface SplitExpenseResult {
  debts: Debts;
  totalDebts: TotalDebts;
  expensesWithDebts: ExtendedExpense[];
}

function filterExpense(expenses: ExtendedExpense[], loginUserId: string): SplitExpenseResult {
  if (!expenses) {
    return {
      debts: {},
      totalDebts: {},
      expensesWithDebts: [],
    };
  }

  const newExpenses: ExtendedExpense[] = expenses.map((expense) => ({
    ...expense,
  }));

  const debts: Debts = newExpenses.reduce((acc: Debts, expense: Expense) => {
    if (!acc[expense.payerId]) {
      acc[expense.payerId] = { totalDebt: 0 };
    }
    acc[expense.payerId][expense.name] = expense.amount;

    expense.sharers.forEach((sharer) => {
      if (sharer.id === expense.payerId) {
        acc[sharer.id][expense.name] -= Number(sharer.amount);
      } else if (acc[sharer.id]) {
        acc[sharer.id][expense.name] = -Number(sharer.amount);
      } else {
        acc[sharer.id] = {
          [expense.name]: -Number(sharer.amount),
          totalDebt: 0,
        };
      }
    });

    return acc;
  }, {} as Debts);

  Object.keys(debts).forEach((member) => {
    debts[member]['totalDebt'] = Object.values(debts[member]).reduce(
      (acc, debt) => acc + (debt ?? 0),
      0
    );
  });

  const totalDebts: TotalDebts = Object.keys(debts).reduce((acc, userId) => {
    acc[userId] = debts[userId].totalDebt;
    return acc;
  }, {} as TotalDebts);

  const expensesWithDebts: ExtendedExpense[] = newExpenses.map((expense) => {
    const newExpense = { ...expense };
    const userDebts = debts[loginUserId || ''];
    newExpense.expenseDebt = userDebts?.[expense.name]?.toFixed(2) || '0.00';
    return newExpense;
  });

  return {
    debts,
    totalDebts,
    expensesWithDebts,
  };
}

export { filterExpense };