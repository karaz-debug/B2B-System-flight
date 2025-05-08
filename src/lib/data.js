/**
 * Mock data for the application
 */

// Generate random flights based on search criteria
export function generateFlights(from, to, departureDate, returnDate = null, passengers = 1) {
  const flights = [];
  
  // Generate random number of flights (5-15)
  const count = Math.floor(Math.random() * 10) + 5;
  
  for (let i = 0; i < count; i++) {
    const id = `F${Math.floor(Math.random() * 90000) + 10000}`;
    
    // Create departure leg
    const departureHour = Math.floor(Math.random() * 24);
    const departureMinute = Math.floor(Math.random() * 60);
    const durationMinutes = Math.floor(Math.random() * 180) + 120; // 2-5 hours
    
    const arrivalHour = (departureHour + Math.floor(durationMinutes / 60)) % 24;
    const arrivalMinute = (departureMinute + (durationMinutes % 60)) % 60;
    
    const departureTime = `${departureHour.toString().padStart(2, '0')}:${departureMinute.toString().padStart(2, '0')}`;
    const arrivalTime = `${arrivalHour.toString().padStart(2, '0')}:${arrivalMinute.toString().padStart(2, '0')}`;
    
    // Generate random price between $150-$1200
    const basePrice = Math.floor(Math.random() * 1050) + 150;
    const price = basePrice * passengers;
    
    // Random airline from a predefined list
    const airlines = ['American Airlines', 'Delta Air Lines', 'United Airlines', 'British Airways', 'Emirates', 'Qatar Airways', 'Lufthansa', 'Singapore Airlines'];
    const airline = airlines[Math.floor(Math.random() * airlines.length)];
    const airlineCode = airline.split(' ')[0].substring(0, 2).toUpperCase();
    
    // Random flight number
    const flightNumber = `${airlineCode}${Math.floor(Math.random() * 9000) + 1000}`;
    
    // Determine if it's a direct flight or has stops
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    
    // Create flight object
    const flight = {
      id,
      from,
      to,
      departureDate,
      departureTime,
      arrivalTime,
      duration: durationMinutes,
      price,
      airline,
      flightNumber,
      stops,
      aircraft: generateRandomAircraft(),
    };
    
    // If it has stops, generate layover information
    if (stops > 0) {
      flight.layovers = [];
      
      for (let j = 0; j < stops; j++) {
        const layoverAirports = ['ATL', 'ORD', 'DFW', 'AMS', 'FRA', 'IST', 'DXB', 'HKG'];
        const layoverAirport = layoverAirports[Math.floor(Math.random() * layoverAirports.length)];
        const layoverDuration = Math.floor(Math.random() * 180) + 60; // 1-4 hour layover
        
        flight.layovers.push({
          airport: layoverAirport,
          duration: layoverDuration
        });
      }
    }
    
    // If round trip, create return flight
    if (returnDate) {
      flight.returnFlight = {
        departureDate: returnDate,
        departureTime: `${(arrivalHour + 2) % 24}:${arrivalMinute.toString().padStart(2, '0')}`,
        arrivalTime: `${(departureHour + 2) % 24}:${departureMinute.toString().padStart(2, '0')}`,
        duration: durationMinutes + Math.floor(Math.random() * 60) - 30, // +/- 30 minutes from outbound duration
        airline,
        flightNumber: `${airlineCode}${Math.floor(Math.random() * 9000) + 1000}`,
        stops: Math.floor(Math.random() * 3), // 0, 1, or 2 stops
        aircraft: generateRandomAircraft(),
      };
      
      // Generate layovers for return flight if needed
      if (flight.returnFlight.stops > 0) {
        flight.returnFlight.layovers = [];
        
        for (let j = 0; j < flight.returnFlight.stops; j++) {
          const layoverAirports = ['ATL', 'ORD', 'DFW', 'AMS', 'FRA', 'IST', 'DXB', 'HKG'];
          const layoverAirport = layoverAirports[Math.floor(Math.random() * layoverAirports.length)];
          const layoverDuration = Math.floor(Math.random() * 180) + 60; // 1-4 hour layover
          
          flight.returnFlight.layovers.push({
            airport: layoverAirport,
            duration: layoverDuration
          });
        }
      }
    }
    
    flights.push(flight);
  }
  
  // Sort flights by price (low to high)
  return flights.sort((a, b) => a.price - b.price);
}

// Generate random aircraft model
function generateRandomAircraft() {
  const aircraft = ['Boeing 737-800', 'Boeing 787-9', 'Airbus A320', 'Airbus A350-900', 'Boeing 777-300ER', 'Airbus A330-300', 'Boeing 747-8'];
  return aircraft[Math.floor(Math.random() * aircraft.length)];
}

// Generate booking details based on flight and passenger info
export function generateBooking(flight, passengers) {
  // Generate a unique booking reference
  const bookingRef = `TRP${Date.now()}`;
  
  // Calculate total price including taxes and fees
  const basePrice = flight.price;
  const taxes = Math.round(basePrice * 0.12);
  const fees = Math.round(basePrice * 0.08);
  const totalPrice = basePrice + taxes + fees;
  
  // Create booking object
  const booking = {
    bookingRef,
    flight,
    passengers,
    payment: {
      basePrice,
      taxes,
      fees,
      totalPrice,
      currency: 'USD',
      status: 'confirmed',
      timestamp: new Date().toISOString(),
    },
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  
  return booking;
}

// Get popular destinations
export function getPopularDestinations() {
  return [
    { name: 'New York', code: 'NYC', image: 'https://pixabay.com/get/gabe00d36b02b604a0d91cd9ad99e4758a3528b147c3bd57c2c54bdb9827b6bc66c96bd98c25b37d8ea29e43ac019dca7b2533a29f5a86b7fb2ae8a07e337431b_1280.jpg' },
    { name: 'London', code: 'LON', image: 'https://pixabay.com/get/gb0d76fc8743bd9ebfee0f5b6fdc9e45660ada4648510af890c1131da22fd783827783b7513652b972f4b9caba8c77af9e92dc24aac6e4cd85feedc97fd9b2e7a_1280.jpg' },
    { name: 'Tokyo', code: 'TYO', image: 'https://pixabay.com/get/g80191ee35806a9aa9cd0ad402399378d21493057fa8cbfb9f1260215597f28b9aa1e1a3323dc0574346921e15a217b15af56163de8dfaa50dcd7cb62ba6c63a0_1280.jpg' },
    { name: 'Paris', code: 'PAR', image: 'https://pixabay.com/get/g620fa07cb9a7b7491a8407fe0560fad4cd470544724686f9cdbd00883495d2d51152d7e4d07d05bb0eae410e3ef61a026b40ea3885dbea12c6b246177f097528_1280.jpg' },
    { name: 'Dubai', code: 'DXB', image: 'https://pixabay.com/get/g3d53bd5446a370e4a64bf100cdf0c21ada91e5b5f36bffff46de16be913853d1fb91776c257ef336b16e74ed89d186490febab666bf67c3e68155e2be7d88a19_1280.jpg' },
    { name: 'Sydney', code: 'SYD', image: 'https://pixabay.com/get/gcc813ebe7392320f6581a370bd96d4a98b24c9f342fd692a57284005b1e4363bf955e069a3c71406e4f408c59b84e5bafaf9896aaa3ac4dfcc63ce76cc86fb12_1280.jpg' },
  ];
}

// Get special offers
export function getSpecialOffers() {
  return [
    { 
      title: 'Summer Sale: 20% Off',
      description: 'Book your summer getaway with 20% off on all international flights',
      code: 'SUMMER20',
      expiryDate: '2023-09-30',
    },
    { 
      title: 'Business Class Upgrade',
      description: 'Free upgrade to Business Class on select long-haul routes',
      code: 'BIZUPGRADE',
      expiryDate: '2023-08-15',
    },
    { 
      title: 'Weekend Flash Sale',
      description: 'Save up to $150 on weekend flights booked within the next 48 hours',
      code: 'FLASH48',
      expiryDate: '2023-07-31',
    },
  ];
}
