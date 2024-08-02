//import from next
import Link from 'next/link';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
//import ui
import { DollarTwoIcon } from '@/app/ui/shareComponents/Icons';
import ShareButton from '@/app/ui/shareComponents/ShareButton';
import CopyLinkButton from '@/app/ui/shareComponents/CopyLinkButton';

export default function BalanceAndShareButtons({ groupData }: { groupData: any }) {
  if (!groupData) return;

  const {
    id,
    users,
  }: {
    id: string;
    users: string[];
  } = groupData;

  return (
    <>
      {groupData && users.some((user: any) => user.id === loginUserId) ? (
        <div className="flex items-center justify-center gap-2 pb-3 pt-6">
          <Link
            href={`/group/${groupData.id}/balance`}
            className="flex items-center justify-between rounded-full bg-neutrals-20 px-5 py-2 text-sm"
            scroll={false}
          >
            <DollarTwoIcon />
            <p className="ml-1 font-medium">結餘</p>
          </Link>
          <div className="flex items-center gap-2">
            <ShareButton id={id} name={groupData.name} inGroupPage={true} />
            <CopyLinkButton id={id} name={groupData.name} inGroupPage={true} />
          </div>
        </div>
      ) : null}
    </>
  );
}
