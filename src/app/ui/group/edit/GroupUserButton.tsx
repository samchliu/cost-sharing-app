//import from next & react
import Image from 'next/image';
//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';

export function GroupUser({ userData }: { userData: any }) {
  const handleDelete = (id: any) => {
    console.log(`deleted user ${id}`);
  };

  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Image
          className="h-11 w-11 rounded-full bg-highlight-60"
          src={userData.picture}
          width={32}
          height={32}
          alt="user's image"
        />
        <p>{userData.name}</p>
      </div>
      <div
        onClick={() => handleDelete(userData.id)}
        className="flex h-8 w-8 items-center justify-center"
      >
        <TrashcanIcon />
      </div>
    </div>
  );
}