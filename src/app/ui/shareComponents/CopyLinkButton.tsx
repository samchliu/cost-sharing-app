'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import ui
import { CopyLinkIcon } from '@/app/ui/shareComponents/Icons';
import SuccessAlert from '@/app/ui/shareComponents/SuccessAlert';

export default function CopyLinkButton({
  id,
  name,
  inGroupPage,
}: {
  id: string;
  name: string;
  inGroupPage: boolean;
}) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const base = 'https://cost-sharing-app.vercel.app/group/';
  const links = base + id;

  const handleCopyLink = (e: any) => {
    e.preventDefault();
    navigator.clipboard.writeText(links);
    setIsShow(true);
    router.refresh();
    console.log('copy ' + links);

    setTimeout(() => {
      setIsShow(false);
      router.refresh();
    }, 900);
  };

  return (
    <>
      {inGroupPage ? (
        <div
          onClick={(e) => handleCopyLink(e)}
          className="flex scale-[1.17] items-center justify-center rounded-full bg-neutrals-20 p-2"
        >
          <CopyLinkIcon />
        </div>
      ) : (
        <div
          onClick={(e) => handleCopyLink(e)}
          className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60"
        >
          <CopyLinkIcon />
        </div>
      )}
      <SuccessAlert
        text="連結已複製"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
        inGroupPage={inGroupPage}
      />
    </>
  );
}