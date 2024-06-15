//import from next
import Image from 'next/image';
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
            <div className="mt-16 flex items-center justify-center gap-4 border-b-[2px] pb-5 pt-8">
              <ul className="flex items-center justify-center gap-2">
                {frontUsers.map((user: any) => (
                  <UserBarImage user={user} key={user.id} />
                ))}
              </ul>
              <div className="flex gap-[2px] rounded-full bg-grey-100 py-1 pl-3 pr-2 text-sm text-grey-400">
                <p className="">{groupData.users.length}</p>
                <span className="relative bottom-[1px]">&gt;</span>
              </div>
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
    <div className="mt-16 flex items-center justify-center gap-4 border-b-[2px] pb-5 pt-8">
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