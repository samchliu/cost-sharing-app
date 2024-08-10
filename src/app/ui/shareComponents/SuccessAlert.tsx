'use client';
//import from next
import { useRouter } from 'next/navigation';
//import ui
import { CheckIcon } from '@/app/ui/shareComponents/Icons';
//import other
import clsx from 'clsx';

export default function SuccessAlert({
  text,
  name,
  isShow,
  setIsShow,
  inGroupPage,
}: {
  text: string;
  name: string;
  isShow: boolean;
  setIsShow: Function;
  inGroupPage: boolean;
}) {
  const router = useRouter();
  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(false);
    router.refresh();
    console.log(name);
  };

  return (
    <>
      <div
        className={clsx(
          'fixed left-[50%] top-[45%] translate-x-[-50%] transition-all duration-300',
          {
            'z-50 translate-y-[-60%] transform opacity-100': isShow,
            '-z-50 translate-y-[-10%] transform opacity-0': !isShow,
          }
        )}
      >
        <div className="flex w-64 rounded-lg shadow-lg">
          <div
            className={clsx('flex items-center rounded-l-lg px-6 py-4', {
              'bg-neutrals-20': inGroupPage,
              'bg-highlight-60': !inGroupPage,
            })}
          >
            <button onClick={(e) => handleClick(e)}>
              <CheckIcon />
            </button>
          </div>
          <div className="flex w-full items-center justify-between rounded-r-lg border border-gray-200 border-l-transparent bg-white py-6 pl-8">
            <div>
              {text}
              <br />
              {name}
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={(e) => handleClick(e)}
        className={clsx(
          'fixed left-[0%] top-[0%] z-0 min-h-screen w-screen bg-[#0001] transition-all duration-200',
          {
            'z-30 transform opacity-100': isShow,
            'z-[-100] transform opacity-20': !isShow,
          }
        )}
      ></div>
    </>
  );
}