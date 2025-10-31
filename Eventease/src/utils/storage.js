// Local storage helpers
export const storage = {
  // Users
  getUsers: () => {
    const users = localStorage.getItem('eventUsers');
    return users ? JSON.parse(users) : [];
  },

  saveUsers: (users) => {
    localStorage.setItem('eventUsers', JSON.stringify(users));
  },

  // Services
  getServices: () => {
    const services = localStorage.getItem('eventServices');
    if (services) return JSON.parse(services);

    // Default services if none exist
    const defaultServices = [
      {
        id: '1',
        name: 'Professional Photography',
        description: 'Capture your special moments with our expert photographers',
        price: 15000,
        category: 'photography',
        image: '/api/placeholder/400/300',
        packages: ['Basic Package', 'Premium Package', 'Deluxe Package'],
      },
      {
        id: '2',
        name: 'Catering Services',
        description: 'Delicious food and beverages for your events',
        price: 25000,
        category: 'catering',
        image: '/api/placeholder/400/300',
        packages: ['Vegetarian', 'Non-Vegetarian', 'Mixed Cuisine'],
      },
      {
        id: '3',
        name: 'Convention Hall',
        description: 'Spacious and elegant halls for your celebrations',
        price: 30000,
        category: 'hall',
        image: '/api/placeholder/400/300',
        packages: ['Small Hall (100 guests)', 'Medium Hall (300 guests)', 'Large Hall (500+ guests)'],
      },
      {
        id: '4',
        name: 'Event Decoration',
        description: 'Beautiful decorations to make your event memorable',
        price: 12000,
        category: 'decoration',
        image: '/api/placeholder/400/300',
        packages: ['Theme Decoration', 'Floral Decoration', 'Balloon Decoration'],
      },
    ];

    storage.saveServices(defaultServices);
    return defaultServices;
  },

  saveServices: (services) => {
    localStorage.setItem('eventServices', JSON.stringify(services));
  },

  // Bookings
  getBookings: () => {
    const bookings = localStorage.getItem('eventBookings');
    return bookings ? JSON.parse(bookings) : [];
  },

  saveBookings: (bookings) => {
    localStorage.setItem('eventBookings', JSON.stringify(bookings));
  },

  addBooking: (booking) => {
    const bookings = storage.getBookings();
    bookings.push(booking);
    storage.saveBookings(bookings);
  },

  // Payments
  getPayments: () => {
    const payments = localStorage.getItem('eventPayments');
    return payments ? JSON.parse(payments) : [];
  },

  savePayments: (payments) => {
    localStorage.setItem('eventPayments', JSON.stringify(payments));
  },

  addPayment: (payment) => {
    const payments = storage.getPayments();
    payments.push(payment);
    storage.savePayments(payments);
  },

  // Current user session
  getCurrentUser: () => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },

  setCurrentUser: (user) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },

  // Generate unique IDs
  generateId: () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  },
};
