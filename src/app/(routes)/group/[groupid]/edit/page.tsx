'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup } from '@/app/_components/frontendData/fetchData/Providers';
//import ui
import { TopGroupSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/ui/group/editAndAdd/GroupSettingDetails';
import { BackArrowIcon } from '@/app/ui/shareComponents/Icons';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);
  const [currentGroup, setCurrentGroup] = useState(group);

  useEffect(() => {
    if (group) {
      setCurrentGroup(group);
    }
  }, [group]);

  return (
    <form method="post" action={`/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar
          groupData={currentGroup}
          isAddPage={false}
          middleHintword="群組設定"
          leftHintWord={<BackArrowIcon />}
          rightHintWord=""
          leftCancelLink={`/group/${params.groupid}`}
          rightCancelLink=""
        />
        <GroupNameSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={false}
        />
        <GroupUsersSetting
          groupData={currentGroup}
          setCurrentGroup={setCurrentGroup}
          isAddPage={false}
          loginUserData={''}
        />
        <GroupOtherSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
        {/* <GroupSave groupData={currentGroup} /> */}
      </div>
    </form>
  );
}