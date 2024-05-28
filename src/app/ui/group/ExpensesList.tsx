import { Fragment } from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { expensesWithDebts } from '@/app/_components/frontendData/totalDebts';
import { loginUserId, user } from '@/app/_components/frontendData/user';
import { expenseIconMap } from '@/app/ui/shareComponents/Icons';
import Link from 'next/link';

export default function ExpensesList({ groupId }: { groupId: any }) {
  let expenses = expensesWithDebts;

  return (
    <div>
      {expenses.map((expense: any) => (
        <Fragment key={expense.expenseId}>
          {expense.groupId === groupId &&
          (expense.sharersIds.includes(loginUserId) ||
            expense.payerId.includes(loginUserId)) ? (
            <ExpenseButton expense={expense} />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}

function ExpenseButton({ expense }: { expense: any }) {
  const {
    expenseId,
    expenseType,
    cost,
    event,
    payerId,
    expenseDebt,
  }: {
    expenseId: string;
    expenseType:
      | 'food'
      | 'drink'
      | 'transport'
      | 'stay'
      | 'shopping'
      | 'entertainment'
      | 'other';
    cost: string;
    event: string;
    payerId: string;
    expenseDebt: any;
  } = expense;
  const Icon = expenseIconMap[expenseType];

  return (
    <Link
      href={`/expense/${expenseId}`}
      className="m-4 flex justify-between rounded-lg bg-grey-100 p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-orange">
          {Icon ? <Icon /> : null}
        </div>
        <div className="leading-4">
          <p>{event}</p>
          <p className="text-sm text-grey-300">
            <span>{user(payerId)?.displayName}</span>
            &nbsp;paid&nbsp;
            <span>{cost}$</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <p>$ {expenseDebt}</p>
        <ChevronRightIcon className="h-3 w-3" />
      </div>
    </Link>
  );
}
