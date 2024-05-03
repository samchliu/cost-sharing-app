'use client';

import { useEffect } from 'react';
import { useLiff } from '../_components/liff-provider';

export default function DashboardPage() {
  const { liffObject, liffError } = useLiff();
  return <div>Dashboard Page</div>;
}
