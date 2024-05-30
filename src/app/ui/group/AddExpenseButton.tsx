'use client'
import { useState } from "react";
import {
    PlusIcon,
} from '@heroicons/react/24/outline';
import { loginUserId } from "@/app/_components/frontendData/user";


export default function AddExpenseButton({ groupData, groupId, data, setData }: { groupData: any; groupId: any; data: any; setData: any }) {
    const [fakeId, setFakeId] = useState(1);

    const handleAddExpense = async () => {
        let fakeExpenseId = fakeId;
        setFakeId(fakeExpenseId + 1)
        const newExpense = {
            groupId: groupId,
            expenseId: `try${fakeExpenseId}`,
            expenseType: 'other',
            cost: 340,
            date: '2024/5/28',
            event: `try Expense ${fakeExpenseId}`,
            payerId: `${loginUserId}`,
            sharersIds: [`${loginUserId}`],
        }

        setData([
            ...data,
            newExpense
        ])
        data.push(newExpense)
        console.log(data)
    }


    return (
        <>
            {groupData && groupData.membersIds.includes(loginUserId) ?
                <div onClick={handleAddExpense} className="fixed left-[50%] bottom-[45px] translate-x-[-50%] flex justify-center items-center bg-primary-green w-14 h-14 rounded-full">
                    <PlusIcon className="w-7 h-7 stroke-[2px]" />
                </div> : null
            }
        </>
    )
}