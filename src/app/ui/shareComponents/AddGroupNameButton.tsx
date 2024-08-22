import {
  ExtendedGroup,
  Group,
  LoginUser,
} from '@/app/_components/frontendData/sharedFunction/types';
import clsx from 'clsx';

interface Prop {
  loginUserData: LoginUser;
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  nameExist: boolean;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddGroupNameButton({
  loginUserData,
  groupData,
  setCurrentGroup,
  nameExist,
  setNameExist,
}: Prop) {
  const {
    name,
  }: {
    name: string;
  } = groupData;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    loginUserData: LoginUser,
    groupData: ExtendedGroup
  ) => {
    const groupExist =
      loginUserData?.groups.some((group) => group.name === e.target.value) &&
      groupData.name !== e.target.value;

    if (groupExist) {
      setNameExist(true);
      return;
    } else {
      setNameExist(false);
      setCurrentGroup({
        ...groupData,
        name: e.target.value,
      });
    }
  };

  return (
    <div className="flex grow flex-col items-start">
      <p className="text-highlight-50">群組名稱</p>
      <div
        className={clsx('absolute top-[160px] text-sm text-neutrals-50', {
          block: nameExist,
          hidden: !nameExist,
        })}
      >
        該群組名稱已存在，請重新輸入
      </div>
      <input
        className="w-full border-0 border-b border-highlight-50 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:outline-none focus:ring-0"
        onChange={(e) => handleChange(e, loginUserData, groupData)}
        onBlur={() => {}}
        type="text"
        defaultValue={name}
      />
    </div>
  );
}