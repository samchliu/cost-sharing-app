'use client';
//import data
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AddExpenseButton({ groupData }: { groupData: any }) {
  const handleAddExpense = () => {
    console.log('expense added');
  };

  return (
    <>
      {groupData && groupData.membersIds.includes(loginUserId) ? (
        <div
          onClick={handleAddExpense}
          className="fixed bottom-[45px] left-[50%] flex h-14 w-14 translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-primary-green"
        >
          <PlusIcon className="h-7 w-7 stroke-[2px]" />
        </div>
      ) : null}
    </>
  );
}