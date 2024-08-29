//import next & react
import { useEffect, useId, useRef } from 'react';
//import other
import AlertModal from './AlertModal';

interface Props {
    url: string;
    hintWord: string;
    buttonHintWord: string;
}

export default function PageLoadAlertModal({
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
      <AlertModal
        dialogRef={dialogRef}
        dialogId={dialogId}
        isShow={true}
        headerId={headerId}
        url={url}
        handleClose={() =>{}}
        isSamePage={false}
        hintWord={hintWord}
        buttonHintWord={buttonHintWord}
      />
    </>
  );
}
