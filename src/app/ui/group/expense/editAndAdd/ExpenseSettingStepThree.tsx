//import react
import { Fragment } from 'react';
//import data
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { NotePencilIcon } from '@/app/ui/shareComponents/Icons';
import SelectSharerButton from './SelectSharerButton';
import ExpenseSettingSharer from './ExpenseSettingSharer';
//other
import clsx from 'clsx';

interface ExpenseSettingStepThreeProps {
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
  group: ExtendedGroup;
  phase: number;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ExpenseSettingStepThree({
  expenseData,
  setCurrentExpense,
  group,
  phase,
  setIsNotEqual,
}: ExpenseSettingStepThreeProps) {
  const users = group?.users || '';

  return (
    <div
      className={clsx(
        'man-w-[320px] mx-auto my-6 flex w-full max-w-[800px] flex-col items-center',
        {
          hidden: phase !== 3,
        }
      )}
    >
      {expenseData && group ? (
        <>
          <div className="mx-auto mb-5 px-3 text-xl">選擇分帳成員</div>
          <div className="mb-3 mt-1 flex w-full items-center justify-end px-[14px]">
            <div className="flex gap-3">
              <div className="flex w-20 cursor-pointer justify-center text-xs">
                <div className="scale-75">
                  <NotePencilIcon />
                </div>
                <div>負擔金額</div>
              </div>
              <SelectSharerButton
                expenseData={expenseData}
                users={users}
                setCurrentExpense={setCurrentExpense}
              />
            </div>
          </div>
          {users &&
            users.map((user) => {
              const isChecked = expenseData.sharers.some((sharer) => sharer.id === user.id);

              let sharer = expenseData.sharers.filter((sharer) => {
                return sharer.id === user.id;
              })[0];

              sharer = sharer
                ? sharer
                : {
                    id: user.id || '',
                    amount: 0,
                  };
              return (
                <Fragment key={user.id}>
                  <ExpenseSettingSharer
                    user={user}
                    users={users}
                    sharer={sharer}
                    expenseData={expenseData}
                    setIsNotEqual={setIsNotEqual}
                    setCurrentExpense={setCurrentExpense}
                    isChecked={isChecked}
                  />
                </Fragment>
              );
            })}
        </>
      ) : null}
    </div>
  );
}
