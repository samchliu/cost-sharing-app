'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/ui/shareComponents/SuccessAlert';

export default function ShareButton({
  groupId,
  name,
  inGroupPage,
}: {
  groupId: string;
  name: string;
  inGroupPage: boolean;
}) {
  const [isShow, setIsShow] = useState(false);
  const router = useRouter();
  const base = 'https://cost-sharing-app.vercel.app/group/';
  const links = base + groupId;

  const handlesShareLink = (e: any) => {
    e.preventDefault();
    setIsShow(true);
    router.refresh();
    console.log('share ' + links);

    // setTimeout(() => {
    //   setIsShow(false);
    //   router.refresh();
    // }, 900)
  };

  return (
    <>
      {inGroupPage ? (
        <div
          onClick={(e) => handlesShareLink(e)}
          className="mr-1 flex items-center justify-center rounded-full bg-primary-lightPink p-2"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      ) : (
        <div
          onClick={(e) => handlesShareLink(e)}
          className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-primary-orange"
        >
          <ArrowUpTrayIcon className="h-5 w-5 stroke-[2px] text-grey-400" />
        </div>
      )}

      <SuccessAlert
        text="分享連結視窗"
        name={name}
        isShow={isShow}
        setIsShow={setIsShow as Function}
        inGroupPage={inGroupPage}
      />
    </>
  );
}
