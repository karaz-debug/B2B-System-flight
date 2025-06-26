import { NextResponse } from 'next/server';
import { generateFlights } from '@/lib/data';
import amadeusService from '@/lib/services/amadeusService';
import amadeus from '@/lib/services/amadeusService';

// This is a mock API endpoint that simulates fetching flight by ID
export async function GET(request, { params }) {
  try {
    const flightId = params.id;
    
    if (!flightId) {
      return NextResponse.json(
        { error: 'Flight ID is required' },
        { status: 400 }
      );
    }
    
    // In a real app, you would fetch the specific flight from a database
    // Here we'll generate some mock data and find a flight with the matching ID
    
    // Generate some sample flights
    const sampleFlights = generateFlights('JFK', 'LAX', '2023-07-15', '2023-07-22', 1);
    
    // Mock finding a flight by ID
    // In reality, this would be a lookup in a database
    const flight = sampleFlights.find(f => f.id === flightId) || {
      id: flightId,
      from: 'JFK',
      to: 'LAX',
      departureDate: '2023-07-15',
      departureTime: '10:00',
      arrivalTime: '13:15',
      duration: 195,
      price: 450,
      airline: 'American Airlines',
      flightNumber: 'AA1234',
      stops: 0,
      aircraft: 'Boeing 737-800',
      returnFlight: {
        departureDate: '2023-07-22',
        departureTime: '14:30',
        arrivalTime: '17:45',
        duration: 195,
        airline: 'American Airlines',
        flightNumber: 'AA4321',
        stops: 0,
        aircraft: 'Boeing 737-800',
      }
    };
    
    return NextResponse.json(flight);
  } catch (error) {
    console.error('Error fetching flight:', error);
    return NextResponse.json(
      { error: 'Failed to fetch flight details' },
      { status: 500 }
    );
  }
}

export async function POST(request, { params }) {
  const { flightOffer } = await request.json();
  
  if (!flightOffer) {
    return NextResponse.json({ message: 'Missing flight offer data' }, { status: 400 });
  }

  try {
    const confirmedPriceData = await amadeus.getFlightPrice({
      data: {
        type: 'flight-offers-pricing',
        flightOffers: [flightOffer],
      },
    });
    return NextResponse.json(confirmedPriceData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error confirming flight price', error: error.message }, { status: 500 });
  }
}
