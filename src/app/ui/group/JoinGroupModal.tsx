//import next & react
import { useEffect, useId, useRef, useState } from 'react';
//import data
import { ExtendedGroup, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import other
import clsx from 'clsx';

interface Prop {
    groupData: ExtendedGroup;
    setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
}

export default function JoinGroupModal({ groupData, setCurrentGroup }: Prop) {
    const [tempUsers, setTempUsers] = useState<GroupUser[]>([]);
    const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
    const [isShow, setIsShow] = useState<boolean>(true);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const dialogId = useId();
    const headerId = useId();

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
    }, [groupData?.users])


    const handleAdoptableChange = (userId: string) => {
        if (selectedUserId === userId) return;

        const updatedTempUsers = tempUsers.map(user => ({
            ...user,
            adoptable: user.id === userId
                ? false
                : (user.id === selectedUserId ? true : user.adoptable)
        }));

        setTempUsers(updatedTempUsers);
        setSelectedUserId(userId);
    };


    const handleSave = () => {
        const updatedUsers = tempUsers.map((user: GroupUser) => ({
            ...user,
            adoptable: user.adoptable === false ? false : user.adoptable
        }))

        setCurrentGroup({ ...groupData, users: updatedUsers });
        setIsShow(false);
        setTimeout(() => {
            dialogRef.current?.close();
            document.body.style.overflow = '';
        }, 100);
    }

    return (
        <>
            <dialog
                role="dialog"
                ref={dialogRef}
                id={dialogId}
                aria-modal
                className={clsx(
                    'z-20 m-0 mx-auto rounded-lg bg-transparent transition-all duration-300 !border-none focus:!border-none focus:ring-0 focus:outline-0',
                    {
                        'top-16 z-50 transform opacity-100  backdrop:bg-black/80': isShow,
                        'top-20 -z-50 transform opacity-0 backdrop:bg-black/20': !isShow,
                    },
                )}
                aria-labelledby={headerId}
                onClick={() => { }}
            >
                <div className="w-[226px]" onClick={(e: React.SyntheticEvent) => e.stopPropagation()}>
                    <div className="flex justify-center items-center gap-2 rounded-t-lg bg-highlight-60 py-2">
                        <div
                            className="text-sm"
                        >
                            立即加入
                        </div>
                        <div className="text-normal truncate max-w-[120px]">{groupData?.name}</div>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-neutrals-0 border-none py-3">
                        <span>請問你是?</span>
                    </div>

                    <div className="flex flex-col gap-3 w-full bg-neutrals-0 overflow-scroll max-h-[340px] px-11 ring-0 outline-0 !border-none">
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
                                    onChange={() => handleAdoptableChange(user.id)}
                                />
                                <label
                                    htmlFor={user.name}
                                    className={clsx("truncate max-w-[130px]", {
                                        "text-neutrals-50": !user.adoptable && user.id !== selectedUserId
                                    })}
                                >{user.name}</label>
                            </div>
                        ))}
                    </div>
                    <div className="relative top-[-2px] bg-neutrals-0 py-3 rounded-b-lg"></div>
                    <button
                        type="button"
                        disabled={selectedUserId === null}
                        className="mt-5 w-full rounded-full bg-highlight-60 py-3 text-center text-sm disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
                        onClick={handleSave}
                    >
                        加入群組
                    </button>
                </div>
            </dialog>
        </>
    )
}