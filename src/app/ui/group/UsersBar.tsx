//import from next
import Image from 'next/image';
//import data
import { useUser } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';

export default function UsersBar({ groupData }: { groupData: any }) {
  if (!groupData) return;
  let frontMembersIds = [];

  if (groupData.membersIds.length > 5) {
    frontMembersIds = groupData.membersIds.slice(0, 5);
  } else {
    frontMembersIds = groupData.membersIds;
  }

  return (
    <>
      {groupData && groupData.membersIds.includes(loginUserId) ? (
        <>
          {groupData.membersIds.length ? (
            <div className="mt-16 flex items-center justify-center gap-4 border-b-[2px] pb-5 pt-8">
              <ul className="flex items-center justify-center gap-2">
                {frontMembersIds.map((memberId: any) => (
                  <UserBarImage id={memberId} key={memberId} />
                ))}
              </ul>
              <div className="flex gap-[2px] rounded-full bg-grey-100 py-1 pl-3 pr-2 text-sm text-grey-400">
                <p className="">{groupData.membersIds.length}</p>
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

function UserBarImage({ id }: { id: any }) {
  const user = useUser(id);

  return (
    <>
      {user ? (
        <li>
          <Image
            src={user.pictureUrl}
            width={200}
            height={200}
            alt={user.displayName}
            className="h-11 w-11 max-w-full rounded-full border-none object-cover align-middle shadow"
          />
        </li>
      ) : null}
    </>
  );
}
