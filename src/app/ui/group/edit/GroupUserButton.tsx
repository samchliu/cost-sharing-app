//import from next & react
import Image from 'next/image';
//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';

export function GroupUser({ userData }: { userData: any }) {

  const handleDelete = (id: any) => {
    console.log(`deleted user ${id}`)
  }
 
    return (
        <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-4 items-center">
                <Image
                    className="w-11 h-11 rounded-full bg-highlight-60"
                    src={userData.picture}
                    width={32}
                    height={32}
                    alt="user's image"
                />
                <p>{userData.name}</p>
            </div>
            <div  onClick={() => handleDelete(userData.id)} className="flex justify-center items-center w-8 h-8">
                <TrashcanIcon />
            </div>
        </div>
    )
}