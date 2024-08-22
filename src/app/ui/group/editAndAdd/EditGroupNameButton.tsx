'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
//import data
import {
  ExtendedGroup,
  Group,
  LoginUser,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import NameModal from '@/app/ui/shareComponents/NameModal';

interface Props {
  loginUserData: LoginUser;
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  nameExist: boolean;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function EditGroupNameButton({
  loginUserData,
  groupData,
  setCurrentGroup,
  nameExist,
  setNameExist,
}: Props) {
  const { name } = groupData;

  const [currentName, setCurrentName] = useState<string>(name);
  const [lastSavedName, setLastSavedName] = useState<string>(currentName);
  const [isShow, setIsShow] = useState<boolean>(false);

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
    loginUserData: LoginUser,
    groupData: ExtendedGroup
  ) => {
    const groupExists =
      groupData.name !== e.target.value &&
      loginUserData.groups.some((group) => group.name === e.target.value);

    if (groupExists) {
      setNameExist(true);
    } else {
      setNameExist(false);
    }

    console.log(e.target.value);
    setCurrentName(e.target.value);
  };

  const handleClose = () => {
    setCurrentName(lastSavedName);
    setIsShow(false);
    setNameExist(false);
    router.refresh();
  };

  const handleSave = (
    targetUserName: string,
    loginUserData: LoginUser,
    groupData: ExtendedGroup
  ) => {
    const groupExists =
      groupData.name !== targetUserName &&
      loginUserData.groups.some((group) => group.name === targetUserName);

    if (groupExists) {
      setNameExist(true);
      return;
    } else {
      setNameExist(false);
      setLastSavedName(targetUserName);
      setCurrentGroup({
        ...groupData,
        name: targetUserName,
      });
      setIsShow(false);
    }
  };

  return (
    <div className="relative">
      <div onClick={toggleDialog} className="relative cursor-pointer text-sm text-grey-500">
        編輯
      </div>
      <NameModal
        isShow={isShow}
        handleChange={(e) => handleChange(e, loginUserData, groupData)}
        handleClose={handleClose}
        handleSave={() => handleSave(currentName, loginUserData, groupData)}
        TopBarName="群組名稱"
        inputRef={inputRef}
        currentValue={currentName}
        nameExist={nameExist}
      />
    </div>
  );
}