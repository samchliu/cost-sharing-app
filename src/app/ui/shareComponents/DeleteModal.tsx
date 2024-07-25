//import next & react
import { useId, useRef, useState } from 'react';
//import ui
//import other
import clsx from 'clsx';

export default function DeleteModal({
  dialogRef,
  dialogId,
  isShow,
  headerId,
  handleClose,
  handleSave,
  hintWord,
}: {
  dialogRef: any;
  dialogId: any;
  isShow: any;
  headerId: any;
  handleClose: any;
  handleSave: any;
  hintWord: string;
}) {
  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          'z-20 m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white transition-all duration-300 focus:!border-none focus:outline-none',
          {
            'top-[40%] z-50 transform opacity-100  backdrop:bg-highlight-50/80':
              isShow,
            'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20':
              !isShow,
          },
        )}
        aria-labelledby={headerId}
        onClick={handleClose}
      >
        <div onClick={(e: any) => e.stopPropagation()}>
          <div className="flex h-20 items-center justify-center px-6 mt-3 mb-4">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-between">
            <div
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-30 text-white"
              onClick={handleClose}
            >
              取消
            </div>
            <div
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90"
              onClick={handleSave}
            >
              確定
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
