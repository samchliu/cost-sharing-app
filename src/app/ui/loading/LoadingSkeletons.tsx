// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function UsersBarSkeleton() {
  return (
    <>
      <div
        className={`mt-16 ${shimmer} relative flex items-center justify-center gap-2 overflow-hidden border-b-[2px] pb-5 pt-8`}
      >
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
        <div className="h-11 w-11 max-w-full rounded-full border-none bg-gray-100 object-cover align-middle shadow" />
      </div>
    </>
  );
}

export function BalanceSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <h1 className="text-lg">loading...</h1>
      </div>
    </>
  );
}

export function ExpenseSkeleton() {
  return (
    <>
      <div
        className={`${shimmer} fixed z-10 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <h1 className="text-lg">loading...</h1>
      </div>
    </>
  );
}

export function GroupsSkeleton() {
  const divArray = Array(10).fill(0);
  return (
    <>
      <div className={`${shimmer} flex min-h-screen flex-col bg-highlight-50`}>
        <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-highlight-50 pt-7 text-center text-2xl font-semibold tracking-wide text-white">
          群組列表
        </h1>
        <div className="mt-[6.5rem]">
          {divArray.map((_, index) => (
            <div
              key={index}
              className="mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2"
            >
              <div className="z-0 flex items-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutrals-20" />
              </div>
              <div className="flex items-center">
                <div className="relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-neutrals-20" />
              </div>
            </div>
          ))}
        </div>
        <div className="mb-16"></div>
      </div>
    </>
  );
}