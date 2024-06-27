//import ui
import { expenseIconMap, DollarIcon, NotePencilIcon } from '@/app/ui/shareComponents/Icons';
//other
import clsx from 'clsx';
import { CalculatorAndInput } from './Calculator';

export function ExpenseSettingStepOne({
  group,
  expenseData,
  setCurrentExpense,
  phase,
  showKeyboard,
  setShowKeyboard,
  setIsNotEqual,
}: {
  group: any;
  expenseData: any;
  setCurrentExpense: any;
  phase: number;
  showKeyboard: any;
  setShowKeyboard: any;
  setIsNotEqual: any;
}) {
  if (!expenseData) return;

  const {
    date,
    category,
    amount,
    name,
  }: {
    date: string;
    category:
      | 'food'
      | 'drink'
      | 'transport'
      | 'stay'
      | 'shopping'
      | 'entertainment'
      | 'other';
    amount: any;
    name: string;
  } = expenseData;




  const Icon = expenseIconMap[category];
  return (
    <div
      className={clsx('mx-auto my-6 w-fit', {
        hidden: phase !== 1,
      })}
    >
      <div className="mb-4 w-fit rounded-full bg-neutrals-20 px-2 py-[1px] text-sm">
        {date}
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          {Icon ? <Icon /> : null}
        </div>
        <input
          className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0 "
          onChange={() => {}}
          onBlur={(e)=>{
            setCurrentExpense({
              ...expenseData,
              name: e.target.value
            })
          }}
          type="text"
          defaultValue={name}
        />
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          <DollarIcon />
        </div>
        <CalculatorAndInput
          group={group}
          expenseData={expenseData}
          setCurrentExpense={setCurrentExpense}
          showKeyboard={showKeyboard}
          setShowKeyboard={setShowKeyboard}
          setIsNotEqual={setIsNotEqual}
        />
      </div>
      <div className="flex items-center justify-center gap-1 pb-0 pt-3 text-sm">
        <div>
          <NotePencilIcon />
        </div>
        <div>編輯備註</div>
      </div>
    </div>
  );
}
