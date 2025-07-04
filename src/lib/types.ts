
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
  id:string;
  customerId: string;
  customerName: string;
  customerAvatarUrl: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  services: ServiceOffering[];
  totalPrice: number;
  totalDuration: number; // in minutes
  paymentStatus: 'Paid' | 'Pending';
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
  price: number; // in USD
  duration: number; // in minutes
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
