'use client';
//import from next & react
import Image from 'next/image';

// Loading animation
const shimmer =
  'relative overflow-hidden before:h-[12.5vh] before:w-full before:absolute before:left-[-50%] before:translate-x-[-100vw] before:animate-[shimmer_3s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent';

export function KVLoading() {
  return (
    <>
      <div className="flex h-[12.5vh] w-full">
        <div className="grow bg-highlight-60"></div>
        <Image
          src="/images/icons/kv_icon_3.svg"
          className="w-[25%] bg-highlight-20"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <Image
          src="/images/icons/kv_icon_1.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <div className="grow bg-highlight-20"></div>
      </div>
      <div className="flex h-[12.5vh] w-full">
        <div className="grow bg-highlight-40"></div>
        <div className="grow bg-highlight-60"></div>
        <div className="grow bg-highlight-40"></div>
        <Image
          src="/images/icons/kv_icon_4.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
      </div>
      <div className={`${shimmer} flex h-[12.5vh] w-full`}>
        <Image
          src="/images/icons/kv_icon_2.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <div className="flex grow-[3] items-center justify-center bg-highlight-30 text-[2.2rem] font-extrabold tracking-wide">
          CHILL後算帳
        </div>
      </div>
      <div className="flex h-[12.5vh] w-full">
        <Image
          src="/images/icons/kv_icon_7.svg"
          className="w-[25%] bg-highlight-40"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <div className="grow bg-highlight-60"></div>
        <div className="grow bg-highlight-40"></div>
        <Image
          src="/images/icons/kv_icon_9.svg"
          className="w-[25%] bg-highlight-60"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
      </div>
      <div className="flex h-[12.5vh] w-full">
        <div className="grow bg-highlight-50"></div>
        <Image
          src="/images/icons/kv_icon_6.svg"
          className="w-[25%] bg-highlight-20"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <div className="grow bg-highlight-60"></div>
        <div className="grow bg-highlight-20"></div>
      </div>
      <div className={`${shimmer} flex h-[12.5vh] w-full`}>
        <div className="flex grow-[3] items-center justify-center bg-highlight-30 text-[1.3rem] font-bold">
          Chill Trips, Easy Splits.&nbsp;&nbsp;&nbsp;
        </div>
        <Image
          src="/images/icons/kv_icon_11.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
      </div>
      <div className="flex h-[12.5vh] w-full">
        <div className="grow bg-highlight-20"></div>
        <div className="grow bg-highlight-40"></div>
        <Image
          src="/images/icons/kv_icon_5.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <div className="grow bg-highlight-40"></div>
      </div>
      <div className="flex h-[12.5vh] w-full">
        <Image
          src="/images/icons/kv_icon_10.svg"
          className="w-[25%] bg-highlight-40"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <Image
          src="/images/icons/kv_icon_12.svg"
          className="w-[25%] bg-highlight-60"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <Image
          src="/images/icons/kv_icon_8.svg"
          className="w-[25%] bg-highlight-40"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
        <Image
          src="/images/icons/kv_icon_2.svg"
          className="w-[25%] bg-highlight-50"
          width={200}
          height={200}
          alt="kv image"
          priority
        />
      </div>
    </>
  );
}
