'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { useAllContext, useGroup } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopGroupBar } from '@/app/ui/shareComponents/TopBars';
import UsersBar from '@/app/ui/group/UsersBar';
import BalanceAndShareButtons from '@/app/ui/group/BalanceAndShareButtons';
import ExpensesList from '@/app/ui/group/ExpensesList';
import AddExpenseButton from '@/app/ui/group/AddExpenseButton';
import JoinGroupModal from '@/app/ui/group/JoinGroupModal';
import PageLoadAlertModal from '@/app/ui/group/PageLoadAlertModal';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/ui/loading/LoadingSkeletons';
import { FadeIn } from '@/app/ui/shareComponents/FadeIn';

export default function Page() {
  const { loginUserId } = useAllContext();
  const { groupid } = useParams<{ groupid: string }>();
  const group: ExtendedGroup = useGroup(groupid);
  const [currentGroup, setCurrentGroup] = useState<ExtendedGroup>(group);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  const isGroupFull = group?.users?.every((user) => !user.adoptable);
  const isUserInGroup = group?.users?.some((user) => user.id === loginUserId);
  const isUserAdoptable = group?.users?.some((user) => user.adoptable === true);

  return (
    <div className="flex max-w-[800px] flex-col mx-auto">
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar isBalancePage={false} groupData={group} />
        {isUserInGroup && (
          <FadeIn direction="top">
            <UsersBar groupData={group} />
            <BalanceAndShareButtons groupData={group} />
            <ExpensesList groupData={group} />
            <AddExpenseButton groupId={groupid} />
          </FadeIn>
        )}
        {isUserAdoptable && !isUserInGroup && (
          <JoinGroupModal groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
        )}
        {isGroupFull && !isUserInGroup && (
          <PageLoadAlertModal
            url={`/groups`}
            hintWord="目前群組中無成員空位，請聯絡群組成員新增空位"
            buttonHintWord="確定"
          />
        )}
        <div className="mb-32"></div>
      </Suspense>
    </div>
  );
}
