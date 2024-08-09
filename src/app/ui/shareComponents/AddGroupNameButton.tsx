import { Group } from '@/app/_components/frontendData/sharedFunction/types';

export default function AddGroupNameButton({
  groupData,
  setCurrentGroup,
}: {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}) {
  const {
    name,
  }: {
    name: string;
  } = groupData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGroup({
      ...groupData,
      name: e.target.value,
    });
  };

  return (
    <div className="flex grow flex-col items-start">
      <p className="text-highlight-50">群組名稱</p>
      <input
        className="w-full border-0 border-b border-highlight-50 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
        onChange={() => {}}
        onBlur={handleChange}
        type="text"
        defaultValue={name}
      />
    </div>
  );
}
