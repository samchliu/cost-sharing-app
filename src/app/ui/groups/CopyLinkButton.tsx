'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/ui/groups/SuccessAlert';

export default function CopyLinkButton({ groupId, name }: { groupId: string; name: string }) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const base = 'https://cost-sharing-app.vercel.app/group/';
  const links = base + groupId;

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
      <div
        onClick={(e) => handleCopyLink(e)}
        className="bg-primary-orange relative z-[1] flex h-8 w-8 items-center justify-center rounded-full"
      >
        <LinkIcon className="h-5 w-5 cursor-pointer stroke-[2px] text-grey-300" />
      </div>
      <SuccessAlert
        text="連結已複製"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
      />
    </>
  );
}
