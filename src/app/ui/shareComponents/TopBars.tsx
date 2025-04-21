//import data
import { useAllContext } from '@/app/_components/frontendData/fetchData/Providers';
import {
  ExtendedGroup,
  ExtendedExpense,
  Expense,
} from '@/app/_components/frontendData/sharedFunction/types';
//import ui
import { HomeIcon, EditIcon, EditTwoIcon, BackArrowIcon } from '@/app/ui/shareComponents/Icons';
import { LoadingButton } from '@/app/ui/loading/FullPageLoading';
//import other
import clsx from 'clsx';

interface TopGroupBarProps {
  isBalancePage: boolean;
  groupData: ExtendedGroup;
}

interface TopGroupSettingBarProps {
  isAddPage: boolean;
  groupData: ExtendedGroup;
  middleHintword: string;
  leftHintWord: string | React.ReactNode;
  rightHintWord: string;
  leftCancelLink: string;
  rightCancelLink: string;
}

interface TopExpenseBarProps {
  groupData: ExtendedGroup;
  expenseData: ExtendedExpense;
}

interface TopExpenseSettingBarProps {
  group: ExtendedGroup;
  expenseData: ExtendedExpense | Expense;
  phase: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  hintword: string;
  cancelLink: string;
}

interface TopBarProps {
  name: string;
  leftBtnName: string;
  rightBtnName: string;
  handleLeftClick: () => void;
  handleRightClick: () => void;
}


export function TopGroupBar({ isBalancePage, groupData }: TopGroupBarProps) {
  const { loginUserId } = useAllContext();
  const hasGroupData = Boolean(groupData);
  const isUserInGroup = hasGroupData && groupData.users?.some((user) => user.id === loginUserId);

  return (
    <div className="fixed z-10 w-full bg-highlight-50 left-[50%] top-0 -translate-x-[50%] flex items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[800px] items-center justify-between  px-5 py-4 text-white">
        <div className="flex h-6 w-6 items-center justify-center">
          {isBalancePage && hasGroupData ? (
            <LoadingButton url={`/group/${groupData.id}`} className="flex">
              <BackArrowIcon />
            </LoadingButton>
          ) : hasGroupData ? (
            <LoadingButton url="/groups" className="">
              <HomeIcon />
            </LoadingButton>
          ) : null}
        </div>
        <h1 className="md:max-w-64 text-lg md:truncate">{isUserInGroup ? groupData.name : ''}</h1>
        <div className="h-6 w-6">
          {!isBalancePage && isUserInGroup && (
            <LoadingButton url={`/group/${groupData.id}/edit`} className="">
              <EditIcon />
            </LoadingButton>
          )}
        </div>
      </div>
    </div>
  );
}

export function TopGroupSettingBar({
  isAddPage,
  groupData,
  middleHintword,
  leftHintWord,
  rightHintWord,
  leftCancelLink,
  rightCancelLink,
}: TopGroupSettingBarProps) {
  const { loginUserId } = useAllContext();

  const shouldRender =
    groupData && (isAddPage || groupData.users?.some((user) => user.id === loginUserId));

  return (
    <div className="fixed z-20 flex w-full items-center justify-center bg-highlight-50">
    <div className="flex w-full min-w-[320px] max-w-[800px] items-center justify-between px-5 py-4 text-white">
      <div className="flex h-6 w-8 items-center justify-center">
        {shouldRender && (
          <LoadingButton url={leftCancelLink} className="">
            <div className="">{leftHintWord}</div>
          </LoadingButton>
        )}
      </div>
      <h1 className="text-lg">{shouldRender && middleHintword}</h1>
      <div className="h-6 w-8">
        {shouldRender && (
          <LoadingButton url={rightCancelLink} className="">
            <div className="">{rightHintWord}</div>
          </LoadingButton>
        )}
      </div>
    </div>
    </div>
  );
}

export function TopExpenseBar({ groupData, expenseData }: TopExpenseBarProps) {
  const id = groupData ? groupData.id : '';

  return (
    <div className="fixed z-20 flex w-full bg-highlight-50 items-center justify-center">
      <div className="flex w-full min-w-[320px] max-w-[800px] items-center justify-between px-5 py-4 text-white">
        <LoadingButton url={`/group/${id}`} className="flex h-6 w-6 items-center justify-center">
          <BackArrowIcon />
        </LoadingButton>
        <h1 className="text-lg">{expenseData ? '費用明細' : ''}</h1>
        <div className="h-6 w-6">
          {expenseData ? (
            <LoadingButton url={`/group/${id}/expense/${expenseData.id}/edit`} className="h-6 w-6">
              <EditTwoIcon />
            </LoadingButton>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export function TopExpenseSettingBar({
  group,
  expenseData,
  phase,
  setPhase,
  hintword,
  cancelLink,
}: TopExpenseSettingBarProps) {
  function handleClick() {
    if (phase === 1) return;
    setPhase(phase - 1);
  }

  const shouldRender = expenseData && group;

  return (
    <div className="fixed z-20 flex w-full items-center justify-center bg-highlight-50">
      <div className="flex w-full min-w-[320px] max-w-[800px] items-center justify-between px-5 py-4 text-white">
        <div className="flex h-6 w-12 items-center justify-start">
          <button
            type="button"
            onClick={handleClick}
            className={clsx('cursor-pointer text-sm', {
              hidden: phase === 1,
            })}
          >
            上一步
          </button>
        </div>
        <h1 className="text-lg">{shouldRender && hintword}</h1>
        <div className="flex h-6 w-12 items-center justify-end">
          <>
            {shouldRender && (
              <LoadingButton url={cancelLink} className="">
                <p className="text-sm">取消</p>
              </LoadingButton>
            )}
          </>
        </div>
      </div>
    </div>
  );
}

export function TopBar({
  name,
  leftBtnName,
  rightBtnName,
  handleLeftClick,
  handleRightClick,
}: TopBarProps) {
  return (
    <div className="fixed top-0 z-50 flex w-full items-center justify-center bg-highlight-50">
      <div className="flex w-full min-w-[320px] max-w-[800px] items-center justify-between bg-highlight-50 px-5 py-4 text-white">
        <div className="h-6 w-8">
          <div onClick={handleLeftClick}>
            <p className="">{leftBtnName}</p>
          </div>
        </div>
        <h1 className="text-lg">{name}</h1>
        <div className="h-6 w-8">
          <div onClick={handleRightClick}>
            <p className="">{rightBtnName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}