//import other
import clsx from "clsx";

export function BalanceAmount({ totalAmount }: { totalAmount: number }) {
  let nf = new Intl.NumberFormat('en-US');

  return (
    <div className="mt-16 flex w-full flex-col items-center justify-center border-b-[1px] border-b-grey-userBar pb-6 pt-6">
      <div className="text-sm leading-5 text-neutrals-70">
        {totalAmount === 0 ? (
          <>&ensp;</>
        ) : (
          <>{totalAmount > 0 ? '個人待收款總額' : '個人待繳款總額'}</>
        )}
      </div>
      <div
        className={clsx('text-xl ', {
          'text-highlight-50': totalAmount > 0 || totalAmount === 0,
          'text-highlight-30': totalAmount < 0,
        })}
      >
        ${nf.format(Math.abs(totalAmount))}
      </div>
    </div>
  );
}