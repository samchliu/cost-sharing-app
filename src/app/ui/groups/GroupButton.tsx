'use client';
//import from next
import Link from 'next/link';
//import ui
import { groupIconMap } from '@/app/ui/shareComponents/Icons';
import CopyLinkButton from '@/app/ui/shareComponents/CopyLinkButton';
import ShareButton from '@/app/ui/shareComponents/ShareButton';

export default function GroupButton({ groupData }: { groupData: any }) {
  const {
    id,
    groupType,
    name,
  }: {
    id: string;
    groupType: 'travel' | 'health' | 'games' | 'other';
    name: string;
  } = groupData;

  const Icon = groupIconMap[groupType];

  return (
    <Link
      href={`/group/${id}`}
      className="mx-6 my-4 flex justify-between rounded-[20px] bg-white py-3 pl-3 pr-2"
    >
      <div className="z-0 flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-200">
          {Icon ? <Icon className="h-6 w-6 text-grey-400" /> : null}
        </div>
        <p className="pl-2 font-medium">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareButton id={id} name={name} inGroupPage={false} />
        <CopyLinkButton id={id} name={name} inGroupPage={false} />
      </div>
    </Link>
  );
}
