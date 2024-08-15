'use client';
import liff from '@line/liff';
const liffId = process.env.NEXT_PUBLIC_LIFF_ID!;
import { useRouter } from 'next/navigation';
import { useState, useEffect, useContext } from 'react';
import { AllContext } from './_components/frontendData/fetchData/Providers';

export default function HomePage() {
  const context = useContext(AllContext);

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
      window.localStorage.setItem('userId', userId);
      context?.setUserId(userId);
      router.push('/groups');
    }

    login();
  }, []);

  return (
    <main className="fixed left-[50%] z-[2] mt-0 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl">
      Home Page
    </main>
  );
}
