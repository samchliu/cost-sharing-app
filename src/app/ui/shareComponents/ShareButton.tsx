'use client';
//import from next & react
import { useState, useId, useRef } from 'react';
//import data
import { GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { ShareLinkIcon } from '@/app/ui/shareComponents/Icons';
import AlertModal from '@/app/ui/group/AlertModal';

export default function ShareButton({
  id,
  name,
  inGroupPage,
  groupUsers,
}: {
  id: string;
  name: string;
  inGroupPage: boolean;
  groupUsers: GroupUser[] | undefined;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const base = 'https://cost-sharing-app-git-staging-samchlius-projects.vercel.app';
  const links = base + id;

  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const shareData = {
    url: links,
    title: name,
    text: `差不多要來 CHILL 後算賬囉！`,
  };

  const handlesShareLink = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.share(shareData);
    } catch (err) {
      if (err instanceof Error) {
        console.log('發生錯誤', err);
      } else {
        console.log('發生錯誤', err);
      }
    }
  };

  const handleToggle = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleClose = (e: React.SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShow(false);
    setTimeout(() => {
      dialogRef.current?.close();
    }, 100);
  };

  return (
    <>
      {inGroupPage ? (
        groupUsers?.some((user) => user.adoptable === true) ? (
          <button
            ref={btnRef}
            onClick={(e) => handlesShareLink(e)}
            className="mr-2 flex scale-[1.17] items-center justify-center rounded-full bg-neutrals-20 p-2 active:bg-neutrals-30"
          >
            <ShareLinkIcon />
          </button>
        ) : (
          <>
            <button
              onClick={(e) => handleToggle(e)}
              className="mr-2 flex scale-[1.17] items-center justify-center rounded-full bg-neutrals-20 p-2 active:bg-neutrals-30"
            >
              <ShareLinkIcon />
            </button>
            <AlertModal
              hasTwoButton={false}
              isChangePage={false}
              dialogRef={dialogRef}
              dialogId={dialogId}
              isShow={isShow}
              headerId={headerId}
              url={`/group/${id}/edit`}
              handleClose={handleClose}
              handleSave={() => {}}
              hintWord="目前群組中無成員空位，請先新增成員空位"
              buttonHintWord="新增成員空位"
              SecondbuttonHintWord=""
            />
          </>
        )
      ) : groupUsers?.some((user) => user.adoptable === true) ? (
        <button
          ref={btnRef}
          onClick={(e) => handlesShareLink(e)}
          className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60 active:bg-highlight-20"
        >
          <ShareLinkIcon />
        </button>
      ) : (
        <>
          <button
            onClick={(e) => handleToggle(e)}
            className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60 active:bg-highlight-20"
          >
            <ShareLinkIcon />
          </button>
          <AlertModal
            hasTwoButton={false}
            isChangePage={false}
            dialogRef={dialogRef}
            dialogId={dialogId}
            isShow={isShow}
            headerId={headerId}
            url={`/group/${id}/edit`}
            handleClose={handleClose}
            handleSave={() => {}}
            hintWord="目前群組中無成員空位，請先新增成員空位"
            buttonHintWord="新增成員空位"
            SecondbuttonHintWord=""
          />
        </>
      )}
    </>
  );
}