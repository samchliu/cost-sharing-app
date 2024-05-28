import { expenses } from '@/app/_components/frontendData/dummyData';
import { loginUserId } from '@/app/_components/frontendData/user';

//every one's debt save in to new object
const debts = expenses.reduce(calculateDebt, {});
function calculateDebt(acc: any, spend: any) {
  if (!(spend.payerId in acc)) {
    acc[spend.payerId] = {};
  }
  acc[spend.payerId][spend.event] = spend.cost;

  const shareCost = spend.cost / spend.sharersIds.length;
  spend.sharersIds.forEach((sharerId: any) => {
    if (sharerId === spend.payerId) {
      acc[sharerId][spend.event] -= shareCost;
    } else if (sharerId in acc) {
      acc[sharerId][spend.event] = -shareCost;
    } else {
      acc[sharerId] = {};
      acc[sharerId][spend.event] = -shareCost;
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

let userDebts: any = debts[loginUserId];
let expensesWithDebts: any = expenses.map((expense) => {
  let newExpense = { ...expense };
  return newExpense;
});

for (let expense in expensesWithDebts) {
  if (!userDebts) break;

  expensesWithDebts[expense].expenseDebt = userDebts[expensesWithDebts[expense].event]?.toFixed(2);
}

export { debts, totalDebts, expensesWithDebts };
