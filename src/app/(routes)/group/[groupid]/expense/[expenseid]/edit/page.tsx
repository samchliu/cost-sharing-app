'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
//import data
import { useGroup, useExpense } from '@/app/_components/frontendData/fetchData/Providers';
import {
  ExtendedExpense,
  ExtendedGroup,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { TopExpenseSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  GroupInfoBar,
  NextStepButton,
} from '@/app/ui/group/expense/editAndAdd/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/ui/group/expense/editAndAdd/ExpenseSettingStepThree';
import { FadeIn } from '@/app/ui/shareComponents/FadeIn';

export default function Page() {
  const { groupid, expenseid } = useParams<{ groupid: string; expenseid: string }>();
  const [phase, setPhase] = useState<number>(1);
  const [isNotEqual, setIsNotEqual] = useState<boolean>(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] = useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  const group: ExtendedGroup = useGroup(groupid);
  const expense: ExtendedExpense = useExpense(groupid, expenseid);
  const [currentExpense, setCurrentExpense] = useState<ExtendedExpense | Expense>(expense);

  useEffect(() => {
    if (expense) {
      setCurrentExpense(expense);
    }
  }, [expense]);

  return (
    <div>
      <div className="relative flex flex-col items-center">
        <TopExpenseSettingBar
          group={group}
          expenseData={expense}
          phase={phase}
          setPhase={setPhase}
          hintword="編輯費用"
          cancelLink={`/group/${groupid}/expense/${expenseid}`}
        />
        {expense ? (
          <FadeIn direction="left">
            <GroupInfoBar expenseData={currentExpense} group={group} />
            <section>
              <ExpenseSettingStepOne
                isAddPage={false}
                group={group}
                oldExpenseData={expense}
                expenseData={currentExpense}
                setCurrentExpense={setCurrentExpense}
                phase={phase}
                setisIncorrectTotalNum={setisIncorrectTotalNum}
                nameExist={nameExist}
                setNameExist={setNameExist}
                hasNameLength={hasNameLength}
                setHasNameLength={setHasNameLength}
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
                isAddExpensePage={false}
                phase={phase}
                setPhase={setPhase}
                groupid={groupid}
                expenseData={currentExpense}
                isNotEqual={isNotEqual}
                setIsNotEqual={setIsNotEqual}
                isNotZero={true}
                isIncorrectTotalNum={isIncorrectTotalNum}
                nameExist={nameExist}
                hasNameLength={hasNameLength}
                url={`/group/${groupid}/expense/${expenseid}`}
              />
            </section>
          </FadeIn>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
