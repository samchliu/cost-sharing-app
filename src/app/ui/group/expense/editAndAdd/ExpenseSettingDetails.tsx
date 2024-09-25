//import from next & react
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import data
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
import { addExpense, changeExpense } from '@/app/_components/frontendData/fetchData/API';
//import ui
import { NextstepIcon } from '@/app/ui/shareComponents/Icons';
import { FullPageLoading } from '@/app/ui/loading/FullPageLoading';
//import other
import clsx from 'clsx';

interface GroupInfoBarProps {
  expenseData?: ExtendedExpense | Expense;
  group?: ExtendedGroup;
}

interface NextStepButtonProps {
  isAddExpensePage: boolean;
  formRef: React.RefObject<HTMLFormElement>;
  phase: number;
  setPhase: (phase: number) => void;
  groupid: string;
  expenseData: ExtendedExpense | Expense;
  isNotEqual: boolean;
  setIsNotEqual: (isNotEqual: boolean) => void;
  isNotZero: boolean;
  isIncorrectTotalNum: boolean;
  nameExist: boolean;
  hasNameLength: boolean;
}

export function GroupInfoBar({ expenseData, group }: GroupInfoBarProps) {
  const picture = group?.picture || '';
  const name = group?.name || '';

  return (
    <>
      {expenseData && group ? (
        <div className="mt-16 flex items-center gap-4 border-b-2 py-4 pl-6">
          <p>你和</p>
          <div className="flex items-center justify-center gap-2 rounded-full bg-neutrals-30 py-1 pl-3 pr-4">
            {picture ? (
              <Image
                src={picture}
                className="z-0 flex h-7 w-7 items-center justify-center rounded-full bg-highlight-60"
                width={200}
                height={200}
                alt={picture}
              />
            ) : null}
            <div className="max-w-52 truncate">{name}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function NextStepButton({
  isAddExpensePage,
  formRef,
  phase,
  setPhase,
  groupid,
  expenseData,
  isNotEqual,
  setIsNotEqual,
  isNotZero,
  isIncorrectTotalNum,
  nameExist,
  hasNameLength,
}: NextStepButtonProps) {
  const expenseId = expenseData && 'id' in expenseData ? expenseData.id : '';

  const addedAmount =
    expenseData?.sharers.reduce((total, sharer) => Number(total) + Number(sharer.amount), 0) || 0;

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const difference = Math.abs(Number(expenseData?.amount) - Number(addedAmount));

    const isNotEqual = difference >= 0.1;

    setIsNotEqual(isNotEqual);
  }, [expenseData?.amount, setIsNotEqual, addedAmount]);

  function handleClick(e: React.SyntheticEvent, expenseId: string) {
    e.preventDefault();
    setPhase(phase + 1);
  }

  async function handleSubmit(
    event: React.MouseEvent<HTMLButtonElement>,
    expense: ExtendedExpense | Expense,
    groupid: string,
    expenseid: string
  ) {
    event.preventDefault();

    let payload = {
      groupId: groupid,
      name: expense.name,
      category: expense.category,
      amount: expense.amount,
      date: expense.date,
      note: expense.note,
      payerId: expense.payerId,
      sharers: expense.sharers,
    };

    try {
      setIsLoading(true);

      if (isAddExpensePage) {
        await addExpense(payload);
      } else {
        await changeExpense({ ...payload, id: expenseid });
      }

      if (formRef.current) {
        formRef.current.submit();
      }
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  return (
    <>
      {isLoading && <FullPageLoading />}
      <div className="mb-8 flex flex-col items-center">
        {expenseData ? (
          <>
            {phase !== 3 ? (
              <button
                disabled={isIncorrectTotalNum || nameExist || !hasNameLength}
                type="button"
                onClick={(e: React.SyntheticEvent) => handleClick(e, expenseId || '')}
                className="flex w-[180px] items-center justify-between rounded-full bg-highlight-20 px-4 py-2 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
              >
                <div className="text-[10px]">{phase}/3</div>
                <div className="text-sm">下一步</div>
                <div>
                  <NextstepIcon
                    currentColor={
                      isIncorrectTotalNum || nameExist || !hasNameLength ? '#9E9E9E' : '#000'
                    }
                  />
                </div>
              </button>
            ) : (
              <>
                <button
                  disabled={isNotEqual && isNotZero}
                  type="submit"
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                    handleSubmit(e, expenseData, groupid, expenseId || '')
                  }
                  className="relative flex w-[180px] items-center justify-between rounded-full bg-highlight-20 px-4 py-2 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
                >
                  <div
                    className={clsx(
                      'absolute bottom-12 left-[50%] w-screen translate-x-[-50%] text-xs text-text-onDark-secondary',
                      {
                        hidden: !isNotEqual && isNotZero,
                        block: isNotEqual || !isNotZero,
                      }
                    )}
                  >
                    目前分帳總額 不等於 {expenseData.amount} 元
                  </div>
                  <div className="text-[10px]">3/3</div>
                  <div className="text-sm">確認</div>
                  <div></div>
                </button>
                <div className="h-[400px]" />
              </>
            )}
          </>
        ) : null}
      </div>
    </>
  );
}