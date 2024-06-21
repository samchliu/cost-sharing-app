//import from next & react
import Link from 'next/link';
import { Fragment } from 'react';
//import data
import { filterExpense } from '@/app/_components/frontendData/totalDebts';
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { expenseIconMap } from '@/app/ui/shareComponents/Icons';

export default function ExpensesList({ groupData }: { groupData: any }) {
  let { expensesWithDebts } = filterExpense(groupData.expense);
  let users = groupData.users;
  let expenses = expensesWithDebts;

  // Step 1: Group expenses by date
  const groupedExpenses = expenses.reduce((acc: any, expense: any) => {
    const date = expense.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(expense);
    return acc;
  }, {});

  // Step 2: Render expenses grouped by date
  const renderExpensesByDate = () => {
    return Object.keys(groupedExpenses).map((date, index) => (
      <div key={index}>
        {groupedExpenses[date].find((expense: any) => expense.expenseDebt !== undefined) ? (
          <p className="mx-8 mb-3 text-sm text-grey-500">{date}</p>
        ) : null}
        {groupedExpenses[date].map((expense: any) => (
          <Fragment key={expense.id}>
            {expense.sharers.some((sharer: any) => sharer.id === loginUserId) ||
            expense.payerId.includes(loginUserId) ? (
              <ExpenseButton users={users} expense={expense} />
            ) : null}
          </Fragment>
        ))}
      </div>
    ));
  };

  return <>{renderExpensesByDate()}</>;
}

function ExpenseButton({ users, expense }: { users: any; expense: any }) {
  const {
    id,
    category,
    amount,
    name,
    payerId,
    expenseDebt,
  }: {
    id: string;
    category: 'food' | 'drink' | 'transport' | 'stay' | 'shopping' | 'entertainment' | 'other';
    amount: string;
    name: string;
    payerId: string;
    expenseDebt: any;
  } = expense;

  const payerData = users.filter((user: any) => user.id === payerId)[0];

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <Link
      href={`/expense/${id}`}
      className="mx-4 mb-4 flex justify-between rounded-lg bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <div className="bg-highlight-60 flex h-11 w-11 items-center justify-center rounded-full">
          {Icon ? <Icon /> : null}
        </div>
        <div className="leading-[20px]">
          <p className="font-semibold">{name}</p>
          <p className="font-base text-sm text-grey-500">
            <span>{loginUserId === payerId ? '你' : payerData?.name}</span>
            付了
            <span>${nf.format(Number(amount))}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {expenseDebt.includes('-') ? (
          <p className="text-highlight-30">-${nf.format(Math.abs(expenseDebt))}</p>
        ) : (
          <p className="text-highlight-50">+${nf.format(expenseDebt)}</p>
        )}
        <ChevronRightIcon className="h-3 w-3" />
      </div>
    </Link>
  );
}