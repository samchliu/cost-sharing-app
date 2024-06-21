'use client';
//import from next & react
import { useParams } from 'next/navigation';
import { useState } from 'react';
//import data
import { useExpenses, useUser, useGroup } from '@/app/_components/frontendData/Providers';
import { loginUserId } from '@/app/_components/frontendData/user';
//import ui
import { TopExpenseSettingBar } from '@/app/ui/shareComponents/TopBars';
import {
  ExpenseSettingStepOne,
  ExpenseSettingStepTwo,
  ExpenseSettingStepThree,
  GroupInfoBar,
} from '@/app/ui/expense/edit/ExpenseSettingDetails';


export default function Page() {
  const [phase, setPhase] = useState('1');
  const params = useParams<{ expenseid: string }>();
  const user = useUser(loginUserId);

  //group users and this expense's info
  let users: any = useExpenses(params.expenseid).users;
  let groupWithExpense: any = useExpenses(params.expenseid).expense;

  let expense = groupWithExpense.expense;
  let group = groupWithExpense.group;

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
    <form action={`/test/split/expense/${params.expenseid}`}>
      <div className="relative flex flex-col">
        <TopExpenseSettingBar expenseData={expense} />
        <GroupInfoBar expenseData={expense} group={groupNameAndImage} />
        <section>
          <ExpenseSettingStepOne expenseData={expense} phase={phase} />
          <ExpenseSettingStepTwo expenseData={expense} group={group} phase={phase} />
          <ExpenseSettingStepThree expenseData={expense} group={group} phase={phase} />
        </section>
      </div>
    </form>
  );
}