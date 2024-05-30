import Image from "next/image";
import { usersInfo } from "@/app/_components/frontendData/dummyData";
import { Fragment } from "react";
import { loginUserId } from '@/app/_components/frontendData/user';

export default function UsersBar({ groupData }: { groupData: any }) {
  const usersFilterData = usersInfo.filter((user) => {
    let newMembersIds = [];

    if (!groupData) return;
    if (groupData.membersIds.length > 5) {
      newMembersIds = groupData.membersIds.slice(0, 5);
    } else {
      newMembersIds = groupData.membersIds;
    }

    return newMembersIds.includes(user.userId);
  });

  return (
    <>
      {groupData && groupData.membersIds.includes(loginUserId) ? (
        <>
          {groupData.membersIds.length ? (
            <div className="mt-16 flex items-center justify-center gap-4 border-b-[2px] pb-5 pt-8">
              <ul className="flex items-center justify-center gap-2">
                {groupData.membersIds.map((memberId: any, idx: any) => {
                  let user = usersFilterData.filter((user) => memberId === user.userId)[0];

                  return (
                    <Fragment key={idx}>
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
                    </Fragment>
                  );
                })}
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