//import from next & react
import Image from 'next/image';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { Debt, User, GroupUser } from '@/app/_components/frontendData/sharedFunction/types'; 
//import other
import clsx from "clsx";

interface Prop {
  groupUsers: GroupUser[];
  ownerDebt: Debt;
  totalAmount: number;
}

export function BalanceDetails({ groupUsers, ownerDebt, totalAmount }: Prop) {
  const { loginUserId } = useAllContext();
  const nf = new Intl.NumberFormat('en-US');

  const getUserProfile = (userId: string) =>
    groupUsers?.find((user) => user.id === userId) || {
      id: userId,
      name: '',
      picture: '',
    };

  const targetUser: User | GroupUser = getUserProfile(loginUserId || '');
  const UserProfile = ({ user }: { user: User | GroupUser }) => (
    <div className="flex items-center gap-2">
      {user.picture ? (
        <Image
          className="z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-neutrals-30"
          src={user.picture}
          width={64}
          height={64}
          alt={`${user.name}'s picture`}
          priority
        />
      ) : (
        <div className="z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-neutrals-30" />
      )}
      <div className="max-w-[70px] truncate text-sm">{user.name}</div>
    </div>
  );

  return (
    <div className="mx-6 mt-9 flex items-start gap-3">
      <div className="flex grow-0 items-center gap-2">
        <UserProfile user={targetUser} />
      </div>
      <div className="flex grow flex-col gap-3">
        <div className="flex h-[36px] grow-0 items-center text-sm text-neutrals-60">
          <span>{totalAmount >= 0 ? '應收款' : '要付給'}</span>
        </div>
        {ownerDebt &&
          Object.entries(ownerDebt).map(([debtUserId, debtAmount]) => {
            const debtUser = getUserProfile(debtUserId);

            return (
              <div key={debtUserId} className="flex items-center justify-between">
                <UserProfile user={debtUser} />
                <div
                  className={clsx({
                    'text-highlight-35': debtAmount >= 0,
                    'text-highlight-30': debtAmount < 0,
                  })}
                >
                  ${nf.format(Math.abs(debtAmount))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}