'use client';
//import ui
import { PlusIcon } from '@heroicons/react/24/outline';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';

export default function AddExpenseButton({ groupId }: { groupId: string }) {
  return (
    <>
      <LoadingButton
        url={`/new/group/${groupId}/expense`}
        className="fixed bottom-[45px] left-[50%] flex h-14 w-14 translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-highlight-20 active:bg-highlight-60"
      >
        <PlusIcon className="h-7 w-7 stroke-[2px]" />
      </LoadingButton>
    </>
  );
}
