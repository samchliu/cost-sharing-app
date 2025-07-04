'use client';
//import from next & react
import { useState } from 'react';
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
import { FadeIn } from '@/app/ui/shareComponents/FadeIn';

export default function Page() {
  const { loginUserId } = useAllContext();
  const data = useUser(loginUserId || '');
  const [currentGroup, setCurrentGroup] = useState<Group>({
    name: '未命名群組',
    picture: '/images/icons/groupIcon01.svg',
    users: [],
  });
  const [nameExist, setNameExist] = useState(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  return (
    <>
      <div>
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
          <FadeIn direction="left">
            <div className="min-w-[320px] mx-auto max-w-[800px]">
              <GroupNameSetting
                loginUserData={data}
                groupData={currentGroup}
                setCurrentGroup={setCurrentGroup}
                isAddPage={true}
                nameExist={nameExist}
                setNameExist={setNameExist}
                hasNameLength={hasNameLength}
                setHasNameLength={setHasNameLength}
              />
              <GroupUsersSetting
                groupData={currentGroup}
                setCurrentGroup={setCurrentGroup}
                isAddPage={true}
                loginUserData={data}
              />
              <GroupSave
                groupData={currentGroup}
                nameExist={nameExist}
                hasNameLength={hasNameLength}
                url="/groups"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </>
  );
}
