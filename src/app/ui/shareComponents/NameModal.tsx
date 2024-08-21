//import other
import clsx from 'clsx';
import { TopBar } from '@/app/ui/shareComponents/TopBars';

interface Prop {
  isShow: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: () => void;
  handleSave: () => void;
  TopBarName: string;
  inputRef: React.Ref<HTMLInputElement>;
  currentValue: string;
}

export default function NameModal({
  isShow,
  handleChange,
  handleClose,
  handleSave,
  TopBarName,
  inputRef,
  currentValue,
}: Prop) {
  return (
    <>
      <div
        className={clsx(
          'fixed left-0 m-0 flex h-fit w-full flex-col items-center justify-center rounded-lg bg-transparent transition-all duration-200',
          {
            'top-0 z-50 opacity-100': isShow,
            'top-5 -z-50 opacity-0': !isShow,
          }
        )}
      >
        <TopBar
          name={TopBarName}
          leftBtnName=""
          rightBtnName="取消"
          handleLeftClick={() => {}}
          handleRightClick={handleClose}
        />
        <input
          ref={inputRef}
          className="relative top-[92px] z-40 mx-auto w-[80%] border-0 border-b border-b-white bg-transparent px-0 text-xl text-white focus:border-b focus:border-white focus:outline-none focus:ring-0"
          type="text"
          value={currentValue}
          onChange={handleChange}
        />
        <button
          type="button"
          disabled={currentValue === ''}
          className="fixed left-[50%] top-56 z-40 mx-auto w-[80%] translate-x-[-50%] rounded-full bg-highlight-20 py-3 text-center"
          onClick={handleSave}
        >
          儲存
        </button>
        <div
          onClick={handleClose}
          className="absolute top-0 z-20 h-screen w-full bg-highlight-50 opacity-[95%]"
        ></div>
      </div>
    </>
  );
}