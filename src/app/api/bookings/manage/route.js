import { NextResponse } from 'next/server';

// Update booking status
export async function PUT(request) {
  try {
    const body = await request.json();
    const { bookingId, action, reason } = body;

    if (!bookingId || !action) {
      return NextResponse.json(
        { error: 'Booking ID and action are required' },
        { status: 400 }
      );
    }

    // In a real application, you would update the booking status in a database
    // For this demo, we'll just return a success response
    let response;
    switch (action) {
      case 'cancel':
        response = {
          success: true,
          message: 'Booking cancelled successfully',
          status: 'cancelled',
          cancellationTime: new Date().toISOString(),
          cancellationReason: reason
        };
        break;
      case 'refund':
        response = {
          success: true,
          message: 'Refund initiated successfully',
          status: 'refund_pending',
          refundTime: new Date().toISOString()
        };
        break;
      case 'reissue':
        response = {
          success: true,
          message: 'Ticket reissued successfully',
          status: 'confirmed',
          reissueTime: new Date().toISOString()
        };
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error managing booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking action' },
      { status: 500 }
    );
  }
}