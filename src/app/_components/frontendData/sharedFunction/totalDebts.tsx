import { loginUserId } from '@/app/_components/frontendData/fetchData/user';

interface Sharer {
  id: string;
  amount: string | number;
}

interface Expense {
  id: string;
  name: string;
  amount: string | number;
  date: string;
  category: string;
  payerId: string;
  sharers: Sharer[];
  note: string;
}

interface Debts {
  [userId: string]: {
    [expenseName: string]: number;
  };
}

interface TotalDebts {
  [userId: string]: number; // Total debt amount for each user
}

interface SplitExpenseResult {
  debts: Debts;
  totalDebts: TotalDebts;
  expensesWithDebts: Expense[];
}

function filterExpense(expenses: Expense[]): SplitExpenseResult {
  let newExpenses = expenses.map((expense: any) => ({ ...expense }));

  //every one's debt save in to new object
  const debts = newExpenses.reduce(calculateDebt, {});
  function calculateDebt(acc: any, expense: any) {
    if (!(expense.payerId in acc)) {
      acc[expense.payerId] = {};
    }
    acc[expense.payerId][expense.name] = expense.amount;

    expense.sharers.forEach((sharer: any) => {
      if (sharer.id === expense.payerId) {
        acc[sharer.id][expense.name] -= sharer.amount;
      } else if (sharer.id in acc) {
        acc[sharer.id][expense.name] = -sharer.amount;
      } else {
        acc[sharer.id] = {};
        acc[sharer.id][expense.name] = -sharer.amount;
      }
    });
    return acc;
  }

  //added totalDebt to every one's debt object
  for (let member in debts) {
    debts[member]['totalDebt'] = Object.entries(debts[member]).reduce(calculateTotalDebt, 0);
  }

  function calculateTotalDebt(acc: any, debt: any) {
    if (debt[0] !== 'totalDebt') {
      return acc + debt[1];
    } else {
      return acc;
    }
  }

  //clear detail data, only save total debt to new object
  let totalDebts = Object.entries(debts).reduce((acc: any, debt: any) => {
    acc[debt[0]] = debt[1].totalDebt;
    return acc;
  }, {});

  //map expenses with added debts
  let userDebts: any = debts[loginUserId];
  let expensesWithDebts: any = newExpenses.map((expense: any) => {
    let newExpense = { ...expense };
    return newExpense;
  });

  for (let expense in expensesWithDebts) {
    if (!userDebts) break;

    expensesWithDebts[expense].expenseDebt = userDebts[expensesWithDebts[expense].name]?.toFixed(2);
  }

  return { debts, totalDebts, expensesWithDebts };
}

export { filterExpense };