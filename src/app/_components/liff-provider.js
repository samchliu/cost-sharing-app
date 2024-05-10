'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import liff from '@line/liff';
import { useRouter } from 'next/navigation';

const LiffContext = createContext();
const LIFF_STATUS = {
  SIGNIN: 'signin',
  INITED: 'inited',
};

export default function LiffProvider({ children }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [liffStatus, setLiffStatus] = useState(LIFF_STATUS.SIGNIN);
  const router = useRouter();

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    if (liffStatus === LIFF_STATUS.INITED) return;
    console.log('start liff.init()...');
    liff
      .init({
        liffId: process.env.NEXT_PUBLIC_LIFF_ID,
        withLoginOnExternalBrowser: true,
      })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          await liff.login();
        } else {
          router.push('/dashboard');
        }
        setLiffObject(liff);
        setLiffStatus(LIFF_STATUS.INITED);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        if (!process.env.liffId) {
          console.info(
            'LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.'
          );
        }
        setLiffError(error.toString());
      });
  }, []);

  return <LiffContext.Provider value={{ liffObject, liffError }}>{children}</LiffContext.Provider>;
}

export function useLiff() {
  return useContext(LiffContext);
}
