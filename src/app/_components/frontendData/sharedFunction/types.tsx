export interface User {
  id?: string;
  name: string;
  picture: string;
}

export interface LoginUser extends User {
  lineId: string;
  groups: Group[];
}

export interface GroupUser extends User {
  adoptable?: boolean;
}

export interface Group {
  id?: string;
  name: string;
  picture: GroupPicture;
  users?: GroupUser[];
}

export interface ExtendedGroup extends Group {
  creatorId?: string;
  expenses?: ExtendedExpense[];
}

export type GroupPicture =
  | '/images/icons/groupIcon01.svg'
  | '/images/icons/groupIcon02.svg'
  | '/images/icons/groupIcon03.svg'
  | '/images/icons/groupIcon04.svg'
  | '/images/icons/groupIcon05.svg'
  | '/images/icons/groupIcon06.svg'
  | '/images/icons/groupIcon07.svg'
  | '/images/icons/groupIcon08.svg'
  | '/images/icons/groupIcon09.svg'
  | '/images/icons/groupIcon10.svg'
  | '/images/icons/groupIcon11.svg'
  | '/images/icons/groupIcon12.svg'
  | '/images/icons/groupIcon13.svg'
  | '/images/icons/groupIcon14.svg'
  | '/images/icons/groupIcon15.svg';

export interface Debt {
  [expenseName: string]: number;
}

export interface DebtWithTotalDebt extends Debt {
  totalDebt: number;
}

export interface Debts {
  [userId: string]: DebtWithTotalDebt | Debt;
}

export interface TotalDebts {
  [userId: string]: number;
}

export interface Expense {
  name: string;
  amount: number;
  date: string;
  category: ExpenseCategory;
  payerId: string;
  sharers: Sharer[];
  note: string;
}

export interface ExtendedExpense extends Expense {
  id: string;
  expenseDebt?: string;
  creatorId?: string;
  createAt?: string;
  updateAt?: string;
}

export interface Sharer {
  id: string;
  amount: number | '';
}

export type ExpenseCategory =
  | 'food'
  | 'drink'
  | 'transport'
  | 'stay'
  | 'shopping'
  | 'entertainment'
  | 'other';