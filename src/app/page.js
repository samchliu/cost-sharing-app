'use client';

import { useState, useEffect } from 'react';
import { useLiff } from './components/liff-provider';

export default function Home() {
  const { liffObject, liffError } = useLiff();
  const [profile, setProfile] = useState(null);

  async function getProfile() {
    const profile = await liffObject.getProfile();
    setProfile(profile);
  }

  useEffect(() => {
    if (liffObject) getProfile();
  }, [liffObject]);

  if (!liffObject || !profile) return <div>loading...Ruby Test</div>;
  return (
    <main className="flex items-center gap-2">
      <span>Hi, {profile.displayName}</span>
      <img
        className="inline-block h-8 w-8 rounded-full"
        src={profile.pictureUrl}
        alt="pictureUrl"
      />
    </main>
  );
}
