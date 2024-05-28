'use client';
import { useState } from 'react';
import { AddGroupIcon } from '@/app/ui/shareComponents/Icons';

export default function AddGroupButton({ data, setData }: { data: any; setData: any }) {
  const [fakeId, setFakeId] = useState(1);

  const handleAddGroup = async () => {
    let fakeGroupId = fakeId;
    setFakeId(fakeGroupId + 1);
    const newGroup = {
      groupId: `try${fakeGroupId}`,
      groupType: 'travel',
      name: `trytrytry ${fakeGroupId}`,
      membersIds: [],
      url: `https://shareGrouptry${fakeGroupId}`,
    };

    setData([...data, newGroup]);
    data.push(newGroup);
    console.log(data);
  };

  return (
    <div
      onClick={handleAddGroup}
      className="bg-primary-blue fixed top-16 z-[2] flex w-full items-start px-6 pb-3 pt-2 text-base text-grey-100"
    >
      <button className="flex items-center justify-center rounded-[10px] px-2 active:bg-grey-100">
        <AddGroupIcon />
        <span className="pl-2">新增群組</span>
      </button>
    </div>
  );
}
