'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
//import ui
import NameModal from '@/app/ui/shareComponents/NameModal';

export default function EditGroupNameButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: any;
  setCurrentGroup: any;
}) {
  const {
    name,
  }: {
    name: string;
  } = groupData;

  const [currentName, setCurrentName] = useState(name);
  const [lastSavedName, setLastSavedName] = useState<any>(currentName);
  const [isShow, setIsShow] = useState(false);
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

  const handleChange = (e: any) => {
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