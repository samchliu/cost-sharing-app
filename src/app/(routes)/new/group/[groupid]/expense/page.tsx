'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
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

export default function Page() {
  const { loginUserId } = useAllContext();
  const params = useParams<{ groupid: string }>();
  const [phase, setPhase] = useState(1);
  const [isNotEqual, setIsNotEqual] = useState(false);
  const [isNotZero, setIsNotZero] = useState(false);
  const [isIncorrectTotalNum, setisIncorrectTotalNum] = useState<boolean>(false);

  const group = useGroup(params.groupid);
  const [currentExpense, setCurrentExpense] = useState<Expense>({
    name: '未命名費用',
    category: 'food',
    amount: 0,
    date: new Date().toISOString(),
    note: '',
    payerId: loginUserId || '',
    sharers: [],
  });

  useEffect(() => {
    if (currentExpense.amount !== 0) {
      setIsNotZero(true);
    }
  }, [currentExpense?.amount, isNotZero]);

  return (
    <form method="post" action={`/group/${params.groupid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar
          isAddPage={true}
          group={group}
          expenseData={currentExpense}
          phase={phase}
          setPhase={setPhase}
          hintword="新增費用"
          cancelLink={`/group/${params.groupid}`}
        />
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
      </div>
    </form>
  );
}