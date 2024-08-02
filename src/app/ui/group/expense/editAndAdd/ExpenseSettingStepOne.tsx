//import ui
import { CalculatorAndInput } from './Calculator';
import DatePickerButton from './DatePickerButton';
import ExpenseCategoryButton from './ExpenseCategoryButton';
//other
import clsx from 'clsx';
import NoteButton from './NoteButton';

interface SettingExpense {
  id: string;
  name: undefined;
  category: undefined;
  amount: number | string;
  date: undefined;
  note: undefined;
  payerId: string;
  sharers: {
    id: string;
    amount: number;
  }[];
}

interface AddingExpense {
  name: string;
  category: string;
  amount: number | string;
  date: string;
  note: string;
  payerId: string;
  sharers: {
    id: string;
    amount: number;
  }[];
}

interface ExpenseSettingStepOneProps {
  group?: any;
  expenseData?: SettingExpense | AddingExpense;
  setCurrentExpense: any;
  phase: number;
}

export function ExpenseSettingStepOne({
  group,
  expenseData,
  setCurrentExpense,
  phase,
}: ExpenseSettingStepOneProps) {
  const date = expenseData?.date || '';
  const name = expenseData?.name || '';

  return (
    <div
      className={clsx('mx-auto my-6 w-fit', {
        hidden: phase !== 1,
      })}
    >
      {group && expenseData ? (
        <>
          <div className="mb-4">
            <DatePickerButton
              date={date}
              expenseData={expenseData}
              setCurrentExpense={setCurrentExpense}
            />
          </div>
          <div className="my-3 flex items-end justify-between gap-6">
            <ExpenseCategoryButton
              setCurrentExpense={setCurrentExpense}
              expenseData={expenseData}
            />
            <input
              className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
              onChange={() => {}}
              onBlur={(e) => {
                setCurrentExpense({
                  ...expenseData,
                  name: e.target.value,
                });
              }}
              type="text"
              defaultValue={name}
            />
          </div>
          <div className="my-3">
            <CalculatorAndInput expenseData={expenseData} />
          </div>
          <NoteButton expenseData={expenseData} setCurrentExpense={setCurrentExpense} />
        </>
      ) : null}
    </div>
  );
}