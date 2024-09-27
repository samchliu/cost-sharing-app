'use client';
//import from next
import Image from 'next/image';
//import data
import { ExtendedGroup, Group } from '@/app/_components/frontendData/sharedFunction/types';
import { useGroup } from '@/app/_components/frontendData/fetchData/Providers';
//import ui
import ShareButton from '@/app/ui/shareComponents/ShareButton';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';

export default function GroupButton({ groupData }: { groupData: Group }) {
  const { id, picture, name } = groupData;

  const groupWithUsers: ExtendedGroup = useGroup(groupData?.id || '');
  const groupUsers = groupWithUsers ? groupWithUsers.users : [];

  return (
    <>
      <LoadingButton
        url={`/group/${id}`}
        className="mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2"
      >
        <div className="z-0 flex items-center">
          {picture ? (
            <Image
              src={picture}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
              width={200}
              height={200}
              alt={picture}
              priority
            />
          ) : null}
          <div className="w-52 truncate pl-3 font-normal">{name}</div>
        </div>
        <div className="flex items-center">
          <ShareButton id={id || ''} name={name} inGroupPage={false} groupUsers={groupUsers} />
        </div>
      </LoadingButton>
    </>
  );
}