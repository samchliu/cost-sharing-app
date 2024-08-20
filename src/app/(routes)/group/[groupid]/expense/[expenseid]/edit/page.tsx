'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup, useExpense, useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopExpenseSettingBar } from '@/app/ui/shareComponents/TopBars';
import { GroupInfoBar, NextStepButton } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepThree';

export default function Page() {
  const { loginUserId } = useAllContext();
  const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState<number>(1);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] = useState<boolean>(false);

  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(groupid, expenseid);
  const [currentExpense, setCurrentExpense] = useState<ExtendedExpense | Expense>(expense);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    }
  }, [expense]);

  return (
    <form method="post" action={`/group/${groupid}/expense/${expenseid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          isAddPage={false}
          group={group}
          expenseData={expense}
          phase={phase}
          setPhase={setPhase}
          hintword="編輯費用"
          cancelLink={`/group/${groupid}/expense/${expenseid}`}
        />
        {expense &&
        (expense.sharers?.some((sharer) => sharer.id === loginUserId) ||
          expense.payerId?.includes(loginUserId || '')) ? (
          <>
            <GroupInfoBar expenseData={currentExpense} group={group} />
            <section>
              <ExpenseSettingStepOne
                group={group}
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                phase={phase}
                setisIncorrectTotalNum={setisIncorrectTotalNum}
              />
              <ExpenseSettingStepTwo
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                group={group}
                phase={phase}
              />
              <ExpenseSettingStepThree
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                group={group}
                phase={phase}
                setIsNotEqual={setIsNotEqual}
              />
            </section>
            <section>
              <NextStepButton
                expenseData={currentExpense}
                phase={phase}
                setPhase={setPhase}
                isNotEqual={isNotEqual}
                setIsNotEqual={setIsNotEqual}
                isNotZero={true}
                isIncorrectTotalNum={isIncorrectTotalNum}
              />
            </section>
          </>
        ) : (
          <></>
        )}
      </div>
    </form>
  );
}