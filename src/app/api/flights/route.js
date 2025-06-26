import { NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeusService';

export async function GET(request) {
  // Parse query parameters
  const { searchParams } = new URL(request.url);
  const origin = searchParams.get('origin');
  const destination = searchParams.get('destination');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
  const adults = parseInt(searchParams.get('adults') || '1');
  const children = parseInt(searchParams.get('children') || '0');
  const infants = parseInt(searchParams.get('infants') || '0');
  const cabinClass = searchParams.get('cabinClass') || 'ECONOMY';
  
  // Validate required parameters
  if (!origin || !destination || !departureDate) {
    return NextResponse.json(
      { error: 'Missing required parameters: origin, destination, departureDate' },
      { status: 400 }
    );
  }
  
  try {
    // Call Amadeus API for flight search
    const params = {
      originLocationCode: origin,
      destinationLocationCode: destination,
      departureDate,
      returnDate,
      adults,
      children,
      infants,
      travelClass: cabinClass.toUpperCase(),
      currencyCode: 'USD',
      nonStop: false,
      max: 20
    };
    const flights = await amadeusService.searchFlights(params);
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error searching flights:', error);
    return NextResponse.json(
      { error: 'Failed to search flights', details: error.message },
      { status: 500 }
    );
  }
}
