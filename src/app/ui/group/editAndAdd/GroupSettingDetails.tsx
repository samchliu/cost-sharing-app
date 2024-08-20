//import from next & react
import { Fragment, useEffect } from 'react';
//import data
import { Group, GroupUser } from '@/app/_components/frontendData/sharedFunction/types';
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
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  isAddPage: boolean;
}

interface GroupUsersSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
  isAddPage: boolean;
  loginUserData: GroupUser;
}

interface GroupOtherSettingProps {
  groupData: Group;
  setCurrentGroup: React.Dispatch<React.SetStateAction<Group>>;
}

export function GroupNameSetting({
  groupData,
  setCurrentGroup,
  isAddPage
}: GroupNameSettingProps) {
  const {
    picture,
    name,
  } = groupData;
 

  return (
    <>
      <div className="m-6 mt-16 flex items-center justify-between pt-6">
        <div className={clsx("flex items-center gap-4", {
          "w-full": isAddPage,
        })}>
          {picture ? (
            <GroupPictureButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
          ) : null}
          {isAddPage ?
            <AddGroupNameButton
              groupData={groupData}
              setCurrentGroup={setCurrentGroup}
            />
            :
            <p className="text-xl">{name}</p>
          }

        </div>
        {isAddPage ?
          null :
          <EditGroupNameButton
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
          />}
      </div>
    </>
  );
}

export function GroupUsersSetting({
  groupData,
  setCurrentGroup,
  isAddPage,
  loginUserData
}: GroupUsersSettingProps) {
  useEffect(() => {
    console.log('group Data change!');
    console.log(groupData)
  }, [groupData]);

  return (
    <>
      <div className="mx-6 flex flex-col">
        <p className="text-sm text-grey-500">群組成員</p>
        <div className="mb-4 mt-4 flex items-center justify-between">
          <AddUserButton
            groupData={groupData}
            setCurrentGroup={setCurrentGroup}
          />
        </div>
        <div>
          {isAddPage ? (
            <>
              <GroupUserButton
                idx={loginUserData?.id || ''}
                userData={loginUserData}
                groupData={groupData}
                setCurrentGroup={setCurrentGroup}
                isAddPage={isAddPage}
                loginUserData={loginUserData}
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
                        loginUserData={loginUserData}
                      />
                    </Fragment>
                  );
                })}
            </>
          ) : (
            <>
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
                        loginUserData={loginUserData}
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

export function GroupOtherSetting({
  groupData,
  setCurrentGroup,
}: GroupOtherSettingProps) {

  return (
    <>
      <div className="mx-6 mt-4 flex flex-col">
        <p className="text-sm text-grey-500">其他設定</p>
        <DeleteGroupButton
          groupData={groupData}
          setCurrentGroup={setCurrentGroup}
        />
      </div>
    </>
  );
}

export function GroupSave({
  groupData,
  formRef,
}: {
  groupData: Group;
  formRef: React.RefObject<HTMLFormElement>;
}) {
  async function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    try {
      await addGroup({
        name: "Let's Chill5",
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
        users: [
          {
            name: '成員1',
            picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
          },
          {
            name: '成員2',
            picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
          },
        ],
      });
      // addGroup({
      //   name: "Let's Chill3",
      //   picture: '/images/icons/groupIcon09.svg',
      //   users: [
      //     {
      //       name: 'Clare',
      //       picture: '/images/icons/newUserBG.svg',
      //     },
      //     {
      //       name: 'Alex',
      //       picture: '/images/icons/newUserBG.svg',
      //     },
      //   ],
      // });
      // addGroup(groupData);
      console.log(groupData);
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
        type="submit"
        onClick={handleClick}
        className="mb-6 mt-3 w-[80%] rounded-full bg-highlight-20 py-3 text-center"
      >
        儲存
      </button>
    </div>
  );
}