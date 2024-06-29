//import from next
import Image from 'next/image';
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/_components/frontendData/user';

export default function UsersBar({ groupData }: { groupData: any }) {
  if (!groupData) return;
  let frontUsers = [];

  if (groupData.users.length > 5) {
    frontUsers = groupData.users.slice(0, 5);
  } else {
    frontUsers = groupData.users;
  }

  return (
    <>
      {groupData && groupData.users.some((user: any) => user.id === loginUserId) ? (
        <>
          {groupData.users.length ? (
            <div className="border-b-grey-userBar mt-16 flex items-center justify-center gap-4 border-b-[1px] pb-5 pt-8">
              <ul className="flex items-center justify-center gap-2">
                {frontUsers.map((user: any) => (
                  <UserBarImage user={user} key={user.id} />
                ))}
              </ul>
              <Link
                href={`/group/${groupData.id}/edit`}
                className="flex gap-[2px] rounded-full bg-neutrals-30 px-3 py-[5.5px] text-sm text-grey-500"
                scroll={false}
              >
                <p className="">{groupData.users.length}</p>
                <span className="relative bottom-[1px] ml-[1px]">&gt;</span>
              </Link>
            </div>
          ) : (
            <NoneUsersBar text="$0" />
          )}
        </>
      ) : (
        <NoneUsersBar text="no such group" />
      )}
    </>
  );
}

function NoneUsersBar({ text }: { text: string }) {
  return (
    <div className="border-b-grey-userBar mt-16 flex items-center justify-center gap-4 border-b-[1px] pb-5 pt-8">
      {text}
    </div>
  );
}

function UserBarImage({ user }: { user: any }) {
  return (
    <>
      {user ? (
        <li>
          <Image
            src={user.picture}
            width={200}
            height={200}
            alt={user.name}
            className="h-11 w-11 max-w-full rounded-full border-none object-cover align-middle shadow"
          />
        </li>
      ) : null}
    </>
  );
}