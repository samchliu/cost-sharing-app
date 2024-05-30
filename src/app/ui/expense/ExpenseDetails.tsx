import { loginUserId, user } from '@/app/_components/frontendData/user';
import { expenseIconMap } from '@/app/ui/shareComponents/Icons';
import { Fragment } from 'react';
import SharerExpenseDetail from '@/app/ui/expense/SharerExpenseDetail';
import Image from 'next/image';

export function ExpenseDetailOne({ expenseData }: { expenseData: any }) {
  const {
    expenseType,
    cost,
    event,
    date,
  }: {
    expenseType: 'food' | 'drink' | 'transport' | 'stay' | 'shopping' | 'entertainment' | 'other';
    cost: any;
    event: string;
    date: string;
  } = expenseData;
  const Icon = expenseIconMap[expenseType];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <div className="flex w-full justify-between pl-2 pr-3">
      {expenseData ? (
        <>
          <div className="flex gap-5">
            <div className="flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[5px] border-white bg-primary-orange">
              <div className="scale-125">{Icon ? <Icon /> : null}</div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-xl leading-8">{event}</div>
              <div className="text-xs text-grey-300">
                <div className="leading-3">{date} 新增</div>
                <div className="leading-6">{date} 最後更新</div>
              </div>
            </div>
          </div>
          <div className="text-xl leading-8">${nf.format(cost)}</div>
        </>
      ) : null}
    </div>
  );
}

export function ExpenseDetailTwo({ expenseData }: { expenseData: any }) {
  const {
    cost,
    payerId,
    sharersIds,
  }: {
    cost: any;
    payerId: string;
    sharersIds: string[];
  } = expenseData;
  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData ? (
        <div className="mt-7 w-full px-3">
          <div className="flex gap-4">
            <Image
              className="z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-grey-200"
              src={user(payerId)?.pictureUrl}
              width={64}
              height={64}
              alt="sharer image"
            />
            <div className="flex grow items-center justify-between">
              <div className="text-base">
                {loginUserId === payerId ? '你' : user(payerId)?.displayName}先付了
              </div>
              <div>${nf.format(cost)}</div>
            </div>
          </div>

          {sharersIds.map((id: any, idx: any) => {
            return (
              <Fragment key={idx}>
                {id !== payerId ? (
                  <>
                    <SharerExpenseDetail expenseData={expenseData} sharerId={id} />
                  </>
                ) : null}
              </Fragment>
            );
          })}
          {sharersIds.length === 1 && sharersIds.includes(payerId) ? (
            <div className="my-5 flex w-full items-center justify-end">已結清無欠款</div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function ExpenseDetailThree({ expenseData }: { expenseData: any }) {
  return (
    <div className="mx-1 w-full">
      <div className="text-sm">備註</div>
      <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">{expenseData.note}</div>
    </div>
  );
}
