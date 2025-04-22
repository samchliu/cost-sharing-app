//import react
import { useState } from 'react';
//import ui
import { FullPageLoading } from '@/app/ui/loading/FullPageLoading';
//import other
import clsx from 'clsx';

interface Props {
  dialogRef: React.Ref<HTMLDialogElement>;
  dialogId: string;
  isShow: boolean;
  headerId: string;
  handleClose: () => void;
  handleSave: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  hintWord: string;
  idx: string;
}

export default function DeleteModal({
  dialogRef,
  dialogId,
  isShow,
  headerId,
  handleClose,
  handleSave,
  hintWord,
  idx,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveLoading = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setIsLoading(true);
    handleSave(e);
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          'm-0 mx-auto w-[60%] min-w-[320px] max-w-[300px] translate-y-[-50%] rounded-lg bg-white drop-shadow-xl transition-all duration-300  focus:!border-none focus:outline-none ',
          {
            'top-[40%] z-50 transform opacity-100  backdrop:bg-highlight-50/80': isShow,
            'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20': !isShow,
          }
        )}
        aria-labelledby={headerId}
        onClick={handleClose}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="mb-4 mt-3 flex h-20 items-center justify-center px-6">
            <div className="text-normal text-center">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-between gap-3">
            <div
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-30 text-white"
              onClick={handleClose}
            >
              取消
            </div>
            <div
              id={idx}
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90"
              onClick={handleSaveLoading}
            >
              確定
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
