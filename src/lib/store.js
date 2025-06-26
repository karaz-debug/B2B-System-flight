import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateBooking } from './data';
import { formatDate } from './utils';

// Helper to extract IATA code from 'City (CODE)' or just return the code
function extractIATACode(str) {
  if (!str) return '';
  const match = str.match(/\(([A-Z0-9]{3})\)$/);
  return match ? match[1] : str;
}

// Create a store to manage application state
const useStore = create(
  persist(
    (set, get) => ({
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
      rawFlightOffers: [],
      
      // Search flights (now async, calls backend API)
      searchFlights: async () => {
        const { origin, destination, departureDate, returnDate, tripType, passengers, cabinClass } = get().searchParams;
        const params = new URLSearchParams({
          origin: extractIATACode(origin),
          destination: extractIATACode(destination),
          departureDate,
          adults: passengers.adults,
          children: passengers.children,
          infants: passengers.infants,
          cabinClass,
        });
        if (tripType === 'round_trip' && returnDate) {
          params.append('returnDate', returnDate);
        }
        try {
          const res = await fetch(`/api/flights?${params.toString()}`);
          if (!res.ok) throw new Error('Failed to fetch flights');
          const data = await res.json();
          // Add a unique client-side ID to each offer
          const offersWithClientId = (data.data || []).map(offer => ({
            ...offer,
            clientId: self.crypto.randomUUID(),
          }));
          set({ searchResults: { ...data, data: offersWithClientId }, rawFlightOffers: offersWithClientId });
          return { ...data, data: offersWithClientId };
        } catch (error) {
          set({ searchResults: null, rawFlightOffers: [] });
          throw error;
        }
      },
      
      // Get flight by ID
      getFlightById: (id) => {
        const { searchResults } = get();
        if (!searchResults) return null;
        // This needs to be mapped still for the list view
        const mappedFlights = (searchResults.data || []).map(mapAmadeusOfferToFlight);
        return mappedFlights.find(flight => flight.id === id);
      },
      
      getRawFlightOfferByClientId: (clientId) => {
        const { rawFlightOffers } = get();
        if (!rawFlightOffers) return null;
        return rawFlightOffers.find(offer => offer.clientId === clientId);
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
      setCurrentBooking: (booking) => set({ currentBooking: booking }),
      
      // Get booking by reference
      getBookingByRef: (ref) => {
        const bookings = get().bookings;
        return bookings.find(b => b.data?.associatedRecords?.[0]?.reference === ref);
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
      
      // Travelers for booking confirmation
      travelers: [],
      setTravelers: (travelers) => set({ travelers }),
      
      // New state for selected fare
      selectedFare: null,
      setSelectedFare: (fare) => set({ selectedFare: fare }),
      
      // New state for seat selection
      seatSelection: {},
      setSeatSelection: (seats) => set({ seatSelection: seats }),
      
      // New state for bookings
      bookings: [],
    }),
    {
      name: 'flight-booking-storage', // name of the item in the storage (must be unique)
      partialize: (state) => ({
        searchParams: state.searchParams,
        searchResults: state.searchResults,
        rawFlightOffers: state.rawFlightOffers,
        currentBooking: state.currentBooking,
      }),
    }
  )
);

// This helper should be moved here from the search page to be accessible by the store
export function mapAmadeusOfferToFlight(offer) {
  // Only handle first itinerary (one-way/round-trip)
  const itinerary = offer.itineraries[0];
  const segments = itinerary.segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const stops = segments.length - 1;
  const layovers = stops > 0 ? segments.slice(1).map(seg => ({
    airport: seg.departure.iataCode,
    duration: seg.duration
  })) : [];
  return {
    id: offer.id,
    airline: firstSegment.carrierCode, // You may want to map code to name
    flightNumber: firstSegment.number,
    from: firstSegment.departure.iataCode,
    to: lastSegment.arrival.iataCode,
    departureDate: firstSegment.departure.at.split('T')[0],
    departureTime: firstSegment.departure.at.split('T')[1]?.slice(0,5),
    arrivalTime: lastSegment.arrival.at.split('T')[1]?.slice(0,5),
    duration: itinerary.duration, // Keep original format like "PT2H30M"
    price: parseFloat(offer.price.total),
    stops,
    layovers,
    aircraft: firstSegment.aircraft?.code || '',
    returnFlight: offer.itineraries[1] ? {
      departureDate: offer.itineraries[1].segments[0].departure.at.split('T')[0],
      departureTime: offer.itineraries[1].segments[0].departure.at.split('T')[1]?.slice(0,5),
      arrivalTime: offer.itineraries[1].segments[offer.itineraries[1].segments.length-1].arrival.at.split('T')[1]?.slice(0,5),
      duration: offer.itineraries[1].duration,
      stops: offer.itineraries[1].segments.length - 1,
      flightNumber: offer.itineraries[1].segments[0].number,
      aircraft: offer.itineraries[1].segments[0].aircraft?.code || '',
    } : null
  };
}

export default useStore;
