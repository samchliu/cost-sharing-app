'use client';
import CopyLinkButton from '@/app/ui/groups/CopyLinkButton';
import ShareButton from '@/app/ui/groups/ShareButton';
import Link from 'next/link';

import {
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';


const iconMap = {
  travel: GlobeAsiaAustraliaIcon,
  health: HeartIcon,
  games: PuzzlePieceIcon,
  other: RocketLaunchIcon,
};

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

  const Icon = iconMap[groupType];

  return (
    <Link
      href={`/group/${groupId}`}
      className="m-4 flex justify-between rounded-lg bg-grey-100 p-3"
    >
      <div className="z-0 flex items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-200">
          {Icon ? <Icon className="h-6 w-6 text-grey-300" /> : null}
        </div>
        <p className="pl-2">{name}</p>
      </div>
      <div className="flex items-center gap-2">
        <ShareButton groupId={groupId} name={name} />
        <CopyLinkButton groupId={groupId} name={name} />
      </div>
    </Link>
  );
}
