import { NextResponse } from 'next/server';
import { generateFlights, generateBooking } from '@/lib/data';

// Get booking by reference ID
export async function GET(request, { params }) {
  try {
    const bookingId = params.id;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would fetch the booking from a database
    // For this demo, we'll generate a mock booking based on the ID
    
    // Generate a sample flight to use for the booking
    const sampleFlights = generateFlights('JFK', 'LAX', '2023-07-15', '2023-07-22', 1);
    const flight = sampleFlights[0];
    
    // Create sample passenger data
    const passengers = [
      {
        title: 'Mr',
        firstName: 'John',
        lastName: 'Smith',
        dob: '1985-04-12',
        nationality: 'United States',
        passportNumber: 'US123456',
        passportExpiry: '2028-06-15',
      }
    ];
    
    // Generate booking with the flight and passenger data
    const booking = generateBooking(flight, passengers);
    
    // Set the booking reference to match the requested ID
    booking.bookingRef = bookingId;
    
    // Add contact information
    booking.contactInfo = {
      email: 'john.smith@example.com',
      phone: '+1 (123) 456-7890',
      address: '123 Main St, New York, NY 10001, USA'
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
    const bookingId = params.id;
    const body = await request.json();
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would update the booking in a database
    // For this demo, we'll just return the updated booking data
    
    // Merge the request body with some default booking data
    const updatedBooking = {
      bookingRef: bookingId,
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    return NextResponse.json(updatedBooking);
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// Cancel booking
export async function DELETE(request, { params }) {
  try {
    const bookingId = params.id;
    
    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }
    
    // In a real application, you would mark the booking as cancelled in a database
    // For this demo, we'll just return a success message
    
    return NextResponse.json({
      success: true,
      message: `Booking ${bookingId} has been cancelled successfully`,
      cancellationTime: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
