'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { useGroup, useExpense } from '@/app/_components/frontendData/fetchData/Providers';
import {
  ExtendedExpense,
  ExtendedGroup,
  GroupUser,
} from '@/app/_components/frontendData/sharedFunction/types';
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
  const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(groupid, expenseid);
  const users: GroupUser[] = group?.users || [
    {
      id: '',
      name: '',
      picture: '',
      adoptable: false,
    },
  ];

  return (
    <div className="flex flex-col items-center">
      <Suspense fallback={<ExpenseSkeleton />}>
        <TopExpenseBar groupData={group} expenseData={expense} />
        {group &&
        expense &&
        (expense.sharers?.some((sharer) => sharer.id === loginUserId) ||
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