/**
 * Mock data for the app.
 */

import { nanoid } from 'nanoid/non-secure';
import { SavingsGoal } from '@utils';

export const HUBS = [
  {
    id: '1',
    title: 'Wallets',
    icon: 'wallet',
    items: ['Amex Platinum', 'Chase Sapphire Reserve'],
  },
  {
    id: '2',
    title: 'Documents',
    icon: 'passport',
    items: ['Passport', 'Immunization Card'],
  },
  {
    id: '3',
    title: 'Music',
    icon: 'music',
    items: ['Workout Mix', 'Travel Vibes'],
  },
  {
    id: '4',
    title: 'Packing',
    icon: 'suitcase',
    items: ['Summer Europe', 'Business Trip'],
  },
  {
    id: '5',
    title: 'Itineraries',
    icon: 'map-signs',
    items: ['Paris 2025', 'Tokyo Food Tour'],
  },
  {
    id: '6',
    title: 'Savings',
    icon: 'piggy-bank',
    items: [],
  },
];

export const UPCOMING_ITEMS = [
  {
    id: '1',
    type: 'flight',
    title: 'DEN - DFW',
    body: 'November 05, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    type: 'hotel',
    title: 'The Grand Hyatt',
    body: 'Nov 05 - Nov 09',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    type: 'itinerary',
    title: 'Ghana',
    body: 'Duration: 7 Days',
    imageUrl: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    type: 'savings',
    title: 'Ghana Savings Goal',
    currentAmount: 150,
    totalAmount: 1500,
    imageUrl: 'https://images.unsplash.com/photo-1622219999459-ab5b14e5f45a?q=80&w=3864&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    type: 'playlist',
    title: 'Accra Night Drive',
    body: 'Highlife and Afrobeats for the journey',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    url: 'https://music.apple.com/us/playlist/top-100-ghana/pl.78f1974e882d4952b26ebfb8e017c933',
  },
  {
    id: '6',
    type: 'packing',
    title: 'Ghana Photo Gear',
    body: 'Status: 12 items remaining',
    imageUrl: 'https://images.unsplash.com/photo-1585155802409-ff2950580a9d?q=80&w=1364&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export const WALLET_CARDS = [
  {
    id: '1',
    name: 'Amex Platinum',
    subtitle: '$695 annual fee',
    description: '3 used, 5 in progress, 3 unused',
    currentRedemption: 1800,
    targetRedemption: 700,
    image: 'https://icm.aexp-static.com/acquisition/card-art/NUS000000237_480x304_straight_withname.png',
  },
  {
    id: '2',
    name: 'Chase Sapphire Reserve',
    subtitle: '$550 annual fee',
    description: '2 used, 4 in progress, 4 unused',
    currentRedemption: 300,
    targetRedemption: 550,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '3',
    name: 'Capital One Venture X',
    subtitle: '$395 annual fee',
    description: '1 used, 3 in progress, 6 unused',
    currentRedemption: 400,
    targetRedemption: 395,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '4',
    name: 'Amex Gold',
    subtitle: '$250 annual fee',
    description: '4 used, 2 in progress, 4 unused',
    currentRedemption: 250,
    targetRedemption: 250,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '5',
    name: 'Chase Sapphire Preferred',
    subtitle: '$95 annual fee',
    description: '2 used, 2 in progress, 6 unused',
    currentRedemption: 10,
    targetRedemption: 95,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '6',
    name: 'Capital One Savor',
    subtitle: '$95 annual fee',
    description: '3 used, 1 in progress, 6 unused',
    currentRedemption: 70,
    targetRedemption: 95,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '7',
    name: 'Citi Premier',
    subtitle: '$95 annual fee',
    description: '1 used, 2 in progress, 7 unused',
    currentRedemption: 95,
    targetRedemption: 95,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '8',
    name: 'Bank of America Premium Rewards',
    subtitle: '$95 annual fee',
    description: '2 used, 3 in progress, 5 unused',
    currentRedemption: 100,
    targetRedemption: 95,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '9',
    name: 'U.S. Bank Altitude Reserve',
    subtitle: '$400 annual fee',
    description: '1 used, 1 in progress, 8 unused',
    currentRedemption: 500,
    targetRedemption: 400,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
  {
    id: '10',
    name: 'Wells Fargo Autograph',
    subtitle: '$0 annual fee',
    description: '0 used, 2 in progress, 8 unused',
    currentRedemption: 0,
    targetRedemption: 0,
    image: 'https://www.discover.com/credit-cards/student-credit-card/it-card/images/new/card-art-large.png',
  },
];

export const MOCK_STATS = [
  {
    id: '1',
    label: 'Countries Visited',
    value: '12',
    icon: 'globe',
  },
  {
    id: '2',
    label: 'Trips Taken',
    value: '34',
    icon: 'briefcase',
  },
  {
    id: '3',
    label: 'Cities Explored',
    value: '56',
    icon: 'city',
  },
  {
    id: '4',
    label: 'Longest Trip',
    value: '21',
    unit: 'days',
    icon: 'calendar-alt',
  },
  {
    id: '5',
    label: 'Continents Touched',
    value: '4',
    icon: 'globe-americas',
  },
  {
    id: '6',
    label: 'Photos Taken',
    value: '7,890',
    icon: 'camera',
  },
  {
    id: '7',
    label: 'Languages Spoken',
    value: '3',
    icon: 'language',
  },
  {
    id: '8',
    label: 'Miles Traveled',
    value: '123,456',
    icon: 'plane',
  },
  {
    id: '9',
    label: 'Travel Buddies',
    value: '8',
    icon: 'user-friends',
  },
  {
    id: '10',
    label: 'Next Trip In',
    value: '42',
    unit: 'days',
    icon: 'hourglass-start',
  },
];

export const MOCK_CREATOR_STATS = [
  {
    id: '1',
    label: 'Contributions',
    value: '5',
    icon: 'code-branch',
  },
  {
    id: '2',
    label: 'Lines of Code',
    value: '1,234',
    icon: 'file-code',
  },
  {
    id: '3',
    label: 'Reviews',
    value: '12',
    icon: 'eye',
  },
  {
    id: '4',
    label: 'Templates Created',
    value: '3',
    icon: 'box',
  },
  {
    id: '5',
    label: 'Community Likes',
    value: '128',
    icon: 'heart',
  },
];

export const MOCK_USER = {
  name: 'Kobby',
  image: 'https://i.pravatar.cc/150?u=kobby',
  plan: 'Free',
};

export const POPULAR_DOCUMENTS = [
  { id: '1', name: 'Passport' },
  { id: '2', name: 'Visa' },
  { id: '3', name: 'ID' },
  { id: '4', name: 'Immunizations' },
  { id: '5', name: 'Other', isCustom: true },
];

export const MOCK_UPLOADED_DOCUMENTS = [
  {
    id: nanoid(),
    type: { id: '1', name: 'Passport' },
    status: 'Uploaded' as const,
    customName: '',
    uploadedAt: new Date(),
    uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: nanoid(),
    type: { id: '2', name: 'Visa' },
    status: 'Uploaded' as const,
    customName: '',
    uploadedAt: new Date(),
    uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: nanoid(),
    type: { id: '5', name: 'Other', isCustom: true },
    status: 'Uploaded' as const,
    customName: 'Drivers License',
    uploadedAt: new Date(),
    uri: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
];

export const MUSIC_DATA = [
  {
    id: '1',
    type: 'playlist',
    title: 'Chill Vibes',
    body: 'Relax and unwind with these calming tracks.',
    imageUrl: 'https://picsum.photos/seed/music1/400/300',
    url: 'https://music.apple.com/us/playlist/chill-vibes/pl.12345',
  },
  {
    id: '2',
    type: 'playlist',
    title: 'Workout Hits',
    body: 'Get pumped up with these high-energy anthems.',
    imageUrl: 'https://picsum.photos/seed/music2/400/300',
    url: 'https://music.apple.com/us/playlist/workout-hits/pl.67890',
  },
  {
    id: '3',
    type: 'playlist',
    title: 'Indie Folk',
    body: 'Discover new and emerging indie folk artists.',
    imageUrl: 'https://picsum.photos/seed/music3/400/300',
    url: 'https://music.apple.com/us/playlist/indie-folk/pl.abcde',
  },
  {
    id: '4',
    type: 'playlist',
    title: 'Throwback Jams',
    body: 'Relive the good old days with these classic hits.',
    imageUrl: 'https://picsum.photos/seed/music4/400/300',
    url: 'https://music.apple.com/us/playlist/throwback-jams/pl.fghij',
  },
  {
    id: '5',
    type: 'playlist',
    title: 'Acoustic Covers',
    body: 'Your favorite songs, reimagined.',
    imageUrl: 'https://picsum.photos/seed/music5/400/300',
    url: 'https://music.apple.com/us/playlist/acoustic-covers/pl.klmno',
  },
];

export const PACKING_LISTS = [
  {
    id: '1',
    name: 'Weekend Getaway',
    items: [
      { id: '1', name: 'T-shirts', packed: true },
      { id: '2', name: 'Jeans', packed: true },
      { id: '3', name: 'Socks', packed: false },
    ],
  },
  {
    id: '2',
    name: 'Business Trip',
    items: [
      { id: '4', name: 'Laptop', packed: true },
      { id: '5', name: 'Charger', packed: false },
      { id: '6', name: 'Business cards', packed: false },
    ],
  },
];

export const MANDATORY_ITEMS = [
  { id: 'mand-1', name: 'Passport', packed: false, isMandatory: true },
  { id: 'mand-2', name: 'Phone Charger', packed: false, isMandatory: true },
  { id: 'mand-3', name: 'House Keys', packed: false, isMandatory: true },
];

export const SAVINGS_GOALS: SavingsGoal[] = [
  {
    id: '1',
    name: 'Ghana Trip',
    currentAmount: 150,
    totalAmount: 1500,
    status: 'In Progress',
  },
  {
    id: '2',
    name: 'New Camera',
    currentAmount: 300,
    totalAmount: 300,
    status: 'Completed',
  },
  {
    id: '3',
    name: 'Summer Festival',
    currentAmount: 500,
    totalAmount: 500,
    status: 'Completed',
  },
  {
    id: '4',
    name: 'Birthday Gift',
    currentAmount: 2000,
    totalAmount: 2000,
    status: 'Completed',
  },
];

/**
 * Adds a new savings goal to the list of savings goals.
 * @param goal The savings goal to add.
 */
export const addSavingsGoal = (goal: Omit<SavingsGoal, 'id'>) => {
  SAVINGS_GOALS.push({ ...goal, id: nanoid() });
};
