'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import ui
import { LinkIcon } from '@heroicons/react/24/outline';
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
          className="bg-neutrals-20 flex items-center justify-center rounded-full p-2"
        >
          <LinkIcon className="h-5 w-5 cursor-pointer" />
        </div>
      ) : (
        <div
          onClick={(e) => handleCopyLink(e)}
          className="bg-highlight-60 relative z-[1] flex h-8 w-8 items-center justify-center rounded-full"
        >
          <LinkIcon className="h-5 w-5 cursor-pointer stroke-[2px] text-grey-400" />
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