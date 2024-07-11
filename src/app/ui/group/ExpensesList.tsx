//import from next & react
import Link from 'next/link';
import { Fragment } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { filterExpense } from '@/app/_components/frontendData/sharedFunction/totalDebts';
//import ui
import { GreaterThanIcon, expenseIconMap } from '@/app/ui/shareComponents/Icons';
//import other
import { format } from 'date-fns';

export default function ExpensesList({ groupData }: { groupData: any }) {
  let { expensesWithDebts } = filterExpense(groupData.expenses);
  let groupId = groupData.id;
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
    return Object.keys(groupedExpenses).map((date, index) => {
      let formateDate: any = new Date(date);
      formateDate = format(
        formateDate,
        (formateDate.getFullYear() === new Date().getFullYear() ? '' : 'yyyy年') + 'MM月dd日'
      );

      return (
        <div key={index}>
          {groupedExpenses[date].find((expense: any) => expense.expenseDebt !== undefined) ? (
            <p className="mx-8 mb-3 text-sm text-grey-500">{formateDate}</p>
          ) : null}
          {groupedExpenses[date].map((expense: any) => (
            <Fragment key={expense.id}>
              {expense.sharers.some((sharer: any) => sharer.id === loginUserId) ||
              expense.payerId.includes(loginUserId) ? (
                <ExpenseButton users={users} expense={expense} groupId={groupId} />
              ) : null}
            </Fragment>
          ))}
        </div>
      );
    });
  };

  return <>{renderExpensesByDate()}</>;
}

function ExpenseButton({ users, expense, groupId }: { users: any; expense: any; groupId: any }) {
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
      href={`/group/${groupId}/expense/${id}`}
      className="mx-4 mb-4 flex justify-between rounded-lg bg-white py-3 pl-4 pr-3"
      scroll={false}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight-60">
          {Icon ? <Icon strokeWidth={1} /> : null}
        </div>
        <div className="leading-[20px]">
          <p className="font-normal">{name}</p>
          <p className="font-base text-sm text-grey-500">
            <span>{loginUserId === payerId ? '你' : payerData?.name}</span>
            付了
            <span>${nf.format(Number(amount))}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {expenseDebt.includes('-') ? (
          <p className="text-[15px] text-highlight-30">-${nf.format(Math.abs(expenseDebt))}</p>
        ) : (
          <p className="text-[15px] text-highlight-50">+${nf.format(expenseDebt)}</p>
        )}
        <GreaterThanIcon />
      </div>
    </Link>
  );
}