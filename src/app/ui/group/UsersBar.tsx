//import from next
import Image from 'next/image';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';

export default function UsersBar({ groupData }: { groupData: ExtendedGroup }) {
  const { loginUserId } = useAllContext();

  let frontUsers = [];

  if (groupData?.users && groupData.users.length > 5) {
    frontUsers = groupData.users.slice(0, 5);
  } else if (groupData?.users) {
    frontUsers = groupData.users;
  } else return;

  return (
    <>
      {groupData && groupData.users.some((user) => user.id === loginUserId) ? (
        <>
          {groupData.users.length ? (
            <div className="mt-16 flex items-center justify-center gap-4 border-b-[1px] border-b-grey-userBar pb-5 pt-8">
              <ul className="flex items-center justify-center gap-2">
                {frontUsers.map((user) => (
                  <UserBarImage user={user} key={user.id} />
                ))}
              </ul>
              <LoadingButton
                url={`/group/${groupData.id}/edit`}
                className="flex gap-[2px] rounded-full bg-neutrals-30 px-3 py-[5.5px] text-sm text-grey-500 active:bg-neutrals-50"
              >
                <p className="">{groupData.users.length}</p>
                <span className="relative bottom-[1px] ml-[1px]">&gt;</span>
              </LoadingButton>
            </div>
          ) : (
            <NoneUsersBar text="$0" />
          )}
        </>
      ) : (
        <NoneUsersBar text="" />
      )}
    </>
  );
}

function NoneUsersBar({ text }: { text: string }) {
  return (
    <div className="mt-16 flex items-center justify-center gap-4 border-b-[1px] border-b-grey-userBar pb-5 pt-8">
      {text}
    </div>
  );
}

function UserBarImage({ user }: { user: GroupUser }) {
  return (
    <>
      {user ? (
        <li>
          {user.picture ? (
            <Image
              src={user.picture === '' ? '/images/icons/newUserBG.svg' : user.picture}
              width={200}
              height={200}
              alt={user.name}
              className="h-11 w-11 max-w-full rounded-full border-none object-cover align-middle"
              priority
            />
          ) : (
            <div className="h-11 w-11 max-w-full rounded-full border-none bg-neutrals-20 object-cover align-middle"></div>
          )}
        </li>
      ) : null}
    </>
  );
}