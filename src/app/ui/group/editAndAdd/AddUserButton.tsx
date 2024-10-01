'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
//import data
import { ExtendedGroup, LoginUser } from '@/app/_components/frontendData/sharedFunction/types';
import { addGroupUser } from '@/app/_components/frontendData/fetchData/API';
//import ui
import { AddUserIcon } from '@/app/ui/shareComponents/Icons';
import NameModal from '@/app/ui/shareComponents/NameModal';

interface Props {
  isAddPage: boolean;
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
  loginUserData: LoginUser | null;
}

export default function AddUserButton({
  isAddPage,
  groupData,
  setCurrentGroup,
  loginUserData,
}: Props) {
  const [currentGroupUserName, setCurrentGroupUserName] = useState('');
  const [isShow, setIsShow] = useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (!groupData) return;

  const toggleDialog = () => {
    setIsShow(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    router.refresh();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    groupData: ExtendedGroup,
    loginUserData: LoginUser | null
  ) => {
    const userExists =
      groupData.users?.some((user) => user.name === e.target.value) ||
      loginUserData?.name === e.target.value;

    if (userExists) {
      setNameExist(true);
    } else {
      setNameExist(false);
    }

    setCurrentGroupUserName(e.target.value);
  };

  const handleClose = () => {
    setCurrentGroupUserName('');
    setIsShow(false);
    setNameExist(false);
    router.refresh();
  };

  const handleSave = async (
    targetUserName: string,
    groupData: ExtendedGroup,
    loginUserData: LoginUser | null
  ) => {
    setIsShow(false);
    const userExists =
      groupData.users?.some((user) => user.name === targetUserName) ||
      loginUserData?.name === targetUserName;
    if (userExists) {
      return;
    } else {
      let newGroupData = {
        ...groupData,
        users: [
          ...(groupData.users as []),
          {
            name: currentGroupUserName,
            picture: '',
          },
        ],
      };
      setCurrentGroup(newGroupData);

      if (!isAddPage) {
        try {
          let newGroupUserData = {
            name: currentGroupUserName,
            picture: '',
          };
          await addGroupUser({ ...newGroupUserData, groupId: groupData.id || '' });
        } catch (error) {
          console.error('API 呼叫失敗:', error);
        }
      }

      setIsShow(false);
      setCurrentGroupUserName('');
    }
  };

  return (
    <>
      <div onClick={toggleDialog} className="flex cursor-pointer items-center gap-4">
        <div className="relative flex h-11 w-11 items-center justify-center rounded-full">
          <div className="absolute left-[13px]">
            <AddUserIcon />
          </div>
        </div>
        <p className="">新增成員</p>
      </div>
      <NameModal
        isShow={isShow}
        handleChange={(e) => handleChange(e, groupData, loginUserData || null)}
        handleClose={handleClose}
        handleSave={() => handleSave(currentGroupUserName, groupData, loginUserData || null)}
        TopBarName="成員名稱"
        inputRef={inputRef}
        currentValue={currentGroupUserName}
        nameExist={nameExist}
      />
    </>
  );
}