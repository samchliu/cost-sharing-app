//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { HomeIcon, Cog8ToothIcon, PencilSquareIcon } from '@heroicons/react/24/outline';

export function TopGroupBar({ groupData, groupName }: { groupData: any; groupName: string }) {
  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-primary-blue px-5 py-4 text-grey-100">
      <Link href="/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId)
          ? groupName
          : 'no such Page'}
      </h1>
      <div className="h-6 w-6">
        {groupData && groupData.users.some((user: any) => user.id === loginUserId) ? (
          <Cog8ToothIcon />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export function TopExpenseBar({ expenseData }: { expenseData: any }) {
  return (
    <div className="fixed z-10 flex w-full items-center justify-between bg-primary-blue px-5 py-4 text-grey-100">
      <Link href="/groups" className="h-6 w-6">
        <HomeIcon />
      </Link>
      <h1 className="text-lg">
        {expenseData &&
        (expenseData.payerId === loginUserId ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId))
          ? '費用明細'
          : 'no such expense'}
      </h1>
      <div className="h-6 w-6">
        {expenseData &&
        (expenseData.payerId === loginUserId ||
          expenseData.sharers?.some((sharer: any) => sharer.id === loginUserId)) ? (
          <PencilSquareIcon />
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
