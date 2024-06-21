//import ui
import { TrashcanIcon } from '@/app/ui/shareComponents/Icons';

export default function DeleteGroupButton({
  groupData,
}: {
  groupData: any;
}) {

  const handleDelete = (id: any) => {
    console.log(`deleted group ${id}`)
  }

  return (
    <>
      <div onClick={() => handleDelete(groupData.id)} className="mt-4 mb-4 flex justify-between items-center">
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="relative flex justify-center items-center w-11 h-11 rounded-full bg-neutrals-30">
            <div className="absolute left-[13px]"><TrashcanIcon /></div>
          </div>
          <p className="">刪除群組</p>
        </div>
      </div>
    </>
  );
}
