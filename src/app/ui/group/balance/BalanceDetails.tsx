//import from next & react
import Image from 'next/image';
//import data
import { loginUserId } from '@/app/_components/frontendData/fetchData/user';
//import other
import clsx from "clsx";

interface User {
    id: string;
    name: string;
    picture: string;
}

interface Debt {
    [expenseId: string]: number;
};

interface Prop {
    groupUsers: User[];
    ownerDebt: Debt;
    totalAmount: number;
}

export function BalanceDetails({ groupUsers, ownerDebt, totalAmount }: Prop) {
    const nf = new Intl.NumberFormat('en-US');

    const getUserProfile = (userId: string): User => 
        groupUsers?.find(user => user.id === userId) || { id: userId, name: "", picture: "" };

    const targetUser = getUserProfile(loginUserId); // 假設 loginUserId 是在其他地方定義的

    const UserProfile = ({ user }: { user: User }) => (
        <div className="flex gap-2 items-center">
            {user.picture ? (
                <Image
                    className="z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-neutrals-30"
                    src={user.picture}
                    width={64}
                    height={64}
                    alt={`${user.name}'s picture`}
                />
            ) : (
                <div className="z-10 flex h-[36px] w-[36px] items-center justify-center rounded-full bg-neutrals-30" />
            )}
            <div>{user.name}</div>
        </div>
    );

    return (
        <div className="flex gap-6 mt-9 mx-6 items-start">
            <div className="grow-0 flex gap-2 items-center">
                <UserProfile user={targetUser} />
            </div>
            <div className="grow-0 h-[36px] flex justify-center items-center">
                <span>{totalAmount >= 0 ? "應收款" : "要付給"}</span>
            </div>
            <div className="grow flex flex-col gap-3">
                {ownerDebt && Object.entries(ownerDebt).map(([debtUserId, debtAmount]) => {
                    const debtUser = getUserProfile(debtUserId);

                    return (
                        <div key={debtUserId} className="flex justify-between items-center">
                            <UserProfile user={debtUser} />
                            <div
                                className={clsx({
                                    "text-highlight-50": debtAmount >= 0,
                                    "text-highlight-30": debtAmount < 0,
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