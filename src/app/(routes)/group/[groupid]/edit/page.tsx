'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import {
  useGroup,
  useAllContext,
  useUser,
} from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopGroupSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupUsersSetting,
} from '@/app/ui/group/editAndAdd/GroupSettingDetails';
import { BackArrowIcon } from '@/app/ui/shareComponents/Icons';

export default function Page() {
  const { loginUserId } = useAllContext();
  const { groupid } = useParams<{ groupid: string }>();
  const loginUserData = useUser(loginUserId || '');
  const group = useGroup(groupid);
  const [currentGroup, setCurrentGroup] = useState<ExtendedGroup>(group);
  const [groupNameExist, setGroupNameExist] = useState(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  const hasGroupData = Boolean(currentGroup);
  const isUserInGroup = hasGroupData && currentGroup.users?.some((user) => user.id === loginUserId);

  return (
    <form method="post" action={`/group/${groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          isAddPage={false}
          groupData={currentGroup}
          middleHintword="群組設定"
          leftHintWord={<BackArrowIcon />}
          rightHintWord=""
          leftCancelLink={`/group/${groupid}`}
          rightCancelLink=""
        />
        {isUserInGroup && (
          <>
            <GroupNameSetting
              loginUserData={loginUserData}
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              nameExist={groupNameExist}
              setNameExist={setGroupNameExist}
              hasNameLength={hasNameLength}
              setHasNameLength={setHasNameLength}
            />
            <GroupUsersSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              loginUserData={null}
            />
            <GroupOtherSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
          </>
        )}
      </div>
    </form>
  );
}
