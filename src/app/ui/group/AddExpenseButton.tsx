'use client';
//import ui
import { PlusIcon } from '@heroicons/react/24/outline';

export default function AddExpenseButton() {
  const handleAddExpense = () => {
    console.log('expense added');
  };

  return (
    <>
      <div
        onClick={handleAddExpense}
        className="fixed bottom-[45px] left-[50%] flex h-14 w-14 translate-x-[-50%] cursor-pointer items-center justify-center rounded-full bg-highlight-20"
      >
        <PlusIcon className="h-7 w-7 stroke-[2px]" />
      </div>
    </>
  );
}