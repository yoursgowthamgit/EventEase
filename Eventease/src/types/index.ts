export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'photography' | 'catering' | 'hall' | 'decoration';
  image: string;
  packages?: string[];
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  guests?: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  createdAt: string;
}

export interface Payment {
  id: string;
  bookingId: string;
  amount: number;
  method: 'cash' | 'upi' | 'card';
  status: 'pending' | 'completed' | 'failed';
  receipt: string;
  createdAt: string;
}