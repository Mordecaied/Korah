export const mockCategories = [
  {
    id: 1,
    title: 'Real Estate',
    amount: 250000,
    icon: 'Home',
    color: 'text-blue-500',
    transactions: [
      { id: 1, date: '2023-01-15', amount: 150000, description: 'Down payment' },
      { id: 2, date: '2023-02-01', amount: 100000, description: 'Mortgage payment' },
    ],
    subCategories: [
      { id: 1, title: 'Mortgage', amount: 200000 },
      { id: 2, title: 'Property Tax', amount: 30000 },
      { id: 3, title: 'Maintenance', amount: 20000 },
    ]
  },
  {
    id: 2,
    title: 'Insurance',
    amount: 5700,
    icon: 'Shield',
    color: 'text-green-500',
    transactions: [
      { id: 3, date: '2023-03-10', amount: 2850, description: 'Car insurance' },
      { id: 4, date: '2023-03-15', amount: 2850, description: 'Home insurance' },
    ],
    subCategories: [
      { id: 1, title: 'Car Insurance', amount: 2000 },
      { id: 2, title: 'Home Insurance', amount: 1500 },
      { id: 3, title: 'Health Insurance', amount: 2200 },
    ]
  },
  {
    id: 3,
    title: 'Bills',
    amount: 2500,
    icon: 'FileText',
    color: 'text-yellow-500',
    transactions: [
      { id: 5, date: '2023-04-01', amount: 1500, description: 'Electricity' },
      { id: 6, date: '2023-04-05', amount: 1000, description: 'Water' },
    ],
    subCategories: [
      { id: 1, title: 'Electricity', amount: 1500 },
      { id: 2, title: 'Water', amount: 500 },
      { id: 3, title: 'Internet', amount: 500 },
    ]
  },
  {
    id: 4,
    title: 'Investments',
    amount: 50000,
    icon: 'TrendingUp',
    color: 'text-purple-500',
    transactions: [
      { id: 7, date: '2023-05-01', amount: 30000, description: 'Stocks purchase' },
      { id: 8, date: '2023-05-15', amount: 20000, description: 'Bonds purchase' },
    ],
    subCategories: [
      { id: 1, title: 'Stocks', amount: 30000 },
      { id: 2, title: 'Bonds', amount: 15000 },
      { id: 3, title: 'Mutual Funds', amount: 5000 },
    ]
  },
  {
    id: 5,
    title: 'Other Expenses',
    amount: 1000,
    icon: 'MoreHorizontal',
    color: 'text-indigo-500',
    transactions: [
      { id: 9, date: '2023-06-01', amount: 500, description: 'Groceries' },
      { id: 10, date: '2023-06-15', amount: 500, description: 'Entertainment' },
    ],
    subCategories: [
      { id: 1, title: 'Groceries', amount: 500 },
      { id: 2, title: 'Entertainment', amount: 300 },
      { id: 3, title: 'Miscellaneous', amount: 200 },
    ]
  }
];

export const mockTransactions = [
  { id: 1, categoryId: 1, date: '2023-01-15', amount: 150000, description: 'Down payment' },
  { id: 2, categoryId: 1, date: '2023-02-01', amount: 100000, description: 'Mortgage payment' },
  { id: 3, categoryId: 2, date: '2023-03-10', amount: 2850, description: 'Car insurance' },
  { id: 4, categoryId: 2, date: '2023-03-15', amount: 2850, description: 'Home insurance' },
  { id: 5, categoryId: 3, date: '2023-04-01', amount: 1500, description: 'Electricity' },
  { id: 6, categoryId: 3, date: '2023-04-05', amount: 1000, description: 'Water' },
  { id: 7, categoryId: 4, date: '2023-05-01', amount: 30000, description: 'Stocks purchase' },
  { id: 8, categoryId: 4, date: '2023-05-15', amount: 20000, description: 'Bonds purchase' },
  { id: 9, categoryId: 5, date: '2023-06-01', amount: 500, description: 'Groceries' },
  { id: 10, categoryId: 5, date: '2023-06-15', amount: 500, description: 'Entertainment' },
];

export const mockCategoryDetails = {
  1: {
    id: 1,
    title: 'Real Estate',
    subCategories: [
      { id: 1, title: 'Mortgage', amount: 200000 },
      { id: 2, title: 'Property Tax', amount: 30000 },
      { id: 3, title: 'Maintenance', amount: 20000 },
    ]
  },
  2: {
    id: 2,
    title: 'Insurance',
    subCategories: [
      { id: 1, title: 'Car Insurance', amount: 2000 },
      { id: 2, title: 'Home Insurance', amount: 1500 },
      { id: 3, title: 'Health Insurance', amount: 2200 },
    ]
  },
  3: {
    id: 3,
    title: 'Bills',
    subCategories: [
      { id: 1, title: 'Electricity', amount: 1500 },
      { id: 2, title: 'Water', amount: 500 },
      { id: 3, title: 'Internet', amount: 500 },
    ]
  },
  4: {
    id: 4,
    title: 'Investments',
    subCategories: [
      { id: 1, title: 'Stocks', amount: 30000 },
      { id: 2, title: 'Bonds', amount: 15000 },
      { id: 3, title: 'Mutual Funds', amount: 5000 },
    ]
  },
  5: {
    id: 5,
    title: 'Other Expenses',
    subCategories: [
      { id: 1, title: 'Groceries', amount: 500 },
      { id: 2, title: 'Entertainment', amount: 300 },
      { id: 3, title: 'Miscellaneous', amount: 200 },
    ]
  },
};