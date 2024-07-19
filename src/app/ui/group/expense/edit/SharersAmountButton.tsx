'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';
//import ui
import { NotePencilIcon } from '@/app/ui/shareComponents/Icons';
//import other
import clsx from 'clsx';
import SharerAmountInput from './SharerAmountInput';

export default function SharersAmountButton({
  users,
  expenseData,
  updatedSharers,
  setUpdatedSharers, // addedAmount,
  sharers,
  setSharers,
}: {
  users: any;
  expenseData: any;
  updatedSharers: any;
  setUpdatedSharers: any;
  sharers:any;
  setSharers:any;
  // addedAmount: any;
}) {
  // const [sharers, setSharers] = useState<any>(updatedSharers);
  const [lastSavedValue, setLastSavedValue] = useState<any>(sharers);
  const [isShow, setIsShow] = useState(false);
  const [barTop, setBarTop] = useState('100%');
  const [onFocus, setOnFocus] = useState(false);
  const [currentSharer, setCurrentSharer] = useState({
    id: '',
    amount: '',
  });
  const router = useRouter();

  useEffect(() => {
    const handleResize: any = () => {
      if (window.visualViewport) {
        const newTop = `${window.visualViewport.height-93}px`;
        setBarTop(newTop);
      }
    };

    if (typeof window !== 'undefined') {
      if (window.visualViewport) {
        handleResize(); // Initial setup
        window.visualViewport.addEventListener('resize', handleResize);
        return () => {
          window.visualViewport?.removeEventListener('resize', handleResize);
        };
      }
    }
  }, [currentSharer]); // empty dependency array ensures this effect runs only once

  if (!updatedSharers) return;

  const addedAmount = sharers.reduce((total: any, sharer: any) => {
    return Number(total) + Number(sharer.amount);
  }, 0);

  const handleSharerAmountButton = (e: any) => {
    e.preventDefault();
    setIsShow(true);
    setLastSavedValue(sharers); // Save the current state before making changes
    router.refresh();
  };

  const updateAmount = (id: any, newAmount: any) => {
    setSharers((prevSharers: any) => {
      const sharerExists = prevSharers.some((sharer: any) => sharer.id === id);
      if (sharerExists) {
        return prevSharers.map((sharer: any) =>
          sharer.id === id ? { ...sharer, amount: Number(newAmount) } : sharer,
        );
      } else {
        return [...prevSharers, { id, amount: Number(newAmount) }];
      }
    });
  };

  const handleClose = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setSharers(lastSavedValue); // Revert to the last saved value
    setIsShow(false);
    router.refresh();
  };

  const handleSave = () => {
    const filteredSharers = sharers.filter(
      (sharer: any) =>
        sharer.amount !== 0 && sharer.amount !== '' && sharer.amount !== '0',
    ); // Filter out sharers with amount 0
    setUpdatedSharers(filteredSharers); // Update the parent state with the new sharers
    setIsShow(false);
  };

  return (
    <>
      <div
        onClick={handleSharerAmountButton}
        className="flex w-20 cursor-pointer justify-center text-xs"
      >
        <div className="scale-75">
          <NotePencilIcon />
        </div>
        <div>負擔金額</div>
      </div>
      <div>
        <div
          className={clsx(
            'fixed left-[50%] m-0 mx-auto translate-x-[-50%] rounded-lg bg-transparent transition-all duration-300',
            {
              'top-16 z-50 transform opacity-100': isShow,
              'top-20 -z-50 transform opacity-0': !isShow,
            },
          )}
        >
          <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-7 py-2">
            <div
              className="w-9 text-sm"
              onClick={(e: any) => {
                handleClose(e);
              }}
            >
              取消
            </div>
            <div className="text-normal">編輯負擔金額</div>
            <div className="w-9" />
          </div>
          <div className="relative flex max-h-36 w-[89vw] flex-col gap-4 overflow-scroll rounded-b-lg border-none bg-white px-7 py-5 scrollbar scrollbar-track-sky-300 scrollbar-thumb-highlight-20 hover:scrollbar-thumb-highlight-20 active:scrollbar-thumb-highlight-20">
            {users.map((user: any) => {
              let sharer = sharers.filter((sharer: any) => {
                return sharer.id === user.id;
              })[0];

              sharer = sharer
                ? sharer
                : {
                    id: user.id,
                    amount: 0,
                  };

              return (
                <div
                  key={user.id}
                  className="relative flex items-center justify-between"
                >
                  <div className="relative flex items-center gap-4">
                    <Image
                      className="bg-grey-200 flex h-[45px] w-[45px] items-center justify-center rounded-full"
                      src={user.picture}
                      width={45}
                      height={45}
                      alt="sharer image"
                    />
                    <div>{user.name}</div>
                  </div>
                  <div className="absolute right-8">
                    <input
                      className="ml-[0px] w-20 border-0 border-b-[1px] border-black focus:border-black focus:outline-none focus:ring-0"
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
                      onBlur={() => {
                        setOnFocus(false);
                      }}
                      onChange={(e: any) => {
                        let value = e.target.value.replace(/^0+/, ''); // Remove leading zeros
                        if (value === '' || Number(value) < 0) {
                          value = '0';
                        }
                        updateAmount(user.id, value);
                        setCurrentSharer({
                          ...sharer,
                          amount: Number(value),
                        });
                      }}
                      value={sharer.amount === 0 ? '' : sharer.amount} // Prevent display of 0
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div
            className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
            onClick={handleSave}
          >
            儲存
          </div>
        </div>
        <div
          onClick={(e) => handleClose(e)}
          className={clsx(
            'fixed left-[0%] top-[0%] z-0 w-screen bg-[#000] transition-all duration-200',
            {
              'z-30 transform opacity-80 h-screen': isShow,
              'z-[-100] transform opacity-20': !isShow,
            },
          )}
        ></div>
        <div
          className={clsx(
            'fixed left-0 z-100 h-fit w-full bg-grey-keyBoard p-6 text-center',
            { hidden: !onFocus, block: onFocus },
          )}
          style={{ top: barTop }}
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
            {Number(expenseData.amount) - Number(addedAmount) > 0 ||
            Number(expenseData.amount) - Number(addedAmount) === 0
              ? `還剩下$${
                  Number(expenseData.amount) - Number(addedAmount)
                }還沒被分帳`
              : `目前分帳金額多出$${Math.abs(
                  Number(expenseData.amount) - Number(addedAmount),
                )}`}
          </div>
        </div>
      </div>
    </>
  );
}
