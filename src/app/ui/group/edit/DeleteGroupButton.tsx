//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';

export default function DeleteGroupButton({ groupData }: { groupData: any }) {
  const handleDelete = (id: any) => {
    console.log(`deleted group ${id}`);
  };

  return (
    <>
      <div
        onClick={() => handleDelete(groupData.id)}
        className="mb-4 mt-4 flex items-center justify-between"
      >
        <div className="flex cursor-pointer items-center gap-4">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-neutrals-30">
            <div className="absolute left-[13px]">
              <TrashcanIcon />
            </div>
          </div>
          <p className="">刪除群組</p>
        </div>
      </div>
    </>
  );
}
