'use client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

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
          <div className="bg-primary-300 flex items-center rounded-l-lg px-6 py-4">
            <button onClick={(e) => handleClick(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-grey-300 fill-current"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex w-full items-center justify-between rounded-r-lg border border-gray-200 border-l-transparent bg-white py-6 pl-8">
            <div>
              {text}
              <br />
              {name}
            </div>
            {/* <button onClick={e => handleClick(e)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="fill-current text-grey-300"
                viewBox="0 0 16 16"
                width="20"
                height="20"
              >
                <path
                  fillRule="evenodd"
                  d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"
                ></path>
              </svg>
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
            'z-[-100] transform opacity-0': !isShow,
          }
        )}
      ></div>
    </>
  );
}
