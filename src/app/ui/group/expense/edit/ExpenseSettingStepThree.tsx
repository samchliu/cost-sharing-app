//import from next & react
import Image from 'next/image';
//import ui
import { NotePencilIcon } from '@/app/ui/shareComponents/Icons';
//other
import clsx from 'clsx';

export function ExpenseSettingStepThree({
  expenseData,
  setCurrentExpense,
  group,
  phase,
  setIsNotEqual,
}: {
  expenseData: any;
  setCurrentExpense: any;
  group: any;
  phase: number;
  setIsNotEqual: any;
}) {
  if (!expenseData) return null;

  const users = group.users;
  const updatedSharers = [...expenseData.sharers];

  const CheckAmountIsNotEqual = () => {
    let addedAmount = 0;

    users.forEach((user: any) => {
      const existingIndex = updatedSharers.findIndex(
        (sharer) => sharer.id === user.id,
      );

      if (existingIndex !== -1) {
        addedAmount += updatedSharers[existingIndex].amount;
      } else {
        addedAmount = addedAmount;
      }
    }); 

    setIsNotEqual(Number(expenseData.amount) !== Number(addedAmount));
  };

  const handleAllSelect = () => {
    users.forEach((user: any) => {
      const existingIndex = updatedSharers.findIndex(
        (sharer) => sharer.id === user.id,
      );

      if (existingIndex !== -1) {
        updatedSharers[existingIndex].amount =
          expenseData.amount / users.length;
      } else {
        updatedSharers.push({
          id: user.id,
          amount: expenseData.amount / users.length,
        });
      }
    });

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharers,
    });
    CheckAmountIsNotEqual();
  };

  const handleAllNoSelect = () => {
    users.forEach((user: any) => {
      const existingIndex = updatedSharers.findIndex(
        (sharer) => sharer.id === user.id,
      );

      if (existingIndex !== -1) {
        updatedSharers.splice(existingIndex, 1);
      }
    });

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharers,
    });
    CheckAmountIsNotEqual();
  };

  const handleSharerToggle = (userId: string) => {
    const existingIndex = updatedSharers.findIndex(
      (sharer) => sharer.id === userId,
    );

    if (existingIndex !== -1) {
      updatedSharers.splice(existingIndex, 1);
    } else {
      updatedSharers.push({
        id: userId,
        amount: expenseData.amount / users.length,
      });
    }

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharers,
    });
    CheckAmountIsNotEqual();
  };

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 3,
      })}
    >
      <div className="mx-auto mb-5 px-3 text-xl">選擇分帳成員</div>
      <div className="mb-3 mt-1 flex w-full items-center justify-end px-[14px]">
        <div className="flex gap-3">
          <div className="flex w-20 justify-center text-xs">
            <div className="scale-75">
              <NotePencilIcon />
            </div>
            負擔金額
          </div>
          {expenseData.sharers.length === users.length ? (
            <div
              onClick={handleAllNoSelect}
              className="flex w-12 cursor-pointer justify-center text-xs"
            >
              取消全選
            </div>
          ) : (
            <div
              onClick={handleAllSelect}
              className="flex w-12 cursor-pointer justify-center text-xs"
            >
              全選
            </div>
          )}
        </div>
      </div>
      {users.map((user: any) => {
        const isChecked = expenseData.sharers.some(
          (sharer: any) => sharer.id === user.id,
        );
        const amountValue = isChecked
          ? expenseData.sharers.filter(
              (sharer: any) => sharer.id === user.id,
            )[0].amount
          : '0';

        return (
          <div
            className="my-2 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
            </div>
            <div className="flex justify-between gap-10">
              <p className="text-sm text-neutrals-70">${amountValue}</p>
              <input
                className="relative h-5 w-5 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-transparent checked:focus:border-black"
                type="radio"
                id={user.name}
                name={user.name}
                value={user.name}
                onChange={() => {}}
                onClick={() => handleSharerToggle(user.id)} // Call handleSharerToggle on change
                checked={isChecked}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
