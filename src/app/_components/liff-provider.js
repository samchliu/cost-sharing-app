'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import liff from '@line/liff';
import { useRouter } from 'next/navigation';
import { login } from './frontendData/fetchData/API';

const LiffContext = createContext();
const LIFF_STATUS = {
  SIGNIN: 'signin',
  INITED: 'inited',
};

export default function LiffProvider({ children }) {
  const [liffObject, setLiffObject] = useState(null);
  const [liffError, setLiffError] = useState(null);
  const [liffStatus, setLiffStatus] = useState(LIFF_STATUS.SIGNIN);
  const [userId, setUserId] = useState('');
  const router = useRouter();


  // Execute liff.init() when the app is initialized
//   useEffect(() => {
//     if (liffStatus === LIFF_STATUS.INITED) return;
//     console.log('start liff.init()...');
//     liff
//       .init({
//         liffId: process.env.NEXT_PUBLIC_LIFF_ID,
//         withLoginOnExternalBrowser: true,
//       })
//       .then(async () => {
//         if (!liff.isLoggedIn()) {
//           await liff.login();
//         } else {
//           // router.push('/groups');
//           router.push('/groups');
//         }
//         setLiffObject(liff);
//         setLiffStatus(LIFF_STATUS.INITED);
//       })
//       .then(async () => {
//         const accessToken = liff.getAccessToken();

//         const fetchUserId = async (accessToken) => {
//           try {
//             const userId = await login(accessToken);
            
//             setUserId(userId);
//           } catch (error) {
//             console.error('Error fetching group data:', error);
//             // Handle errors
//           }
//         };

//         if (accessToken) {
//           fetchUserId(accessToken);
//         }
//       }) //在這邊加const accessToken = liff.getAccessToken();
//       .catch((error) => {
//         console.log(`liff.init() failed: ${error}`);
//         if (!process.env.liffId) {
//           console.info(
//             'LIFF Starter: Please make sure that you provided `LIFF_ID` as an environmental variable.'
//           );
//         }
//         setLiffError(error.toString());
//       });
//   }, []);

  return (
    <LiffContext.Provider value={{ liffObject, liffError, userId }}>
      {children}
    </LiffContext.Provider>
  );
}

export function useLiff() {
  return useContext(LiffContext);
}

export const useUserId = () => {
  const context = useContext(LiffContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  return context.userId;
};
