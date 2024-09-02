//import from next & react
import { Fragment, useEffect } from 'react';
//import data
import {
  Group,
  ExtendedGroup,
  GroupUser,
  LoginUser,
} from '@/app/_components/frontendData/sharedFunction/types';
import { addGroup } from '@/app/_components/frontendData/fetchData/API';
//import ui
import DeleteGroupButton from '@/app/ui/group/editAndAdd/DeleteGroupButton';
import { GroupUserButton } from '@/app/ui/group/editAndAdd/GroupUserButton';
import GroupPictureButton from '@/app/ui/group/editAndAdd/GroupPictureButton';
import EditGroupNameButton from '@/app/ui/group/editAndAdd/EditGroupNameButton';
import AddUserButton from '@/app/ui/group/editAndAdd/AddUserButton';
import AddGroupNameButton from '@/app/ui/shareComponents/AddGroupNameButton';
//import other
import { v4 as uuidv4 } from 'uuid';
import clsx from 'clsx';

interface GroupNameSettingProps {
  loginUserData: LoginUser;
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  isAddPage: boolean;
  nameExist: boolean;
  setNameExist: React.Dispatch<React.SetStateAction<boolean>>;
  hasNameLength: boolean;
  setHasNameLength: React.Dispatch<React.SetStateAction<boolean>>;
}

interface GroupUsersSettingProps {
  groupData: ExtendedGroup;
  setCurrentGroup: React.Dispatch<React.SetStateAction<ExtendedGroup>>;
  isAddPage: boolean;
  loginUserData: LoginUser | null;
}

interface GroupOtherSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}

export function GroupNameSetting({
  loginUserData,
  groupData,
  setCurrentGroup,
  isAddPage,
  nameExist,
  setNameExist,
  hasNameLength,
  setHasNameLength,
}: GroupNameSettingProps) {
  const { picture, name } = groupData;

  return (
    <>
      <div className="m-6 mt-16 flex items-center justify-between pt-6">
        <div
          className={clsx('flex items-center gap-4', {
            'w-full': isAddPage,
          })}
        >
          {picture ? (
            <GroupPictureButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
              isAddPage={isAddPage}
            />
          ) : null}
          {isAddPage ? (
            <AddGroupNameButton
              loginUserData={loginUserData}
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
              nameExist={nameExist}
              setNameExist={setNameExist}
              hasNameLength={hasNameLength}
              setHasNameLength={setHasNameLength}
            />
          ) : (
            <p className="w-52 truncate text-xl">{name}</p>
          )}
        </div>
        {isAddPage ? null : (
          <EditGroupNameButton
            loginUserData={loginUserData}
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
            nameExist={nameExist}
            setNameExist={setNameExist}
          />
        )}
      </div>
    </>
  );
}

export function GroupUsersSetting({
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData,
}: GroupUsersSettingProps) {
  useEffect(() => {}, [groupData]);

  const creatorId = groupData.creatorId || '';
  const sortedUsers = groupData.users?.slice() || [];
  const creatorUserIndex = sortedUsers.findIndex((user) => user.id === creatorId);

  if (creatorUserIndex !== -1) {
    const [creatorUser] = sortedUsers.splice(creatorUserIndex, 1);

    sortedUsers.unshift(creatorUser);
  }

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <AddUserButton
            isAddPage={isAddPage}
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
            loginUserData={loginUserData || null}
          />
        </div>
        <div>
          {isAddPage ? (
            <>
              <GroupUserButton
                idx={loginUserData?.id || ''}
                userData={loginUserData || null}
                groupData={groupData}
                setCurrentGroup={setCurrentGroup}
                isAddPage={isAddPage}
                loginUserData={loginUserData || null}
              />
              {groupData.users &&
                groupData.users.map((user: GroupUser) => {
                  let idx = uuidv4();

                  return (
                    <Fragment key={idx}>
                      <GroupUserButton
                        idx={idx}
                        userData={user}
                        groupData={groupData}
                        setCurrentGroup={setCurrentGroup}
                        isAddPage={isAddPage}
                        loginUserData={loginUserData || null}
                      />
                    </Fragment>
                  );
                })}
            </>
          ) : (
            <>
              {groupData.users &&
                sortedUsers.map((user: GroupUser) => {
                  let idx = uuidv4();
                  return (
                    <Fragment key={idx}>
                      <GroupUserButton
                        idx={idx}
                        userData={user}
                        groupData={groupData}
                        setCurrentGroup={setCurrentGroup}
                        isAddPage={isAddPage}
                        loginUserData={loginUserData || null}
                      />
                    </Fragment>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export function GroupOtherSetting({ groupData, setCurrentGroup }: GroupOtherSettingProps) {
  return (
    <>
      <div className="mx-6 mt-4 flex flex-col">
        <p className="text-sm text-grey-500">其他設定</p>
        <DeleteGroupButton groupData={groupData} setCurrentGroup={setCurrentGroup} />
      </div>
    </>
  );
}

export function GroupSave({
  groupData,
  formRef,
  nameExist,
  hasNameLength,
}: {
  groupData: Group;
  formRef: React.RefObject<HTMLFormElement>;
  nameExist: boolean;
  hasNameLength: boolean;
}) {
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (nameExist) return;
    if (!hasNameLength) return;
    let groupUsers = groupData.users ? groupData.users : [];
    let GroupBody = {
      name: groupData.name,
      picture: groupData.picture,
      users: groupUsers,
    };
    try {
      await addGroup(GroupBody);
      console.log(GroupBody);
      if (formRef.current) {
        formRef.current.submit();
      }
    } catch (error) {
      console.error('API 呼叫失敗:', error);
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <button
        disabled={nameExist || !hasNameLength}
        type="submit"
        onClick={handleClick}
        className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center disabled:bg-neutrals-30 disabled:text-text-onDark-secondary"
      >
        儲存
      </button>
    </div>
  );
}
