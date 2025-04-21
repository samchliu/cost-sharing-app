'use client';
//import from next & react
import { useParams } from 'next/navigation';
//import data
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
import { TopBarSkeleton } from '@/app/ui/loading/LoadingSkeletons';
import { FadeIn } from '@/app/ui/shareComponents/FadeIn';

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
    <>
      {group && expense ? (
        <div className="flex flex-col items-center max-w-[800px] mx-auto">
          <TopExpenseBar groupData={group} expenseData={expense} />
          <FadeIn direction="top">
            <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
              <ExpenseDetailOne expenseData={expense} />
              <ExpenseDetailTwo expenseData={expense} users={users} />
              <ExpenseDetailThree expenseData={expense} />
              <DeleteExpenseButton expenseData={expense} />
            </div>
          </FadeIn>
        </div>
      ) : (
        <TopBarSkeleton />
      )}
    </>
  );
}
