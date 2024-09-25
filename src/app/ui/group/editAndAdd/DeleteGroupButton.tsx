'use client';
//import from next & react
import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { ExtendedGroup } from '@/app/_components/frontendData/sharedFunction/types';
import { deleteGroup, deleteUser } from '@/app/_components/frontendData/fetchData/API';
//import ui
import { TrashcanIcon, LeaveIcon } from '@/app/ui/shareComponents/Icons';
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

interface Props {
  groupData: ExtendedGroup;
}

export default function DeleteGroupButton({ groupData }: Props) {
  const { loginUserId } = useAllContext();
  const router = useRouter();
  const isAdmin = groupData.creatorId === loginUserId;
  const [isShow, setIsShow] = useState<boolean>(false);
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

  async function handleDeleteGroup(id: string) {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);

    try {
      await deleteGroup(id);
      router.push(`/groups`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  const handleLeaveGroup = async (groupId: string, loginUserId: string) => {
    try {
      await deleteUser(groupId, loginUserId);
      router.push(`/groups`);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  };

  return (
    <>
      <div className="mb-4 mt-4 flex items-center justify-between">
        <div onClick={handleToggle} className="flex cursor-pointer items-center gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-neutrals-30">
            <div className="absolute left-[13px]">{isAdmin ? <TrashcanIcon /> : <LeaveIcon />}</div>
          </div>
          <p className="">{isAdmin ? '刪除群組' : '離開群組'}</p>
        </div>
      </div>
      {isAdmin ? (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleDeleteGroup(groupData.id || '')}
          hintWord="若刪除群組，所有的紀錄和成員名單將會被刪除。"
          idx={`deleteGroup${loginUserId}`}
        />
      ) : (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleLeaveGroup(groupData.id || '', loginUserId || '')}
          hintWord="確定要離開群組嗎？"
          idx={`leaveGroup${loginUserId}`}
        />
      )}
    </>
  );
}
