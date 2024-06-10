'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroup, getUserInfo, getExpense, getExpenses } from '@/app/_components/frontendData/API';

interface AllContextType {
  users: { [key: string]: any };
  expenses: { [key: string]: any };
  groups: { [key: string]: any };
  allExpenses: any[];
  fetchUser: (userId: string) => void;
  fetchExpense: (expenseId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchAllExpenses: () => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({})
  const [allExpenses, setAllExpenses] = useState<any>([]);

  const fetchUser = async (userId: string) => {
    if (!users[userId]) {
      const userInfo = await getUserInfo(userId);
      setUsers((prevUsers) => ({
        ...prevUsers,
        [userId]: userInfo,
      }));
    }
  };

  const fetchExpense = async (expenseId: string) => {
    if (!expenses[expenseId]) {
      const expenseData = await getExpense(expenseId);
      setExpenses((prevExpenses) => ({
        ...prevExpenses,
        [expenseId]: expenseData,
      }));
    }
  };

  const fetchGroup = async (groupId: string) => {
    if (!groups[groupId]) {
      const groupData = await getGroup(groupId);
      setGroups((prevGroups) => ({
        ...prevGroups,
        [groupId]: groupData,
      }))
    }
  }

  const fetchAllExpenses = async () => {
    const data = await getExpenses();

    setAllExpenses(data)
  }

  return (
    <AllContext.Provider value={{ users, expenses, groups, allExpenses, fetchUser, fetchExpense, fetchGroup, fetchAllExpenses }}>
      {children}
    </AllContext.Provider>
  );
};

export const useUser = (userId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useUser must be used within a Provider');
  }

  useEffect(() => {
    context.fetchUser(userId);

    // console.log(`useEffect fetch user ${userId}`);
  }, [userId]);

  return context.users[userId];
};

export const useExpense = (expenseId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useExpense must be used within a Provider');
  }

  useEffect(() => {
    context.fetchExpense(expenseId);

    // console.log(`useEffect fetch Expense ${expenseId}`);
  }, [expenseId]);

  return context.expenses[expenseId];
};

export const useGroup = (groupId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchGroup(groupId);

    // console.log(`useEffect fetch group ${groupId}`)
  }, [groupId]);

  return context.groups[groupId]
}

export const useExpenses = () => {
  const context = useContext(AllContext);
  if(!context) {
    throw new Error('useExpenses must be used within a Provider');
  }

  useEffect(() => {
    context.fetchAllExpenses();

    // console.log(`useEffect fetch all expenses`)
  },[]);

  return context.allExpenses;
}