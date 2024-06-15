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
  let groupId = groupData.id;
  let expenses = expensesWithDebts;

  return (
    <>
      <div>
        {expenses.map((expense: any) => (
          <Fragment key={expense.id}>
            {expense.sharers.some((sharer: any) => sharer.id === loginUserId) ||
            expense.payerId.includes(loginUserId) ? (
              <ExpenseButton users={users} expense={expense} groupId={groupId} />
            ) : null}
          </Fragment>
        ))}
      </div>
    </>
  );
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
      href={`/expense/${id}`}
      className="m-4 flex justify-between rounded-lg bg-white p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-orange">
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
          <p className="text-primary-pink">-${nf.format(Math.abs(expenseDebt))}</p>
        ) : (
          <p className="text-primary-blue">+${nf.format(expenseDebt)}</p>
        )}
        <ChevronRightIcon className="h-3 w-3" />
      </div>
    </Link>
  );
}