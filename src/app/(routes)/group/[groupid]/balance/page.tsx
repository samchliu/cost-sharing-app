'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
//import data
import { useAllContext, useGroup } from '@/app/_components/frontendData/fetchData/Providers';
import { splitExpense } from '@/app/_components/frontendData/sharedFunction/splitDebt';
import { Debt, ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopGroupBar } from '@/app/ui/shareComponents/TopBars';
import { BalanceAmount } from '@/app/ui/group/balance/BalanceAmount';
import { BalanceDetails } from '@/app/ui/group/balance/BalanceDetails';
//import ui loading fallback
import { UsersBarSkeleton } from '@/app/ui/loading/LoadingSkeletons';
import { FadeIn } from '@/app/ui/shareComponents/FadeIn';
//import other
import clsx from 'clsx';

export default function Page() {
  const { loginUserId } = useAllContext();
  const params = useParams<{ groupid: string }>();
  const group: ExtendedGroup = useGroup(params.groupid);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [ownerDebt, setOwnerDebt] = useState<Debt>({ initial: 0 });
  const groupUsers = group?.users
    ? group?.users
    : [{ id: '', name: '', picture: '', adoptable: false }];

  useEffect(() => {
    if (group?.expenses && group?.expenses.length > 0) {
      const splitExpenses = splitExpense(group.expenses, loginUserId);
      const debtAmounts = Object.values(splitExpenses[loginUserId || ''] || {});
      const TotalDebtsAmount = debtAmounts.reduce((sum, value) => sum + value, 0);

      setOwnerDebt(splitExpenses[loginUserId || ''] || {});
      setTotalAmount(TotalDebtsAmount);
    }
  }, [group]);

  return (
    <div
      className={clsx('flex flex-col', {
        'items-center': totalAmount === 0,
      })}
    >
      <Suspense fallback={<UsersBarSkeleton />}>
        <TopGroupBar groupData={group} isBalancePage={true} />
        <FadeIn direction="top">
          <BalanceAmount totalAmount={totalAmount} />
          {totalAmount !== 0 ? (
            <BalanceDetails
              groupUsers={groupUsers}
              ownerDebt={ownerDebt}
              totalAmount={totalAmount}
            />
          ) : (
            <div className="mt-9">-尚未有費用紀錄-</div>
          )}
        </FadeIn>
      </Suspense>
    </div>
  );
}
