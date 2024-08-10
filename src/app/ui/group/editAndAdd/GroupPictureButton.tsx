'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useState } from 'react';
//import data
import { Group, GroupPicture } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { CameraIcon, groupIconMap } from '@/app/ui/shareComponents/Icons';
//import other
import clsx from 'clsx';
import { TopBar } from '@/app/ui/shareComponents/TopBars';

interface Props {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}

export default function GroupPictureButton({ groupData, setCurrentGroup }: Props) {
  const { picture } = groupData;
  const [currentPicture, setCurrentPicture] = useState<GroupPicture>(picture);
  const [lastSavedPicture, setLastSavedPicture] = useState<GroupPicture>(currentPicture);
  const [isShow, setIsShow] = useState<boolean>(false);
  const router = useRouter();
  const Icon = groupIconMap[currentPicture];
  const allGroupPicture: GroupPicture[] = [
    'groupIcon01',
    'groupIcon02',
    'groupIcon03',
    'groupIcon04',
    'groupIcon05',
    'groupIcon06',
    'groupIcon07',
    'groupIcon08',
    'groupIcon09',
    'groupIcon10',
    'groupIcon11',
    'groupIcon12',
    'groupIcon13',
    'groupIcon14',
    'groupIcon15',
  ];

  const toggleDialog = () => {
    setTimeout(() => {
      setIsShow(true);
    }, 0);
    router.refresh();
  };

  const handleChange = (picture: GroupPicture) => {
    setCurrentPicture(picture);
  };

  const handleClose = () => {
    setCurrentPicture(lastSavedPicture);
    setIsShow(false);
    router.refresh();
  };

  const handleSave = () => {
    setLastSavedPicture(currentPicture);
    setCurrentGroup({
      ...groupData,
      picture: currentPicture,
    });
    setIsShow(false);
  };

  return (
    <div className="relative grow-0">
      <div onClick={toggleDialog} className="relative">
        <Image
          src={Icon}
          className="z-0 flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-highlight-60"
          width={200}
          height={200}
          alt={picture}
        />
        <div className="absolute bottom-0 right-0 h-7 w-7 translate-x-[5px] translate-y-[5px] rounded-full bg-white p-[7px] shadow">
          <CameraIcon />
        </div>
      </div>
      <div
        className={clsx(
          'fixed left-0 m-0 h-fit w-full rounded-lg bg-transparent transition-all duration-200',
          {
            'top-0 z-50 opacity-100': isShow,
            'top-5 -z-50 opacity-0': !isShow,
          }
        )}
      >
        <TopBar
          name="群組圖片"
          leftBtnName="取消"
          rightBtnName="完成"
          handleLeftClick={handleClose}
          handleRightClick={handleSave}
        />
        <div className="relative top-[60px] flex max-h-[calc(100vh-56px)] w-full flex-wrap items-start gap-y-0 overflow-scroll">
          {allGroupPicture.map((picture, idx) => {
            const Icon = groupIconMap[picture as keyof typeof groupIconMap];
            return (
              <div
                className={clsx(
                  'relative max-w-[33.33%] before:absolute before:top-0 before:h-full before:w-full before:bg-neutrals-60 before:opacity-50 after:absolute after:left-[50%] after:top-[50%] after:z-100 after:w-8 after:translate-x-[-50%] after:translate-y-[-50%] after:content-checkWhiteIcon',
                  {
                    '': currentPicture === picture,
                    'before:hidden after:hidden': currentPicture !== picture,
                  }
                )}
                key={idx}
              >
                <input
                  defaultChecked={currentPicture === picture}
                  type="radio"
                  name="groupPicture"
                  className="absolute left-[50%] top-[50%] h-full w-full translate-x-[-50%] translate-y-[-50%] opacity-0"
                  onChange={() => handleChange(picture)}
                />
                <Image
                  src={Icon}
                  className="z-0 flex items-center justify-center bg-black"
                  width={200}
                  height={200}
                  alt={picture}
                />
              </div>
            );
          })}
        </div>
        <div className="top-14 z-40 h-[calc(100vh-56px)] w-full bg-primary-100"></div>
      </div>
    </div>
  );
}