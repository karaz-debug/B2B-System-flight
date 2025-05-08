import { NextResponse } from 'next/server';
import { generateFlights } from '@/lib/data';

// Get booking by reference ID
export async function GET(request, { params }) {
  try {
    const bookingId = params.id;
    
    // Generate some sample flight data
    const flights = generateFlights();
    const flight = flights[0]; // Use first flight as example
    
    // Sample passenger data
    const passengers = [
      {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Smith',
        type: 'ADT',
        dob: '1990-01-01',
        passport: 'P1234567',
        passportExpiry: '2028-06-15',
      }
    ];
    
    // Generate booking data
    const booking = {
      id: bookingId,
      pnr: 'ABC123',
      refNo: 'FL' + bookingId,
      bookingDate: new Date().toISOString(),
      status: 'confirmed',
      
      // Flight details
      airline: flight.airline,
      flightNumber: flight.flightNumber,
      origin: flight.origin,
      destination: flight.destination,
      departureDate: flight.departureDate,
      departureTime: flight.departureTime,
      arrivalDate: flight.arrivalDate,
      arrivalTime: flight.arrivalTime,
      duration: flight.duration,
      class: 'Economy',
      
      // Passenger information
      passengers,
      customerName: `${passengers[0].firstName} ${passengers[0].lastName}`,
      
      // Contact information
      contactInfo: {
        email: 'john.smith@example.com',
        phone: '+1 (123) 456-7890',
        address: '123 Main St, New York, NY 10001, USA'
      },
      
      // Payment information
      paymentInfo: {
        total: 899.99,
        currency: 'USD',
        breakdown: {
          baseFare: 750.00,
          taxes: 99.99,
          fees: 50.00
        },
        paymentMethod: 'Credit Card',
        paymentStatus: 'Paid',
        transactionId: 'TXN' + Math.random().toString(36).substr(2, 9)
      }
    };
    
    return NextResponse.json(booking);
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Failed to fetch booking details' },
      { status: 500 }
    );
  }
}

// Update booking
export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    // Update logic would go here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// Cancel booking
export async function DELETE(request, { params }) {
  try {
    // Cancellation logic would go here
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
