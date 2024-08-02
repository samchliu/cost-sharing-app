//import from next & react
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
//import ui
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

export default function DeleteExpenseButton({ expenseData }: { expenseData: any }) {
  const {
    id,
    payerId,
    sharers,
  }: {
    id: string;
    payerId: string;
    sharers: string[];
  } = expenseData;

  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const handleToggle = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = () => {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleDeleteEXpense = (id: string) => {
    console.log(`delete expense ${id}`);

    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };
  return (
    <>
      {expenseData &&
      (payerId === loginUserId || sharers?.some((sharer: any) => sharer.id === loginUserId)) ? (
        <>
          <div
            onClick={handleToggle}
            className="mt-8 flex h-9 w-44 cursor-pointer items-center justify-center rounded-full bg-neutrals-30 text-neutrals-60"
          >
            刪除費用
          </div>
          <DeleteModal
            dialogRef={dialogRef}
            dialogId={dialogId}
            isShow={isShow}
            headerId={headerId}
            handleClose={handleClose}
            handleSave={() => handleDeleteEXpense(id)}
            hintWord="確定要放棄這筆費用嗎？"
            idx={`deleteExpense${id}`}
          />
        </>
      ) : null}
    </>
  );
}
