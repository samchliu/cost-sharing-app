'use client';
import { useContext, useEffect, useRef } from 'react';
import { CalcContext, CalcProvider } from '@/app/_components/frontendData/CalcProvider';

import clsx from 'clsx';
import { BackspaceIcon } from '@/app/ui/shareComponents/Icons';

export const CalculatorAndInput = ({
  group,
  showKeyboard,
  setShowKeyboard,
  expenseData,
  setCurrentExpense,
  setIsNotEqual,
}: {
  group: any;
  showKeyboard: any;
  setShowKeyboard: any;
  expenseData: any;
  setCurrentExpense: any;
  setIsNotEqual: any;
}) => {
  const inputRef = useRef<any>(null);

  const focus = () => {
    inputRef.current.focus();
  };
  const blur = () => {
    inputRef.current.blur();
  };

  const handleFocus = () => {
    setShowKeyboard(true);
  };

  const handleBlur = () => {
    setShowKeyboard(false);
  };

  return (
    <CalcProvider>
      <div className="relative">
        <Display
          amount={expenseData.amount}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          inputRef={inputRef}
        />
        {showKeyboard && (
          <Calculator
            group={group}
            handleBlur={handleBlur}
            expenseData={expenseData}
            setCurrentExpense={setCurrentExpense}
            setIsNotEqual={setIsNotEqual}
            focus={focus}
            blur={blur}
          />
        )}
      </div>
    </CalcProvider>
  );
};

function Display({
  amount,
  handleFocus,
  handleBlur,
  inputRef,
}: {
  amount: string;
  handleFocus: any;
  handleBlur: any;
  inputRef: any;
}) {
  const { display, setDisplay, updateDisplay, onFocusDisplay, onBlurDisplay } =
    useContext<any>(CalcContext);

  useEffect(() => {
    if (amount) {
      setDisplay(amount);
    }
  }, [amount]);

  const handleChange = (e: any) => {
    console.log(e.target.value);
    updateDisplay(e.target.value);
  };

  return (
    <input
      ref={inputRef}
      className="z-10 w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0 "
      onChange={handleChange}
      onFocus={() => {
        handleFocus();
        onFocusDisplay();
      }}
      onBlur={() => {
        onBlurDisplay();
      }}
      type="text"
      inputMode="none"
      id="display"
      value={display}
    />
  );
}

const Calculator = ({
  group,
  handleBlur,
  expenseData,
  setCurrentExpense,
  setIsNotEqual,
  focus,
  blur,
}: {
  group: any;
  handleBlur: any;
  expenseData: any;
  setCurrentExpense: any;
  setIsNotEqual: any;
  focus: any;
  blur: any;
}) => {
  const { display, buttonClick, equalClick, clearClick } = useContext<any>(CalcContext);
  const users = group.users;

  const CheckAmountIsNotEqual = () => {
    let addedAmount = 0;

    users.forEach((user: any) => {
      const existingIndex = expenseData.sharers.findIndex((sharer: any) => sharer.id === user.id);

      if (existingIndex !== -1) {
        addedAmount += expenseData.sharers[existingIndex].amount;
      } else {
        addedAmount = addedAmount;
      }
    });

    setIsNotEqual(Number(display) !== addedAmount);
  };

  return (
    <div
      id="calculator"
      className="fixed bottom-0 left-[50%] flex h-[340px] w-screen translate-x-[-50%] flex-col justify-center bg-black"
      onClick={focus}
    >
      <div className="flex items-center justify-center">
        <CalculatorButton value={'1'} onClick={() => buttonClick('1')} />
        <CalculatorButton value={'2'} onClick={() => buttonClick('2')} />
        <CalculatorButton value={'3'} onClick={() => buttonClick('3')} />
        <CalculatorButton value={'÷'} onClick={() => buttonClick('/')} />
        <CalculatorButton value={'x'} onClick={() => buttonClick('*')} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'4'} onClick={() => buttonClick('4')} />
        <CalculatorButton value={'5'} onClick={() => buttonClick('5')} />
        <CalculatorButton value={'6'} onClick={() => buttonClick('6')} />
        <CalculatorButton value={'-'} onClick={() => buttonClick('-')} />
        <CalculatorButton value={'+'} onClick={() => buttonClick('+')} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'7'} onClick={() => buttonClick('7')} />
        <CalculatorButton value={'8'} onClick={() => buttonClick('8')} />
        <CalculatorButton value={'9'} onClick={() => buttonClick('9')} />
        <CalculatorButton value={'='} onClick={() => equalClick()} />
        <CalculatorButton value={'AC'} onClick={() => clearClick()} />
      </div>
      <div className="flex items-center justify-center">
        <CalculatorButton value={'.'} onClick={() => buttonClick('.')} />
        <CalculatorButton value={'0'} onClick={() => buttonClick('0')} />
        <CalculatorButton value={'<-'} onClick={() => buttonClick('Backspace')} />
        <button
          disabled={isNaN(Number(display)) || display < 1}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleBlur();
            setCurrentExpense({ ...expenseData, amount: display });
            CheckAmountIsNotEqual();
            blur();
          }}
          className="m-[5px] flex h-14 w-[122px] cursor-pointer items-center justify-center rounded-lg bg-highlight-60"
        >
          儲存
        </button>
      </div>
    </div>
  );
};

const CalculatorButton = ({ value, onClick }: { value: any; onClick: any }) => {
  const isNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'AC'].includes(value);

  const isCalculator = ['÷', 'x', '-', '+', '='].includes(value);
  return (
    <button
      type="button"
      className={clsx('m-[5px] flex h-14 w-14 items-center justify-center rounded-lg', {
        'bg-highlight-40': isCalculator,
        'bg-neutrals-20': isNum || value === '<-',
      })}
      onClick={onClick}
    >
      {value !== '<-' ? (
        value
      ) : (
        <div className="relative left-[-2px]">
          <BackspaceIcon />
        </div>
      )}
    </button>
  );
};