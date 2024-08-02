'use client';
//import from next
import Link from 'next/link';
//import ui
import { AddGroupIcon } from '@/app/ui/shareComponents/Icons';

export default function AddGroupButton() {
  return (
    <div className="fixed top-14 z-[2] flex w-full items-start bg-highlight-50 px-6 pb-4 pt-6 text-base text-white">
      <Link
        href={`/new/group`}
        scroll={false}
        className="flex items-center justify-center rounded-[10px] px-2 active:bg-white"
      >
        <AddGroupIcon />
        <span className="pl-2">新增群組</span>
      </Link>
    </div>
  );
}
