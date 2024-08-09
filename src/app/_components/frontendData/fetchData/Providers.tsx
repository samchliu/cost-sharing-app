'use client';
//import from react
import { createContext, useContext, useEffect, useState } from 'react';
//import data
import { getGroup, getUser, getExpense } from '@/app/_components/frontendData/fetchData/API';

interface AllContextType {
  users: { [key: string]: any };
  groups: { [key: string]: any };
  expenses: { [key: string]: any };
  fetchUser: (userId: string) => void;
  fetchGroup: (groupId: string) => void;
  fetchExpense: (groupId: string, expenseId: string) => void;
}

const AllContext = createContext<AllContextType | null>(null);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<{ [key: string]: any }>({});
  const [groups, setGroups] = useState<{ [key: string]: any }>({});
  const [expenses, setExpenses] = useState<{ [key: string]: any }>([]);

  const fetchUser = async (userId: string) => {
    if (!users[userId]) {
      try {
        const user = await getUser(userId);

        setUsers((prevUsers) => ({
          ...prevUsers,
          [userId]: user,
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Handle errors
      }
    }
  };

  const fetchGroup = async (groupId: string) => {
    if (!groups[groupId]) {
      try {
        const group = await getGroup(groupId);

        setGroups((prevGroups) => ({
          ...prevGroups,
          [groupId]: group,
        }));
      } catch (error) {
        console.error('Error fetching group data:', error);
        // Handle errors
      }
    }
  };

  const fetchExpense = async (groupId: string, expenseId: string) => {
    if (!expenses[expenseId]) {
      try {
        const expense = await getExpense(expenseId);
        // console.log(groupId)
        setExpenses((prevExpenses) => ({
          ...prevExpenses,
          [expenseId]: expense,
        }));
      } catch (error) {
        console.error('Error fetching expense data:', error);
        // Handle errors
      }
    }
  };

  return (
    <AllContext.Provider
      value={{
        users,
        groups,
        expenses,
        fetchUser,
        fetchGroup,
        fetchExpense,
      }}
    >
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

export const useGroup = (groupId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useGroup must be used within a Provider');
  }

  useEffect(() => {
    context.fetchGroup(groupId);

    // console.log(`useEffect fetch group ${groupId}`)
  }, [groupId]);

  return context.groups[groupId];
};

export const useExpense = (groupId: string, expenseId: string) => {
  const context = useContext(AllContext);
  if (!context) {
    throw new Error('useExpense must be used within a Provider');
  }

  useEffect(() => {
    context.fetchExpense(groupId, expenseId);

    // console.log(`useEffect fetch expense ${expenseId}`)
  }, [expenseId]);

  return context.expenses[expenseId];
};