//import ui
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';
//import other
import clsx from 'clsx';


interface Props {
  hasTwoButton: boolean;
  isChangePage: boolean;
  dialogRef: React.Ref<HTMLDialogElement>;
  dialogId: string;
  isShow: boolean;
  headerId: string;
  url: string;
  handleClose: (e: React.SyntheticEvent) => void;
  handleSave: (e: React.SyntheticEvent) => void;
  hintWord: string | React.ReactNode;
  buttonHintWord: string;
  SecondbuttonHintWord: string;
}

export default function AlertModal({
  hasTwoButton,
  isChangePage,
  dialogRef,
  dialogId,
  isShow,
  headerId,
  url,
  handleClose,
  handleSave,
  hintWord,
  buttonHintWord,
  SecondbuttonHintWord,
}: Props) {
  const handleDialogClick = (e: React.SyntheticEvent) => {
    if (isChangePage) {
      return;
    }

    handleClose(e);
  };

  return (
    <>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          ' m-0 mx-auto w-[60%] min-w-[320px] max-w-[300px] translate-y-[-50%] rounded-lg bg-white drop-shadow-xl transition-all duration-300 focus:!border-none focus:outline-none',
          {
            'top-[40%] z-50 transform opacity-100 backdrop:bg-highlight-50/80': isShow,
            'top-[45%] -z-50 transform opacity-0 backdrop:bg-highlight-50/20': !isShow,
          }
        )}
        aria-labelledby={headerId}
        onClick={(e) => handleDialogClick(e)}
      >
        <div onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="mx-auto mb-3 mt-3 flex h-20 w-[80%] items-center justify-center text-center">
            <div className="text-normal">{hintWord}</div>
          </div>
          {hasTwoButton ? (
            <TwoButton
              leftButtonHintWord={buttonHintWord}
              rightButtonHintWord={SecondbuttonHintWord}
              leftFunction={handleSave}
              rightFunction={handleClose}
            />
          ) : (
            <OneButton buttonHintWord={buttonHintWord} url={url} />
          )}
        </div>
      </dialog>
    </>
  );
}

function OneButton({ buttonHintWord, url }: { buttonHintWord: string; url: string }) {
  return (
    <>
      <div className="mx-4 mb-3 flex items-center justify-center">
        <LoadingButton
          url={url}
          className={clsx(
            'flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90 focus:border-none focus:outline-0 focus:ring-0',
            {
              'text-xs': buttonHintWord.length > 4,
              'text-sm': buttonHintWord.length < 5,
            }
          )}
        >
          {buttonHintWord}
        </LoadingButton>
      </div>
    </>
  );
}

function TwoButton({
  leftButtonHintWord,
  rightButtonHintWord,
  leftFunction,
  rightFunction,
}: {
  leftButtonHintWord: string;
  rightButtonHintWord: string;
  leftFunction: (e: React.SyntheticEvent) => void;
  rightFunction: (e: React.SyntheticEvent) => void;
}) {
  return (
    <>
      <div className="mx-4 mb-3 flex items-center justify-between gap-3">
        <div
          className={clsx(
            'flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-30 text-white focus:border-none focus:outline-0 focus:ring-0',
            {
              'text-xs': leftButtonHintWord.length > 4,
              'text-sm': leftButtonHintWord.length < 5,
            }
          )}
          onClick={leftFunction}
        >
          {leftButtonHintWord}
        </div>
        <div
          className={clsx(
            'flex h-8 w-24 items-center justify-center rounded-lg bg-highlight-60 text-neutrals-90 focus:border-none focus:outline-0 focus:ring-0',
            {
              'text-xs': rightButtonHintWord.length > 4,
              'text-sm': rightButtonHintWord.length < 5,
            }
          )}
          onClick={rightFunction}
        >
          {rightButtonHintWord}
        </div>
      </div>
    </>
  );
}