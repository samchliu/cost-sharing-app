//import from next
import Image from 'next/image';
//import data
import { loginUserId } from '@/app/_components/frontendData/user';
import { useUser } from '@/app/_components/frontendData/Providers';

export default function SharerExpenseDetail({
  expenseData,
  sharer,
}: {
  expenseData: any;
  sharer: any;
}) {
  const { payerId }: { payerId: string } = expenseData;
  const { id, amount } = sharer;

  const payerData = useUser(payerId);
  const sharerData = useUser(id);

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
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-grey-200"
              src={sharerData.pictureUrl}
              width={32}
              height={32}
              alt="sharer image"
            />
          ) : null}
          <div className="ml-3">
            {id === loginUserId ? '你' : sharerData?.displayName}
            &nbsp;要給&nbsp;
            {payerId === loginUserId ? '你' : payerData?.displayName}
          </div>
        </div>
        <div>${nf.format(shareAmount)}</div>
      </div>
    </div>
  );
}
