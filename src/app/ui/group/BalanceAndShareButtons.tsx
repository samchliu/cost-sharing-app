//import data
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';
import ShareButton from '@/app/ui/shareComponents/ShareButton';
import CopyLinkButton from '@/app/ui/shareComponents/CopyLinkButton';

export default function BalanceAndShareButtons({ groupData, groupName }: { groupData: any; groupName: string }) {
    if (!groupData) return

    const { id, users }: {
        id: string;
        users: string[];
    } = groupData

    return (
        <>
            {groupData && users.some((user: any) => user.id ===loginUserId) ?
                <div className="flex justify-center items-center gap-2 pt-6 pb-2">
                    <div className="flex justify-between items-center bg-primary-lightPink px-5 py-2 rounded-full text-sm">
                        <CurrencyDollarIcon className="flex justify-center items-center w-5 h-5" />
                        <p className="font-semibold ml-1">結餘</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <ShareButton id={id} name={groupName} inGroupPage={true} />
                        <CopyLinkButton id={id} name={groupName} inGroupPage={true} />
                    </div>
                </div>
                : null}
        </>
    )
}