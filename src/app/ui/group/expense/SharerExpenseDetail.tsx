//import from next
import Image from 'next/image';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import {
  GroupUser,
  Sharer,
} from '@/app/_components/frontendData/sharedFunction/types';

interface Props {
  sharer: Sharer;
  users: GroupUser[];
}

export default function SharerExpenseDetail({ sharer, users }: Props) {
  const { loginUserId } = useAllContext();
  const { id, amount } = sharer;

  let sharerData = users.filter((user) => user.id === id)[0];

  let nf = new Intl.NumberFormat('en-US');
  let shareAmount: any = Number(amount).toFixed(2);

  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <div className="relative ml-6 w-[62px] border border-black">
        <span className="block after:absolute after:bottom-0 after:left-[-1px] after:h-[52px] after:border after:border-black after:content-['']"></span>
      </div>
      <div className="flex grow items-center justify-between">
        <div className="flex items-center">
          {sharerData ? (
            <Image
              className="bg-grey-200 flex h-[32px] w-[32px] items-center justify-center rounded-full"
              src={sharerData.picture}
              width={32}
              height={32}
              alt="sharer image"
              priority
            />
          ) : null}
          <div className="ml-3 flex">
            <div className="max-w-[68px] truncate">
              {id === loginUserId ? '你' : sharerData?.name}
            </div>
            <div>&nbsp;應付</div>
          </div>
        </div>
        <div className="text-highlight-30">${nf.format(shareAmount)}</div>
      </div>
    </div>
  );
}