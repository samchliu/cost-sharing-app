//import from next & react
import Image from 'next/image';
import { Fragment } from 'react';
//impoart data
import { useUser, useGroup } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import {
  groupIconMap,
  expenseIconMap,
  DollarIcon,
  NotePencilIcon,
} from '@/app/ui/shareComponents/Icons';
import clsx from 'clsx';

export function GroupInfoBar({
  expenseData,
  group,
}: {
  expenseData: any;
  group: any;
}) {
  if (!expenseData) return;
  if (!group) return;

  let groupData = group;
  //   console.log(group);
  const {
    picture,
    name,
  }: {
    picture: 'travel' | 'health' | 'games' | 'other';
    name: string;
  } = groupData;

  const Icon = groupIconMap[picture];

  return (
    <>
      <div className="mt-16 flex items-center gap-4 border-b-2 py-4 pl-6">
        <p>你和</p>
        <div className="flex items-center justify-center gap-2 rounded-full bg-neutrals-30 py-1 pl-3 pr-4">
          {Icon ? (
            <Image
              src={Icon}
              className="z-0 flex h-7 w-7 items-center justify-center rounded-full bg-highlight-60"
              width={200}
              height={200}
              alt={picture}
            />
          ) : null}
          <div>{name}</div>
        </div>
      </div>
    </>
  );
}

export function ExpenseSettingStepOne({
  expenseData,
  phase,
}: {
  expenseData: any;
  phase: string;
}) {
  if (!expenseData) return;

  const {
    date,
    category,
    amount,
    name,
  }: {
    date: string;
    category:
      | 'food'
      | 'drink'
      | 'transport'
      | 'stay'
      | 'shopping'
      | 'entertainment'
      | 'other';
    amount: any;
    name: string;
  } = expenseData;

  const Icon = expenseIconMap[category];

  return (
    <div
      className={clsx('mx-auto my-6 w-fit', {
        hidden: phase !== '1'
      })}
    >
      <div className="mb-4 w-fit rounded-full bg-neutrals-20 px-2 py-[1px] text-sm">
        {date}
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          {Icon ? <Icon /> : null}
        </div>
        <input
          className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:ring-0"
          onChange={() => {}}
          type="text"
          value={name}
        />
      </div>
      <div className="my-3 flex items-end justify-between gap-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-highlight-60">
          <DollarIcon />
        </div>
        <input
          className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:ring-0"
          onChange={() => {}}
          type="text"
          value={amount}
        />
      </div>
      <div className="flex items-center justify-center gap-1 pb-6 pt-3 text-sm">
        <div>
          <NotePencilIcon />
        </div>
        <div>編輯備註</div>
      </div>
    </div>
  );
}
export function ExpenseSettingStepTwo({
  expenseData,
  group,
  phase
}: {
  expenseData: any;
  group: any;
  phase: string;
}) {
  if (!expenseData) return null;

  const users = group.users;

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== '2',
      })}
    >
      <p className="mb-5 text-xl">選擇付款人</p>
      {users.map((user: any) => {
        return (
          <div
            className="my-3 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
            </div>
            <input
              className="relative h-5 w-5 rounded-full border-[1.5px] border-black checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-3 checked:before:w-3 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-highlight-60 checked:focus:border-black active:bg-highlight-60"
              type="radio"
              id={user.name}
              name="payer"
              value={user.name}
              onChange={() => {}}
              checked={user.id === expenseData.payerId}
            />
          </div>
        );
      })}
    </div>
  );
}
export function ExpenseSettingStepThree({
  expenseData,
  group,
  phase
}: {
  expenseData: any;
  group: any;
  phase: string;
}) {
  if (!expenseData) return null;

  const users = group.users;

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== '3',
      })}
    >
      <div className="mb-5 flex w-full items-center justify-between px-3">
        <div className="w-12" />
        <p className="text-xl">選擇分帳成員</p>
        <div className="w-12 text-xs">取消全選</div>
      </div>
      {users.map((user: any) => {
        const isChecked = expenseData.sharers.some(
          (sharer: any) => sharer.id === user.id,
        );
        const amountValue = isChecked
          ? expenseData.sharers.filter(
              (sharer: any) => sharer.id === user.id,
            )[0].amount
          : '0';
        return (
          <div
            className="my-3 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
              <input
                className="w-48 border-0 border-b border-grey-500 bg-transparent pb-1 pl-0 focus:border-b focus:border-highlight-40 focus:ring-0"
                type="text"
                onChange={() => {}}
                value={amountValue}
              />
            </div>
            <input
              className="relative h-5 w-5 rounded-full border-[1.5px] border-black checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-3 checked:before:w-3 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-highlight-60 checked:focus:border-black active:bg-highlight-60"
              type="radio"
              id={user.name}
              name={user.name}
              value={user.name}
              onChange={() => {}}
              checked={isChecked}
            />
          </div>
        );
      })}
    </div>
  );
}
