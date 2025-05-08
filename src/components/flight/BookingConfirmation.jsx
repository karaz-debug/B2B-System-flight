import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatDate, formatPrice, formatTime } from '@/lib/utils';

const BookingConfirmation = ({ booking, onDownloadTicket, onSendEmail, onCancel }) => {
  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      cancelled: 'error',
      refund_requested: 'warning',
      refund_approved: 'success',
      refund_rejected: 'error'
    };
    return (
      <Badge variant={variants[status] || 'default'}>
        {status.replace('_', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Booking Status */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Booking Reference</p>
            <h1 className="text-2xl font-bold">{booking.id}</h1>
          </div>
          {getStatusBadge(booking.status)}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Booked By</p>
              <p className="font-medium">{booking.customerName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Booking Date</p>
              <p className="font-medium">{formatDate(booking.bookingDate)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Flight Details */}
      <Card>
        <CardHeader>
          <CardTitle>Flight Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Airline</p>
                <p className="font-medium">{booking.airline}</p>
                <p className="text-sm text-gray-500">{booking.flightNumber}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Class</p>
                <p className="font-medium">{booking.class}</p>
              </div>
            </div>

            <div className="relative flex items-center">
              <div className="flex-1">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">{formatTime(booking.departureTime)}</p>
                  <p className="text-sm text-gray-500">{formatDate(booking.departureDate)}</p>
                  <p className="font-medium mt-1">{booking.origin}</p>
                </div>
              </div>

              <div className="flex-shrink-0 px-8">
                <div className="relative">
                  <div className="h-0.5 w-24 bg-gray-300"></div>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary absolute -top-2.5 left-1/2 transform -translate-x-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              <div className="flex-1">
                <div className="text-center mb-4">
                  <p className="text-2xl font-bold">{formatTime(booking.arrivalTime)}</p>
                  <p className="text-sm text-gray-500">{formatDate(booking.arrivalDate)}</p>
                  <p className="font-medium mt-1">{booking.destination}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Passenger Details */}
      <Card>
        <CardHeader>
          <CardTitle>Passenger Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {booking.passengers.map((passenger, index) => (
              <div key={index} className={index > 0 ? 'pt-4 border-t' : ''}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {passenger.title} {passenger.firstName} {passenger.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{formatDate(passenger.dob)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Passport Number</p>
                    <p className="font-medium">{passenger.passportNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Nationality</p>
                    <p className="font-medium">{passenger.nationality}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{booking.contactInfo.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <p className="font-medium">{booking.contactInfo.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Address</p>
              <p className="font-medium">{booking.contactInfo.address}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between">
              <p className="text-gray-600">Base Fare</p>
              <p className="font-medium">{formatPrice(booking.paymentInfo.breakdown.baseFare)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Taxes</p>
              <p className="font-medium">{formatPrice(booking.paymentInfo.breakdown.taxes)}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">Fees</p>
              <p className="font-medium">{formatPrice(booking.paymentInfo.breakdown.fees)}</p>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between">
                <p className="font-semibold">Total Amount</p>
                <p className="font-bold text-primary">{formatPrice(booking.paymentInfo.total)}</p>
              </div>
            </div>
            <div className="pt-4">
              <Badge variant="outline" className="w-full justify-center">
                {booking.paymentInfo.status === 'paid' ? 'PAID' : 'PENDING'}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="space-y-3">
        <Button variant="primary" className="w-full" onClick={onDownloadTicket}>
          Download E-Ticket
        </Button>
        <Button variant="outline" className="w-full" onClick={onSendEmail}>
          Send to Email
        </Button>
        {booking.status !== 'cancelled' && (
          <Button variant="outline" className="w-full text-red-600 hover:text-red-700" onClick={onCancel}>
            Cancel Booking
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingConfirmation;