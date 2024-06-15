'use client';
//import from next & react
import { useParams } from 'next/navigation';
//import data
import { useUser } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const user = useUser(loginUserId);

  let groupName = null;
  if (!user) return;
  for (let group of user.groups) {
    if (group.id === params.groupid) {
      groupName = group.name;
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <h1 className="fixed left-[50%] z-[2] mt-0 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl">
          {groupName ? groupName : 'no such group'} edit
        </h1>
      </div>
    </>
  );
}