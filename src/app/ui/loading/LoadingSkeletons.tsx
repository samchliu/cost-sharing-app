// Loading animation
const shimmer =
  'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent before:w-full';

const shimmer2 =
  'before:h-14 before:w-14 before:absolute before:inset-x-10 before:-translate-x-full  before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent';

const shimmer3 =
  'before:h-8 before:w-6 before:absolute before:inset-x-0 before:-translate-x-full  before:animate-[shimmer_1s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent';

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

export function TopBarSkeleton() {
  return (
    <div className="relative mx-auto flex">
      <div
        className={`${shimmer} fixed left-[50%] -translate-x-[50%] z-20 flex w-full min-w-[320px] items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <div className="flex h-6 w-8 items-center justify-center" />
        <h1 className="text-lg">loading...</h1>
        <div className="h-6 w-8" />
      </div>
    </div>
  );
}

export function BalanceSkeleton() {
  return (
    <div className="relative flex flex-col">
      <div
        className={`${shimmer} fixed z-20 flex w-full items-center justify-between bg-highlight-50 px-5 py-4 text-white`}
      >
        <div className="flex h-6 w-8 items-center justify-center" />
        <h1 className="text-lg">loading...</h1>
        <div className="h-6 w-8" />
      </div>
    </div>
  );
}

export function GroupsSkeleton() {
  const divArray = Array(5).fill(0);
  return (
    <>
      <div className={`flex min-h-screen flex-col bg-highlight-50 items-center`}>
        <h1 className="fixed left-[50%] z-[2] w-full translate-x-[-50%] bg-transparent pt-7 text-center text-2xl font-semibold tracking-wide text-white">
          Chilling..
        </h1>
        <div className="mt-[6.5rem] w-full min-w-[320px] max-w-[800px]">
          {divArray.map((_, index) => (
            <div
              key={index}
              className={`mx-6 my-4 flex justify-between rounded-[20px] bg-white px-3 py-2`}
            >
              <div className="relative z-0 flex items-center">
                <div
                  className={`${shimmer2} flex h-14 w-14 items-center justify-center rounded-full bg-neutrals-20`}
                />
              </div>
              <div className="relative flex items-center">
                <div
                  className={`${shimmer3} relative z-[1] flex h-8 w-8 items-center justify-center rounded-full bg-neutrals-20`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mb-16"></div>
      </div>
    </>
  );
}
