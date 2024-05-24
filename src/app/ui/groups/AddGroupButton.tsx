'use client';
import { useState } from 'react';

import Image from 'next/image';
import addGroupIcon from '../../../../public/icons/addGroup.svg';

export default function AddGroupButton({ data, setData }: { data: any; setData: any }) {
  const [fakeId, setFakeId] = useState(1);

  const handleAddGroup = async () => {
    let fakeGroupId = fakeId;
    setFakeId(fakeGroupId + 1);
    const newGroup = {
      groupId: `try${fakeGroupId}`,
      groupType: 'travel',
      name: `trytrytry ${fakeGroupId}`,
      membersIds: ['u1', 'u2', 'u3', 'u4'],
      url: `https://shareGrouptry${fakeGroupId}`,
    };

    setData([...data, newGroup]);
    data.push(newGroup);
    console.log(data);
  };

  return (
 <div onClick={handleAddGroup} className="fixed bottom-0 left-[50%] z-[2] flex h-24 w-full translate-x-[-50%] items-center justify-center bg-primary-100">
       <button className="flex w-[92%] items-center justify-center rounded-[10px] bg-primary-200 p-[13px] active:bg-grey-200">
         <Image src={addGroupIcon} alt="add group icon" />
         <span className="pl-2">新增群組</span>
       </button>
     </div>
  );
}
