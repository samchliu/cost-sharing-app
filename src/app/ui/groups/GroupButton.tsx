'use client';
import CopyLinkButton from '@/app/ui/groups/CopyLinkButton';
import ShareButton from '@/app/ui/groups/ShareButton';
import Link from 'next/link';
import { groupIconMap } from '@/app/ui/shareComponents/Icons';

export default function GroupButton({ group }: { group: any }) {
  const {
    groupId,
    groupType,
    name,
  }: {
    groupId: string;
    groupType: 'travel' | 'health' | 'games' | 'other';
    name: string;
  } = group;

  const Icon = groupIconMap[groupType];

  return (
    <Link
      href={`/group/${groupId}`}
      className="mx-6 my-4 flex justify-between rounded-[20px] bg-grey-100 py-3 pl-3 pr-2"
    >
      <div className="z-0 flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-200">
          {Icon ? <Icon className="h-6 w-6 text-grey-300" /> : null}
        </div>
        <p className="pl-2 font-medium">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareButton groupId={groupId} name={name} />
        <CopyLinkButton groupId={groupId} name={name} />
      </div>
    </Link>
  );
}
