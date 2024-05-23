'use client';
// import { useEffect, useState } from 'react';
// import { useLiff } from '@/app/_components/liff-provider';
// import Image from 'next/image';
import GroupButton from '@/app/ui/groups/GroupButton';
import { groups } from '@/app/_components/dummyData';


export default function Page() {
 const data = groups;

 return (
   <div className="flex flex-col">
     <h1 className="fixed left-[50%] z-[2] mt-0 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl">
       Tool Name
     </h1>
     <div className="mt-20">
       {data ? data.map((group) => <GroupButton key={group.groupId} group={group} />) : null}
     </div>
     <div className="fixed bottom-0 left-[50%] z-[2] flex h-24 w-full translate-x-[-50%] items-center justify-center bg-primary-100">
       <button className="w-[92%] rounded-[10px] bg-primary-200 p-[13px] active:bg-grey-200">
         Add Group
       </button>
     </div>
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