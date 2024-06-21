//import data
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import ShareButton from '@/app/ui/shareComponents/ShareButton';
import CopyLinkButton from '@/app/ui/shareComponents/CopyLinkButton';

export default function BalanceAndShareButtons({
  groupData,
  groupName,
}: {
  groupData: any;
  groupName: string;
}) {
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
        <div className="flex items-center justify-center gap-2 pb-2 pt-6">
          <div className="bg-neutrals-20 flex items-center justify-between rounded-full px-5 py-2 text-sm">
            <CurrencyDollarIcon className="flex h-5 w-5 items-center justify-center" />
            <p className="ml-1 font-semibold">結餘</p>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton id={id} name={groupName} inGroupPage={true} />
            <CopyLinkButton id={id} name={groupName} inGroupPage={true} />
          </div>
        </div>
      ) : null}
    </>
  );
}