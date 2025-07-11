import { ExtendedExpense, Group, GroupUser } from '../sharedFunction/types';
import { authFetch } from './authFetch';

//login
async function login(accessToken: string) {
  const body = {
    accessToken,
  };
  localStorage.setItem('accessToken', accessToken);
  const res = await authFetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res || !res.ok) throw new Error('登入失敗');

  const data = await res.json();
  return data;
}

//get user
async function getUser(id: string) {
  const res = await authFetch(`/api/user/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res) return null;

  const data = await res.json();
  return data;
}

//get group
async function getGroup(id: string) {
  const res = await authFetch(`/api/group/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  if (!res) return null;
  const data = await res.json();

  return data;
}

//get expense
async function getExpense(groupId: string, expenseId: string) {
  const res = await authFetch(`/api/group/${groupId}/expense/${expenseId}`, {
    method: 'GET',
    cache: 'no-store',
  });
  
  if (!res) return null;
  const data = await res.json();

  return data;
}

//add group
async function addGroup(payload: Group) {
  const { name, picture, users } = payload;

  let url = `/api/group`;

  let body = {
    name: name,
    picture: picture,
    users: users,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

//add group user
async function addGroupUser(payload: { groupId: string; name: string; picture: string }) {
  const { groupId, name, picture } = payload;

  let url = `/api/group/${groupId}/user`;

  let body = {
    name: name,
    picture: picture,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

//add expense
async function addExpense(payload: ExtendedExpense) {
  const { groupId, name, category, amount, date, note, payerId, sharers } = payload;

  let url = `/api/group/${groupId}/expense`;

  let body = {
    name: name,
    category: category,
    amount: amount,
    date: date,
    note: note,
    payerId: payerId,
    sharers: sharers,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

// change group
async function changeGroup(payload: Group) {
  const { id, name, picture } = payload;
  let url = `/api/group/${id}`;

  let body = {
    name: name,
    picture: picture,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

//Adopt a user in the group
async function adoptGroupUser(groupId: string, userId: string) {
  let url = `/api/group/${groupId}/user/${userId}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

//change expense
async function changeExpense(payload: ExtendedExpense) {
  const { groupId, id, name, category, amount, date, note, payerId, sharers } = payload;
  let url = `/api/group/${groupId}/expense/${id}`;

  let body = {
    name: name,
    category: category,
    amount: amount,
    date: date,
    note: note,
    payerId: payerId,
    sharers: sharers,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Error Response:', errorText);
    throw new Error(errorText);
  }
}

// delete user
async function deleteUser(groupId: string, userId: string) {
  let url = `/api/group/${groupId}/user/${userId}`;

  const res = await fetch(url, { method: 'DELETE' });
}

// delete group
async function deleteGroup(id: string) {
  let url = `/api/group/${id}`;

  const res = await fetch(url, { method: 'DELETE' });
}

// delete expense
async function deleteExpense(groupId: string, expenseId: string) {
  let url = `/api/group/${groupId}/expense/${expenseId}`;

  const res = await fetch(url, { method: 'DELETE' });
}

export {
  login,
  getUser,
  getGroup,
  getExpense,
  addGroup,
  addGroupUser,
  addExpense,
  adoptGroupUser,
  changeGroup,
  changeExpense,
  deleteUser,
  deleteGroup,
  deleteExpense,
};
