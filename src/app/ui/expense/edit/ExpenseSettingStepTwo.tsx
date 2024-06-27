//import from next & react
import Image from 'next/image';
//other
import clsx from 'clsx';

export function ExpenseSettingStepTwo({
  expenseData,
  setCurrentExpense,
  group,
  phase,
}: {
  expenseData: any;
  setCurrentExpense: any;
  group: any;
  phase: number;
}) {
  if (!expenseData) return null;
  const users = group.users;

  return (
    <div
      className={clsx('my-6 flex w-full flex-col items-center', {
        hidden: phase !== 2,
      })}
    >
      <p className="mb-5 text-xl">選擇付款人</p>
      {users.map((user: any) => {
        return (
          <div
            className="my-2 flex w-full items-center justify-between px-7"
            key={user.id}
          >
            <div className="flex items-center gap-4">
              <Image
                className="h-12 w-12 rounded-full"
                src={user.picture}
                width={50}
                height={50}
                alt="user's picture"
              />
              <div>{user.name}</div>
            </div>
            <input
              className="relative h-5 w-5 rounded-full border-[1.5px] border-black checked:border-black checked:bg-highlight-60 checked:text-highlight-60 checked:before:absolute checked:before:left-[50%] checked:before:top-[50%] checked:before:block checked:before:h-4 checked:before:w-4 checked:before:translate-x-[-50%] checked:before:translate-y-[-50%] checked:before:rounded-full checked:before:bg-highlight-60 hover:checked:border-black focus:ring-transparent checked:focus:border-black active:bg-highlight-60"
              type="radio"
              id={user.name}
              name="payer"
              value={user.name}
              onChange={() => {
                setCurrentExpense({
                  ...expenseData,
                  payerId: user.id,
                });
              }}
              defaultChecked={user.id === expenseData.payerId}
            />
          </div>
        );
      })}
    </div>
  );
}
