'use client';
//import react
import { useEffect, useRef } from 'react';
//import data
import {
  ExtendedExpense,
  Expense,
  Sharer,
  GroupUser,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { BackspaceIcon, DollarIcon } from '@/app/ui/shareComponents/Icons';
import { SharerAmountHint } from '@/app/ui/group/expense/editAndAdd/SharerAmountHint';
//import other
import clsx from 'clsx';

interface SharedCalculatorProps {
  display: string;
  setDisplay: React.Dispatch<React.SetStateAction<string>>;
  updateDisplay: (updateDisplayString: string) => void;
  onFocusDisplay: () => void;
  onBlurDisplay: () => void;
}

interface ButtonClickHandlers {
  buttonClick: (num: string) => void;
  equalClick: () => void;
  clearClick: () => void;
}

interface TotalAmountCalculatorProps extends SharedCalculatorProps, ButtonClickHandlers {
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
  expenseData: ExtendedExpense | Expense;
}

interface SharerAmountCalculatorProps extends SharedCalculatorProps, ButtonClickHandlers {
  showKeyboard: boolean;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
  isChecked: boolean;
  expenseData: ExtendedExpense | Expense;
  sharer: Sharer;
  users: GroupUser[];
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  currentSharer: Sharer;
}

interface TotalDisplayProps extends SharedCalculatorProps {
  amount: number | string;
  handleKeyboardFocus: () => void;
  handleKeyboardBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface SharerDisplayProps extends SharedCalculatorProps {
  id: string;
  isChecked: boolean;
  amount: number | string;
  handleKeyboardFocus: () => void;
  handleKeyboardBlur: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

interface TotalCalculatorKeyboardProps extends ButtonClickHandlers {
  showKeyboard: boolean;
  handleKeyboardBlur: () => void;
  handleInputFocus: () => void;
  handleInputBlur: () => void;
}
interface SharerCalculatorKeyboardProps extends TotalCalculatorKeyboardProps {
  users: GroupUser[];
  expenseData: ExtendedExpense | Expense;
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  currentSharer: Sharer;
  display: string;
}

interface CalculatorButtonProps {
  value: string;
  onClick: () => void;
}

export const TotalAmountCalculator = ({
  showKeyboard,
  setShowKeyboard,
  expenseData,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
  buttonClick,
  equalClick,
  clearClick,
}: TotalAmountCalculatorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFocus = () => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    inputRef.current?.blur();
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
    <div className="flex w-fit items-end justify-between gap-6">
      <button
        type="button"
        onClick={handleInputFocus}
        className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60"
      >
        <DollarIcon />
      </button>
      <div className="relative w-48">
        <TotalDisplay
          amount={expenseData.amount}
          handleKeyboardFocus={handleKeyboardFocus}
          handleKeyboardBlur={handleKeyboardBlur}
          inputRef={inputRef}
          display={display}
          setDisplay={setDisplay}
          updateDisplay={updateDisplay}
          onFocusDisplay={onFocusDisplay}
          onBlurDisplay={onBlurDisplay}
        />
        <TotalCalculatorKeyboard
          showKeyboard={showKeyboard}
          handleKeyboardBlur={handleKeyboardBlur}
          handleInputFocus={handleInputFocus}
          handleInputBlur={handleInputBlur}
          buttonClick={buttonClick}
          equalClick={equalClick}
          clearClick={clearClick}
        />
      </div>
    </div>
  );
};

export const SharerAmountCalculator = ({
  showKeyboard,
  setShowKeyboard,
  isChecked,
  sharer,
  expenseData,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
  buttonClick,
  equalClick,
  clearClick,
  users,
  setIsNotEqual,
  currentSharer,
}: SharerAmountCalculatorProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (showKeyboard && inputRef.current?.id === sharer.id) {
        const element = document.getElementById(inputRef.current?.id);
        const yOffset = -200;

        if (element) {
          const y = element.getBoundingClientRect().bottom + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sharer, showKeyboard, inputRef.current]);

  const handleInputFocus = () => {
    inputRef.current?.focus();
    setShowKeyboard(true);
  };

  const handleInputBlur = () => {
    inputRef.current?.blur();
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
    <div className="relative w-20">
      <SharerDisplay
        id={sharer.id}
        isChecked={isChecked}
        amount={sharer.amount}
        handleKeyboardFocus={handleKeyboardFocus}
        handleKeyboardBlur={handleKeyboardBlur}
        inputRef={inputRef}
        display={display}
        setDisplay={setDisplay}
        updateDisplay={updateDisplay}
        onFocusDisplay={onFocusDisplay}
        onBlurDisplay={onBlurDisplay}
      />

      <SharerCalculatorKeyboard
        showKeyboard={showKeyboard}
        handleKeyboardBlur={handleKeyboardBlur}
        handleInputFocus={handleInputFocus}
        handleInputBlur={handleInputBlur}
        buttonClick={buttonClick}
        equalClick={equalClick}
        clearClick={clearClick}
        users={users}
        expenseData={expenseData}
        setIsNotEqual={setIsNotEqual}
        currentSharer={currentSharer}
        display={display}
      />
    </div>
  );
};

function TotalDisplay({
  amount,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
}: TotalDisplayProps) {
  useEffect(() => {
    if (amount || amount === '') {
      setDisplay(String(amount));
    }
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDisplay(e.target.value);
  };

  const handleFocus = () => {
    handleKeyboardFocus();
    onFocusDisplay();
  };

  const handleBlur = () => {
    setTimeout(() => handleKeyboardBlur(), 100);
    onBlurDisplay();
  };

  return (
    <input
      ref={inputRef}
      className="z-10 w-full border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type="text"
      inputMode="none"
      id="totalDisplay"
      value={display}
    />
  );
}

function SharerDisplay({
  id,
  isChecked,
  amount,
  handleKeyboardFocus,
  handleKeyboardBlur,
  inputRef,
  display,
  setDisplay,
  updateDisplay,
  onFocusDisplay,
  onBlurDisplay,
}: SharerDisplayProps) {
  useEffect(() => {
    if (amount || amount === '') {
      setDisplay(String(amount));
    }

    if (!isChecked) {
      setDisplay('');
    }
  }, [amount]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateDisplay(e.target.value);
  };

  const handleFocus = () => {
    handleKeyboardFocus();
    onFocusDisplay();
  };

  const handleBlur = () => {
    setTimeout(() => handleKeyboardBlur(), 100);
    onBlurDisplay();
  };

  return (
    <input
      ref={inputRef}
      className="z-10 w-full border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      type="text"
      inputMode="none"
      id={id}
      value={display}
      maxLength={10}
    />
  );
}

const TotalCalculatorKeyboard = ({
  showKeyboard,
  handleKeyboardBlur,
  handleInputFocus,
  handleInputBlur,
  buttonClick,
  equalClick,
  clearClick,
}: TotalCalculatorKeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

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
  }, [handleKeyboardBlur]);

  return (
    <div
      ref={keyboardRef}
      id="totalCalculatorKeyboard"
      className={clsx(
        'fixed bottom-0 left-[50%] flex h-[340px] w-screen min-w-[320px] translate-x-[-50%] flex-col justify-center bg-highlight-50  transition-all duration-300',
        {
          'bottom-0 z-50 transform opacity-100': showKeyboard,
          'bottom-[-20px] -z-50 transform opacity-0': !showKeyboard,
        }
      )}
      onClick={handleInputFocus}
    >
      <div className="flex items-center justify-center">
        {['1', '2', '3'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
        {['÷', '×'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '×' ? buttonClick('*') : buttonClick('/'))}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['4', '5', '6', '-', '+'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['7', '8', '9'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
        {['=', 'AC'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '=' ? equalClick() : clearClick())}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['.', '0', '<-'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '<-' ? buttonClick('Backspace') : buttonClick(value))}
          />
        ))}
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

const SharerCalculatorKeyboard = ({
  showKeyboard,
  handleKeyboardBlur,
  handleInputFocus,
  handleInputBlur,
  buttonClick,
  equalClick,
  clearClick,
  users,
  expenseData,
  setIsNotEqual,
  currentSharer,
  display,
}: SharerCalculatorKeyboardProps) => {
  const keyboardRef = useRef<HTMLDivElement>(null);

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
  }, [handleKeyboardBlur]);

  return (
    <div
      ref={keyboardRef}
      id="sharerCalculatorKeyboard"
      className={clsx(
        'fixed bottom-0 left-[50%] flex h-[340px] w-screen min-w-[320px] translate-x-[-50%] flex-col justify-center bg-highlight-50  transition-all duration-300',
        {
          'bottom-0 z-50 transform opacity-100': showKeyboard,
          'bottom-[-20px] -z-50 transform opacity-0': !showKeyboard,
        }
      )}
      onClick={handleInputFocus}
    >
      <SharerAmountHint
        users={users}
        expenseData={expenseData}
        setIsNotEqual={setIsNotEqual}
        currentSharer={currentSharer}
        display={display}
      />
      <div className="flex items-center justify-center">
        {['1', '2', '3'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
        {['÷', '×'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '×' ? buttonClick('*') : buttonClick('/'))}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['4', '5', '6', '-', '+'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['7', '8', '9'].map((value) => (
          <CalculatorButton key={value} value={value} onClick={() => buttonClick(value)} />
        ))}
        {['=', 'AC'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '=' ? equalClick() : clearClick())}
          />
        ))}
      </div>
      <div className="flex items-center justify-center">
        {['.', '0', '<-'].map((value) => (
          <CalculatorButton
            key={value}
            value={value}
            onClick={() => (value === '<-' ? buttonClick('Backspace') : buttonClick(value))}
          />
        ))}
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

const CalculatorButton = ({ value, onClick }: CalculatorButtonProps) => {
  const isNum = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'AC'].includes(value);
  const isOperator = ['÷', '×', '-', '+', '='].includes(value);

  return (
    <button
      type="button"
      className={clsx('m-[5px] flex h-14 w-14 items-center justify-center rounded-lg font-medium', {
        'bg-highlight-40': isOperator,
        'bg-neutrals-20': isNum || value === '<-',
      })}
      onClick={onClick}
    >
      {value !== '<-' ? value : <BackspaceIcon />}
    </button>
  );
};
