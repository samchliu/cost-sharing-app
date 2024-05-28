'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { CheckIcon, CloseIcon } from '@/app/ui/shareComponents/Icons';

export default function SuccessAlert({
  text,
  name,
  isShow,
  setIsShow,
}: {
  text: string;
  name: string;
  isShow: boolean;
  setIsShow: Function;
}) {
  const router = useRouter();
  const handleClick = (e: any) => {
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
          <div className="bg-primary-orange flex items-center rounded-l-lg px-6 py-4">
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
            {/* <button onClick={e => handleClick(e)}>
              <CloseIcon />
            </button> */}
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
