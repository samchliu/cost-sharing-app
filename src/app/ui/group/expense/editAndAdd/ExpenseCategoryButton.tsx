'use client';
//import from next & react
import Link from 'next/link';
import { useState, useRef, useEffect, Fragment, FC } from 'react';
//import data
import {
  ExpenseCategory,
  ExtendedExpense,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { expenseIconMap } from '@/app/ui/shareComponents/Icons';
//import other
import clsx from 'clsx';

interface ExpenseCategoryButtonProps {
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}

interface DisplayProps {
  category: string;
  display: string | number;
  setDisplay: React.Dispatch<React.SetStateAction<string | number>>;
  handleKeyboardFocus: () => void;
  handleKeyboardBlur: () => void;
  inputRef: React.RefObject<HTMLAnchorElement>;
}

interface KeyboardProps {
  showKeyboard: boolean;
  handleKeyboardBlur: () => void;
  handleInputFocus: () => void;
  setDisplay: React.Dispatch<React.SetStateAction<string | number>>;
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}

interface CategoryButtonProps {
  Icon: FC<{ strokeWidth: number }>;
  category: { category: ExpenseCategory; title: string };
  setDisplay: React.Dispatch<React.SetStateAction<string | number>>;
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}

export default function ExpenseCategoryButton({
  expenseData,
  setCurrentExpense,
}: ExpenseCategoryButtonProps) {
  const [display, setDisplay] = useState<string | number>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);
  const inputRef = useRef<HTMLAnchorElement>(null);
  const { category } = expenseData;

  const handleInputFocus = () => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  };

  const handleKeyboardFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyboardBlur = () => {
    if (inputRef.current && document.activeElement === inputRef.current) {
      return;
    }
    setShowKeyboard(false);
  };

  return (
    <div>
      <Display
        display={display}
        category={category}
        setDisplay={setDisplay}
        handleKeyboardFocus={handleKeyboardFocus}
        handleKeyboardBlur={handleKeyboardBlur}
        inputRef={inputRef}
      />
      <Keyboard
        showKeyboard={showKeyboard}
        handleKeyboardBlur={handleKeyboardBlur}
        handleInputFocus={handleInputFocus}
        setDisplay={setDisplay}
        expenseData={expenseData}
        setCurrentExpense={setCurrentExpense}
      />
    </div>
  );
}

function Display({
  category,
  display,
  setDisplay,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
}: DisplayProps) {
  useEffect(() => {
    if (category) {
      setDisplay(category);
    }
  }, [category]);

  const SelectIcon = expenseIconMap[display as keyof typeof expenseIconMap];

  return (
    <>
      <Link
        href="#"
        ref={inputRef}
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60 outline-none focus:border-0 focus:ring-0"
        onClick={handleKeyboardFocus}
        onBlur={() => {
          setTimeout(() => {
            handleKeyboardBlur();
          }, 0);
        }}
        onMouseOut={() => {
          setTimeout(() => {
            handleKeyboardBlur();
          }, 0);
        }}
        id="display"
      >
        {SelectIcon ? <SelectIcon strokeWidth={1.2} /> : null}
      </Link>
    </>
  );
}

const Keyboard = ({
  showKeyboard,
  handleKeyboardBlur,
  handleInputFocus,
  setDisplay,
  expenseData,
  setCurrentExpense,
}: KeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null);
  const allCategory: { category: ExpenseCategory; title: string }[] = [
    {
      category: 'food',
      title: '吃的',
    },
    {
      category: 'drink',
      title: '喝的',
    },
    {
      category: 'transport',
      title: '交通',
    },
    {
      category: 'stay',
      title: '住宿',
    },
    {
      category: 'shopping',
      title: '購物',
    },
    {
      category: 'entertainment',
      title: '娛樂',
    },
    {
      category: 'other',
      title: '其他',
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
      if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {
        handleKeyboardBlur();
      }
    };

    const eventType = 'ontouchstart' in window ? 'touchstart' : 'mousedown';

    document.addEventListener(eventType, handleClickOutside);

    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, []);

  return (
    <div
      onClick={handleInputFocus}
      className={clsx(
        'fixed left-[50%] flex h-[340px] w-screen translate-x-[-50%] flex-col justify-start bg-highlight-50 transition-all duration-300',
        {
          'bottom-0 z-50 transform opacity-100': showKeyboard,
          'bottom-[-20px] -z-50 transform opacity-0': !showKeyboard,
        }
      )}
    >
      <div className="mb-8 mt-5 text-center text-white">選擇類別</div>
      <div className="flex flex-wrap items-center justify-start gap-y-3 px-4">
        {allCategory.map((category, idx) => {
          const Icon: FC<{ strokeWidth: number }> =
            expenseIconMap[category['category'] as keyof typeof expenseIconMap];

          return (
            <Fragment key={idx}>
              <CategoryButton
                Icon={Icon}
                category={category}
                setDisplay={setDisplay}
                expenseData={expenseData}
                setCurrentExpense={setCurrentExpense}
              />
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

const CategoryButton = ({
  Icon,
  category,
  setDisplay,
  expenseData,
  setCurrentExpense,
}: CategoryButtonProps) => {
  return (
    <button
      type="button"
      onClick={() => {
        setDisplay(category['category']);
        setCurrentExpense({
          ...expenseData,
          category: category['category'],
        });
      }}
      className="flex basis-1/5 flex-col items-center gap-1"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[12px] bg-highlight-60">
        <Icon strokeWidth={1.6} />
      </div>
      <div className="text-sm text-white">{category['title']}</div>
    </button>
  );
};