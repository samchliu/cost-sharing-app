'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useExpenses, useUser } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { TopExpenseSettingBar } from '@/app/ui/shareComponents/TopBars';
import { GroupInfoBar, NextStepButton } from '@/app/ui/expense/edit/ExpenseSettingDetails';
import { ExpenseSettingStepOne } from '@/app/ui/expense/edit/ExpenseSettingStepOne';
import { ExpenseSettingStepTwo } from '@/app/ui/expense/edit/ExpenseSettingStepTwo';
import { ExpenseSettingStepThree } from '@/app/ui/expense/edit/ExpenseSettingStepThree';
import SharerAmountInput from '@/app/ui/expense/edit/SharerAmountInput';

export default function Page() {
  const [phase, setPhase] = useState(1);
  const params = useParams<{ expenseid: string }>();
  const user = useUser(loginUserId);
  const [isNotEqual, setIsNotEqual] = useState(false);

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;

  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;

  const [currentExpense, setCurrentExpense] = useState(expense);
  const [showKeyboard, setShowKeyboard] = useState(false);

  if (!user) return;
  if (!group) return;

  //match groupId to find group name and picture
  let groupNameAndImage = null;

  for (let groupInfo of user.groups) {
    if (groupInfo.id === group.id) {
      groupNameAndImage = groupInfo;
    }
  }

  return (
    <form method="post" action={`/expense/${params.expenseid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar expenseData={expense} phase={phase} setPhase={setPhase} />
        <GroupInfoBar expenseData={currentExpense} group={groupNameAndImage} />
        <section>
          <ExpenseSettingStepOne
            group={group}
            expenseData={currentExpense}
            setCurrentExpense={setCurrentExpense}
            phase={phase}
            showKeyboard={showKeyboard}
            setShowKeyboard={setShowKeyboard}
            setIsNotEqual={setIsNotEqual}
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
            showKeyboard={showKeyboard}
          />
        </section>
        <div className="h-[420px]"></div>
      </div>
    </form>
  );
}
