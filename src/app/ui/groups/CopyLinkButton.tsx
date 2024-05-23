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
      <div className="relative z-[1]" onClick={(e) => handleCopyLink(e)}>
        <div className="bg-primary-300 flex h-10 w-10 items-center justify-center rounded-full">
          <LinkIcon className="text-grey-300 h-5 w-5 cursor-pointer stroke-[2px]" />
        </div>
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
