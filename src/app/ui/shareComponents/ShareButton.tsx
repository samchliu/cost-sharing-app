'use client';
//import from next & react
import { useRouter } from 'next/navigation';
import { useState } from 'react';
//import ui
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import SuccessAlert from '@/app/ui/shareComponents/SuccessAlert';

export default function ShareButton({
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
          className="bg-neutrals-20 mr-1 flex items-center justify-center rounded-full p-2"
        >
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      ) : (
        <div
          onClick={(e) => handlesShareLink(e)}
          className="bg-highlight-60 relative z-[1] flex h-8 w-8 items-center justify-center rounded-full"
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