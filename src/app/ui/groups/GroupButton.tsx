'use client';
//import from next
import Link from 'next/link';
import Image from 'next/image';
//import data
import { Group } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import ShareButton from '@/app/ui/shareComponents/ShareButton';

export default function GroupButton({ groupData }: { groupData: Group }) {
  const { id, picture, name } = groupData;

  return (
    <Link
      href={`/group/${id}`}
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
        <p className="pl-3 font-normal">{name}</p>
      </div>
      <div className="flex items-center">
        <ShareButton id={id || ''} name={name} inGroupPage={false} />
      </div>
    </Link>
  );
}