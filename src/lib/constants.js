/**
 * Application constants
 */

// Airport list for search suggestions
export const AIRPORTS = [
  { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
  { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
  { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
  { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
  { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
  { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
  { code: 'SYD', name: 'Sydney Airport', city: 'Sydney', country: 'Australia' },
  { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
  { code: 'FCO', name: 'Leonardo da Vinci International Airport', city: 'Rome', country: 'Italy' },
  { code: 'DEL', name: 'Indira Gandhi International Airport', city: 'Delhi', country: 'India' },
];

// Airlines
export const AIRLINES = [
  { code: 'AA', name: 'American Airlines', logo: '/logos/american-airlines.svg' },
  { code: 'BA', name: 'British Airways', logo: '/logos/british-airways.svg' },
  { code: 'DL', name: 'Delta Air Lines', logo: '/logos/delta.svg' },
  { code: 'EK', name: 'Emirates', logo: '/logos/emirates.svg' },
  { code: 'LH', name: 'Lufthansa', logo: '/logos/lufthansa.svg' },
  { code: 'QR', name: 'Qatar Airways', logo: '/logos/qatar.svg' },
  { code: 'SQ', name: 'Singapore Airlines', logo: '/logos/singapore.svg' },
  { code: 'UA', name: 'United Airlines', logo: '/logos/united.svg' },
];

// Cabin classes
export const CABIN_CLASSES = [
  { value: 'economy', label: 'Economy' },
  { value: 'premium_economy', label: 'Premium Economy' },
  { value: 'business', label: 'Business Class' },
  { value: 'first', label: 'First Class' },
];

// Passenger types
export const PASSENGER_TYPES = [
  { value: 'adult', label: 'Adults (12+ yrs)' },
  { value: 'child', label: 'Children (2-11 yrs)' },
  { value: 'infant', label: 'Infants (under 2 yrs)' },
];

// Trip types
export const TRIP_TYPES = [
  { value: 'one_way', label: 'One Way' },
  { value: 'round_trip', label: 'Round Trip' },
  { value: 'multi_city', label: 'Multi-City' },
];

// Payment methods
export const PAYMENT_METHODS = [
  { value: 'credit_card', label: 'Credit Card' },
  { value: 'debit_card', label: 'Debit Card' },
  { value: 'bank_transfer', label: 'Bank Transfer' },
  { value: 'paypal', label: 'PayPal' },
];

// Sort options for flight results
export const SORT_OPTIONS = [
  { value: 'price_asc', label: 'Price (Lowest first)' },
  { value: 'price_desc', label: 'Price (Highest first)' },
  { value: 'duration_asc', label: 'Duration (Shortest first)' },
  { value: 'departure_asc', label: 'Departure (Earliest first)' },
  { value: 'arrival_asc', label: 'Arrival (Earliest first)' },
];

// Filter options for flight results
export const FILTER_CATEGORIES = {
  stops: [
    { value: '0', label: 'Direct flights only' },
    { value: '1', label: 'Max 1 stop' },
    { value: '2+', label: '2+ stops' },
  ],
  airlines: AIRLINES.map(airline => ({ value: airline.code, label: airline.name })),
  departure_time: [
    { value: 'early_morning', label: 'Early Morning (12am - 6am)' },
    { value: 'morning', label: 'Morning (6am - 12pm)' },
    { value: 'afternoon', label: 'Afternoon (12pm - 6pm)' },
    { value: 'evening', label: 'Evening (6pm - 12am)' },
  ],
};

// Travel destinations images
export const DESTINATION_IMAGES = [
  'https://pixabay.com/get/gabe00d36b02b604a0d91cd9ad99e4758a3528b147c3bd57c2c54bdb9827b6bc66c96bd98c25b37d8ea29e43ac019dca7b2533a29f5a86b7fb2ae8a07e337431b_1280.jpg',
  'https://pixabay.com/get/gb0d76fc8743bd9ebfee0f5b6fdc9e45660ada4648510af890c1131da22fd783827783b7513652b972f4b9caba8c77af9e92dc24aac6e4cd85feedc97fd9b2e7a_1280.jpg',
  'https://pixabay.com/get/g80191ee35806a9aa9cd0ad402399378d21493057fa8cbfb9f1260215597f28b9aa1e1a3323dc0574346921e15a217b15af56163de8dfaa50dcd7cb62ba6c63a0_1280.jpg',
  'https://pixabay.com/get/g620fa07cb9a7b7491a8407fe0560fad4cd470544724686f9cdbd00883495d2d51152d7e4d07d05bb0eae410e3ef61a026b40ea3885dbea12c6b246177f097528_1280.jpg',
  'https://pixabay.com/get/g3d53bd5446a370e4a64bf100cdf0c21ada91e5b5f36bffff46de16be913853d1fb91776c257ef336b16e74ed89d186490febab666bf67c3e68155e2be7d88a19_1280.jpg',
  'https://pixabay.com/get/gcc813ebe7392320f6581a370bd96d4a98b24c9f342fd692a57284005b1e4363bf955e069a3c71406e4f408c59b84e5bafaf9896aaa3ac4dfcc63ce76cc86fb12_1280.jpg',
];

// Airline interior images
export const AIRLINE_INTERIOR_IMAGES = [
  'https://pixabay.com/get/g47ac479143b00f2bd824c7d3d13e818e1b8313c76e888f8db916db231fa07bcca55d5bea701e0bbe3f028d91b588c8d06d1815d1ca84ee88b7fd2b8a041baf91_1280.jpg',
  'https://pixabay.com/get/g1d61b6f7139f5f299dca29d08829369a0709e1437606908582fdd5c18c7b0f9e21bc70b133e43fa33511ac802e34bda4ad03f2f4647bb232b164d1f51237d093_1280.jpg',
  'https://pixabay.com/get/g5d2ce8c0c73c8e9b981a409ae6212536178f899ee3cb75281b6660b1d48a4a29b7c2c4e9585219a9a3029fa724960302097e90957e0d4b93faf6a2b6e2ada018_1280.jpg',
  'https://pixabay.com/get/g4422ab86eee317fbc2f652745be30077a2c4402bb697294350de279ed8341a7a27b7f4a26121d0d8220dab4719789ed888e7b1c8bee1df3fc99c1fcd310d3c0a_1280.jpg',
];

// Booking interface images
export const BOOKING_INTERFACE_IMAGES = [
  'https://pixabay.com/get/gbfc2b118f294605e815459da3bddbcc6fd5bf1c9440691bb24acaee018c01bb9f0b4ff0d52d2307c9ca241a34c57b8f818df5d79dbfaa467f6b34fa7b12e03cd_1280.jpg',
  'https://pixabay.com/get/g01cf18856f5358a41d0eaf21da548617794fccc712f93dcc8626b9e581d5c268a6323306b6bb759537f8c0004df141ffd5197e58fbc8fbe211fb5a7d9a661f62_1280.jpg',
  'https://pixabay.com/get/gc53dca8ef2d00579b673f275c3dae8448f24ff0e8e4225d1119ab3f2ed8f6619dbb0d5668731fc37a45d1088ef1a3c103c4bd41adfd498ebf148cfc7992dd4a9_1280.jpg',
];
