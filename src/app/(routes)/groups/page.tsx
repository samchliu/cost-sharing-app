'use client';
import { useEffect, useState } from 'react';
// import { useLiff } from '@/app/_components/liff-provider';

import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';
import { groups } from '@/app/_components/dummyData';

export default function Page() {
  const [data, setData] = useState(groups);

 return (
   <div className="flex flex-col">
     <h1 className="fixed left-[50%] z-[2] mt-0 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl font-normal">
       Chill 後算賬
     </h1>
     <div className="mt-20">
       {data ? data.map((group) => <GroupButton key={group.groupId} group={group} />) : null}
     </div>
     <div className="h-24"></div>
     <AddGroupButton data={data} setData={setData} />
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