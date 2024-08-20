//import from next
import Image from 'next/image';
//import ui
import checkIcon from '../../../../public/images/icons/check.svg';
import closeIcon from '../../../../public/images/icons/close.svg';
import addGroupIcon from '../../../../public/images/icons/addGroup.svg';
import addUserIcon from '../../../../public/images/icons/addUser.svg';
import trashcanIcon from '../../../../public/images/icons/trashcan.svg';
import dollarIcon from '../../../../public/images/icons/dollar.svg';
import dollarTwoIcon from '../../../../public/images/icons/dollarTwo.svg';
import notePencilIcon from '../../../../public/images/icons/notePencil.svg';
import backspaceIcon from '../../../../public/images/icons/backspace.svg';
import shareLinkIcon from '../../../../public/images/icons/shareLink.svg';
import copyLinkIcon from '../../../../public/images/icons/copyLink.svg';
import homeIcon from '../../../../public/images/icons/home.svg';
import editIcon from '../../../../public/images/icons/edit.svg';
import editTwoIcon from '../../../../public/images/icons/editTwo.svg';
import greaterThanIcon from '../../../../public/images/icons/greaterThan.svg';
import cameraIcon from '../../../../public/images/icons/camera.svg';
import leaveIcon from '../../../../public/images/icons/leave.svg';
import backArrowIcon from '../../../../public/images/icons/backArrow.svg';

function FoodIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={21} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M15.77 10.23c2.038 0 3.691-2.066 3.691-4.615C19.461 3.066 17.808 1 15.77 1c-2.04 0-3.692 2.066-3.692 4.615 0 2.55 1.653 4.616 3.692 4.616ZM15.77 10.231v10.77M4.846 1v20M8.692 1v3.846a3.846 3.846 0 0 1-3.846 3.846v0A3.846 3.846 0 0 1 1 4.846V1"
        />
      </svg>
    </div>
  );
}

function DrinkIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={16} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M2.657 1A1.538 1.538 0 0 0 1.12 2.37C.949 4 .857 6.461.857 7.153c0 4.03 3.077 6.154 6.923 6.154s6.923-2.123 6.923-6.154c0-.692-.092-3.077-.261-4.785A1.538 1.538 0 0 0 12.903 1H2.657ZM7.78 13.308V21M4.703 21h6.154"
        />
      </svg>
    </div>
  );
}

function TransportIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={27} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M23.532 17.363a1.818 1.818 0 0 0 1.819-1.818V11.91a1.818 1.818 0 0 0-1.819-1.818h-2.727l-1.4-4.218a1.818 1.818 0 0 0-1.818-1.237h-7.29a1.818 1.818 0 0 0-1.82 1.237L7.17 10.09H3.532a1.818 1.818 0 0 0-1.818 1.818v3.636a1.818 1.818 0 0 0 1.818 1.818"
        />
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M7.169 21a3.636 3.636 0 1 0 0-7.273 3.636 3.636 0 0 0 0 7.273ZM19.896 21a3.636 3.636 0 1 0 0-7.273 3.636 3.636 0 0 0 0 7.273ZM10.805 17.364h5.455M13.532 4.636V1"
        />
      </svg>
    </div>
  );
}

function StayIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={25} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M1.571 12.304 12.876 1 24.18 12.304"
        />
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M5.05 8.826V21h15.652V8.826M12.876 21v-5.217"
        />
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M12.876 11.435a2.174 2.174 0 1 0 0-4.348 2.174 2.174 0 0 0 0 4.348Z"
        />
      </svg>
    </div>
  );
}

function ShoppingIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="m5.997 7.305.385 1.539M11.382 7.305l-.385 1.539M3.028 11.92h12.585l1.538-7.692H1.766a.77.77 0 0 0-.753.908l1.261 6.154a.754.754 0 0 0 .754.63v0ZM17.151 4.228l.646-2.461a.77.77 0 0 1 .754-.616h2.446"
        />
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="m15.613 11.92-.646 3.231a.77.77 0 0 1-.754.616h-9.37M5.613 21.151a.77.77 0 1 0 0-1.538.77.77 0 0 0 0 1.538ZM13.305 21.151a.77.77 0 1 0 0-1.538.77.77 0 0 0 0 1.538Z"
        />
      </svg>
    </div>
  );
}

function EntertainmentIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M3.973 21.151a3.116 3.116 0 1 0 0-6.232 3.116 3.116 0 0 0 0 6.232ZM17.995 17.256a3.116 3.116 0 1 0 0-6.232 3.116 3.116 0 0 0 0 6.232Z"
        />
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M21.11 14.14V1.926a.78.78 0 0 0-.98-.748L7.665 4.637a.779.779 0 0 0-.577.748v12.65M7.09 9.466l14.02-3.895"
        />
      </svg>
    </div>
  );
}

function OtherIcon({ strokeWidth }: { strokeWidth: number }) {
  return (
    <div className="flex h-5 items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width={23} height={7} fill="none">
        <path
          stroke="#000001"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M19.407 5.767a2.308 2.308 0 1 0 0-4.616 2.308 2.308 0 0 0 0 4.616ZM11.714 5.767a2.308 2.308 0 1 0 0-4.616 2.308 2.308 0 0 0 0 4.616ZM4.022 5.767a2.308 2.308 0 1 0 0-4.616 2.308 2.308 0 0 0 0 4.616Z"
        />
      </svg>
    </div>
  );
}

function CheckIcon() {
  return <Image src={checkIcon} alt="" />;
}

function AddGroupIcon() {
  return <Image src={addGroupIcon} alt="" />;
}

function AddUserIcon() {
  return <Image src={addUserIcon} alt="" />;
}

function TrashcanIcon() {
  return <Image src={trashcanIcon} alt="" />;
}

function DollarIcon() {
  return <Image src={dollarIcon} alt="" />;
}

function DollarTwoIcon() {
  return <Image src={dollarTwoIcon} alt="" />;
}

function NotePencilIcon() {
  return <Image src={notePencilIcon} alt="" />;
}

function BackspaceIcon() {
  return <Image src={backspaceIcon} alt="" />;
}

function ShareLinkIcon() {
  return <Image src={shareLinkIcon} alt="" />;
}

function CopyLinkIcon() {
  return <Image src={copyLinkIcon} alt="" />;
}

function HomeIcon() {
  return <Image src={homeIcon} alt="" priority />;
}

function EditIcon() {
  return <Image src={editIcon} alt="" />;
}

function EditTwoIcon() {
  return <Image src={editTwoIcon} alt="" />;
}

function GreaterThanIcon() {
  return <Image src={greaterThanIcon} alt="" />;
}

function NextstepIcon({ currentColor }: { currentColor: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={9} height={8} fill="none">
      <path
        stroke={currentColor}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m1 7 3-3-3-3m4.2 6 3-3-3-3"
      />
    </svg>
  );
}

function CloseIcon() {
  return <Image src={closeIcon} alt="" />;
}

function CameraIcon() {
  return <Image src={cameraIcon} alt="" />;
}

function LeaveIcon() {
  return <Image src={leaveIcon} alt="" />;
}

function BackArrowIcon() {
  return <Image className="h-6 w-[8px]" width={20} height={20} src={backArrowIcon} alt="" />;
}

const expenseIconMap = {
  food: FoodIcon,
  drink: DrinkIcon,
  transport: TransportIcon,
  stay: StayIcon,
  shopping: ShoppingIcon,
  entertainment: EntertainmentIcon,
  other: OtherIcon,
};

export {
  expenseIconMap,
  CheckIcon,
  CloseIcon,
  AddGroupIcon,
  AddUserIcon,
  TrashcanIcon,
  DollarIcon,
  DollarTwoIcon,
  NotePencilIcon,
  NextstepIcon,
  BackspaceIcon,
  ShareLinkIcon,
  CopyLinkIcon,
  HomeIcon,
  EditIcon,
  EditTwoIcon,
  GreaterThanIcon,
  CameraIcon,
  LeaveIcon,
  BackArrowIcon,
};