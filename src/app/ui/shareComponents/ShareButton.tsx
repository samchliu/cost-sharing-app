'use client';
//import from next & react
import { useEffect, useRef } from 'react';
//import ui
import { ShareLinkIcon } from '@/app/ui/shareComponents/Icons';

export default function ShareButton({
  id,
  name,
  inGroupPage,
}: {
  id: string;
  name: string;
  inGroupPage: boolean;
}) {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const base = 'https://cost-sharing-app.vercel.app/group/';
  const links = base + id;

  useEffect(() => {
    const btn = btnRef.current;

    const shareData = {
      url: links,
      title: name,
      text: `差不多要來 CHILL 後算賬囉！`,
    };

    const handleClick = async () => {
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

    if (btn) {
      btn.addEventListener('click', handleClick);
    }

    return () => {
      if (btn) {
        btn.removeEventListener('click', handleClick);
      }
    };
  }, []);

  const handlesShareLink = (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  return (
    <>
      {inGroupPage ? (
        <button
          ref={btnRef}
          onClick={(e) => handlesShareLink(e)}
          className="mr-2 flex scale-[1.17] items-center justify-center rounded-full bg-neutrals-20 p-2"
        >
          <ShareLinkIcon />
        </button>
      ) : (
        <button
          ref={btnRef}
          onClick={(e) => handlesShareLink(e)}
          className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-highlight-60"
        >
          <ShareLinkIcon />
        </button>
      )}
    </>
  );
}