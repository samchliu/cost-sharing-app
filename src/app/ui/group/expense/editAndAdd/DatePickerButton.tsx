//import next & react
import { useId, useRef, useState } from 'react';
//import data
import { ExtendedExpense, Expense } from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import { inter, lato, notoSansJP, notoSansTC } from '@/app/ui/fonts';
//impoert other
import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker';
import { format, isValid, parse } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import clsx from 'clsx';

function CustomCaptionComponent(
  props: CaptionProps & { dialogRef: React.RefObject<HTMLDialogElement> } & {
    handleDayPickerSelect: (date: Date | undefined) => void;
  } & { originDate: string } & { setIsShow: React.Dispatch<React.SetStateAction<boolean>> }
) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="border-t-rounded-lg flex flex-col">
      <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-7 py-2">
        <div
          className="w-9 text-sm"
          onClick={() => {
            props.handleDayPickerSelect(new Date(props.originDate));
            props.setIsShow(false);

            setTimeout(() => {
              props.dialogRef.current?.close();
            }, 100);
          }}
        >
          取消
        </div>
        <div className="text-normal">選擇日期</div>
        <div className="w-9" />
      </div>
      <div className="flex items-center justify-between border-b border-grey-calendar px-16 py-4">
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className="focus:ring-0"
        >
          <ChevronLeftIcon className="h-5 w-5 stroke-2" />
        </button>
        <h2
          className={`${inter.variable} ${notoSansJP.variable} ${notoSansTC.variable} font-sans antialiased`}
        >
          {format(props.displayMonth, 'yyyy年M月')}
        </h2>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className="focus:ring-0"
        >
          <ChevronRightIcon className="h-5 w-5 stroke-2" />
        </button>
      </div>
    </div>
  );
}

export default function DatePickerButton({
  expenseData,
  setCurrentExpense,
}: {
  expenseData: ExtendedExpense | Expense;
  setCurrentExpense: React.Dispatch<React.SetStateAction<ExtendedExpense | Expense>>;
}) {
  const { date } = expenseData;
  const [isShow, setIsShow] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  const [month, setMonth] = useState<Date>(new Date(date));
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date(date));
  const [inputValue, setInputValue] = useState(format(date, 'yyyy/MM/dd'));
  const [lastSavedDate, setLastSavedDate] = useState<string>(date);

  const toggleDialog = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, 'yyyy/MM/dd'));
      setMonth(date as Date);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);

    const parsedDate = parse(e.target.value, 'yyyy/MM/dd', new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
      console.log(selectedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  return (
    <>
      <input
        className="w-[100px] rounded-full border-0 bg-neutrals-20 px-2 py-[1px] text-center text-sm caret-transparent focus:border-transparent focus:ring-0"
        id="date-input"
        type="text"
        inputMode="none"
        onChange={handleInputChange}
        onClick={toggleDialog}
        value={inputValue}
        placeholder="yyyy/MM/dd"
        aria-controls={dialogId}
        aria-haspopup="dialog"
        aria-label="Open calendar to choose date"
      />
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        className={clsx(' z-20 m-0 mx-auto rounded-lg bg-transparent transition-all duration-300', {
          'top-16 z-50 transform opacity-100  backdrop:bg-black/80': isShow,
          'top-20 -z-50 transform opacity-0 backdrop:bg-black/20': !isShow,
        })}
        aria-labelledby={headerId}
        onClick={() => {
          handleDayPickerSelect(new Date(lastSavedDate));
          setIsShow(false);
          setTimeout(() => {
            dialogRef.current?.close();
          }, 100);
        }}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <DayPicker
            locale={zhTW}
            weekStartsOn={0}
            components={{
              Caption: (props: CaptionProps) => (
                <CustomCaptionComponent
                  {...props}
                  dialogRef={dialogRef}
                  originDate={lastSavedDate}
                  handleDayPickerSelect={handleDayPickerSelect}
                  setIsShow={setIsShow}
                />
              ),
            }}
            className={`relative rounded-lg bg-white ${lato.variable} ${notoSansJP.variable} ${notoSansTC.variable} font-lato antialiased transition-all duration-200`}
            classNames={{
              table: 'pt-3 pb-3 px-5 flex flex-col items-center w-full border-collapse',
              head_row: 'flex font-[600] text-gray-900 mb-2',
              head_cell: 'm-1 w-9 font-[600] text-xs',
              row: 'flex w-full mt-1',
              cell: 'text-black rounded-full h-9 w-9 text-center text-[18px] p-0 m-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/0 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/0 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20 focus:ring-0 focus:border-0 focus:outline-none',
              day: 'h-7 w-7 p-0 font-[600]',
              day_range_end: 'day-range-end',
              day_selected:
                'rounded-full bg-highlight-60 text-black hover:bg-highlight-60 hover:text-black focus:bg-highlight-60 focus:text-black focus:ring-0 focus:border-0 focus:outline-none',
              day_today: 'rounded-full font-[700] text-gray-900',
              day_outside:
                'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
              day_disabled: 'text-gray-500 opacity-50',
              day_hidden: 'invisible',
            }}
            month={month}
            onMonthChange={setMonth}
            initialFocus
            mode="single"
            selected={selectedDate}
            onSelect={handleDayPickerSelect}
            showOutsideDays
            required
          />
          <div
            className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
            onClick={() => {
              setLastSavedDate(String(selectedDate));
              setMonth(selectedDate as Date);
              let formateSelectDate = format(selectedDate as Date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
              setCurrentExpense({
                ...expenseData,
                date: formateSelectDate,
              });
              setIsShow(false);
              setTimeout(() => {
                dialogRef.current?.close();
              }, 100);
            }}
          >
            儲存
          </div>
        </div>
      </dialog>
    </>
  );
}