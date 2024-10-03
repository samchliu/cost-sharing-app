//import from next & react
import Link from 'next/link';
import { Fragment } from 'react';
//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import { filterExpense } from '@/app/_components/frontendData/sharedFunction/totalDebts';
import {
  ExtendedExpense,
  GroupUser,
  ExtendedGroup,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { GreaterThanIcon, expenseIconMap } from '@/app/ui/shareComponents/Icons';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';
//import other
import { format } from 'date-fns';

export default function ExpensesList({ groupData }: { groupData: ExtendedGroup }) {
  const { loginUserId } = useAllContext();
  const fetchExpenses = groupData?.expenses || [
    {
      id: '',
      name: '',
      amount: 0,
      date: '',
      category: 'food',
      payerId: '',
      sharers: [],
      note: '',
    },
  ];
  let { expensesWithDebts } = filterExpense(fetchExpenses, loginUserId);
  let groupId = groupData?.id ? groupData?.id : '';
  let users = groupData?.users
    ? groupData?.users
    : [
        {
          id: '',
          name: '',
          picture: '',
          adoptable: false,
        },
      ];
  let expenses = expensesWithDebts;

  const groupedExpenses = expenses.reduce(
    (acc: { [date: string]: ExtendedExpense[] }, expense: ExtendedExpense) => {
      const date = expense.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(expense);
      return acc;
    },
    {}
  );

  const renderExpensesByDate = () => {
    const sortedDates: string[] = Object.keys(groupedExpenses).sort(
      (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
    );

    return sortedDates.map((date, index) => {
      let formateDate: Date | string = date ? new Date(date) : new Date();
      formateDate = format(formateDate, 'yyyy/MM/dd');

      return (
        <div key={index}>
          {groupedExpenses[date].find(
            (expense: ExtendedExpense) => expense.expenseDebt !== undefined
          ) ? (
            <div className="mx-8 mb-3 text-sm text-grey-500">{formateDate}</div>
          ) : null}
          {groupedExpenses[date].map((expense: ExtendedExpense) => (
            <Fragment key={expense.id}>
              <ExpenseButton users={users} expense={expense} groupId={groupId} />
            </Fragment>
          ))}
        </div>
      );
    });
  };

  return <>{renderExpensesByDate()}</>;
}

function ExpenseButton({
  users,
  expense,
  groupId,
}: {
  users: GroupUser[];
  expense: ExtendedExpense;
  groupId: string;
}) {
  const { loginUserId } = useAllContext();
  const { id, name, amount, category, payerId, expenseDebt } = expense;

  const payerData = users.filter((user: GroupUser) => user.id === payerId)[0];

  const Icon = expenseIconMap[category];
  let nf = new Intl.NumberFormat('en-US');

  return (
    <LoadingButton
      url={`/group/${groupId}/expense/${id}`}
      className="mx-4 mb-4 flex justify-between rounded-lg bg-white py-3 pl-4 pr-3"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-highlight-60">
          {Icon ? <Icon strokeWidth={1} /> : null}
        </div>
        <div className="leading-[20px]">
          <div className="max-w-[150px] truncate font-normal">{name}</div>
          <div className="font-base flex text-sm text-grey-500">
            <div className="max-w-[60px] truncate">
              {loginUserId === payerId ? '你' : payerData?.name}
            </div>
            <div>付了</div>
            <div>${nf.format(Number(amount))}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {expenseDebt?.includes('-') ? (
          <div className="text-[15px] text-highlight-30">
            -${nf.format(Math.abs(Number(expenseDebt)))}
          </div>
        ) : (
          <div className="text-[15px] text-highlight-35">+${nf.format(Number(expenseDebt))}</div>
        )}
        <GreaterThanIcon />
      </div>
    </LoadingButton>
  );
}