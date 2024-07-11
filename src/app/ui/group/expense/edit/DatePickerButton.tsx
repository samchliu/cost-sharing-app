//import next & react
import { useId, useRef, useState } from 'react';
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
    handleDayPickerSelect: any;
  } & { originDate: any } & { setIsShow: any },
) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="border-t-rounded-lg flex flex-col">
      <div className="flex items-center justify-between rounded-t-lg bg-highlight-60 px-5 py-2">
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
  date,
  expenseData,
  setCurrentExpense,
}: {
  date: any;
  expenseData: any;
  setCurrentExpense: any;
}) {
  const [isShow, setIsShow] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date(date));
  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(date),
  );
  // Hold the input value in state
  const [inputValue, setInputValue] = useState(format(date, 'yyyy/MM/dd'));
  // Hold the last saved date in state
  const [lastSavedDate, setLastSavedDate] = useState<any>(date);

  const toggleDialog = () => {
    dialogRef.current?.showModal();
    setTimeout(() => {
      setIsShow(true);
    }, 0);
  };
  /**
   * Function to handle the DayPicker select event: update the input value and
   * the selected date, and set the month.
   */
  const handleDayPickerSelect = (date: any) => {
    if (!date) {
      setInputValue('');
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, 'yyyy/MM/dd'));
      setMonth(date as any);
    }
  };

  /**
   * Handle the input change event: parse the input value to a date, update the
   * selected date and set the month.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // keep the input value in sync

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
        className={clsx(
          ' z-20 m-0 mx-auto rounded-lg bg-transparent transition-all duration-300',
          {
            'top-16 z-50 transform opacity-100  backdrop:bg-black/80': isShow,
            'top-20 -z-50 transform opacity-0 backdrop:bg-black/20': !isShow,
          },
        )}
        aria-labelledby={headerId}
        onClick={() => {
          handleDayPickerSelect(new Date(lastSavedDate));
          setIsShow(false);
          setTimeout(() => {
            dialogRef.current?.close();
          }, 100);
        }}
      >
        <div onClick={(e: any) => e.stopPropagation()}>
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
              ), // 傳遞 dialogRef 給 CustomCaptionComponent
            }}
            className={`relative rounded-lg bg-white ${lato.variable} ${notoSansJP.variable} ${notoSansTC.variable} font-lato antialiased transition-all duration-200`}
            classNames={{
              table:
                'pt-3 pb-3 px-5 flex flex-col items-center w-full border-collapse',
              head_row: 'flex font-medium text-gray-900 mb-2',
              head_cell: 'm-1 w-9 font-medium text-xs',
              row: 'flex w-full mt-1',
              cell: 'text-black rounded-full h-9 w-9 text-center text-[18px] p-0 m-1 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/0 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/0 first:[&:has([aria-selected])]:rounded-l-full last:[&:has([aria-selected])]:rounded-r-full focus-within:relative focus-within:z-20 focus:ring-0 focus:border-0 focus:outline-none',
              day: 'h-7 w-7 p-0 font-medium',
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
            // fixedWeeks
            required
          />
          <div
            className="mt-5 w-full rounded-full bg-highlight-20 py-3 text-center"
            onClick={() => {
              setLastSavedDate(selectedDate); // Save selected date
              setMonth(selectedDate as any);
              let formateSelectDate = format(
                selectedDate as any,
                "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
              );
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
