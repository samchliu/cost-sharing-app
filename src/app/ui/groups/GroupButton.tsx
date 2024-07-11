'use client';
//import from next
import Link from 'next/link';
import Image from 'next/image';
//import ui
import { groupIconMap } from '@/app/ui/shareComponents/Icons';
import CopyLinkButton from '@/app/ui/shareComponents/CopyLinkButton';
import ShareButton from '@/app/ui/shareComponents/ShareButton';

export default function GroupButton({ groupData }: { groupData: any }) {
  const {
    id,
    picture,
    name,
  }: {
    id: string;
    picture:
      | 'groupIcon01'
      | 'groupIcon02'
      | 'groupIcon03'
      | 'groupIcon04'
      | 'groupIcon05'
      | 'groupIcon06'
      | 'groupIcon07'
      | 'groupIcon08'
      | 'groupIcon09'
      | 'groupIcon10'
      | 'groupIcon11'
      | 'groupIcon12'
      | 'groupIcon13'
      | 'groupIcon14'
      | 'groupIcon15';
    name: string;
  } = groupData;

  const Icon = groupIconMap[picture];

  return (
    <Link
      href={`/group/${id}`}
      className="mx-6 my-4 flex justify-between rounded-[20px] bg-white py-2 pl-3 pr-2"
    >
      <div className="z-0 flex items-center">
        {Icon ? (
          <Image
            src={Icon}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-highlight-60"
            width={200}
            height={200}
            alt={picture}
          />
        ) : null}
        <p className="pl-3 font-normal">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareButton id={id} name={name} inGroupPage={false} />
        <CopyLinkButton id={id} name={name} inGroupPage={false} />
      </div>
    </Link>
  );
}