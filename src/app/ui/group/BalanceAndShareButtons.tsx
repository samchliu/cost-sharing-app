//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { DollarTwoIcon } from '@/app/ui/shareComponents/Icons';
import ShareButton from '@/app/ui/shareComponents/ShareButton';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';

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
          <LoadingButton
            url={`/group/${groupData.id}/balance`}
            className="flex items-center justify-between rounded-full bg-neutrals-20 px-5 py-2 text-sm active:bg-neutrals-30"
          >
            <DollarTwoIcon />
            <p className="ml-1 font-medium">結餘</p>
          </LoadingButton>
          <div className="flex items-center gap-2">
            <ShareButton
              id={id || ''}
              name={groupData.name}
              inGroupPage={true}
              groupUsers={users}
            />
          </div>
        </div>
      ) : null}
    </>
  );
}