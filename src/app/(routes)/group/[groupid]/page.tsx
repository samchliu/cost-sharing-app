'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense } from 'react';
//import data
import { useGroup, useUser } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';
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
  const user = useUser(loginUserId);
  const group = useGroup(params.groupid);

  let groupName = '';
  if (!user) return;
  if (!group) return;
  for (let group of user.groups) {
    if (group.id === params.groupid) {
      groupName = group.name;
    }
  }

  return (
    <div className="flex flex-col">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} groupName={groupName} />
        <UsersBar groupData={group} />
        <BalanceAndShareButtons groupData={group} groupName={groupName} />
        <ExpensesList groupData={group} />
        <AddExpenseButton />
      </Suspense>
    </div>
  );
}
