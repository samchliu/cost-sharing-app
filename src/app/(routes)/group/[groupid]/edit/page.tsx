'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { getGroup } from '@/app/_components/frontendData/API';

export default function Page() {
  const params = useParams<{ groupid: string }>();
  const [group, setGroup] = useState<any>(null);

  const fetchData = async () => {
    try {
      setGroup(await getGroup(params.groupid));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <h1 className="fixed left-[50%] z-[2] mt-0 w-full translate-x-[-50%] bg-primary-100 py-7 text-center text-3xl">
          {group ? group.name : 'no such group'} edit
        </h1>
      </div>
    </>
  );
}
