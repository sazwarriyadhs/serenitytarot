
export type Booking = {
  id: string;
  date: string;
  readingType: string;
  notes: string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  joinDate: string;
  bookings: Booking[];
  avatarUrl: string;
};

export type Appointment = {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatarUrl: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
};

export type TarotCard = {
  name: string;
  name_en: string;
  imageUrl: string;
  description: string;
};

export type ServiceOffering = {
  id: string;
  iconName: string;
  title: string;
  description: string;
};

export type TarotMaster = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  bio: string;
  specialties: string[];
  experienceYears: number;
};
