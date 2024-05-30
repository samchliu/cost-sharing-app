import { loginUserId, user } from "@/app/_components/frontendData/user";
import Image from "next/image";

export default function SharerExpenseDetail({ expenseData, sharerId }: { expenseData: any, sharerId: any }) {
    const {
        cost,
        payerId,
        sharersIds
    }: {
        cost: any;
        payerId: string;
        sharersIds: string[];
    } = expenseData;
    let nf = new Intl.NumberFormat('en-US');
    let shareCost: any = (cost / sharersIds.length).toFixed(2)

    return (
      <div className="mb-5 flex w-full items-center justify-between">
        <div className="relative ml-6 w-[62px] border border-black">
          <span className="block after:absolute after:bottom-0 after:left-[-1px] after:h-[52px] after:border after:border-black after:content-['']"></span>
        </div>
        <div className="flex grow items-center justify-between">
          <div className="flex items-center">
            <Image
              className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-grey-200"
              src={user(sharerId)?.pictureUrl}
              width={32}
              height={32}
              alt="sharer image"
            />
            <div className="ml-3">
              {sharerId === loginUserId ? '你' : user(sharerId)?.displayName}&nbsp;要給&nbsp;
              {payerId === loginUserId ? '你' : user(payerId)?.displayName}
            </div>
          </div>
          <div>${nf.format(shareCost)}</div>
        </div>
      </div>
    );
}