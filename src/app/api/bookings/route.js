import { NextResponse } from 'next/server';
import { generateBooking } from '@/lib/data';
import { generateBookingReference } from '@/lib/utils';
import amadeus from '@/lib/services/amadeusService';

// Create a new booking
export async function POST(request) {
  const { flightOffer, travelers, contacts } = await request.json();

  if (!flightOffer || !travelers || travelers.length === 0) {
    return NextResponse.json({ message: 'Missing required booking data' }, { status: 400 });
  }

  // Sanitize travelers for Amadeus API
  function sanitizeTravelers(travelers) {
    return travelers.map(traveler => ({
      ...traveler,
      contact: traveler.contact ? {
        ...traveler.contact,
        phones: (traveler.contact.phones || []).map(phone => ({
          ...phone,
          countryCallingCode: String(phone.countryCallingCode || '').replace(/[^0-9]/g, '')
        }))
      } : undefined,
      documents: (traveler.documents || []).map(doc => ({
        ...doc,
        issuanceCountry: doc.issuanceCountry ? doc.issuanceCountry.toUpperCase() : '',
        nationality: doc.nationality ? doc.nationality.toUpperCase() : ''
      }))
    }));
  }

  const sanitizedTravelers = sanitizeTravelers(travelers);

  // Construct the order payload for Amadeus
  const orderPayload = {
    data: {
      type: 'flight-order',
      flightOffers: [flightOffer],
      travelers: sanitizedTravelers,
      remarks: {
        general: [
          {
            subType: "GENERAL_MISCELLANEOUS",
            text: "B2B AGENT BOOKING"
          }
        ]
      },
      ticketingAgreement: {
        option: "DELAY_TO_CANCEL",
        delay: "6D"
      },
      // Example contact, in a real app this would be dynamic
      contacts: contacts || [
        {
          addresseeName: {
            firstName: "PABLO",
            lastName: "RODRIGUEZ"
          },
          companyName: "INCREIBLE VIAJES",
          purpose: "STANDARD",
          phones: [
            {
              deviceType: "LANDLINE",
              countryCallingCode: "34",
              number: "480080071"
            },
            {
              deviceType: "MOBILE",
              countryCallingCode: "33",
              number: "480080072"
            }
          ],
          emailAddress: "support@increibleviajes.es",
          address: {
            lines: [
              "Calle Prado, 16"
            ],
            postalCode: "28014",
            cityName: "Madrid",
            countryCode: "ES"
          }
        }
      ]
    }
  };

  try {
    const bookingResponse = await amadeus.createOrder(orderPayload);
    console.log('Amadeus Booking API Success Response:', JSON.stringify(bookingResponse, null, 2));
    return NextResponse.json(bookingResponse, { status: 201 });
  } catch (error) {
    console.error('Amadeus Booking API Error:', error.message, error.response?.data || error);
    return NextResponse.json({ message: 'Error creating flight order', error: error.message }, { status: 500 });
  }
}

// Get all bookings (for agent dashboard)
export async function GET(request) {
  try {
    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const agentId = searchParams.get('agentId');
    
    // In a real application, this would fetch bookings from a database
    // filtered by the agent ID if provided
    
    // Create some mock booking data for demonstration
    const bookings = [
      { 
        bookingRef: 'TRP123456', 
        customerName: 'John Smith',
        destination: 'New York (JFK)',
        departureDate: '2023-07-15',
        amount: 745.00,
        status: 'confirmed'
      },
      { 
        bookingRef: 'TRP123457',
        customerName: 'Jane Doe',
        destination: 'London (LHR)',
        departureDate: '2023-07-18',
        amount: 1250.00,
        status: 'pending'
      },
      { 
        bookingRef: 'TRP123458',
        customerName: 'Michael Johnson',
        destination: 'Dubai (DXB)',
        departureDate: '2023-07-20',
        amount: 1875.00,
        status: 'confirmed'
      },
      { 
        bookingRef: 'TRP123459',
        customerName: 'Emily Williams',
        destination: 'Paris (CDG)',
        departureDate: '2023-07-22',
        amount: 1100.00,
        status: 'cancelled'
      }
    ];
    
    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}
