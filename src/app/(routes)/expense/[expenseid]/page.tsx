'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/user';
import { useExpenses } from '@/app/_components/frontendData/Providers';
//import ui
import { TopExpenseBar } from '@/app/ui/shareComponents/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/ui/expense/ExpenseDetails';
import DeleteExpenseButton from '@/app/ui/expense/DeleteExpenseButton';
import { ExpenseSkeleton } from '@/app/ui/loading/LoadingSkeletons';

export default function Page() {
  const params = useParams<{ expenseid: string }>();

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;
  if (!groupWithExpense) return;
  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<ExpenseSkeleton />}>
        <TopExpenseBar expenseData={expense} group={group} />
        {expense &&
        (expense.sharers?.some((sharer: any) => sharer.id === loginUserId) ||
          expense.payerId?.includes(loginUserId)) ? (
          <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
            <ExpenseDetailOne expenseData={expense} users={users} />
            <ExpenseDetailTwo expenseData={expense} users={users} />
            <ExpenseDetailThree expenseData={expense} />
            <DeleteExpenseButton expenseData={expense} />
          </div>
        ) : (
          <div className="mt-16 pt-6"></div>
        )}
      </Suspense>
    </div>
  );
}
