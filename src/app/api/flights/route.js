import { NextResponse } from 'next/server';
import { generateFlights } from '@/lib/data';

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
  
  // Validate required parameters
  if (!origin || !destination || !departureDate) {
    return NextResponse.json(
      { error: 'Missing required parameters: origin, destination, departureDate' },
      { status: 400 }
    );
  }
  
  try {
    // Generate flights based on search criteria
    const totalPassengers = adults + children + infants;
    const flights = generateFlights(origin, destination, departureDate, returnDate, totalPassengers);
    
    return NextResponse.json(flights);
  } catch (error) {
    console.error('Error generating flights:', error);
    return NextResponse.json(
      { error: 'Failed to generate flights' },
      { status: 500 }
    );
  }
}
