'use client';
import { Fragment, useEffect, useState } from 'react';
// import { useLiff } from '@/app/_components/liff-provider';

import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';
import { groups } from '@/app/_components/frontendData/dummyData';
import { loginUserId } from '@/app/_components/frontendData/user';

export default function Page() {
  const [data, setData] = useState(groups);

  return (
    <div className="flex min-h-screen flex-col bg-primary-blue">
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-primary-blue py-5 text-center text-2xl font-bold text-grey-100">
        群組列表
      </h1>
      <AddGroupButton data={data} setData={setData} />
      <div className="mt-24">
        {data
          ? data.map((group, idx) => (
              <Fragment key={idx}>
                {group.membersIds.includes(loginUserId) ? <GroupButton groupData={group} /> : null}
              </Fragment>
            ))
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