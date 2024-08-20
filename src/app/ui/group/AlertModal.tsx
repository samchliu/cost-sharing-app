//import next & react
import { useEffect, useId, useRef } from 'react';
//import other
import Link from 'next/link';

interface Props {
    url: string;
    hintWord: string;
    buttonHintWord: string;
}

export default function AlertModal({ url, hintWord, buttonHintWord }: Props) {
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
  }, []);

  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className="top-[40%] z-50 m-0 mx-auto w-[60%] translate-y-[-50%] rounded-lg bg-white opacity-100 drop-shadow-xl transition-all duration-300 backdrop:bg-highlight-50/80 focus:!border-none focus:outline-none"
        aria-labelledby={headerId}
        onClick={() => {}}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="mb-4 mt-3 flex h-20 items-center justify-center px-6">
            <div className="text-normal">{hintWord}</div>
          </div>
          <div className="mx-4 mb-3 flex items-center justify-center">
            <Link
              className="flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90 focus:border-none focus:outline-0 focus:ring-0"
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