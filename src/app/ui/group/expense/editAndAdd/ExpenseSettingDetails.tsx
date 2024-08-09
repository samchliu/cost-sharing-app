//import from next & react
import Image from 'next/image';
import { useContext, useEffect } from 'react';
//import data
import { CalcContext } from '@/app/_components/frontendData/sharedFunction/CalcProvider';
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { groupIconMap, NextstepIcon } from '@/app/ui/shareComponents/Icons';
import clsx from 'clsx';

interface GroupInfoBarProps {
  expenseData?: ExtendedExpense | Expense;
  group?: ExtendedGroup;
}

interface NextStepButtonProps {
  phase: number;
  setPhase: (phase: number) => void;
  expenseData: ExtendedExpense | Expense;
  isNotEqual: boolean;
  setIsNotEqual: (isNotEqual: boolean) => void;
  setCurrentExpense: (expense: ExtendedExpense | Expense) => void;
  isNotZero: boolean;
}

export function GroupInfoBar({ expenseData, group }: GroupInfoBarProps) {
  const picture = group?.picture || '';
  const name = group?.name || '';

  const Icon = picture ? groupIconMap[picture] : undefined;

  return (
    <>
      {expenseData && group ? (
        <div className="mt-16 flex items-center gap-4 border-b-2 py-4 pl-6">
          <p>你和</p>
          <div className="flex items-center justify-center gap-2 rounded-full bg-neutrals-30 py-1 pl-3 pr-4">
            {Icon ? (
              <Image
                src={Icon}
                className="z-0 flex h-7 w-7 items-center justify-center rounded-full bg-highlight-60"
                width={200}
                height={200}
                alt={picture}
              />
            ) : null}
            <div>{name}</div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export function NextStepButton({
  phase,
  setPhase,
  expenseData,
  isNotEqual,
  setIsNotEqual,
  setCurrentExpense,
  isNotZero,
}: NextStepButtonProps) {
  const context = useContext(CalcContext);

  if (!context) {
    throw new Error('CalcContext must be used within a CalcProvider');
  }

  const { display } = context;

  const expenseId = expenseData && 'id' in expenseData ? expenseData.id : '';

  const addedAmount =
    expenseData?.sharers.reduce((total, sharer) => Number(total) + Number(sharer.amount), 0) || 0;

  useEffect(() => {
    const difference = Math.abs(Number(expenseData?.amount) - Number(addedAmount));

    const isNotEqual = difference >= 0.1;

    setIsNotEqual(isNotEqual);
  }, [expenseData?.amount, setIsNotEqual, addedAmount]);

  function handleClick(e: React.SyntheticEvent, expenseId: string) {
    e.preventDefault();
    setPhase(phase + 1);
    console.log(`phase ${phase} of expense ${expenseId}`);

    setCurrentExpense({ ...expenseData, amount: Number(display) });
    console.log(expenseData);
  }

  function handleSubmit(expense: ExtendedExpense | Expense) {
    // console.log(expenseData);
  }

  return (
    <div className="mb-8 flex flex-col items-center">
      {expenseData ? (
        <>
          {phase !== 3 ? (
            <button
              disabled={isNaN(Number(display)) || Number(display) < 1}
              type="button"
              onClick={(e: React.SyntheticEvent) => handleClick(e, expenseId)}
              className="flex w-[180px] items-center justify-between rounded-full bg-highlight-20 px-4 py-2 disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
            >
              <div className="text-[10px]">{phase}/3</div>
              <div className="text-sm">下一步</div>
              <div>
                <NextstepIcon
                  currentColor={isNaN(Number(display)) || Number(display) < 1 ? '#9E9E9E' : '#000'}
                />
              </div>
            </button>
          ) : (
            <button
              disabled={isNotEqual && isNotZero}
              type="button"
              onClick={() => {
                console.log('click submit');
                console.log(expenseData);
              }}
              onSubmit={() => handleSubmit(expenseData)}
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
          )}
        </>
      ) : null}
    </div>
  );
}