//import react
import { useState } from 'react';
//import data
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TotalCalculator } from './Calculator';
import DatePickerButton from './DatePickerButton';
import ExpenseCategoryButton from './ExpenseCategoryButton';
//other
import clsx from 'clsx';
import NoteButton from './NoteButton';

interface ExpenseSettingStepOneProps {
  group?: ExtendedGroup;
  expenseData?: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
  phase: number;
  setisIncorrectTotalNum: React.Dispatch<React.SetStateAction<boolean>>;
  nameExist: boolean;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
  hasNameLength: boolean;
  setHasNameLength: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExpenseSettingStepOne({
  group,
  expenseData,
  setCurrentExpense,
  phase,
  setisIncorrectTotalNum,
  nameExist,
  setNameExist,
  hasNameLength,
  setHasNameLength,
}: ExpenseSettingStepOneProps) {
  const name = expenseData?.name || '';
  const [currentValue, setCurrentValue] = useState(name);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    expenseData: ExtendedExpense | Expense,
    group: ExtendedGroup
  ) => {
    const expenseNameExist =
      group.expenses?.some((expense) => expense.name === e.target.value) &&
      expenseData.name !== e.target.value;

    setCurrentValue(e.target.value);

    if (expenseNameExist) {
      setNameExist(true);
    } else {
      setNameExist(false);
    }

    if (e.target.value.length === 0) {
      setHasNameLength(false);
    } else {
      setHasNameLength(true);
    }
  };

  const handleInputBlur = (
    e: React.ChangeEvent<HTMLInputElement>,
    expenseData: ExtendedExpense | Expense,
    group: ExtendedGroup
  ) => {
    const expenseNameExist =
      group.expenses?.some((expense) => expense.name === e.target.value) &&
      expenseData.name !== e.target.value;

    if (expenseNameExist || e.target.value.length === 0) {
      return;
    } else {
      setCurrentExpense({
        ...expenseData,
        name: e.target.value,
      });
    }
  };

  return (
    <div
      className={clsx('mx-auto my-6 w-fit', {
        hidden: phase !== 1,
      })}
    >
      {group && expenseData ? (
        <>
          <div className="mb-4">
            <DatePickerButton expenseData={expenseData} setCurrentExpense={setCurrentExpense} />
          </div>
          <div className="my-3 flex items-end justify-between gap-6">
            <ExpenseCategoryButton
              setCurrentExpense={setCurrentExpense}
              expenseData={expenseData}
            />
            <div className="relative w-48 border-b border-grey-500">
              <input
                className="relative w-[80%] border-0 bg-transparent pb-1 pl-0 focus:border-0 focus:outline-none focus:ring-0"
                onChange={(e) => handleInputChange(e, expenseData, group)}
                onBlur={(e) => handleInputBlur(e, expenseData, group)}
                type="text"
                defaultValue={currentValue}
                maxLength={20}
              />
              <div className="absolute right-0 top-[59%] translate-y-[-50%] text-[10px] text-neutrals-50">
                &#40;{currentValue.length}/20&#41;
              </div>
              <div
                className={clsx(
                  'absolute right-0 top-[130%] translate-y-[-50%] text-[10px] text-neutrals-50',
                  {
                    block: nameExist,
                    hidden: !nameExist,
                  }
                )}
              >
                該費用名稱已存在，請重新輸入
              </div>
              <div
                className={clsx(
                  'absolute right-0 top-[130%] translate-y-[-50%] text-[10px] text-neutrals-50',
                  {
                    block: !hasNameLength,
                    hidden: hasNameLength,
                  }
                )}
              >
                費用名稱不可為空值
              </div>
            </div>
          </div>
          <div className="my-3">
            <TotalCalculator
              expenseData={expenseData}
              setCurrentExpense={setCurrentExpense}
              setisIncorrectTotalNum={setisIncorrectTotalNum}
            />
          </div>
          <NoteButton expenseData={expenseData} setCurrentExpense={setCurrentExpense} />
        </>
      ) : null}
    </div>
  );
}