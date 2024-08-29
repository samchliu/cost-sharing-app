'use client';
//import next and react
import { useState, useEffect } from 'react';
//import data
import {
  Expense,
  ExtendedExpense,
  GroupUser,
  Sharer,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import {
  TotalAmountCalculator,
  SharerAmountCalculator,
} from '@/app/ui/group/expense/editAndAdd/CalculatorDetail';
//import other
import { evaluate } from 'mathjs';

interface TotalProps {
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
  setisIncorrectTotalNum: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SharerProps {
  isChecked: boolean;
  sharer: Sharer;
  handleInputBlur: (newValue: string) => void;
  handleInputFocus: () => void;
  handleInputChange: (newValue: string) => void;
  expenseData: ExtendedExpense | Expense;
  users: GroupUser[];
  setIsNotEqual: React.Dispatch<React.SetStateAction<boolean>>;
  currentSharer: Sharer;
}

export const TotalCalculator = ({
  expenseData,
  setCurrentExpense,
  setisIncorrectTotalNum,
}: TotalProps) => {
  const [display, setDisplay] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  const updateDisplay = (updateDisplayString: string) => {
    setDisplay(updateDisplayString);
  };

  const allowedKeys = [
    'Backspace',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '(',
    ')',
    '+',
    '-',
    '*',
    '/',
    '%',
    '=',
    '.',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
  ];

  const [focusDisplay, setFocusDisplay] = useState(false);

  const onFocusDisplay = () => {
    setFocusDisplay(true);
  };

  const onBlurDisplay = () => {
    setFocusDisplay(false);
    const displayNumber = Number(display);
    const isValidNum = !isNaN(displayNumber) && displayNumber > 1;

    function evaluateExpression(expression: string) {
      let result;
      try {
        result = evaluate(expression);
      } catch (e) {
        result = expression;
      }
      return String(result);
    }

    const handleInputBlur = (newValue: string) => {
      let value = newValue.replace(/^0+/, '');
      if (value === '' || Number(value) < 0) {
        value = '0';
      }
      setCurrentExpense({ ...expenseData, amount: Number(value) });
    };

    if ((isValidNum && expenseData.amount !== displayNumber) || display === '') {
      return handleInputBlur(display);
    } else {
      const evaluatedDisplay = evaluateExpression(display);
      return handleInputBlur(evaluatedDisplay);
    }
  };

  const buttonClick = (num: string) => {
    if (num === 'Backspace') {
      let myString = String(display);

      myString = myString.split('').reverse().slice(1).reverse().join('');
      updateDisplay(myString);
    } else {
      updateDisplay(display + num);
    }
  };

  const equalClick = () => {
    try {
      if (display.length > 0) {
        const result = evaluate(display.replaceAll(',', ''));

        const hasDecimal = result % 1 !== 0;

        function hasTwoZeroesAfterDecimal(num: number) {
          let fixedNumStr = num.toFixed(2);
          let parts = fixedNumStr.split('.');

          return parts[1] === '00';
        }

        setDisplay(
          hasDecimal && !hasTwoZeroesAfterDecimal(result)
            ? result.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: false,
              })
            : result.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: false,
              })
        );
      }
    } catch (error) {
      setDisplay('錯誤，請再試一次');
      setTimeout(() => {
        setDisplay('');
      }, 1500);
    }
  };

  const clearClick = () => {
    setDisplay('');
  };

  const backspace = () => {
    setDisplay(display.slice(0, -1));
  };

  const opKey = (op: string | number) => {
    setDisplay(display + op);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (allowedKeys.includes(e.key) && showKeyboard) {
      switch (e.key) {
        case 'Backspace':
          !focusDisplay && backspace();
          break;
        case '=':
          e.preventDefault();
          equalClick();
          break;
        case 'Enter':
          e.preventDefault();
          equalClick();
          break;
        default:
          !focusDisplay && opKey(e.key);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    if (isNaN(Number(display)) || Number(display) < 1) {
      setisIncorrectTotalNum(true);
    } else {
      setisIncorrectTotalNum(false);
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <>
      <TotalAmountCalculator
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        expenseData={expenseData}
        display={display}
        setDisplay={setDisplay}
        updateDisplay={updateDisplay}
        onFocusDisplay={onFocusDisplay}
        onBlurDisplay={onBlurDisplay}
        buttonClick={buttonClick}
        equalClick={equalClick}
        clearClick={clearClick}
      />
    </>
  );
};

export const SharerCalculator = ({
  isChecked,
  sharer,
  handleInputBlur,
  handleInputFocus,
  handleInputChange,
  expenseData,
  users,
  setIsNotEqual,
  currentSharer,
}: SharerProps) => {
  const [display, setDisplay] = useState<string>('');
  const [showKeyboard, setShowKeyboard] = useState<boolean>(false);

  const updateDisplay = (updateDisplayString: string) => {
    setDisplay(updateDisplayString);
    handleInputChange(updateDisplayString);
  };

  const allowedKeys = [
    'Backspace',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '(',
    ')',
    '+',
    '-',
    '*',
    '/',
    '%',
    '=',
    '.',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
  ];

  const [focusDisplay, setFocusDisplay] = useState(false);

  const onFocusDisplay = () => {
    setFocusDisplay(true);
    handleInputFocus();
  };

  const onBlurDisplay = () => {
    setFocusDisplay(false);
    const displayNumber = Number(display);
    const isValidNum = !isNaN(displayNumber) && displayNumber > 1;

    function evaluateExpression(expression: string) {
      let result;
      try {
        result = evaluate(expression);
      } catch (e) {
        result = expression;
      }
      return String(result);
    }

    if ((isValidNum && sharer.amount !== displayNumber) || display === '') {
      return handleInputBlur(display);
    } else {
      const evaluatedDisplay = evaluateExpression(display);
      return handleInputBlur(evaluatedDisplay);
    }
  };

  const buttonClick = (num: string) => {
    if (num === 'Backspace') {
      let myString = String(display);

      myString = myString.split('').reverse().slice(1).reverse().join('');
      updateDisplay(myString);
    } else {
      updateDisplay(display + num);
    }
  };

  const equalClick = () => {
    try {
      if (display.length > 0) {
        const result = evaluate(display.replaceAll(',', ''));

        const hasDecimal = result % 1 !== 0;

        function hasTwoZeroesAfterDecimal(num: number) {
          let fixedNumStr = num.toFixed(2);
          let parts = fixedNumStr.split('.');

          return parts[1] === '00';
        }

        setDisplay(
          hasDecimal && !hasTwoZeroesAfterDecimal(result)
            ? result.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: false,
              })
            : result.toLocaleString('en-US', {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
                useGrouping: false,
              })
        );
      }
    } catch (error) {
      setDisplay('錯誤，請再試一次');
      setTimeout(() => {
        setDisplay('');
      }, 1500);
    }
  };

  const clearClick = () => {
    setDisplay('');
  };

  const backspace = () => {
    setDisplay(display.slice(0, -1));
  };

  const opKey = (op: string | number) => {
    setDisplay(display + op);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (allowedKeys.includes(e.key) && showKeyboard) {
      switch (e.key) {
        case 'Backspace':
          !focusDisplay && backspace();
          break;
        case '=':
          e.preventDefault();
          equalClick();
          break;
        case 'Enter':
          e.preventDefault();
          equalClick();
          break;
        default:
          !focusDisplay && opKey(e.key);
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <>
      <SharerAmountCalculator
        showKeyboard={showKeyboard}
        setShowKeyboard={setShowKeyboard}
        isChecked={isChecked}
        sharer={sharer}
        expenseData={expenseData}
        display={display}
        setDisplay={setDisplay}
        updateDisplay={updateDisplay}
        onFocusDisplay={onFocusDisplay}
        onBlurDisplay={onBlurDisplay}
        buttonClick={buttonClick}
        equalClick={equalClick}
        clearClick={clearClick}
        users={users}
        setIsNotEqual={setIsNotEqual}
        currentSharer={currentSharer}
      />
    </>
  );
};