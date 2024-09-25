'use client';
//import ui
import { AddGroupIcon } from '@/app/ui/shareComponents/Icons';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';

export default function AddGroupButton() {
  return (
    <div className="fixed top-14 z-[2] flex w-full items-start bg-highlight-50 px-6 pb-4 pt-6 text-base text-white">
      <LoadingButton
        url={`/new/group`}
        className="flex items-center justify-center rounded-[10px] px-2 active:bg-white"
      >
        <AddGroupIcon />
        <span className="pl-2">新增群組</span>
      </LoadingButton>
    </div>
  );
}