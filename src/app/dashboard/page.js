'use client';

import { useEffect } from 'react';
import { useLiff } from '../_components/liff-provider';

export default function DashboardPage() {
  const { liffObject } = useLiff();

  useEffect(() => {
    if (!liffObject) return;

    const idToken = liffObject.getIDToken();
    fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    });
  }, [liffObject]);
  return <div>Dashboard Page</div>;
}
