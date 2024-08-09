//import next & react
import { useEffect, useId, useRef } from 'react';
//import other
import Link from 'next/link';

interface Props {
    url: string;
    hintWord: string;
    buttonHintWord: string;
}

export default function AlertModal({
  url,
  hintWord,
  buttonHintWord,
}:  Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  useEffect(() => {

    const dialog = dialogRef.current;

    document.body.style.overflow = 'hidden';

    if (dialog) {
        dialog.showModal();
    }

    return () => {
        if (dialog) {
              dialogRef.current?.close();
              document.body.style.overflow = '';
        }
    };
}, [])

  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className="top-[40%] z-50 opacity-100 backdrop:bg-highlight-50/80 m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white transition-all duration-300 focus:!border-none focus:outline-none drop-shadow-xl"
        aria-labelledby={headerId}
        onClick={()=>{}}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="flex h-20 items-center justify-center px-6 mt-3 mb-4">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-center">
            <Link
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90 focus:outline-0 focus:border-none focus:ring-0"
              href={url}
              scroll={false}
            >
             {buttonHintWord}
            </Link>
          </div>
        </div>
      </dialog>
    </>
  );
}
