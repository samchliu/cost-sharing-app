'use client';
//import from next & react
import { Suspense } from 'react';
//import data
import { useAllContext, useUser } from '@/app/_components/frontendData/fetchData/Providers';
import { LoginUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';
//import ui loading fallback
import { GroupsSkeleton } from '@/app/ui/loading/LoadingSkeletons';

export default function Page() {
  const { loginUserId } = useAllContext();
  let userData: LoginUser = { id: '', name: '', picture: '', lineId: '', groups: [] };

  userData = useUser(loginUserId || '');

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <Suspense fallback={<GroupsSkeleton />}>
        <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
          群組列表
        </h1>
        <AddGroupButton />
        <div className="mt-[6.5rem]">
          {userData?.groups.map((group) => <GroupButton key={group.id} groupData={group} />)}
        </div>
        <div className="mb-16"></div>
      </Suspense>
    </div>
  );
}
