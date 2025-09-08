/**
 * Mock data for the app.
 */

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
    color: '#87CEEB',
  },
  {
    id: '2',
    type: 'hotel',
    title: 'The Grand Hyatt',
    body: 'Nov 05 - Nov 09',
    color: '#008080',
  },
  {
    id: '3',
    type: 'itinerary',
    title: 'Ghana',
    body: 'Duration: 7 Days',
    color: '#D2691E',
  },
  {
    id: '4',
    type: 'savings',
    title: 'Ghana Savings Goal',
    body: '$150 / $1500',
    color: '#2E8B57',
  },
  {
    id: '5',
    type: 'playlist',
    title: 'Accra Night Drive',
    body: 'Highlife and Afrobeats for the journey',
    color: '#8A2BE2',
  },
  {
    id: '6',
    type: 'packing',
    title: 'Ghana Photo Gear',
    body: 'Status: 12 items remaining',
    color: '#FF6347',
  },
];

export const WALLET_CARDS = [
  {
    id: '1',
    name: 'Amex Platinum',
    subtitle: '$695 annual fee',
    description: '3 used, 5 in progress, 3 unused',
  },
  {
    id: '2',
    name: 'Chase Sapphire Reserve',
    subtitle: '$550 annual fee',
    description: '2 used, 4 in progress, 4 unused',
  },
  {
    id: '3',
    name: 'Capital One Venture X',
    subtitle: '$395 annual fee',
    description: '1 used, 3 in progress, 6 unused',
  },
  {
    id: '4',
    name: 'Amex Gold',
    subtitle: '$250 annual fee',
    description: '4 used, 2 in progress, 4 unused',
  },
  {
    id: '5',
    name: 'Chase Sapphire Preferred',
    subtitle: '$95 annual fee',
    description: '2 used, 2 in progress, 6 unused',
  },
  {
    id: '6',
    name: 'Capital One Savor',
    subtitle: '$95 annual fee',
    description: '3 used, 1 in progress, 6 unused',
  },
  {
    id: '7',
    name: 'Citi Premier',
    subtitle: '$95 annual fee',
    description: '1 used, 2 in progress, 7 unused',
  },
  {
    id: '8',
    name: 'Bank of America Premium Rewards',
    subtitle: '$95 annual fee',
    description: '2 used, 3 in progress, 5 unused',
  },
  {
    id: '9',
    name: 'U.S. Bank Altitude Reserve',
    subtitle: '$400 annual fee',
    description: '1 used, 1 in progress, 8 unused',
  },
  {
    id: '10',
    name: 'Wells Fargo Autograph',
    subtitle: '$0 annual fee',
    description: '0 used, 2 in progress, 8 unused',
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
};
