import { NextResponse } from 'next/server';
import { generateBooking } from '@/lib/data';
import { generateBookingReference } from '@/lib/utils';

// Create a new booking
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Extract data from request body
    const { flight, passengers, contactInfo } = body;
    
    // Validate required fields
    if (!flight) {
      return NextResponse.json(
        { error: 'Flight details are required' },
        { status: 400 }
      );
    }
    
    if (!passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return NextResponse.json(
        { error: 'Passenger information is required' },
        { status: 400 }
      );
    }
    
    if (!contactInfo || !contactInfo.email || !contactInfo.phone) {
      return NextResponse.json(
        { error: 'Contact information is required' },
        { status: 400 }
      );
    }
    
    // Generate booking reference
    const bookingRef = generateBookingReference();
    
    // Create booking
    const booking = generateBooking(flight, passengers);
    
    // Add contact information
    booking.contactInfo = contactInfo;
    
    // In a real application, this would save to a database
    
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    );
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
