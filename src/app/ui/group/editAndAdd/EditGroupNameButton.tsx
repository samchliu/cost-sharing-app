'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
//import data
import { Group } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import NameModal from '@/app/ui/shareComponents/NameModal';

export default function EditGroupNameButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}) {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setCurrentName(e.target.value);
  };

  const handleClose = () => {
    setCurrentName(lastSavedName);
    setIsShow(false);
    router.refresh();
  };

  const handleSave = () => {
    setLastSavedName(currentName);
    setCurrentGroup({
      ...groupData,
      name: currentName,
    });
    setIsShow(false);
  };

  return (
    <div className="relative">
      <div onClick={toggleDialog} className="relative cursor-pointer text-sm text-grey-500">
        編輯
      </div>
      <NameModal
        isShow={isShow}
        handleChange={handleChange}
        handleClose={handleClose}
        handleSave={handleSave}
        TopBarName="群組名稱"
        inputRef={inputRef}
        currentValue={currentName}
      />
    </div>
  );
}