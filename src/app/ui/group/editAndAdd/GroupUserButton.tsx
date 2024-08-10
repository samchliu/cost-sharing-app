//import from next & react
import Image from 'next/image';
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
import { ExtendedGroup, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

export function GroupUserButton({
  idx,
  userData,
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData,
}: {
  idx: string;
  userData: GroupUser;
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
  isAddPage: boolean;
  loginUserData: GroupUser;
}) {
  const [lastSavedGroup, setLastSavedGroup] = useState<ExtendedGroup>(groupData);
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
    setCurrentGroup(lastSavedGroup);
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleSave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    let currentGroupUsers = groupData.users
      ? [...groupData.users]
      : [
          {
            id: '',
            name: '',
            picture: '',
            adoptable: false,
          },
        ];
    const userIndex = currentGroupUsers.findIndex(
      (user: GroupUser) => user.name === userData.name && e.currentTarget.id === idx
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
  const isMemberAdmin = groupData.creatorId === userData?.id && groupData.creatorId !== undefined;
  const showAdminLabel = (isAddPage && loginUserData?.id === idx) || isMemberAdmin;
  const showDeleteButton = (isAddPage && loginUserData?.id !== idx) || (isAdmin && !isMemberAdmin);

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {(userData?.adoptable === false || userData?.id === loginUserId) &&
        userData.picture !== '' ? (
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
        <p className="w-56 truncate">{userData?.name}</p>
      </div>
      {showAdminLabel ? (
        <div className="relative left-[0.3rem] text-sm text-neutrals-70">管理員</div>
      ) : null}
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
            handleSave={handleSave}
            hintWord="確定要刪除成員嗎？"
            idx={idx}
          />
        </>
      ) : null}
    </div>
  );
}