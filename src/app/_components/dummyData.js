//groups
export const groups = [
  {
    groupId: 'g1',
    groupType: 'travel',
    name: 'group Travel',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup1',
  },
  {
    groupId: 'g2',
    groupType: 'health',
    name: 'group Health',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup2',
  },
  {
    groupId: 'g3',
    groupType: 'other',
    name: 'group Other',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup3',
  },
  {
    groupId: 'g4',
    groupType: 'games',
    name: 'group Games',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup4',
  },
  {
    groupId: 'g5',
    groupType: 'travel',
    name: 'group Travel 2',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup5',
  },
  {
    groupId: 'g6',
    groupType: 'health',
    name: 'group Health 2',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup6',
  },
  {
    groupId: 'g7',
    groupType: 'other',
    name: 'group Other 2',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup7',
  },
  {
    groupId: 'g8',
    groupType: 'games',
    name: 'group Games 2',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup8',
  },
  {
    groupId: 'g9',
    groupType: 'travel',
    name: 'group Travel 3',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup9',
  },
  {
    groupId: 'g10',
    groupType: 'health',
    name: 'group Health 3',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup10',
  },
  {
    groupId: 'g11',
    groupType: 'other',
    name: 'group Other 3',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup11',
  },
  {
    groupId: 'g12',
    groupType: 'games',
    name: 'group Games 3',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
    url: 'https://shareGroup12',
  },
];

const group = {
  groupId: 'g1',
  groupType: 'travel',
  name: 'group 1',
  membersIds: ['u1', 'u2', 'u3', 'u4'],
  url: 'https://shareGroup1',
};

const exampleGroup = ['name', 'group_type', 'country_code', 'users'];

//expenses
const expenses = [
  {
    groupId: 'g1',
    expenseId: 'e1',
    expenseType: 'food',
    cost: 1000,
    date: '2024/5/15',
    event: 'expense 1',
    payer: 'u1',
    sharers: ['u1', 'u2', 'u3'],
  },
  {
    groupId: 'g1',
    expenseId: 'e2',
    expenseType: 'food',
    cost: 2000,
    date: '2024/5/15',
    event: 'expense 2',
    payer: 'u1',
    sharers: ['u1', 'u2', 'u3'],
  },
];

const expense = {
  groupId: 'g1',
  expenseId: 'e1',
  expenseType: 'food',
  cost: 1000,
  date: '2024/5/15',
  event: 'expense 1',
  payer: 'u1',
  sharers: ['u1', 'u2', 'u3'],
};

// const exampleExpense = {
//     description,
//     group_id,
//     payment: false,
//     cost: amount,
//     date,
//     users: [
//         {
//             user_id: from,
//             paid_share: amount,
//         },
//         {
//             user_id: to,
//             owed_share: amount,
//         },
//     ],
// }

//member
const membersIds = ['u1', 'u2', 'u3', 'u4'];

//Person Info
const personInfo = {
  userId: 'u1',
  displayName: 'a',
  pictureUrl: 'https://groupImage1',
  groups: [],
};

const exampleUser = [
  'first_name',
  'last_name',
  'email',
  'password',
  'locale',
  'date_format',
  'default_currency',
  'default_group_id',
  'notification_settings',
];
