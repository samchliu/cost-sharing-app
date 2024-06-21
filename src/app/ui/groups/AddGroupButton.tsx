'use client';
//import ui
import { AddGroupIcon } from '@/app/ui/shareComponents/Icons';

export default function AddGroupButton() {
  const handleAddGroup = async () => {
    console.log('group added');
  };

  return (
    <div
      onClick={handleAddGroup}
      className="bg-highlight-50 fixed top-16 z-[2] flex w-full items-start px-6 pb-3 pt-2 text-base text-white"
    >
      <button className="flex items-center justify-center rounded-[10px] px-2 active:bg-white">
        <AddGroupIcon />
        <span className="pl-2">新增群組</span>
      </button>
    </div>
  );
}