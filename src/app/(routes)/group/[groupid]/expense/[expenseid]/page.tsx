'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { useGroup, useExpense } from '@/app/_components/frontendData/fetchData/Providers';
//import ui
import { TopExpenseBar } from '@/app/ui/shareComponents/TopBars';
import {
  ExpenseDetailOne,
  ExpenseDetailTwo,
  ExpenseDetailThree,
} from '@/app/ui/group/expense/ExpenseDetails';
import DeleteExpenseButton from '@/app/ui/group/expense/DeleteExpenseButton';
import { ExpenseSkeleton } from '@/app/ui/loading/LoadingSkeletons';

export default function Page() {
  const params = useParams<{ groupid: string; expenseid: string }>();
  const group = useGroup(params.groupid);
  const expense: any = useExpense(params.groupid, params.expenseid);
  if (!group) return;
  const users: any = group.users;

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