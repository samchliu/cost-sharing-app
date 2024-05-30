import { HomeIcon, Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { loginUserId } from '@/app/_components/frontendData/user';

export function TopGroupBar({ groupData }: { groupData: any }) {
  return (
    <div className="fixed flex w-full items-center justify-between bg-primary-blue px-5 py-4 text-grey-100">
      <Link href="/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {groupData && groupData.membersIds.includes(loginUserId) ? groupData.name : 'no such Page'}
      </h1>
      <div className="h-6 w-6">
        {groupData && groupData.membersIds.includes(loginUserId) ? <Cog8ToothIcon /> : ''}
      </div>
    </div>
  );
}

export function TopExpenseBar({ expenseData }: { expenseData: any }) {
  return (
    <div className="fixed flex w-full items-center justify-between bg-primary-blue px-5 py-4 text-grey-100">
      <Link href="/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {expenseData &&
        (expenseData.payerId === loginUserId || expenseData.sharersIds.includes(loginUserId))
          ? '費用明細'
          : 'no such expense'}
      </h1>
      <div className="h-6 w-6">
        {expenseData &&
        (expenseData.payerId === loginUserId || expenseData.sharersIds.includes(loginUserId)) ? (
          <PencilSquareIcon />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}