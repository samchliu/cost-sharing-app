//import next & react
import { useEffect, useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
//import data
import { ExtendedGroup, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { FullPageLoading } from '@/app/ui/loading/FullPageLoading';
//import other
import clsx from 'clsx';
import { adoptGroupUser } from '@/app/_components/frontendData/fetchData/API';

interface Prop {
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
}

export default function JoinGroupModal({ groupData, setCurrentGroup }: Prop) {
  const router = useRouter();
  const [tempUsers, setTempUsers] = useState<GroupUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [isShow, setIsShow] = useState<boolean>(true);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (groupData?.users) {
      setTempUsers(groupData.users);
    }

    const dialog = dialogRef.current;

    document.body.style.overflow = 'hidden';

    if (dialog) {
      dialog.showModal();
    }

    return () => {
      if (dialog) {
        dialog.close();
        document.body.style.overflow = '';
      }
    };
  }, [groupData?.users]);

  const handleAdoptableChange = (userId: string) => {
    if (selectedUserId === userId) return;

    const updatedTempUsers = tempUsers.map((user) => ({
      ...user,
      adoptable: user.id === userId ? false : user.id === selectedUserId ? true : user.adoptable,
    }));

    setTempUsers(updatedTempUsers);
    setSelectedUserId(userId);
  };

  const handleSave = async (groupId: string, userId: string) => {
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
      document.body.style.overflow = '';
    }, 100);

    try {
      await adoptGroupUser(groupId, userId);
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }

    router.push(`/groups`);
  };

  const handleSaveLoading = (groupId: string, userId: string) => {
    setIsLoading(true);
    handleSave(groupId, userId);
  };

  return (
    <>
      {isLoading && <FullPageLoading />}
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(
          'z-20 m-0 mx-auto rounded-lg !border-none bg-transparent transition-all duration-300 focus:!border-none focus:outline-0 focus:ring-0',
          {
            'top-16 z-50 transform opacity-100  backdrop:bg-black/80': isShow,
            'top-20 -z-50 transform opacity-0 backdrop:bg-black/20': !isShow,
          }
        )}
        aria-labelledby={headerId}
        onClick={() => {}}
      >
        <div className="md:w-[226px]" onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
          <div className="flex items-center justify-center gap-2 rounded-t-lg bg-highlight-60 py-2 px-4">
            <div className="text-sm">立即加入</div>
            <div className="text-normal md:max-w-[120px] md:truncate">{groupData?.name}</div>
          </div>
          <div className="flex flex-col items-center justify-center border-none bg-neutrals-0 py-3">
            <span>請問你是?</span>
          </div>

          <div className="flex max-h-[340px] w-full flex-col gap-3 overflow-scroll !border-none bg-neutrals-0 px-11 outline-0 ring-0">
            {tempUsers?.map((user: GroupUser) => (
              <div key={user.id} className="flex items-center gap-3 !border-none">
                <input
                  id={user.name}
                  className="relative h-4 w-4 rounded-full border-[1.5px] border-black ring-transparent checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute 
                checked:before:left-[50%] checked:before:top-[50%] 
                checked:before:block checked:before:h-3 checked:before:w-3 checked:before:translate-x-[-50%] 
                checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60
                 hover:checked:border-black focus:ring-transparent checked:focus:border-black disabled:bg-neutrals-50"
                  type="radio"
                  value={user.name}
                  name="adoptable"
                  disabled={!user.adoptable}
                  checked={user.id === selectedUserId}
                  onChange={() => handleAdoptableChange(user.id || '')}
                />
                <label
                  htmlFor={user.name}
                  className={clsx('md:max-w-[130px] md:truncate', {
                    'text-neutrals-50': !user.adoptable && user.id !== selectedUserId,
                  })}
                >
                  {user.name}
                </label>
              </div>
            ))}
          </div>
          <div className="relative top-[-2px] rounded-b-lg bg-neutrals-0 py-3"></div>
          <button
            type="button"
            disabled={selectedUserId === null}
            className="mt-5 w-full rounded-full bg-highlight-60 py-3 text-center text-sm disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
            onClick={() => handleSaveLoading(groupData.id || '', selectedUserId || '')}
          >
            加入群組
          </button>
        </div>
      </dialog>
    </>
  );
}
