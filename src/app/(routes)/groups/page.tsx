'use client';
import { useEffect, useState } from 'react';
import { useLiff } from '@/app/_components/liff-provider';
import React from 'react';
import Image from 'next/image';

const lineInitialProfile = {
  userId: '',
  displayName: '',
  statusMessage: '',
  pictureUrl: '',
};

export default function Page() {
  const { liffObject } = useLiff();
  const [personInfo, setPersonInfo] = useState(lineInitialProfile);

  useEffect(() => {
    if (!liffObject) return;

    const userProfile = liffObject.getProfile();

    userProfile.then(
      (profile: {
        userId: string;
        displayName: string;
        statusMessage: string;
        pictureUrl: string;
      }) => {
        const data = profile;

        console.log(data);
        setPersonInfo(data);
      }
    );

  }, [liffObject]);

  return (
    <>
      <p>Groups Page</p>
      <p>Name: {personInfo.displayName}</p>
      <Image src={personInfo.pictureUrl} alt={personInfo.displayName} width={500} height={500} />
      <p>userId: {personInfo.userId}</p>
    </>
  );
}
