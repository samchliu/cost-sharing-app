export interface User {
  id: string;
  name: string;
  picture: string;
}

export interface LoginUser extends User {
  lineId: string;
  groups: Group[];
}

export interface GroupUser extends User {
  adoptable: boolean;
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
  | 'groupIcon01'
  | 'groupIcon02'
  | 'groupIcon03'
  | 'groupIcon04'
  | 'groupIcon05'
  | 'groupIcon06'
  | 'groupIcon07'
  | 'groupIcon08'
  | 'groupIcon09'
  | 'groupIcon10'
  | 'groupIcon11'
  | 'groupIcon12'
  | 'groupIcon13'
  | 'groupIcon14'
  | 'groupIcon15';

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
