'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { useGroup } from '@/app/_components/frontendData/Providers';
//import ui
import { TopGroupBar } from '@/app/ui/shareComponents/TopBars';
import UsersBar from '@/app/ui/group/UsersBar';
import BalanceAndShareButtons from '@/app/ui/group/BalanceAndShareButtons';
import ExpensesList from '@/app/ui/group/ExpensesList';
import AddExpenseButton from '@/app/ui/group/AddExpenseButton';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/ui/loading/LoadingSkeletons';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} />
        <ExpensesList groupId={params.groupid} />
        <AddExpenseButton groupData={group} />
      </Suspense>
    </div>
  );
}
