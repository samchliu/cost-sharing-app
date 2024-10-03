//import from next & react
import Image from 'next/image';
//import data
import {
  ExtendedExpense,
  Expense,
  GroupUser,
  Sharer,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { SharerAmountInput } from './SharerAmountInput';

interface Props {
    user: GroupUser;
    users: GroupUser[];
    sharer: Sharer;
    expenseData: ExtendedExpense | Expense;
    setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
    setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
    isChecked: boolean;
}

export default function ExpenseSettingSharer({ user, users, sharer, expenseData, setIsNotEqual, setCurrentExpense, isChecked }: Props) {

    const handleSharerToggle = (userId: string) => {
        const existingIndex = expenseData.sharers.findIndex(
            (sharer) => sharer.id === userId,
        );
        const updatedSharersCopy = [...expenseData.sharers];

        if (existingIndex !== -1) {
            updatedSharersCopy.splice(existingIndex, 1);
        } else {
            updatedSharersCopy.push({
                id: userId,
                amount: Number(expenseData.amount) / users.length,
            });
        }
        setCurrentExpense({
            ...expenseData,
            sharers: updatedSharersCopy
        })
    };

    return (
      <div className="my-2 flex w-full items-center justify-between px-7" key={user.id}>
        <div className="flex items-center gap-4">
          {user.adoptable === false ? (
            <Image
              className="h-12 w-12 rounded-full"
              src={user.picture === '' ? '/images/icons/newUserBG.svg' : user.picture}
              width={50}
              height={50}
              alt="user's picture"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-neutrals-20" />
          )}
          <div className="w-28 truncate">{user.name}</div>
        </div>
        <div className="flex items-center justify-between gap-7">
          <SharerAmountInput
            isChecked={isChecked}
            users={users}
            sharer={sharer}
            user={user}
            expenseData={expenseData}
            setIsNotEqual={setIsNotEqual}
            setCurrentExpense={setCurrentExpense}
          />
          <input
            className="relative h-5 w-5 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute 
          checked:before:left-[50%] checked:before:top-[50%] 
          checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] 
          checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60
           hover:checked:border-black focus:ring-transparent checked:focus:border-black"
            type="radio"
            id={user.name}
            name={user.name}
            value={user.name}
            onChange={() => {}}
            onClick={() => handleSharerToggle(user.id || '')}
            checked={isChecked}
          />
        </div>
      </div>
    );
}