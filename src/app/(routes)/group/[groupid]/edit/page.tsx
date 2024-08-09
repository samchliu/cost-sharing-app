'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/_components/frontendData/fetchData/Providers';
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
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
  const { groupid } = useParams<{ groupid: string }>();
  const group = useGroup(groupid);
  const [currentGroup, setCurrentGroup] = useState<ExtendedGroup>(group);

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
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
            />
            <GroupUsersSetting
              groupData={currentGroup}
              setCurrentGroup={setCurrentGroup}
              isAddPage={false}
              loginUserData={{
                id: '',
                name: '',
                picture: '',
                adoptable: false,
              }}
            />
            <GroupOtherSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
          </>
        )}
      </div>
    </form>
  );
}