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

export function ExpenseDetailOne({ expenseData }: ExpenseDetailProps) {
  const { category, amount, name, date } = expenseData;

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <>
      {expenseData ? (
        <div className="flex w-full justify-between gap-4 pl-2 pr-3">
          <div className="z-0 flex h-[72px] w-[72px] grow-0 items-center justify-center rounded-lg border-[5px] border-white bg-highlight-60">
            <div className="scale-[1.4]">{Icon ? <Icon strokeWidth={1.6} /> : null}</div>
          </div>
          <div className="flex grow justify-between pt-4">
            <div className="h-fit">
              <div className="w-40 truncate text-xl leading-6">{name}</div>
              <div className="text-sm leading-4 text-grey-500">
                {date && format(date, 'yyyy/MM/dd')}
              </div>
            </div>
            <div className="h-fit text-xl leading-6">${nf.format(amount)}</div>
          </div>
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
      {expenseData ? (
        <div className="mt-7 w-full px-3">
          <div className="flex gap-4">
            {payerData ? (
              <Image
                className="z-10 flex h-[64px] w-[64px] items-center justify-center rounded-full bg-neutrals-30"
                src={payerData.picture === '' ? '/images/icons/newUserBG.svg' : payerData.picture}
                width={64}
                height={64}
                alt="sharer image"
                priority
              />
            ) : null}
            <div className="flex grow items-center justify-between">
              <div className="flex text-base">
                <div className="max-w-[92px] truncate">
                  {loginUserId === payerId ? '你' : payerData?.name}
                </div>
                <div>&nbsp;先付了</div>
              </div>
              <div className="text-highlight-35">${nf.format(amount)}</div>
            </div>
          </div>

          {sharers.map((sharer, idx) => {
            return (
              <Fragment key={idx}>
                {sharer.id !== payerId ? (
                  <>
                    <SharerExpenseDetail sharer={sharer} users={users} />
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
  const { note } = expenseData;

  return (
    <>
      {expenseData ? (
        <div className="mx-1 w-full">
          <div className="text-sm">備註</div>
          <div className="mt-2 min-h-[101px] rounded-lg bg-white p-3 text-base">{note}</div>
        </div>
      ) : null}
    </>
  );
}