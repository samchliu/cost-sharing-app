//import from next
import Image from 'next/image';
//import ui
import foodIcon from '../../../../public/icons/food.svg';
import drinkIcon from '../../../../public/icons/drink.svg';
import transportIcon from '../../../../public/icons/transport.svg';
import stayIcon from '../../../../public/icons/stay.svg';
import shoppingIcon from '../../../../public/icons/shopping.svg';
import entertainmentIcon from '../../../../public/icons/entertainment.svg';
import otherIcon from '../../../../public/icons/other.svg';
import checkIcon from '../../../../public/icons/check.svg';
import closeIcon from '../../../../public/icons/close.svg';
import addGroupIcon from '../../../../public/icons/addGroup.svg';
import {
  GlobeAsiaAustraliaIcon,
  HeartIcon,
  PuzzlePieceIcon,
  RocketLaunchIcon,
} from '@heroicons/react/24/outline';

function FoodIcon() {
  return <Image src={foodIcon} alt="" />;
}

function DrinkIcon() {
  return <Image src={drinkIcon} alt="" />;
}

function TransportIcon() {
  return <Image src={transportIcon} alt="" />;
}

function StayIcon() {
  return <Image src={stayIcon} alt="" />;
}

function ShoppingIcon() {
  return <Image src={shoppingIcon} alt="" />;
}

function EntertainmentIcon() {
  return <Image src={entertainmentIcon} alt="" />;
}

function OtherIcon() {
  return <Image src={otherIcon} alt="" />;
}

function CheckIcon() {
  return <Image src={checkIcon} alt="" />;
}

function CloseIcon() {
  return <Image src={closeIcon} alt="" />;
}

function AddGroupIcon() {
  return <Image src={addGroupIcon} alt="" />;
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

const groupIconMap = {
  travel: GlobeAsiaAustraliaIcon,
  health: HeartIcon,
  games: PuzzlePieceIcon,
  other: RocketLaunchIcon,
};

export { expenseIconMap, groupIconMap, CheckIcon, CloseIcon, AddGroupIcon };