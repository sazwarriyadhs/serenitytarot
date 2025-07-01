import type { Customer, Appointment, TarotCard } from './types';

export const customers: Customer[] = [
  {
    id: '1',
    name: 'Aria Montgomery',
    email: 'aria.m@example.com',
    joinDate: '2023-01-15',
    avatarUrl: 'https://placehold.co/100x100.png',
    bookings: [
      { id: 'b1', date: '2023-10-26', readingType: 'Career Path', notes: 'Client was concerned about a career change. The cards suggested a new creative path.' },
      { id: 'b2', date: '2024-03-12', readingType: 'Love Life', notes: 'Discussion about a new relationship. The Lovers card appeared, indicating a significant connection.' },
    ],
  },
  {
    id: '2',
    name: 'Spencer Hastings',
    email: 'spencer.h@example.com',
    joinDate: '2023-02-20',
    avatarUrl: 'https://placehold.co/100x100.png',
    bookings: [
      { id: 'b3', date: '2023-11-05', readingType: 'General Reading', notes: 'Client felt stuck. The Tower card suggested a need for foundational changes.' },
    ],
  },
  {
    id: '3',
    name: 'Hanna Marin',
    email: 'hanna.m@example.com',
    joinDate: '2023-04-10',
    avatarUrl: 'https://placehold.co/100x100.png',
    bookings: [
        { id: 'b4', date: '2024-01-20', readingType: 'Financial Outlook', notes: 'Asked about financial investments. The Wheel of Fortune indicated a period of change.' },
        { id: 'b5', date: '2024-05-02', readingType: 'Spiritual Growth', notes: 'Focused on personal development. The Hermit pointed towards introspection.' },
    ],
  },
  {
    id: '4',
    name: 'Emily Fields',
    email: 'emily.f@example.com',
    joinDate: '2023-05-01',
    avatarUrl: 'https://placehold.co/100x100.png',
    bookings: [
        { id: 'b6', date: '2024-06-18', readingType: 'Family Matters', notes: 'Concerns about family dynamics. The Four of Wands suggested celebration and harmony.' },
    ],
  },
];

export const appointments: Appointment[] = [
  { id: 'app1', customerId: '1', customerName: 'Aria Montgomery', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-25', time: '10:00 AM', status: 'Upcoming' },
  { id: 'app2', customerId: '2', customerName: 'Spencer Hastings', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-25', time: '02:00 PM', status: 'Upcoming' },
  { id: 'app3', customerId: '3', customerName: 'Hanna Marin', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-26', time: '11:00 AM', status: 'Upcoming' },
  { id: 'app4', customerId: '4', customerName: 'Emily Fields', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-22', time: '03:00 PM', status: 'Completed' },
  { id: 'app5', customerId: '1', customerName: 'Aria Montgomery', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-20', time: '09:00 AM', status: 'Completed' },
  { id: 'app6', customerId: '2', customerName: 'Spencer Hastings', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-15', time: '01:00 PM', status: 'Cancelled' },
];

export const tarotDeck: TarotCard[] = [
    { name: 'The Fool', imageUrl: 'https://placehold.co/200x350.png', description: 'New beginnings, innocence, spontaneity' },
    { name: 'The Magician', imageUrl: 'https://placehold.co/200x350.png', description: 'Manifestation, resourcefulness, power' },
    { name: 'The High Priestess', imageUrl: 'https://placehold.co/200x350.png', description: 'Intuition, subconscious, mystery' },
    { name: 'The Empress', imageUrl: 'https://placehold.co/200x350.png', description: 'Femininity, beauty, nature, nurturing' },
    { name: 'The Emperor', imageUrl: 'https://placehold.co/200x350.png', description: 'Authority, structure, control, fatherhood' },
    { name: 'The Hierophant', imageUrl: 'https://placehold.co/200x350.png', description: 'Tradition, conformity, morality, ethics' },
    { name: 'The Lovers', imageUrl: 'https://placehold.co/200x350.png', description: 'Love, harmony, relationships, choices' },
    { name: 'The Chariot', imageUrl: 'https://placehold.co/200x350.png', description: 'Control, willpower, success, action' },
    { name: 'Strength', imageUrl: 'https://placehold.co/200x350.png', description: 'Courage, persuasion, influence, compassion' },
    { name: 'The Hermit', imageUrl: 'https://placehold.co/200x350.png', description: 'Soul-searching, introspection, solitude' },
    { name: 'Wheel of Fortune', imageUrl: 'https://placehold.co/200x350.png', description: 'Good luck, karma, life cycles, destiny' },
    { name: 'Justice', imageUrl: 'https://placehold.co/200x350.png', description: 'Fairness, truth, cause and effect, law' },
    { name: 'The Hanged Man', imageUrl: 'https://placehold.co/200x350.png', description: 'Suspension, restriction, letting go' },
    { name: 'Death', imageUrl: 'https://placehold.co/200x350.png', description: 'Endings, beginnings, change, transformation' },
    { name: 'Temperance', imageUrl: 'https://placehold.co/200x350.png', description: 'Balance, moderation, patience, purpose' },
    { name: 'The Devil', imageUrl: 'https://placehold.co/200x350.png', description: 'Bondage, addiction, sexuality, materialism' },
    { name: 'The Tower', imageUrl: 'https://placehold.co/200x350.png', description: 'Sudden change, upheaval, chaos, revelation' },
    { name: 'The Star', imageUrl: 'https://placehold.co/200x350.png', description: 'Hope, faith, purpose, renewal' },
    { name: 'The Moon', imageUrl: 'https://placehold.co/200x350.png', description: 'Illusion, fear, anxiety, subconscious' },
    { name: 'The Sun', imageUrl: 'https://placehold.co/200x350.png', description: 'Positivity, fun, warmth, success' },
    { name: 'Judgement', imageUrl: 'https://placehold.co/200x350.png', description: 'Rebirth, inner calling, absolution' },
    { name: 'The World', imageUrl: 'https://placehold.co/200x350.png', description: 'Completion, integration, accomplishment' },
];
