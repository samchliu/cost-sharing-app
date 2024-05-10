'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import liff from '@line/liff';

const LiffContext = createContext();

export default function LiffProvider({ children }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);

  // Execute liff.init() when the app is initialized
  useEffect(() => {
    console.log('start liff.init()...');
    liff
      .init({
        liffId: process.env.NEXT_PUBLIC_LIFF_ID,
        withLoginOnExternalBrowser: true,
      })
      .then(async () => {
        console.log('liff.init() done');
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        setLiffObject(liff);
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

  return (
    <LiffContext.Provider value={{ liffObject, liffError }}>
      {children}
    </LiffContext.Provider>
  );
}

export function useLiff() {
  return useContext(LiffContext);
}
