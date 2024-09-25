'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
//import data
import { useAllContext, useGroup } from '@/app/_components/frontendData/fetchData/Providers';
import { Expense } from '@/app/_components/frontendData/sharedFunction/types';
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
  const { loginUserId } = useAllContext();
  const { groupid } = useParams<{ groupid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);
  const [isNotZero, setIsNotZero] = useState(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] = useState<boolean>(false);
  const [nameExist, setNameExist] = useState<boolean>(false);
  const [hasNameLength, setHasNameLength] = useState<boolean>(true);

  const group = useGroup(groupid);
  const [currentExpense, setCurrentExpense] = useState<Expense>({
    name: '未命名費用',
    category: 'food',
    amount: 0,
    date: new Date().toISOString(),
    note: '',
    payerId: loginUserId || '',
    sharers: [],
  });
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (currentExpense.amount !== 0) {
      setIsNotZero(true);
    }
  }, [currentExpense?.amount, isNotZero]);

  return (
    <form ref={formRef} method="post" action={`/group/${groupid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          group={group}
          expenseData={currentExpense}
          phase={phase}
          setPhase={setPhase}
          hintword="新增費用"
          cancelLink={`/group/${groupid}`}
        />
        <FadeIn direction="left">
          <GroupInfoBar expenseData={currentExpense} group={group} />
          <section>
            <ExpenseSettingStepOne
              isAddPage={true}
              group={group}
              oldExpenseData={currentExpense}
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
              isAddExpensePage={true}
              formRef={formRef}
              groupid={groupid}
              expenseData={currentExpense}
              phase={phase}
              setPhase={setPhase}
              isNotEqual={isNotEqual}
              setIsNotEqual={setIsNotEqual}
              isNotZero={true}
              isIncorrectTotalNum={isIncorrectTotalNum}
              nameExist={nameExist}
              hasNameLength={hasNameLength}
            />
          </section>
        </FadeIn>
      </div>
    </form>
  );
}
