//import react
import { useState } from 'react';
//import data
import {
  ExtendedExpense,
  Expense,
  GroupUser,
  Sharer,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { SharerCalculator } from '@/app/ui/group/expense/editAndAdd/Calculator';

interface SharerAmountInputProps {
  isChecked: boolean;
  users: GroupUser[];
  sharer: Sharer;
  user: GroupUser;
  expenseData: ExtendedExpense | Expense;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}

export function SharerAmountInput({
  isChecked,
  users,
  sharer,
  user,
  expenseData,
  setIsNotEqual,
  setCurrentExpense,
}: SharerAmountInputProps) {
  const [currentSharer, setCurrentSharer] = useState<Sharer>({
    id: '',
    amount: 0,
  });

  const updateAmount = (id: string, newAmount: number | string) => {
    let updatedSharersCopy = expenseData.sharers.map((sharer) =>
      sharer.id === id ? { ...sharer, amount: Number(newAmount) } : sharer
    );

    if (!expenseData.sharers.some((sharer) => sharer.id === id)) {
      updatedSharersCopy.push({ id, amount: Number(newAmount) });
    }

    updatedSharersCopy = updatedSharersCopy.filter(
      (sharer) => sharer.amount !== 0 && sharer.amount !== '' && sharer.amount !== 0
    );

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharersCopy,
    });
  };

  const handleInputFocus = () => {
    setCurrentSharer(sharer);
    if (sharer) {
      setCurrentSharer(sharer);
    } else {
      setCurrentSharer({
        id: user.id || '',
        amount: 0,
      });
    }
  };

  const handleInputBlur = (newValue: string) => {
    let value = newValue.replace(/^0+/, '');
    if (value === '' || Number(value) < 0) {
      value = '0';
    }
    updateAmount(user.id || '', value);
    sharer =
      sharer && String(sharer.amount).replace(/^0+/, '') !== ''
        ? sharer
        : {
            id: user.id || '',
            amount: 0,
          };
  };

  const handleInputChange = (newValue: string) => {
    let value = newValue;
    if (value === '' || Number(value) < 0) {
      value = '0';
    }
    updateAmount(user.id || '', value);
    setCurrentSharer({
      ...sharer,
      amount: Number(value),
    });
  };

  return (
    <>
      <SharerCalculator
        isChecked={isChecked}
        sharer={sharer}
        handleInputBlur={handleInputBlur}
        handleInputFocus={handleInputFocus}
        handleInputChange={handleInputChange}
        expenseData={expenseData}
        users={users}
        setIsNotEqual={setIsNotEqual}
        currentSharer={currentSharer}
      />
    </>
  );
}