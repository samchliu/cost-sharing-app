//import react
import { useEffect, useState } from 'react';
//import data
import { ExtendedExpense, Expense, GroupUser, Sharer } from '@/app/_components/frontendData/sharedFunction/types';

interface SharerAmountHintProps {
  users: GroupUser[];
  expenseData: ExtendedExpense | Expense;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  currentSharer: Sharer;
  display: string;
}

export function SharerAmountHint({ users, expenseData, setIsNotEqual, currentSharer, display }: SharerAmountHintProps) {
  const [addedAmount, setAddedAmount] = useState<string>('')

  useEffect(() => {
    const displayValue = display;
    let newSharers = expenseData?.sharers
    let newAmount = expenseData?.sharers.reduce(
      (total, sharer) => total + Number(sharer.amount),
      0
    );

    if (!isNaN(Number(displayValue)) && Number(displayValue) > 0 && Number(displayValue) !== 0 && !displayValue.includes('-')) {
      newSharers = expenseData?.sharers.map((sharer) => {
        return sharer.id === currentSharer.id
          ? { ...sharer, amount: Number(displayValue) }
          : sharer
      })

      newAmount = newSharers.reduce(
        (total, sharer) => {
          return total + Number(sharer.amount)
        },
        0
      );
      setAddedAmount(String(newAmount));
      const difference = Math.abs(Number(expenseData?.amount) - Number(String(newAmount)));

      const isNotEqual = difference >= 0.1;

      if (isNaN(newAmount)) {

        setIsNotEqual(true);
      } else {
        setIsNotEqual(isNotEqual);
      }


    } else if (displayValue === "") {
      newSharers = expenseData?.sharers.map((sharer) => {
        return sharer.id === currentSharer.id
          ? { ...sharer, amount: 0 }
          : sharer
      })

      newAmount = newSharers.reduce(
        (total, sharer) => total + Number(sharer.amount),
        0
      );
      setAddedAmount(String(newAmount));
      const difference = Math.abs(Number(expenseData?.amount) - Number(String(newAmount)));

      const isNotEqual = difference >= 0.1;

      if (isNaN(newAmount)) {

        setIsNotEqual(true);
      } else {
        setIsNotEqual(isNotEqual);
      }
    } else {

      setAddedAmount('no');

      setIsNotEqual(true);
    }

  }, [display, expenseData?.sharers])

  const remainingAmount = expenseData && Number(expenseData.amount) - Number(addedAmount);
  const adjustedRemainingAmount = Math.abs(remainingAmount) < 0.1 ? 0 : remainingAmount;


  return (
    <div
      className='absolute top-[-28px] w-full py-3 bg-highlight-50 flex flex-col items-center'
    >
      <div className="text-white flex justify-center">
        <div className="max-w-[30%] truncate h-fit">{users &&
          users.filter((user) => {
            return user.id === currentSharer.id;
          })[0]?.name
        }&nbsp;</div>
        <div>
          負擔 ${expenseData.amount} 中的 ${display}
        </div>

      </div>
      <div className="text-sm text-white">
        {!isNaN(Number(addedAmount)) && (!isNaN(Number(display)) && String(Number(display)) !== "") ? <>
          {adjustedRemainingAmount > 0
            ? `還剩下$${adjustedRemainingAmount}還沒被分帳`
            : `目前分帳金額多出$${Math.abs(adjustedRemainingAmount)}`}
        </> : '計算中'}

      </div>
    </div>
  );
};