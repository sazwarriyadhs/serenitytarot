
import type { Customer, Appointment, TarotCard, ServiceOffering, TarotMaster } from './types';

export const serviceOfferings: ServiceOffering[] = [
  { id: 's1', iconName: 'Globe', title: 'General Reading', description: 'A broad overview of your current energies. Perfect for clients without a specific question.', price: 50, duration: 30 },
  { id: 's2', iconName: 'Heart', title: 'Love & Relationship Reading', description: 'Romantic relationships (partner, ex, potential). Love energy, loyalty, relationship future. Suitable for those in new relationships, LDRs, or conflicts.', price: 75, duration: 45 },
  { id: 's3', iconName: 'Briefcase', title: 'Career & Business Reading', description: 'Career direction, job choices, business opportunities. Suitable for those contemplating resignation, interviews, or promotions.', price: 65, duration: 45 },
  { id: 's4', iconName: 'Banknote', title: 'Finance Reading', description: 'Financial energy, opportunities for prosperity, expenses, investments. Can be combined with actionable advice.', price: 60, duration: 30 },
  { id: 's5', iconName: 'HandHeart', title: 'Spiritual & Healing Reading', description: 'Aura, karma, past life, and inner energy readings. Suitable for those needing self-reflection or emotional healing.', price: 90, duration: 60 },
  { id: 's6', iconName: 'ThumbsUp', title: '"Yes or No" Reading', description: 'A direct answer to one specific question. Quick and simple, suitable for express services.', price: 25, duration: 15 },
  { id: 's7', iconName: 'CalendarClock', title: 'Time-based Reading', description: 'Weekly, monthly, or yearly energy forecast. Predictions for a specific period.', price: 100, duration: 60 },
  { id: 's8', iconName: 'Hourglass', title: 'Past-Present-Future Reading', description: 'Highlights the past, current situation, and future predictions.', price: 55, duration: 30 },
  { id: 's9', iconName: 'Stars', title: 'Soulmate / Twin Flame Reading', description: 'Soul connections, spiritual relationships, destined partners.', price: 80, duration: 45 },
  { id: 's10', iconName: 'Orbit', title: 'Chakra or Energy Reading', description: 'Assesses the balance of the body\'s energy or chakras.', price: 70, duration: 45 },
];

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
  { id: 'app1', customerId: '1', customerName: 'Aria Montgomery', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-25', time: '10:00 AM', status: 'Upcoming', services: [serviceOfferings[0]], totalPrice: 50, totalDuration: 30 },
  { id: 'app2', customerId: '2', customerName: 'Spencer Hastings', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-25', time: '02:00 PM', status: 'Upcoming', services: [serviceOfferings[1], serviceOfferings[5]], totalPrice: 100, totalDuration: 60 },
  { id: 'app3', customerId: '3', customerName: 'Hanna Marin', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-26', time: '11:00 AM', status: 'Upcoming', services: [serviceOfferings[2]], totalPrice: 65, totalDuration: 45 },
  { id: 'app4', customerId: '4', customerName: 'Emily Fields', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-22', time: '03:00 PM', status: 'Completed', services: [serviceOfferings[4]], totalPrice: 90, totalDuration: 60 },
  { id: 'app5', customerId: '1', customerName: 'Aria Montgomery', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-20', time: '09:00 AM', status: 'Completed', services: [serviceOfferings[0], serviceOfferings[3]], totalPrice: 110, totalDuration: 60 },
  { id: 'app6', customerId: '2', customerName: 'Spencer Hastings', customerAvatarUrl: 'https://placehold.co/100x100.png', date: '2024-07-15', time: '01:00 PM', status: 'Cancelled', services: [serviceOfferings[8]], totalPrice: 80, totalDuration: 45 },
];

const formatCardNameForImage = (name: string) => {
    return name.toLowerCase().replace(/ /g, '-').replace(/&/g, 'and');
}

const cardData = [
    { name: 'The Fool', name_id: 'Si Pandir', description: 'Permulaan baru, kepolosan, spontanitas' },
    { name: 'The Magician', name_id: 'Sang Pesulap', description: 'Manifestasi, banyak akal, kekuatan' },
    { name: 'The High Priestess', name_id: 'Sang Pendeta Wanita Agung', description: 'Intuisi, alam bawah sadar, misteri' },
    { name: 'The Empress', name_id: 'Sang Maharani', description: 'Kewanitaan, keindahan, alam, pengasuhan' },
    { name: 'The Emperor', name_id: 'Sang Kaisar', description: 'Otoritas, struktur, kontrol, kebapakan' },
    { name: 'The Hierophant', name_id: 'Sang Imam Agung', description: 'Tradisi, konformitas, moralitas, etika' },
    { name: 'The Lovers', name_id: 'Sang Pecinta', description: 'Cinta, harmoni, hubungan, pilihan' },
    { name: 'The Chariot', name_id: 'Kereta Perang', description: 'Kontrol, kemauan keras, kesuksesan, tindakan' },
    { name: 'Strength', name_id: 'Kekuatan', description: 'Keberanian, persuasi, pengaruh, kasih sayang' },
    { name: 'The Hermit', name_id: 'Sang Pertapa', description: 'Pencarian jiwa, introspeksi, kesendirian' },
    { name: 'Wheel of Fortune', name_id: 'Roda Keberuntungan', description: 'Keberuntungan, karma, siklus hidup, takdir' },
    { name: 'Justice', name_id: 'Keadilan', description: 'Kewajaran, kebenaran, sebab dan akibat, hukum' },
    { name: 'The Hanged Man', name_id: 'Manusia Tergantung', description: 'Penangguhan, pembatasan, melepaskan' },
    { name: 'Death', name_id: 'Kematian', description: 'Akhir, awal, perubahan, transformasi' },
    { name: 'Temperance', name_id: 'Keseimbangan', description: 'Keseimbangan, moderasi, kesabaran, tujuan' },
    { name: 'The Devil', name_id: 'Sang Iblis', description: 'Perbudakan, kecanduan, seksualitas, materialisme' },
    { name: 'The Tower', name_id: 'Menara', description: 'Perubahan mendadak, pergolakan, kekacauan, wahyu' },
    { name: 'The Star', name_id: 'Bintang', description: 'Harapan, keyakinan, tujuan, pembaruan' },
    { name: 'The Moon', name_id: 'Bulan', description: 'Ilusi, ketakutan, kecemasan, alam bawah sadar' },
    { name: 'The Sun', name_id: 'Matahari', description: 'Positivitas, kesenangan, kehangatan, kesuksesan' },
    { name: 'Judgement', name_id: 'Penghakiman', description: 'Kelahiran kembali, panggilan batin, pembebasan' },
    { name: 'The World', name_id: 'Dunia', description: 'Penyelesaian, integrasi, pencapaian' },
];

export const tarotDeck: TarotCard[] = cardData.map(card => ({
    name: card.name_id,
    name_en: card.name,
    imageUrl: `/images/card/${formatCardNameForImage(card.name)}.png`,
    description: card.description,
}));



export const tarotMaster: TarotMaster = {
  id: 'master01',
  name: 'Madame Elena',
  email: 'madame.elena@mysticagenda.com',
  avatarUrl: 'https://placehold.co/200x200.png',
  bio: 'With over 15 years of experience in the mystic arts, Madame Elena specializes in providing clarity and guidance through the ancient wisdom of tarot. Her readings are known for their depth, compassion, and empowering insights, helping clients navigate life\'s challenges and embrace their true potential.',
  specialties: ['Love & Relationship', 'Career & Business', 'Spiritual Healing'],
  experienceYears: 15,
};
