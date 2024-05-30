'use client';
import { useParams } from 'next/navigation';
import { groups, expenses } from '@/app/_components/frontendData/dummyData';
import { TopGroupBar } from '@/app/ui/shareComponents/TopBars';
import UsersBar from '@/app/ui/group/UsersBar';
import ExpensesList from '@/app/ui/group/ExpensesList';
import BalanceAndShareButtons from '@/app/ui/group/BalanceAndShareButtons';
import AddExpenseButton from '@/app/ui/group/AddExpenseButton';
import { useState } from 'react';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const groupData = groups.filter((group) => group.groupId === params.groupid)[0];

  const [data, setData] = useState(expenses);

  return (
    <div className="flex flex-col">
      <TopGroupBar groupData={groupData} />
      <UsersBar groupData={groupData} />
      <BalanceAndShareButtons groupData={groupData} />
      <ExpensesList groupId={params.groupid} expensesData={data} />
      <AddExpenseButton
        groupData={groupData}
        groupId={params.groupid}
        data={data}
        setData={setData}
      />
    </div>
  );
}
