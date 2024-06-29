'use client';
import { useState, createContext, useEffect } from 'react';
import { evaluate } from 'mathjs';

interface AllContextType {
  display: string;
  setDisplay: any;
  updateDisplay: (e: any) => void;
  onFocusDisplay: () => void;
  onBlurDisplay: () => void;
  buttonClick: (num: any) => void;
  equalClick: () => void;
  clearClick: () => void;
  setFocusDisplay: any;
}

export const CalcContext = createContext<AllContextType | null>(null);

export const CalcProvider = ({ children }: { children: React.ReactNode }) => {
  const [display, setDisplay] = useState('');

  const updateDisplay = (e: any) => {
    setDisplay(e);
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
  };

  const buttonClick = (num: any) => {
    // const keyPressEvent = new KeyboardEvent('keydown', { key: num })
    // document.dispatchEvent(keyPressEvent);
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

        // Determine whether there are non-zero digits after the decimal point
        const hasDecimal = result % 1 !== 0;

        // Set the displayed content
        setDisplay(
          hasDecimal
            ? result.toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 8,
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
      setDisplay('語法錯誤，請再試一次');
      setTimeout(() => {
        setDisplay('');
      }, 1500);
    }
  };

  const clearClick = () => {
    setDisplay('');
  };

  //
  // The next functions & useEffect allow users to manipulate the calculator using the keyboard
  //

  const backspace = () => {
    setDisplay(display.slice(0, -1));
  };

  const opKey = (op: any) => {
    setDisplay(display + op);
  };

  const handleKeyDown = (e: any) => {
    if (allowedKeys.includes(e.key)) {
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
    // else {
    //     e.preventDefault()
    // }
  };

  useEffect(() => {
    document.addEventListener('click', handleKeyDown);
    return () => document.removeEventListener('click', handleKeyDown);
  });

  //
  //
  //

  return (
    <CalcContext.Provider
      value={{
        display,
        setDisplay,
        updateDisplay,
        onFocusDisplay,
        onBlurDisplay,
        buttonClick,
        equalClick,
        clearClick,
        setFocusDisplay,
      }}
    >
      {children}
    </CalcContext.Provider>
  );
};