'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useGroup } from '@/app/_components/frontendData/fetchData/Providers';
//import ui
import { TopGroupSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupNameSetting,
  GroupOtherSetting,
  GroupSave,
  GroupUsersSetting,
} from '@/app/ui/group/edit/GroupSettingDetails';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const group = useGroup(params.groupid);
  const [currentGroup, setCurrentGroup] = useState(group);
  return (
    <form method="post" action={`/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar groupData={group} />
        <GroupNameSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
        <GroupUsersSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
        <GroupOtherSetting groupData={currentGroup} setCurrentGroup={setCurrentGroup} />
        <GroupSave groupData={currentGroup} />
      </div>
    </form>
  );
}
