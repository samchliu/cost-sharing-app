'use client';
import liff from '@line/liff';
const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAllContext } from './_components/frontendData/fetchData/Providers';
import { KVLoading } from './ui/loading/KVLoading';

export default function HomePage() {
  const { setLoginUserId } = useAllContext();

  const router = useRouter();
  useEffect(() => {
    async function login() {
      await liff.init({ liffId, withLoginOnExternalBrowser: true });

      const loginRes = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ accessToken: liff.getAccessToken() }),
      });
      const { userId } = await loginRes.json();
      window.localStorage.setItem('loginUserId', userId);
      setLoginUserId(userId);
      router.push('/groups');
    }

    login();
  }, []);

  return (
    <main className="relative z-[2] mt-0 w-full text-center text-3xl">
      <KVLoading />
    </main>
  );
}
