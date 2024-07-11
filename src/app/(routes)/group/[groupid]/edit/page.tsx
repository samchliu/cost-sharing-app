'use client';
//import from next & react
import { useParams } from 'next/navigation';
//import data
import { useUser, useGroup } from '@/app/_components/frontendData/fetchData/Providers';
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
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
  const user = useUser(loginUserId);
  const group = useGroup(params.groupid);

  let groupNameAndImage = null;
  if (!user) return;
  for (let group of user.groups) {
    if (group.id === params.groupid) {
      groupNameAndImage = group;
    }
  }

  return (
    <form method="post" action={`/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopGroupSettingBar groupData={group} />
        <GroupNameSetting groupData={groupNameAndImage} />
        <GroupUsersSetting groupData={group} />
        <GroupOtherSetting groupData={group} />
        <GroupSave groupData={group} />
      </div>
    </form>
  );
}