//import from next
import Link from 'next/link';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { DollarTwoIcon } from '@/app/ui/shareComponents/Icons';
import ShareButton from '@/app/ui/shareComponents/ShareButton';

interface Props {
  groupData: ExtendedGroup;
}

export default function BalanceAndShareButtons({ groupData }: Props) {
  const { loginUserId } = useAllContext();

  let id = groupData?.id ? groupData.id : '';
  let users = groupData?.users ? groupData.users : [];

  return (
    <>
      {groupData && users?.some((user) => user.id === loginUserId) ? (
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
            <ShareButton id={id || ''} name={groupData.name} inGroupPage={true} />
          </div>
        </div>
      ) : null}
    </>
  );
}