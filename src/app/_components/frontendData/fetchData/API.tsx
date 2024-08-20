//login
async function login(accessToken: string) {
  let body = {
    accessToken: accessToken,
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

//new group API
async function getGroup(id: any) {
  const res = await fetch(`/api/group/${id}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

//new user API
async function getUser(id: string) {
  const res = await fetch(`/api/user/${id}`,  {
        method: 'GET',
        cache: 'no-store',
      });

  const data = await res.json();

  return data;
}

//get expense
async function getExpense(groupId: string, expenseId: string) {
  const res = await fetch(`/api/group/${groupId}/expense/${expenseId}`, {
    method: 'GET',
    cache: 'no-store',
  });

  const data = await res.json();

  return data;
}

//add group
async function addGroup(payload: any) {
  const { name, picture, users } = payload;

  let url = `/api/group`;

  let body = {
    name: name,
    picture: picture,
    users: users,
  };
  console.log('Request Body:', JSON.stringify(body));
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

  console.log('建立成功！')
}

// delete group
async function deleteGroup(id: any) {
  let url = `/api/group/${id}`;

  const res = await fetch(url, { method: 'DELETE' });

  if (!res.ok) throw Error;
}

// change group
// async function changeGroup(payload: any) {
//   const { id, users } = payload;
//   let url = `http://localhost:3001/group/${id}`;

//   let body = {
//     ...payload,
//     users: users,
//   };

//   const res = await fetch(url, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(body),
//     cache: 'no-store',
//   });

//   if (!res.ok) throw Error;
// }

export { login, getGroup, getUser, getExpense, addGroup };
