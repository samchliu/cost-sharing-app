//import from next & react
import Image from 'next/image';
import { Fragment } from 'react';
//import ui
import { AddUserIcon, groupIconMap } from '@/app/ui/shareComponents/Icons';
import DeleteGroupButton from '@/app/ui/group/edit/DeleteGroupButton';
import { GroupUser } from '@/app/ui/group/edit/GroupUserButton';

export function GroupNameSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return
    const { id, picture, name }: {
        id: string;
        picture: 'travel' | 'health' | 'games' | 'other';
        name: string;
    } = groupData

    const Icon = groupIconMap[picture];

    function handleClick(id: any) {
        console.log(`edit group ${id}'s name`)
    }

    return (
        <>
            <div className="m-6 mt-16 pt-6 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    {Icon ? <Image src={Icon} className="z-0 flex h-[72px] w-[72px] items-center justify-center rounded-lg bg-highlight-60" width={200} height={200} alt={picture} /> : null}
                    <p className="text-xl">{name}</p>
                </div>
                <div onClick={() => handleClick(id)} className="text-sm text-grey-500 cursor-pointer">編輯</div>
            </div>
        </>
    );
}

export function GroupUsersSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return

    function handladdUser(){
console.log('user add!')
    }

    return (
        <>
            <div className="mx-6 flex flex-col">
                <p className="text-sm text-grey-500">群組成員</p>
                <div className="mt-4 mb-4 flex justify-between items-center">
                    <div onClick={()=>handladdUser()} className="flex items-center gap-4 cursor-pointer">
                        <div className="relative flex justify-center items-center w-11 h-11 rounded-full">
                            <div className="absolute left-[13px]"><AddUserIcon /></div>
                        </div>
                        <p className="">新增成員</p>
                    </div>
                </div>
                <div>
                    {groupData.users.map((user: any) => {
                        return (
                            <Fragment key={user.id}>
                                <GroupUser userData={user} />
                            </Fragment>)
                    })}
                </div>
            </div>
        </>
    );
}

export function GroupOtherSetting({ groupData }: { groupData: any; }) {
    if (!groupData) return

    return (
        <>
            <div className="mt-4 mx-6 flex flex-col">
                <p className="text-sm text-grey-500">其他設定</p>
                <DeleteGroupButton groupData={groupData} />
            </div>
        </>
    );
}

export function GroupSave({ groupData }: { groupData: any }) {

    function handleClick(id: string) {
        console.log(`group ${id} has changed and saved`)
    }
    
    return (
        <div className="flex justify-center items-center w-full">
            <button type="submit" onClick={() => handleClick(groupData.id)} className="mt-3 mb-6 py-3 bg-highlight-20 w-[80%] rounded-full text-center">儲存</button>
        </div>
    )
}