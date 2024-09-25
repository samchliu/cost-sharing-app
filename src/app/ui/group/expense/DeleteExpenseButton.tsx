'use client';
//import from next & react
import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import data
import { ExtendedExpense } from '@/app/_components/frontendData/sharedFunction/types';
import { deleteExpense } from '@/app/_components/frontendData/fetchData/API';
//import ui
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

interface Props {
  expenseData: ExtendedExpense;
}

export default function DeleteExpenseButton({ expenseData }: Props) {
  const router = useRouter();
  const { id, groupId } = expenseData;

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

  async function handleDeleteExpense(groupId: string, expenseId: string) {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);

    try {
      await deleteExpense(groupId, expenseId);
      router.push(`/group/${groupId}`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  return (
    <>
      {expenseData ? (
        <>
          <div
            onClick={handleToggle}
            className="mt-8 flex h-9 w-44 cursor-pointer items-center justify-center rounded-full bg-neutrals-30 text-sm text-neutrals-60 active:bg-neutrals-50"
          >
            刪除費用
          </div>
          <DeleteModal
            dialogRef={dialogRef}
            dialogId={dialogId}
            isShow={isShow}
            headerId={headerId}
            handleClose={handleClose}
            handleSave={() => handleDeleteExpense(groupId || '', id || '')}
            hintWord="確定要放棄這筆費用嗎？"
            idx={`deleteExpense${id}`}
          />
        </>
      ) : null}
    </>
  );
}