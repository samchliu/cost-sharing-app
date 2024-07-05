'use client';
//import react
import { useState, useContext, useEffect, useRef } from 'react';
//import data
import { CalcContext } from '@/app/_components/frontendData/sharedFunction/CalcProvider';
//import ui
import { BackspaceIcon } from '@/app/ui/shareComponents/Icons';
//import other
import clsx from 'clsx';


export const CalculatorAndInput = ({ expenseData }: { expenseData: any }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);
  const inputRef = useRef<any>(null);

  const handleInputFocus = () => {
    inputRef.current.focus();
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    inputRef.current.blur();
  };

  const handleKeyboardFocus = () => {
    setShowKeyboard(true);
  };

  const handleKeyboardBlur = () => {
    //To check if the input element referenced by inputRef is currently focused
    if (inputRef.current && document.activeElement === inputRef.current) {
      return;
    }
    setShowKeyboard(false);
  };

  return (
    <div className="relative">
      <Display
        amount={expenseData.amount}
        handleKeyboardFocus={handleKeyboardFocus}
        handleKeyboardBlur={handleKeyboardBlur}
        inputRef={inputRef}
      />
      {showKeyboard && (
        <Calculator
          handleKeyboardBlur={handleKeyboardBlur}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
        />
      )}
    </div>
  );
};

function Display({
  amount,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
}: {
  amount: string;
  handleKeyboardFocus: any;
  handleKeyboardBlur: any;
  inputRef: any;
}) {
  const { display, setDisplay, updateDisplay, onFocusDisplay, onBlurDisplay } =
    useContext<any>(CalcContext);

  useEffect(() => {
    if (amount) {
      setDisplay(Number(amount));
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
        handleKeyboardFocus();
        onFocusDisplay();
      }}
      onBlur={() => {
        //setTimeout to make sure handleKeyboardBlur function happened after inputRef is focus by keyboard
        setTimeout(() => {
          handleKeyboardBlur();
        }, 100);
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
  handleKeyboardBlur,
  handleInputFocus,
  handleInputBlur,
}: {
  handleKeyboardBlur: any;
  handleInputFocus: any;
  handleInputBlur: any;
}) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

  const { buttonClick, equalClick, clearClick } = useContext<any>(CalcContext);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent): void => {
      if (keyboardRef.current && !keyboardRef.current.contains(e.target as Node)) {
        handleKeyboardBlur();
      }
    };

    const eventType = 'ontouchstart' in window ? 'touchstart' : 'mousedown';
    // Bind the event listener
    document.addEventListener(eventType, handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener(eventType, handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={keyboardRef}
      id="calculator"
      className="fixed bottom-0 left-[50%] flex h-[340px] w-screen translate-x-[-50%] flex-col justify-center bg-highlight-50"
      onClick={handleInputFocus}
    >
      <div className="flex items-center justify-center">
        <CalculatorButton value={'1'} onClick={() => buttonClick('1')} />
        <CalculatorButton value={'2'} onClick={() => buttonClick('2')} />
        <CalculatorButton value={'3'} onClick={() => buttonClick('3')} />
        <CalculatorButton value={'÷'} onClick={() => buttonClick('/')} />
        <CalculatorButton value={'×'} onClick={() => buttonClick('*')} />
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
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            equalClick();
            handleKeyboardBlur();
            handleInputBlur();
          }}
          className="m-[5px] flex h-14 w-[122px] cursor-pointer items-center justify-center rounded-lg bg-highlight-60"
        >
          確認
        </button>
      </div>
    </div>
  );
};

const CalculatorButton = ({ value, onClick }: { value: any; onClick: any }) => {
  const isNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'AC'].includes(value);

  const isCalculator = ['÷', '×', '-', '+', '='].includes(value);
  return (
    <button
      type="button"
      className={clsx('m-[5px] flex h-14 w-14 items-center justify-center rounded-lg font-medium', {
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