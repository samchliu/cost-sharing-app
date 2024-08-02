//import from next & react
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import ui
import { NotePencilIcon } from '@/app/ui/shareComponents/Icons';
//other
import clsx from 'clsx';

interface User {
  id: string;
  name: string;
  picture: string;
}

interface Sharer {
  id: string;
  amount: number;
}

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

interface ExpenseSettingStepThreeProps {
  expenseData: SettingExpense | AddingExpense;
  setCurrentExpense: (expense: SettingExpense | AddingExpense) => void;
  group: { users: User[] };
  phase: number;
  setIsNotEqual: (isNotEqual: boolean) => void;
}

export function ExpenseSettingStepThree({
  expenseData,
  setCurrentExpense,
  group,
  phase,
  setIsNotEqual,
}: ExpenseSettingStepThreeProps) {
  const users = group?.users || '';
  const [barBottom, setBarBottom] = useState('0');
  const [onFocus, setOnFocus] = useState(false);
  const [currentSharer, setCurrentSharer] = useState<any>({
    id: '',
    amount: '',
  });

  const addedAmount =
    expenseData?.sharers.reduce((total, sharer) => Number(total) + Number(sharer.amount), 0) || '';

  const remainingAmount = Number(expenseData.amount) - Number(addedAmount);
  const adjustedRemainingAmount = Math.abs(remainingAmount) < 0.1 ? 0 : remainingAmount;

  useEffect(() => {
    const difference = Math.abs(Number(expenseData?.amount) - Number(addedAmount));

    const isNotEqual = difference >= 0.1;

    // 设置 isNotEqual 的值
    setIsNotEqual(isNotEqual);

    const handleResize: any = () => {
      if (window.visualViewport) {
        const newBottom = `${window.innerHeight - window.visualViewport.height}px`;
        setBarBottom(newBottom);
      }
    };

    const throttle = (func: (...args: any[]) => void, limit: number) => {
      let lastFunc: NodeJS.Timeout | null = null;
      let lastRan: number | null = null;
      return function (...args: any[]) {
        if (!lastRan) {
          func(...args);
          lastRan = Date.now();
        } else {
          if (lastFunc) clearTimeout(lastFunc);
          lastFunc = setTimeout(
            function () {
              if (lastRan !== null && Date.now() - lastRan >= limit) {
                func(...args);
                lastRan = Date.now();
              }
            },
            limit - (lastRan !== null ? Date.now() - lastRan : 0)
          );
        }
      };
    };
    const handleResizeThrottled = throttle(handleResize, 50);

    if (typeof window !== 'undefined') {
      if (window.visualViewport) {
        handleResize(); // Initial setup
        window.visualViewport.addEventListener('resize', handleResizeThrottled);
        window.visualViewport.addEventListener('scroll', handleResizeThrottled);
        return () => {
          window.visualViewport?.removeEventListener('resize', handleResizeThrottled);
          window.visualViewport?.removeEventListener('scroll', handleResizeThrottled);
        };
      }
    }
  }, [expenseData?.sharers, expenseData?.amount, setIsNotEqual]);

  const handleAllSelect = () => {
    console.log('users are');
    console.log(users);

    const totalAmount = Number(expenseData.amount);
    const numberOfSharers = users.length;

    // Calculate the base amount each sharer gets, allowing for decimal values
    const baseAmount = (totalAmount / numberOfSharers).toFixed(2); // Keep 2 decimal places

    // Convert baseAmount to number for further calculations
    const baseAmountNumber = parseFloat(baseAmount);

    // Calculate the total distributed amount
    const totalDistributedAmount = baseAmountNumber * numberOfSharers;

    // Calculate the amount to be rounded off (remainder)
    const roundingDifference = totalAmount - totalDistributedAmount;

    // Create the updated sharers array
    const updatedSharersCopy = users.map((user) => ({
      id: user.id,
      amount: baseAmountNumber,
    }));

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

  const handleSharerToggle = (userId: string) => {
    const existingIndex = expenseData.sharers.findIndex((sharer) => sharer.id === userId);
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
      sharers: updatedSharersCopy,
    });
  };

  const updateAmount = (id: any, newAmount: any) => {
    let updatedSharersCopy = expenseData.sharers.map((sharer: any) =>
      sharer.id === id ? { ...sharer, amount: Number(newAmount) } : sharer
    );

    if (!expenseData.sharers.some((sharer: any) => sharer.id === id)) {
      updatedSharersCopy.push({ id, amount: Number(newAmount) });
    }

    updatedSharersCopy = updatedSharersCopy.filter(
      (sharer: any) => sharer.amount !== 0 && sharer.amount !== '' && sharer.amount !== '0'
    );

    setCurrentExpense({
      ...expenseData,
      sharers: updatedSharersCopy,
    });
  };

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 3,
      })}
    >
      {expenseData && group ? (
        <>
          <div className="mx-auto mb-5 px-3 text-xl">選擇分帳成員</div>
          <div className="mb-3 mt-1 flex w-full items-center justify-end px-[14px]">
            <div className="flex gap-3">
              <div className="flex w-20 cursor-pointer justify-center text-xs">
                <div className="scale-75">
                  <NotePencilIcon />
                </div>
                <div>負擔金額</div>
              </div>
              {expenseData.sharers.length === users.length ? (
                <div
                  onClick={handleAllNoSelect}
                  className="flex w-12 cursor-pointer justify-center text-xs"
                >
                  取消全選
                </div>
              ) : (
                <div
                  onClick={handleAllSelect}
                  className="flex w-12 cursor-pointer justify-center text-xs"
                >
                  全選
                </div>
              )}
            </div>
          </div>
          {users.map((user) => {
            const isChecked = expenseData.sharers.some((sharer) => sharer.id === user.id);
            const amountValue = isChecked
              ? expenseData.sharers.find((sharer) => sharer.id === user.id)?.amount
              : '0';

            let sharer = expenseData.sharers.filter((sharer: any) => {
              return sharer.id === user.id;
            })[0];

            sharer = sharer
              ? sharer
              : {
                  id: user.id,
                  amount: 0,
                };
            return (
              <div className="my-2 flex w-full items-center justify-between px-7" key={user.id}>
                <div className="flex items-center gap-4">
                  <Image
                    className="h-12 w-12 rounded-full"
                    src={user.picture}
                    width={50}
                    height={50}
                    alt="user's picture"
                  />
                  <div>{user.name}</div>
                </div>
                <div className="flex items-center justify-between gap-7">
                  <input
                    className=" w-20 border-0 border-b-[1px] border-black bg-transparent text-neutrals-70 focus:border-black focus:border-highlight-40 focus:outline-none focus:ring-0"
                    type="number"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    onFocus={() => {
                      setOnFocus(true);
                      setCurrentSharer(sharer);
                      if (sharer) {
                        setCurrentSharer(sharer);
                      } else {
                        setCurrentSharer({
                          id: user.id,
                          amount: '0',
                        });
                      }
                    }}
                    onBlur={(e: any) => {
                      setOnFocus(false);
                      let value = e.target.value.replace(/^0+/, '');
                      if (value === '' || Number(value) < 0) {
                        value = '0';
                      }
                      updateAmount(user.id, value);
                      sharer =
                        sharer && String(sharer.amount).replace(/^0+/, '') !== ''
                          ? sharer
                          : {
                              id: user.id,
                              amount: 0,
                            };

                      console.log(sharer.amount);
                    }}
                    onChange={(e: any) => {
                      let value = e.target.value;
                      if (value === '' || Number(value) < 0) {
                        value = '0';
                      }
                      updateAmount(user.id, value);
                      setCurrentSharer({
                        ...sharer,
                        amount: value,
                      });
                    }}
                    value={sharer.amount === 0 ? '' : sharer.amount} // Prevent display of 0
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
                    onClick={() => handleSharerToggle(user.id)} // Call handleSharerToggle on change
                    checked={isChecked}
                  />
                </div>
              </div>
            );
          })}
          <div
            className={clsx('fixed left-0 z-100 h-fit w-full bg-grey-keyBoard p-6 text-center', {
              hidden: !onFocus,
              block: onFocus,
            })}
            style={{ bottom: barBottom }}
          >
            <div className="text-black">
              {
                users.filter((user: any) => {
                  return user.id === currentSharer.id;
                })[0]?.name
              }
              負擔${expenseData.amount}中的$
              {currentSharer.amount === '' ? 0 : currentSharer.amount}
            </div>
            <div className="text-sm text-neutrals-60">
              {adjustedRemainingAmount > 0
                ? `還剩下$${adjustedRemainingAmount}還沒被分帳`
                : `目前分帳金額多出$${Math.abs(adjustedRemainingAmount)}`}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}