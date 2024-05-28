'use client';
import { groups } from '@/app/_components/frontendData/dummyData';
import { useParams } from 'next/navigation';
import { TopGroupBar } from '@/app/ui/shareComponents/TopBars';
import UsersBar from '@/app/ui/group/UsersBar';
import ExpensesList from '@/app/ui/group/ExpensesList';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const groupData = groups.filter((group) => group.groupId === params.groupid)[0];

  return (
    <div className="flex flex-col">
      <TopGroupBar groupData={groupData} />
      <UsersBar groupData={groupData} />
      <ExpensesList groupId={params.groupid} />
    </div>
  );
}
