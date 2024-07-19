// {
// groupId,
// groupType,
// name,
// membersIds,
// url,
//   }: {
// groupId: string;
// groupType: 'travel' | 'health' | 'games' | 'other';
// name: string;
// membersIds: string[];
// url: string;
//   }

//groups
const groups = [
  {
    id: 'g1',
    groupType: 'other',
    name: '5月聚餐',
    membersIds: ['u1', 'u2', 'u3', 'u4'],
  },
  {
    id: 'g2',
    groupType: 'travel',
    name: '2024 Japan',
    membersIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6'],
  },
  {
    id: 'g3',
    groupType: 'health',
    name: '新年新希望',
    membersIds: ['u1', 'u2', 'u3'],
  },
  {
    id: 'g4',
    groupType: 'other',
    name: 'fruits and drinks',
    membersIds: ['u1', 'u2', 'u3'],
  },
  {
    id: 'g5',
    groupType: 'travel',
    name: 'group Travel 2',
    membersIds: ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9', 'u10'],
  },
  {
    id: 'g6',
    groupType: 'health',
    name: 'group Health 2',
    membersIds: ['u4', 'u5', 'u6'],
  },
  {
    id: 'g7',
    groupType: 'other',
    name: 'group Other 2',
    membersIds: ['u1', 'u5', 'u6'],
  },
  {
    id: 'g8',
    groupType: 'games',
    name: 'group Games 2',
    membersIds: ['u3', 'u4', 'u6', 'u8'],
  },
  {
    id: 'g9',
    groupType: 'travel',
    name: 'group Travel 3',
    membersIds: ['u1', 'u2', 'u3', 'u7', 'u9', 'u10'],
  },
  {
    id: 'g10',
    groupType: 'health',
    name: 'group Health 3',
    membersIds: ['u2', 'u3', 'u4'],
  },
  {
    id: 'g11',
    groupType: 'other',
    name: 'group Other 3',
    membersIds: ['u1', 'u3', 'u5', 'u7', 'u8', 'u9', 'u10'],
  },
  {
    id: 'g12',
    groupType: 'games',
    name: 'group Games 3',
    membersIds: ['u2', 'u4', 'u6'],
  },
];

// const exampleGroup = ['name', 'group_type', 'country_code', 'users'];

const expenses = [
  {
    id: 'e1',
    groupId: 'g1',
    name: '燒鳥肌肉串',
    amount: 210,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 105,
      },
      {
        id: 'u2',
        amount: 105,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e2',
    groupId: 'g1',
    name: '手工醃蘿波',
    amount: 50,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 50 / 3,
      },
      {
        id: 'u3',
        amount: 50 / 3,
      },
      {
        id: 'u4',
        amount: 50 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e3',
    groupId: 'g1',
    name: '豆腐沙拉',
    amount: 150,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 150 / 3,
      },
      {
        id: 'u3',
        amount: 150 / 3,
      },
      {
        id: 'u4',
        amount: 150 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e4',
    groupId: 'g1',
    name: '炭烤玉米筍',
    amount: 180,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 180 / 3,
      },
      {
        id: 'u3',
        amount: 180 / 3,
      },
      {
        id: 'u4',
        amount: 180 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e5',
    groupId: 'g1',
    name: '節瓜',
    amount: 120,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 120 / 3,
      },
      {
        id: 'u3',
        amount: 120 / 3,
      },
      {
        id: 'u4',
        amount: 120 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e6',
    groupId: 'g1',
    name: '山藥',
    amount: 180,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 180 / 3,
      },
      {
        id: 'u2',
        amount: 180 / 3,
      },
      {
        id: 'u3',
        amount: 180 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e7',
    groupId: 'g1',
    name: '杏苞菇',
    amount: 120,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 120 / 3,
      },
      {
        id: 'u3',
        amount: 120 / 3,
      },
      {
        id: 'u4',
        amount: 120 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e8',
    groupId: 'g1',
    name: '娃娃菜',
    amount: 140,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 140 / 3,
      },
      {
        id: 'u3',
        amount: 140 / 3,
      },
      {
        id: 'u4',
        amount: 140 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e9',
    groupId: 'g1',
    name: '茄子',
    amount: 140,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 140 / 3,
      },
      {
        id: 'u3',
        amount: 140 / 3,
      },
      {
        id: 'u4',
        amount: 140 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e10',
    groupId: 'g1',
    name: '炸豆腐',
    amount: 150,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 150 / 3,
      },
      {
        id: 'u3',
        amount: 150 / 3,
      },
      {
        id: 'u4',
        amount: 150 / 3,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e11',
    groupId: 'g1',
    name: '青蔥豚煎餃',
    amount: 100,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 100,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e12',
    groupId: 'g1',
    name: '韭菜豚煎餃',
    amount: 100,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 100,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e13',
    groupId: 'g1',
    name: '綜合煎餃',
    amount: 120,
    date: '2024/5/28',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u4',
        amount: 100,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e14',
    groupId: 'g1',
    name: '葡萄沙瓦',
    amount: 340,
    date: '2024/5/28',
    category: 'drink',
    payerId: 'u1',
    sharers: [
      {
        id: 'u2',
        amount: 340 / 2,
      },
      {
        id: 'u3',
        amount: 340 / 2,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e15',
    groupId: 'g1',
    name: '荔枝沙瓦',
    amount: 180,
    date: '2024/5/28',
    category: 'drink',
    payerId: 'u1',
    sharers: [
      {
        id: 'u4',
        amount: 180,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e16',
    groupId: 'g1',
    name: '可爾必思',
    amount: 80,
    date: '2024/5/28',
    category: 'drink',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 80,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e17',
    groupId: 'g2',
    name: 'plane ticket',
    amount: 180000,
    date: '2024/5/28',
    category: 'transport',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 180000 / 6,
      },
      {
        id: 'u2',
        amount: 180000 / 6,
      },
      {
        id: 'u3',
        amount: 180000 / 6,
      },
      {
        id: 'u4',
        amount: 180000 / 6,
      },
      {
        id: 'u5',
        amount: 180000 / 6,
      },
      {
        id: 'u6',
        amount: 180000 / 6,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e18',
    groupId: 'g2',
    name: 'hotel',
    amount: 60000,
    date: '2024/5/28',
    category: 'stay',
    payerId: 'u2',
    sharers: [
      {
        id: 'u1',
        amount: 60000 / 6,
      },
      {
        id: 'u2',
        amount: 60000 / 6,
      },
      {
        id: 'u3',
        amount: 60000 / 6,
      },
      {
        id: 'u4',
        amount: 60000 / 6,
      },
      {
        id: 'u5',
        amount: 60000 / 6,
      },
      {
        id: 'u6',
        amount: 60000 / 6,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e19',
    groupId: 'g2',
    name: 'disney land',
    amount: 15000,
    date: '2024/5/28',
    category: 'other',
    payerId: 'u3',
    sharers: [
      {
        id: 'u1',
        amount: 15000 / 4,
      },
      {
        id: 'u3',
        amount: 15000 / 4,
      },
      {
        id: 'u4',
        amount: 15000 / 4,
      },
      {
        id: 'u6',
        amount: 15000 / 4,
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/5/28',
    updateBy: 'u1',
    updateAt: '2024/5/28',
  },
  {
    id: 'e20',
    groupId: 'g3',
    name: '晚餐',
    amount: 3000,
    date: '2024/5/30',
    category: 'food',
    payerId: 'u2',
    sharers: [
      {
        id: 'u1',
        amount: 3000 / 3,
      },
      {
        id: 'u2',
        amount: 3000 / 3,
      },
      {
        id: 'u3',
        amount: 3000 / 3,
      },
    ],
    note: '大家都覺得不好吃的那間',
    createBy: 'u1',
    createAt: '2024/5/30',
    updateBy: 'u1',
    updateAt: '2024/5/30',
  },
  {
    id: 'e21',
    groupId: 'g3',
    name: '午餐',
    amount: 2400,
    date: '2024/5/30',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 2400 / 3,
      },
      {
        id: 'u2',
        amount: 2400 / 3,
      },
      {
        id: 'u3',
        amount: 2400 / 3,
      },
    ],
    note: '其實還可以的那間',
    createBy: 'u1',
    createAt: '2024/5/30',
    updateBy: 'u1',
    updateAt: '2024/5/30',
  },
  {
    id: 'e22',
    groupId: 'g3',
    name: '計程車',
    amount: 450,
    date: '2024/5/30',
    category: 'transport',
    payerId: 'u2',
    sharers: [
      {
        id: 'u1',
        amount: 450 / 3,
      },
      {
        id: 'u2',
        amount: 450 / 3,
      },
      {
        id: 'u3',
        amount: 450 / 3,
      },
    ],
    note: '司機大哥很好笑那台',
    createBy: 'u1',
    createAt: '2024/5/30',
    updateBy: 'u1',
    updateAt: '2024/5/30',
  },
  {
    id: 'e23',
    groupId: 'g4',
    name: 'fruits',
    amount: 180,
    date: '2024/6/3',
    category: 'food',
    payerId: 'u1',
    sharers: [
      {
        id: 'u1',
        amount: 20,
      },
      {
        id: 'u2',
        amount: '70',
      },
      {
        id: 'u3',
        amount: '90',
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/6/3',
    updateBy: 'u1',
    updateAt: '2024/6/3',
  },
  {
    id: 'e24',
    groupId: 'g4',
    name: 'drinks',
    amount: 120,
    date: '2024/6/3',
    category: 'food',
    payerId: 'u3',
    sharers: [
      {
        id: 'u1',
        amount: 30,
      },
      {
        id: 'u2',
        amount: '50',
      },
      {
        id: 'u3',
        amount: '40',
      },
    ],
    note: '',
    createBy: 'u1',
    createAt: '2024/6/3',
    updateBy: 'u1',
    updateAt: '2024/6/3',
  },
];
// expenseType:
// | 'food'
// | 'drink'
// | 'transport'
// | 'stay'
// | 'shopping'
// | 'entertainment'
// | 'other';

// {
//     groupId,
//     expenseId,
//     expenseType,
//     cost,
//     date,
//     event,
//     payerId,
//     sharersIds,
//     note
// }: {
//     groupId: string;
//     expenseId: string;
//     expenseType: 'food' | 'drink' | 'transport' | 'stay' | 'shopping' | 'entertainment' | 'other';
//     cost: string;
//     date: string;
//     event: string;
//     payerId: string;
//     sharersIds: string[];
//     note: string;
// }

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

//Person Info
const usersInfo = [
  {
    userId: 'u1',
    displayName: 'a',
    pictureUrl: 'https://cdn2.thecatapi.com/images/a4v.jpg',
  },
  {
    userId: 'u2',
    displayName: 'b',
    pictureUrl: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
  },
  {
    userId: 'u3',
    displayName: 'c',
    pictureUrl: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
  },
  {
    userId: 'u4',
    displayName: 'd',
    pictureUrl: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
  },
  {
    userId: 'u5',
    displayName: 'e',
    pictureUrl: 'https://cdn2.thecatapi.com/images/cib.jpg',
  },
  {
    userId: 'u6',
    displayName: 'f',
    pictureUrl: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
  },
  {
    userId: 'u7',
    displayName: 'g',
    pictureUrl: 'https://cdn2.thecatapi.com/images/edb.jpg',
  },
  {
    userId: 'u8',
    displayName: 'h',
    pictureUrl:
      'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
  },
  {
    userId: 'u9',
    displayName: 'i',
    pictureUrl: 'https://cdn2.thecatapi.com/images/bo5.jpg',
  },
  {
    userId: 'u10',
    displayName: 'j',
    pictureUrl: 'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
  },
];

// const exampleUser = [
//   'first_name',
//   'last_name',
//   'email',
//   'password',
//   'locale',
//   'date_format',
//   'default_currency',
//   'default_group_id',
//   'notification_settings',
// ];

const newGroups = [
  {
    id: 'g1',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
    ],
    expense: [
      {
        id: 'e1',
        name: '燒鳥肌肉串',
        amount: 210,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 105,
          },
          {
            id: 'u2',
            amount: 105,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e2',
        name: '手工醃蘿波',
        amount: 50,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 50 / 3,
          },
          {
            id: 'u3',
            amount: 50 / 3,
          },
          {
            id: 'u4',
            amount: 50 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e3',
        name: '豆腐沙拉',
        amount: 150,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 150 / 3,
          },
          {
            id: 'u3',
            amount: 150 / 3,
          },
          {
            id: 'u4',
            amount: 150 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e4',
        name: '炭烤玉米筍',
        amount: 180,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 180 / 3,
          },
          {
            id: 'u3',
            amount: 180 / 3,
          },
          {
            id: 'u4',
            amount: 180 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e5',
        name: '節瓜',
        amount: 120,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 120 / 3,
          },
          {
            id: 'u3',
            amount: 120 / 3,
          },
          {
            id: 'u4',
            amount: 120 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e6',
        name: '山藥',
        amount: 180,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 180 / 3,
          },
          {
            id: 'u2',
            amount: 180 / 3,
          },
          {
            id: 'u3',
            amount: 180 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e7',
        name: '杏苞菇',
        amount: 120,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 120 / 3,
          },
          {
            id: 'u3',
            amount: 120 / 3,
          },
          {
            id: 'u4',
            amount: 120 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e8',
        name: '娃娃菜',
        amount: 140,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 140 / 3,
          },
          {
            id: 'u3',
            amount: 140 / 3,
          },
          {
            id: 'u4',
            amount: 140 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e9',
        name: '茄子',
        amount: 140,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 140 / 3,
          },
          {
            id: 'u3',
            amount: 140 / 3,
          },
          {
            id: 'u4',
            amount: 140 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e10',
        name: '炸豆腐',
        amount: 150,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 150 / 3,
          },
          {
            id: 'u3',
            amount: 150 / 3,
          },
          {
            id: 'u4',
            amount: 150 / 3,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e11',
        name: '青蔥豚煎餃',
        amount: 100,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 100,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e12',
        name: '韭菜豚煎餃',
        amount: 100,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 100,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e13',
        name: '綜合煎餃',
        amount: 120,
        date: '2024/5/28',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u4',
            amount: 100,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e14',
        name: '葡萄沙瓦',
        amount: 340,
        date: '2024/5/28',
        category: 'drink',
        payerId: 'u1',
        sharers: [
          {
            id: 'u2',
            amount: 340 / 2,
          },
          {
            id: 'u3',
            amount: 340 / 2,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e15',
        name: '荔枝沙瓦',
        amount: 180,
        date: '2024/5/28',
        category: 'drink',
        payerId: 'u1',
        sharers: [
          {
            id: 'u4',
            amount: 180,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e16',
        name: '可爾必思',
        amount: 80,
        date: '2024/5/28',
        category: 'drink',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 80,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
    ],
  },
  {
    id: 'g2',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
    ],
    expense: [
      {
        id: 'e17',
        name: 'plane ticket',
        amount: 180000,
        date: '2024/5/28',
        category: 'transport',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 180000 / 6,
          },
          {
            id: 'u2',
            amount: 180000 / 6,
          },
          {
            id: 'u3',
            amount: 180000 / 6,
          },
          {
            id: 'u4',
            amount: 180000 / 6,
          },
          {
            id: 'u5',
            amount: 180000 / 6,
          },
          {
            id: 'u6',
            amount: 180000 / 6,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e18',
        name: 'hotel',
        amount: 60000,
        date: '2024/5/28',
        category: 'stay',
        payerId: 'u2',
        sharers: [
          {
            id: 'u1',
            amount: 60000 / 6,
          },
          {
            id: 'u2',
            amount: 60000 / 6,
          },
          {
            id: 'u3',
            amount: 60000 / 6,
          },
          {
            id: 'u4',
            amount: 60000 / 6,
          },
          {
            id: 'u5',
            amount: 60000 / 6,
          },
          {
            id: 'u6',
            amount: 60000 / 6,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
      {
        id: 'e19',
        name: 'disney land',
        amount: 15000,
        date: '2024/5/28',
        category: 'other',
        payerId: 'u3',
        sharers: [
          {
            id: 'u1',
            amount: 15000 / 4,
          },
          {
            id: 'u3',
            amount: 15000 / 4,
          },
          {
            id: 'u4',
            amount: 15000 / 4,
          },
          {
            id: 'u6',
            amount: 15000 / 4,
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/5/28',
        updateBy: 'u1',
        updateAt: '2024/5/28',
      },
    ],
  },
  {
    id: 'g3',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
    ],
    expense: [
      {
        id: 'e20',
        name: '晚餐',
        amount: 3000,
        date: '2024/5/30',
        category: 'food',
        payerId: 'u2',
        sharers: [
          {
            id: 'u1',
            amount: 3000 / 3,
          },
          {
            id: 'u2',
            amount: 3000 / 3,
          },
          {
            id: 'u3',
            amount: 3000 / 3,
          },
        ],
        note: '大家都覺得不好吃的那間',
        createBy: 'u1',
        createAt: '2024/5/30',
        updateBy: 'u1',
        updateAt: '2024/5/30',
      },
      {
        id: 'e21',
        name: '午餐',
        amount: 2400,
        date: '2024/5/30',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 2400 / 3,
          },
          {
            id: 'u2',
            amount: 2400 / 3,
          },
          {
            id: 'u3',
            amount: 2400 / 3,
          },
        ],
        note: '其實還可以的那間',
        createBy: 'u1',
        createAt: '2024/5/30',
        updateBy: 'u1',
        updateAt: '2024/5/30',
      },
      {
        id: 'e22',
        name: '計程車',
        amount: 450,
        date: '2024/5/30',
        category: 'transport',
        payerId: 'u2',
        sharers: [
          {
            id: 'u1',
            amount: 450 / 3,
          },
          {
            id: 'u2',
            amount: 450 / 3,
          },
          {
            id: 'u3',
            amount: 450 / 3,
          },
        ],
        note: '司機大哥很好笑那台',
        createBy: 'u1',
        createAt: '2024/5/30',
        updateBy: 'u1',
        updateAt: '2024/5/30',
      },
    ],
  },
  {
    id: 'g4',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
    ],
    expense: [
      {
        id: 'e23',
        name: 'fruits',
        amount: 180,
        date: '2024/6/3',
        category: 'food',
        payerId: 'u1',
        sharers: [
          {
            id: 'u1',
            amount: 20,
          },
          {
            id: 'u2',
            amount: '70',
          },
          {
            id: 'u3',
            amount: '90',
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/6/3',
        updateBy: 'u1',
        updateAt: '2024/6/3',
      },
      {
        id: 'e24',
        name: 'drinks',
        amount: 120,
        date: '2024/6/3',
        category: 'food',
        payerId: 'u3',
        sharers: [
          {
            id: 'u1',
            amount: 30,
          },
          {
            id: 'u2',
            amount: '50',
          },
          {
            id: 'u3',
            amount: '40',
          },
        ],
        note: '',
        createBy: 'u1',
        createAt: '2024/6/3',
        updateBy: 'u1',
        updateAt: '2024/6/3',
      },
    ],
  },
  {
    id: 'g5',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
      {
        id: 'u7',
        name: 'g',
        picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
      },
      {
        id: 'u8',
        name: 'h',
        picture:
          'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
      },
      {
        id: 'u9',
        name: 'i',
        picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
      },
      {
        id: 'u10',
        name: 'j',
        picture: 'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g6',
    users: [
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g7',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g8',
    users: [
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
      {
        id: 'u8',
        name: 'h',
        picture:
          'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g9',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u7',
        name: 'g',
        picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
      },
      {
        id: 'u9',
        name: 'i',
        picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
      },
      {
        id: 'u10',
        name: 'j',
        picture: 'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g10',
    users: [
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g11',
    users: [
      {
        id: 'u1',
        name: 'a',
        picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
      },
      {
        id: 'u3',
        name: 'c',
        picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
      },
      {
        id: 'u5',
        name: 'e',
        picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
      },
      {
        id: 'u7',
        name: 'g',
        picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
      },
      {
        id: 'u8',
        name: 'h',
        picture:
          'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
      },
      {
        id: 'u9',
        name: 'i',
        picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
      },
      {
        id: 'u10',
        name: 'j',
        picture: 'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
      },
    ],
    expense: [],
  },
  {
    id: 'g12',
    users: [
      {
        id: 'u2',
        name: 'b',
        picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
      },
      {
        id: 'u4',
        name: 'd',
        picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
      },
      {
        id: 'u6',
        name: 'f',
        picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
      },
    ],
    expense: [],
  },
];

const newUsers = [
  {
    id: 'u1',
    name: 'a',
    picture: 'https://cdn2.thecatapi.com/images/a4v.jpg',
    groups: [
      {
        id: 'g1',
        name: '5月聚餐',
        picture: 'other',
      },
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g3',
        name: '新年新希望',
        picture: 'health',
      },
      {
        id: 'g4',
        name: 'fruits and drinks',
        picture: 'other',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g7',
        name: 'group Other 2',
        picture: 'other',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u2',
    name: 'b',
    picture: 'https://images.dog.ceo/breeds/spaniel-welsh/n02102177_803.jpg',
    groups: [
      {
        id: 'g1',
        name: '5月聚餐',
        picture: 'other',
      },
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g3',
        name: '新年新希望',
        picture: 'health',
      },
      {
        id: 'g4',
        name: 'fruits and drinks',
        picture: 'other',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g10',
        name: 'group Health 3',
        picture: 'health',
      },
      {
        id: 'g12',
        name: 'group Games 3',
        picture: 'games',
      },
    ],
  },
  {
    id: 'u3',
    name: 'c',
    picture: 'https://cdn2.thecatapi.com/images/O7FnoegHR.jpg',
    groups: [
      {
        id: 'g1',
        name: '5月聚餐',
        picture: 'other',
      },
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g3',
        name: '新年新希望',
        picture: 'health',
      },
      {
        id: 'g4',
        name: 'fruits and drinks',
        picture: 'other',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: 'games',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g10',
        name: 'group Health 3',
        picture: 'health',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u4',
    name: 'd',
    picture: 'https://images.dog.ceo/breeds/terrier-sealyham/n02095889_1044.jpg',
    groups: [
      {
        id: 'g1',
        name: '5月聚餐',
        picture: 'other',
      },
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g6',
        name: 'group Health 2',
        picture: 'health',
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: 'games',
      },
      {
        id: 'g10',
        name: 'group Health 3',
        picture: 'health',
      },
      {
        id: 'g12',
        name: 'group Games 3',
        picture: 'games',
      },
    ],
  },
  {
    id: 'u5',
    name: 'e',
    picture: 'https://cdn2.thecatapi.com/images/cib.jpg',
    groups: [
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g6',
        name: 'group Health 2',
        picture: 'health',
      },
      {
        id: 'g7',
        name: 'group Other 2',
        picture: 'other',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u6',
    name: 'f',
    picture: 'https://images.dog.ceo/breeds/terrier-patterdale/Patterdale.jpg',
    groups: [
      {
        id: 'g2',
        name: '2024 Japan',
        picture: 'travel',
      },
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g6',
        name: 'group Health 2',
        picture: 'health',
      },
      {
        id: 'g7',
        name: 'group Other 2',
        picture: 'other',
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: 'games',
      },
      {
        id: 'g12',
        name: 'group Games 3',
        picture: 'games',
      },
    ],
  },
  {
    id: 'u7',
    name: 'g',
    picture: 'https://cdn2.thecatapi.com/images/edb.jpg',
    groups: [
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u8',
    name: 'h',
    picture:
      'https://images.dog.ceo/breeds/poodle-medium/WhatsApp_Image_2022-08-06_at_4.48.38_PM.jpg',
    groups: [
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g8',
        name: 'group Games 2',
        picture: 'games',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u9',
    name: 'i',
    picture: 'https://cdn2.thecatapi.com/images/bo5.jpg',
    groups: [
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
  {
    id: 'u10',
    name: 'j',
    picture: 'https://images.dog.ceo/breeds/hound-english/n02089973_1303.jpg',
    groups: [
      {
        id: 'g5',
        name: 'group Travel 2',
        picture: 'travel',
      },
      {
        id: 'g9',
        name: 'group Travel 3',
        picture: 'travel',
      },
      {
        id: 'g11',
        name: 'group Other 3',
        picture: 'other',
      },
    ],
  },
];

export { groups, expenses, usersInfo };