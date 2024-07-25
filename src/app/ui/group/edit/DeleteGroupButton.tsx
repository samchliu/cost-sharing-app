//import from next & react
import { useId, useRef, useState } from 'react';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
//import ui
import { TrashcanIcon, LeaveIcon } from '@/app/ui/shareComponents/Icons';
import DeleteModal from '@/app/ui/shareComponents/DeleteModal';

export default function DeleteGroupButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: any;
}) {
  const isAdmin = groupData.creatorId === loginUserId;

  const [GroupUsers, setGroupUsers] = useState(groupData.users);
  const [lastSavedGroupUsers, setLastSavedGroupUsers] = useState<any>(GroupUsers);
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
    setGroupUsers(lastSavedGroupUsers);
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleDeleteGroup = () => {
    // let currentGroupUsers = [...GroupUsers];

    // const userIndex = currentGroupUsers.findIndex(
    //   (user: any) => user.id === userData.id,
    // );

    // if (userIndex !== -1) {
    //   currentGroupUsers.splice(userIndex, 1);
    // }

    // setGroupUsers(currentGroupUsers);
    // setLastSavedGroupUsers(currentGroupUsers);
    // setCurrentGroup({
    //   ...groupData,
    //   users: currentGroupUsers,
    // });
    console.log('delete Group!');

    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  const handleLeaveGroup = (id: string) => {
    let currentGroupUsers = [...GroupUsers];

    const userIndex = currentGroupUsers.findIndex((user: any) => user.id === id);

    if (userIndex !== -1) {
      currentGroupUsers.splice(userIndex, 1);
    }

    setGroupUsers(currentGroupUsers);
    setLastSavedGroupUsers(currentGroupUsers);
    setCurrentGroup({
      ...groupData,
      users: currentGroupUsers,
    });
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
    console.log(groupData);
    console.log('leave Group!');
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
          handleSave={handleDeleteGroup}
          hintWord="若刪除群組，所有的紀錄和成員名單將會被刪除。"
        />
      ) : (
        <DeleteModal
          dialogRef={dialogRef}
          dialogId={dialogId}
          isShow={isShow}
          headerId={headerId}
          handleClose={handleClose}
          handleSave={() => handleLeaveGroup(loginUserId)}
          hintWord="確定要離開群組嗎？"
        />
      )}
    </>
  );
}
