import {
  ExtendedExpense,
  Expense,
  GroupUser,
} from '@/app/_components/frontendData/sharedFunction/types';

interface Props {
  expenseData: ExtendedExpense| Expense;
  users: GroupUser[] | '';
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}

export default function SelectSharerButton({ expenseData, users, setCurrentExpense }: Props) {
  
  const handleAllSelect = () => {
    const totalAmount = Number(expenseData.amount);
    const numberOfSharers = users.length;

    const baseAmount = (totalAmount / numberOfSharers).toFixed(2);
    const baseAmountNumber = parseFloat(baseAmount);
    const updatedSharersCopy = users
      ? users.map((user) => ({
          id: user.id || '',
          amount: baseAmountNumber,
        }))
      : [];

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharersCopy,
    });
  };

  const handleAllNoSelect = () => {
    setCurrentExpense({
      ...expenseData,
      sharers: [],
    });
  };
  return (
    <>
      {expenseData.sharers.length === users.length ? (
        <div
          onClick={handleAllNoSelect}
          className="flex w-12 cursor-pointer justify-center text-xs"
        >
          取消全選
        </div>
      ) : (
        <div onClick={handleAllSelect} className="flex w-12 cursor-pointer justify-center text-xs">
          全選
        </div>
      )}
    </>
  );
}