'use client';
//import from next & react
import { useState, useRef } from 'react';
//import data
import { useAllContext, useUser } from '@/app/_components/frontendData/fetchData/Providers';
import { Group } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopGroupSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupNameSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/ui/group/editAndAdd/GroupSettingDetails';

export default function Page() {
  const { loginUserId } = useAllContext();
  const data = useUser(loginUserId || '');
  const [currentGroup, setCurrentGroup] = useState<Group>({
    name: '未命名群組',
    picture: '/images/icons/groupIcon01.svg',
    users: [],
  });
  const formRef = useRef<HTMLFormElement>(null);
  const [nameExist, setNameExist] = useState(false);

  return (
    <form ref={formRef} method="post" action={`/groups`}>
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
          loginUserData={data}
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={true}
          nameExist={nameExist}
          setNameExist={setNameExist}
        />
        <GroupUsersSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={true}
          loginUserData={data}
        />
        <GroupSave groupData={currentGroup} formRef={formRef} nameExist={nameExist} />
      </div>
    </form>
  );
}