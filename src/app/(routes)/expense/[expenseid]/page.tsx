'use client';
import { useParams } from 'next/navigation';

import { filterExpense } from '@/app/_components/frontendData/totalDebts';
import { findExpenseGroupId } from '@/app/_components/frontendData/expense';
import { expenses } from '@/app/_components/frontendData/dummyData';

import { TopExpenseBar } from '@/app/ui/shareComponents/TopBars';
import { ExpenseDetailOne, ExpenseDetailTwo, ExpenseDetailThree } from '@/app/ui/expense/ExpenseDetails';
import DeleteExpenseButton from '@/app/ui/expense/DeleteExpenseButton';

export default function Page() {
  const params = useParams<{ expenseid: string }>();

  const { expensesWithDebts } = filterExpense(findExpenseGroupId(params.expenseid), expenses);

  const expenseData = expensesWithDebts.filter(
    (expense: any) => expense.expenseId === params.expenseid
  )[0];

  return (
    <div className="flex flex-col items-center">
      <TopExpenseBar expenseData={expenseData} />
      {expenseData && expenseData.expenseDebt ? (
        <div className="mt-16 flex w-full flex-col items-center px-4 py-6">
          <ExpenseDetailOne expenseData={expenseData} />
          <ExpenseDetailTwo expenseData={expenseData} />
          <ExpenseDetailThree expenseData={expenseData} />
          <DeleteExpenseButton />
        </div>
      ) : (
        <div className="mt-16 pt-6">no such expense</div>
      )}
    </div>
  );
}
