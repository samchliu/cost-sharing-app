'use client';
import { useParams } from 'next/navigation';
import { expensesWithDebts } from '@/app/_components/frontendData/totalDebts';
import { TopExpenseBar } from '@/app/ui/shareComponents/TopBars';

export default function Page() {
  const params = useParams<{ expenseid: string }>();
  const expenseData = expensesWithDebts.filter(
    (expense: any) => expense.expenseId === params.expenseid
  )[0];

  return (
    <div className="flex flex-col">
      <TopExpenseBar />
      {expenseData && expenseData.expenseDebt ? (
        <div className="mt-16">
          <p>
            {expenseData.event}, {expenseData.expenseDebt}
          </p>
        </div>
      ) : null}
      {/* {expenseData.groupId}
      {expenseData.expenseId}
      {expenseData.expenseType}
      {expenseData.cost}
      {expenseData.date}
      {expenseData.event}
      {expenseData.payerId} */}
    </div>
  );
}
