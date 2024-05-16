//groups
const groups = [
  {
    name: 'group 1',
    id: 'g1',
    profileImage: 'https://groupImage1',
    members: [],
    expenses: [],
    url: 'https://shareGroup1',
    adminMemberId: 'p1',
  },
  {
    name: 'group 2',
    id: 'g2',
    profileImage: 'https://groupImage2',
    members: [],
    expenses: [],
    url: 'https://shareGroup2',
    adminMemberId: 'p1',
  },
];

const group = {
  name: 'group 1',
  id: 'g1',
  profileImage: 'https://image1',
  members: [],
  expenses: [],
  url: 'https://shareGroup1',
  adminMemberId: 'p1',
};

//expenses
const expenses = [
  {
    date: '2024/5/15',
    event: 'expense 1',
    payer: 'd',
    sharers: ['a', 'b', 'c'],
    cost: 2000,
    expenseImage: 'https://expenseImage1',
    id: 'e1',
  },
  {
    date: '2024/5/15',
    event: 'expense 2',
    payer: 'a',
    sharers: ['a', 'c'],
    cost: 1000,
    expenseImage: 'https://expenseImage2',
    id: 'e2',
  },
];

const expense = {
  date: '2024/5/15',
  event: 'expense 1',
  payer: 'd',
  sharers: ['a', 'b', 'c'],
  cost: 2000,
  expenseImage: 'https://expenseImage1',
  id: 'e1',
};

//member
const members = [
  {
    name: 'a',
    memberId: 'g1m1',
    profileImage: 'https://personImage1',
    isAdmin: true,
  },
  {
    name: 'b',
    memberId: 'g1m2',
    profileImage: 'https://personImage2',
    isAdmin: false,
  },
  {
    name: 'c',
    memberId: 'g1m3',
    profileImage: 'https://personImage3',
    isAdmin: false,
  },
  {
    name: 'd',
    memberId: 'g1m4',
    profileImage: 'https://personImage4',
    isAdmin: false,
  },
];

//Person Info
const personInfo = {
  name: 'a',
  personId: 'p1',
  profileImage: 'https://groupImage1',
  groups: [
    {
      name: 'group 1',
      id: 'g1',
      profileImage: 'https://groupImage1',
      members: [],
      expenses: [],
      url: 'https://shareGroup1',
      adminMemberId: 'p1',
    },
    {
      name: 'group 2',
      id: 'g2',
      profileImage: 'https://groupImage2',
      members: [],
      expenses: [],
      url: 'https://shareGroup2',
      adminMemberId: 'p1',
    },
  ],
};


const lineInitialProfile = {
  userId: '',
  displayName: '',
  statusMessage: '',
  pictureUrl: '',
};