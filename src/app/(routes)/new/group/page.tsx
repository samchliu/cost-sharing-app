'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useUser } from '@/app/_components/frontendData/fetchData/Providers';
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { Group } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopGroupSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupNameSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/ui/group/editAndAdd/GroupSettingDetails';

export default function Page() {
  const data = useUser(loginUserId);
  const [currentGroup, setCurrentGroup] = useState<Group>({
    name: '未命名群組',
    picture: 'groupIcon01',
    users: [],
  });

  return (
    <form method="post" action={`/groups`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          isAddPage={true}
          groupData={currentGroup}
          middleHintword="建立群組"
          leftHintWord=""
          rightHintWord="取消"
          leftCancelLink=""
          rightCancelLink={`/groups`}
        />
        <GroupNameSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={true}
        />
        <GroupUsersSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={true}
          loginUserData={data}
        />
        <GroupSave groupData={currentGroup} />
      </div>
    </form>
  );
}