//import from next & react
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

export function GroupUser({
  idx,
  userData,
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData,
}: {
  idx: any;
  userData: any;
  groupData: any;
  setCurrentGroup: any;
  isAddPage: boolean;
  loginUserData: any;
}) {
  const [lastSavedGroup, setLastSavedGroup] = useState<any>(groupData);
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
    setCurrentGroup(lastSavedGroup);
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleSave = (e: any) => {
    let currentGroupUsers = [...groupData.users];
    const userIndex = currentGroupUsers.findIndex(
      (user: any) => user.name === userData.name && e.target.id === idx
    );

    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1);
    }

    setLastSavedGroup({
      ...groupData,
      users: currentGroupUsers,
    });
    setCurrentGroup({
      ...groupData,
      users: currentGroupUsers,
    });
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const isAdmin = groupData.creatorId === loginUserId;
  const isMemberAdmin = groupData.creatorId === userData.id && groupData.creatorId !== undefined;
  const showAdminLabel = (isAddPage && loginUserData.id === idx) || isMemberAdmin;
  const showDeleteButton = (isAddPage && loginUserData.id !== idx) || (isAdmin && !isMemberAdmin);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {userData.picture !== '' ? (
          <Image
            className="h-11 w-11 rounded-full bg-neutrals-20"
            src={userData.picture}
            width={32}
            height={32}
            alt="user's image"
          />
        ) : (
          <div className="h-11 w-11 rounded-full bg-neutrals-20"></div>
        )}
        <p>
          {userData.name}
          {showAdminLabel ? <span>&emsp;(管理員)</span> : ''}
        </p>
      </div>
      {showDeleteButton ? (
        <>
          <div onClick={handleToggle} className="flex h-8 w-8 items-center justify-center">
            <TrashcanIcon />
          </div>
          <DeleteModal
            dialogRef={dialogRef}
            dialogId={dialogId}
            isShow={isShow}
            headerId={headerId}
            handleClose={handleClose}
            handleSave={(e: any) => handleSave(e)}
            hintWord="確定要刪除成員嗎？"
            idx={idx}
          />
        </>
      ) : null}
    </div>
  );
}