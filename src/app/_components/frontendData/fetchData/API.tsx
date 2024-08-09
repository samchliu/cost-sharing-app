
//new group API
async function getGroup(id: any) {
  const res = await fetch(`http://localhost:3001/group/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//login
async function login(accessToken: string) {
  let body = {
    accessToken: accessToken
  };
  
  const res = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });
console.log(accessToken);
  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//new user API
// async function getUser(id: string) {
//   const res = await fetch(`/api/user/${id}`, {
//     method: 'GET',
//     // cache: 'no-store',
//   });

//   if (!res.ok) throw Error;

//   const data = await res.json();

//   return data;
// }

async function getUser(id: any) {
  const res = await fetch(`http://localhost:3001/user/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//get expense
async function getExpense(id: any) {
  const res = await fetch(`http://localhost:3001/expense/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw Error;

  const data = await res.json();

  return data;
}

//add group
async function addGroup(payload: any) {
  const { id, users, expense } = payload;
  let url = `http://localhost:3001/group/`;

  let body = {
    id: id,
    users: users,
    expense: expense,
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) throw Error;
}

// delete group
async function deleteGroup(id: any) {
  let url = `http://localhost:3001/group/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

// change group
async function changeGroup(payload: any) {
  const { id, users } = payload;
  let url = `http://localhost:3001/group/${id}`;

  let body = {
    ...payload,
    users: users,
  };

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) throw Error;
}

export { getGroup, getUser, getExpense, login };
