import { create } from 'zustand';
import { generateFlights, generateBooking } from './data';
import { formatDate } from './utils';

// Create a store to manage application state
const useStore = create((set, get) => ({
  // Search parameters
  searchParams: {
    tripType: 'round_trip',
    origin: '',
    destination: '',
    departureDate: formatDate(new Date().toISOString()),
    returnDate: formatDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()),
    passengers: {
      adults: 1,
      children: 0,
      infants: 0
    },
    cabinClass: 'economy',
  },
  
  // Set search parameters
  setSearchParams: (params) => set({
    searchParams: {
      ...get().searchParams,
      ...params,
    }
  }),
  
  // Flight search results
  searchResults: null,
  
  // Search flights
  searchFlights: () => {
    const { origin, destination, departureDate, returnDate, tripType } = get().searchParams;
    const totalPassengers = get().searchParams.passengers.adults + 
                           get().searchParams.passengers.children + 
                           get().searchParams.passengers.infants;
    
    const flights = generateFlights(
      origin, 
      destination, 
      departureDate, 
      tripType === 'round_trip' ? returnDate : null,
      totalPassengers
    );
    
    set({ searchResults: flights });
    return flights;
  },
  
  // Get flight by ID
  getFlightById: (id) => {
    const { searchResults } = get();
    
    if (!searchResults) return null;
    
    return searchResults.find(flight => flight.id === id);
  },
  
  // Selected flight (for booking)
  selectedFlight: null,
  setSelectedFlight: (flight) => set({ selectedFlight: flight }),
  
  // Passenger information for booking
  passengerInfo: [],
  setPassengerInfo: (passengers) => set({ passengerInfo: passengers }),
  
  // Contact information for booking
  contactInfo: {
    email: '',
    phone: '',
    address: '',
  },
  setContactInfo: (contactInfo) => set({ contactInfo: { ...get().contactInfo, ...contactInfo } }),
  
  // Create a booking
  createBooking: () => {
    const { selectedFlight, passengerInfo } = get();
    
    if (!selectedFlight || passengerInfo.length === 0) {
      return null;
    }
    
    const booking = generateBooking(selectedFlight, passengerInfo);
    set({ currentBooking: booking });
    
    return booking;
  },
  
  // Current booking
  currentBooking: null,
  
  // Get booking by reference
  getBookingByRef: (ref) => {
    // In a real application, this would fetch from API
    // For this demo, we'll return the current booking if the ref matches
    
    const { currentBooking } = get();
    
    if (currentBooking && currentBooking.bookingRef === ref) {
      return currentBooking;
    }
    
    return null;
  },
  
  // Reset the store (for logout or session end)
  resetStore: () => set({
    searchResults: null,
    selectedFlight: null,
    passengerInfo: [],
    contactInfo: {
      email: '',
      phone: '',
      address: '',
    },
    currentBooking: null,
  }),
}));

export default useStore;
