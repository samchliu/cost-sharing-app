'use client';
//import next & react
import { useEffect, useContext } from 'react';
import { useLiff } from '@/app/_components/liff-provider';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { useUser, AllContext } from '@/app/_components/frontendData/fetchData/Providers';
//import ui
import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';

export default function Page() {
  const { personInfo, setPersonInfo } = useContext<any>(AllContext);

  const { liffObject } = useLiff();
  //  const [personInfo, setPersonInfo] = useState(lineInitialProfile);
  useEffect(() => {
    if (!liffObject) return;
    const userProfile = liffObject.getProfile();
    userProfile.then(
      (profile: {
        userId: string;
        displayName: string;
        statusMessage: string;
        pictureUrl: string;
      }) => {
        const data = profile;
        console.log(data);
        setPersonInfo(data);
      }
    );
  }, [liffObject]);

  // const data = useUser(personInfo.userId);
  const data = useUser(loginUserId);
  if (!data) return;

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <AddGroupButton />
      <div className="mt-[6.5rem]">
        {data
          ? data.groups.map((group: any) => <GroupButton key={group.id} groupData={group} />)
          : null}
      </div>
      <p className="mt-[6.5rem] text-white">Name: {personInfo.displayName}</p>
      {/* <p className="text-white">userId: {personInfo.userId}</p> */}
      <div className="mb-16"></div>
    </div>
  );
}