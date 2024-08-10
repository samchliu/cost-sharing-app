'use client';
//import next & react
import { useState, useEffect, useContext } from 'react';
import { useLiff, useUserId } from '@/app/_components/liff-provider';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { useUser } from '@/app/_components/frontendData/fetchData/Providers';
import { LoginUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import GroupButton from '@/app/ui/groups/GroupButton';
import AddGroupButton from '@/app/ui/groups/AddGroupButton';
// import liff from '@line/liff';
// const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;

export default function Page() {
  const userData: LoginUser = useUser(loginUserId);
  // const { liffObject, userId } = useLiff();
  // const [isUserIdLoaded, setIsUserIdLoaded] = useState(false);
  // const data = useUser(userId['userId'] ||  null);
  
  // useEffect(() => {
  //   if (!liffObject) return;
  //   if (userId) {
  //     setIsUserIdLoaded(true);
  //   }
  // }, [userId, liffObject]);

  // if (!userId || !data) {
  //   return <div>Loading...</div>;
  // }

  // useEffect(() => {
  //   async function login() {
  //     await liff.init({ liffId, withLoginOnExternalBrowser: true });
  //     const loginRes = await fetch('/api/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ accessToken: liff.getAccessToken() }),
  //     });
  //     const { userId } = await loginRes.json();
  //     const userRes = await fetch(`api/user/${1}`, {
  //       method: 'GET',
  //       cache: 'no-store',
  //     });
  //     const data = await userRes.json();
  //     console.log(data);

  //   }

  //   login();
  // },[]);

  return (
    <div className="flex min-h-screen flex-col bg-highlight-50">
      <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
        群組列表
      </h1>
      <AddGroupButton />
      <div className="mt-[6.5rem]">
        {userData
          ? userData.groups.map((group) => <GroupButton key={group.id} groupData={group} />)
          : null}
      </div>
      <div className="mb-16"></div>
    </div>
  );
}
