//import from next & react
import Image from 'next/image';
import { Fragment } from 'react';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedExpense, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { expenseIconMap } from '@/app/ui/shareComponents/Icons';
import SharerExpenseDetail from '@/app/ui/group/expense/SharerExpenseDetail';
//import other
import { format } from 'date-fns';

interface ExpenseDetailProps {
  expenseData: ExtendedExpense;
}

interface ExpenseDetailExtendProps extends ExpenseDetailProps {
  users: GroupUser[];
}

export function ExpenseDetailOne({ expenseData, users }: ExpenseDetailExtendProps) {
  const { loginUserId } = useAllContext();
  const { category, amount, name, creatorId, createAt, updateAt, payerId, sharers } = expenseData;
  let creatorIdUser = users.filter((user) => user.id === creatorId)[0];

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData &&
      (payerId === loginUserId || sharers?.some((sharer) => sharer.id === loginUserId)) ? (
        <div className="flex w-full justify-between pl-2 pr-3">
          <div className="flex gap-5">
            <div className="z-0 flex h-[72px] w-[72px] items-center justify-center rounded-lg border-[5px] border-white bg-highlight-60">
              <div className="scale-[1.4]">{Icon ? <Icon strokeWidth={1.6} /> : null}</div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="text-xl leading-8">{name}</div>
              <div className="text-xs text-grey-500">
                <div className="leading-3">
                  {createAt && format(createAt, 'yyyy/MM/dd')} {creatorIdUser?.name}新增
                </div>
                <div className="leading-6">
                  {updateAt && format(updateAt, 'yyyy/MM/dd')} 最後更新
                </div>
              </div>
            </div>
          </div>
          <div className="text-xl leading-8">${nf.format(amount)}</div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}

export function ExpenseDetailTwo({ expenseData, users }: ExpenseDetailExtendProps) {
  const { loginUserId } = useAllContext();
  const { amount, payerId, sharers } = expenseData;

  let payerData = users.filter((user) => user.id === payerId)[0];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData &&
      (payerId === loginUserId || sharers?.some((sharer) => sharer.id === loginUserId)) ? (
        <div className="mt-7 w-full px-3">
          <div className="flex gap-4">
            {payerData ? (
              <Image
                className="z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-neutrals-30"
                src={payerData.picture}
                width={64}
                height={64}
                alt="sharer image"
                priority
              />
            ) : null}
            <div className="flex grow items-center justify-between">
              <div className="text-base">
                {loginUserId === payerId ? '你' : payerData?.name}
                先付了
              </div>
              <div>${nf.format(amount)}</div>
            </div>
          </div>

          {sharers.map((sharer, idx) => {
            return (
              <Fragment key={idx}>
                {sharer.id !== payerId ? (
                  <>
                    <SharerExpenseDetail expenseData={expenseData} sharer={sharer} users={users} />
                  </>
                ) : null}
              </Fragment>
            );
          })}

          {sharers.length === 1 && sharers.some((sharer) => sharer.id === payerId) ? (
            <div className="my-5 flex w-full items-center justify-end">已結清無欠款</div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

export function ExpenseDetailThree({ expenseData }: ExpenseDetailProps) {
  const { loginUserId } = useAllContext();
  const { payerId, sharers, note } = expenseData;

  return (
    <>
      {expenseData &&
      (payerId === loginUserId || sharers?.some((sharer) => sharer.id === loginUserId)) ? (
        <div className="mx-1 w-full">
          <div className="text-sm">備註</div>
          <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">{note}</div>
        </div>
      ) : null}
    </>
  );
}