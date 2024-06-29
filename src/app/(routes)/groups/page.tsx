'use client';
//import next & react
// import { Fragment, useEffect, useState } from 'react';
// import { useLiff } from '@/app/_components/liff-provider';

//import data
import { loginUserId } from '@/app/_components/frontendData/user';
import { useUser } from '@/app/_components/frontendData/Providers';
//import ui
import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';

export default function Page() {
  const data = useUser(loginUserId);

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
      <div className="mb-16"></div>
    </div>
  );
}

// function LiffObject() {
//   const lineInitialProfile = {
//     userId: '',
//     displayName: '',
//     statusMessage: '',
//     pictureUrl: '',
//   };
//   const { liffObject } = useLiff();
//   const [personInfo, setPersonInfo] = useState(lineInitialProfile);
//   useEffect(() => {
//     if (!liffObject) return;
//     const userProfile = liffObject.getProfile();
//     userProfile.then(
//       (profile: {
//         userId: string;
//         displayName: string;
//         statusMessage: string;
//         pictureUrl: string;
//       }) => {
//         const data = profile;
//         console.log(data);
//         setPersonInfo(data);
//       }
//     );
//   }, [liffObject]);

//   return (
//     <>
//       <p>Name: {personInfo.displayName}</p>
//       <Image src={personInfo.pictureUrl} alt={personInfo.displayName} width={500} height={500} />
//       <p>userId: {personInfo.userId}</p>
//     </>
//   );
// }