import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { formatDate, formatTime } from '@/lib/utils';

const TicketInvoiceViewer = ({ type, booking }) => {
  const handlePrint = () => {
    window.print();
  };

  if (!booking) {
    return <div>No booking data available</div>;
  }

  if (type === 'ticket') {
    return (
      <div className="print:m-0 print:p-0 print:shadow-none">
        <DialogHeader className="mb-4">
          <DialogTitle>E-Ticket / Booking Voucher</DialogTitle>
        </DialogHeader>

        {/* Print Controls - Hidden when printing */}
        <div className="print:hidden mb-4 flex justify-end">
          <Button onClick={handlePrint} variant="outline" className="gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1-2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Print Ticket
          </Button>
        </div>

        {/* Ticket Content */}
        <div className="border rounded-lg overflow-hidden bg-white shadow-sm print:shadow-none print:border-0">
          {/* Header Section */}
          <div className="p-4 border-b bg-gray-50 print:bg-transparent">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold mb-2">E-TICKET</h1>
                <p className="text-gray-600">Booking Date: {formatDate(booking.bookingDate)}</p>
                <p className="text-gray-600">Reference: {booking.refNo}</p>
                <p className="text-gray-600">PNR: {booking.pnr}</p>
              </div>
              <div className="flex items-center">
                <Image 
                  src="/assets/logo.svg" 
                  alt="FlightLogic" 
                  width={150} 
                  height={40}
                  className="print:brightness-0"
                />
              </div>
            </div>
          </div>

          {/* Flight Information */}
          <div className="p-4 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">Flight Details</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Airline:</span> {booking.airline}</p>
                  <p><span className="font-medium">Flight:</span> {booking.flightNumber}</p>
                  <p><span className="font-medium">Class:</span> {booking.class}</p>
                  <p><span className="font-medium">Status:</span> <Badge>{booking.status}</Badge></p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-2">Schedule</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Departure:</span> {formatDate(booking.departureDate)} {formatTime(booking.departureTime)}</p>
                  <p><span className="font-medium">From:</span> {booking.origin}</p>
                  <p><span className="font-medium">Arrival:</span> {formatDate(booking.arrivalDate)} {formatTime(booking.arrivalTime)}</p>
                  <p><span className="font-medium">To:</span> {booking.destination}</p>
                  <p><span className="font-medium">Duration:</span> {booking.duration}</p>
                </div>
              </div>
            </div>

            {/* Passenger Information */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Passenger Details</h3>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Name</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Passport</th>
                    <th className="text-left py-2">Passport Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {booking.passengers.map((passenger, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-2">{passenger.title} {passenger.firstName} {passenger.lastName}</td>
                      <td className="py-2">{passenger.type}</td>
                      <td className="py-2">{passenger.passport}</td>
                      <td className="py-2">{formatDate(passenger.passportExpiry)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Email:</span> {booking.contactInfo.email}</p>
                <p><span className="font-medium">Phone:</span> {booking.contactInfo.phone}</p>
                <p><span className="font-medium">Address:</span> {booking.contactInfo.address}</p>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-500 border-t pt-4 mt-6">
              <p>This is an electronic ticket. Please present a valid photo ID at check-in.</p>
              <p>Check-in counter closes 60 minutes before departure for international flights.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="print:m-0 print:p-0 print:shadow-none">
      <DialogHeader className="mb-4">
        <DialogTitle>Invoice</DialogTitle>
      </DialogHeader>

      {/* Print Controls - Hidden when printing */}
      <div className="print:hidden mb-4 flex justify-end">
        <Button onClick={handlePrint} variant="outline" className="gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1-2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          Print Invoice
        </Button>
      </div>

      {/* Invoice Content */}
      <div className="border rounded-lg overflow-hidden bg-white shadow-sm print:shadow-none print:border-0">
        {/* Header */}
        <div className="p-4 border-b bg-gray-50 print:bg-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold mb-2">INVOICE</h1>
              <p className="text-gray-600">Date: {formatDate(booking.bookingDate)}</p>
              <p className="text-gray-600">Invoice No: INV-{booking.refNo}</p>
            </div>
            <Image 
              src="/assets/logo.svg" 
              alt="FlightLogic" 
              width={150} 
              height={40}
              className="print:brightness-0"
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-6">
          {/* Customer Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <div className="space-y-1">
                <p>{booking.customerName}</p>
                <p>{booking.contactInfo.address}</p>
                <p>{booking.contactInfo.email}</p>
                <p>{booking.contactInfo.phone}</p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Payment Details:</h3>
              <div className="space-y-1">
                <p><span className="font-medium">Method:</span> {booking.paymentInfo.paymentMethod}</p>
                <p><span className="font-medium">Status:</span> {booking.paymentInfo.paymentStatus}</p>
                <p><span className="font-medium">Transaction ID:</span> {booking.paymentInfo.transactionId}</p>
              </div>
            </div>
          </div>

          {/* Flight Details */}
          <div>
            <h3 className="font-semibold mb-2">Flight Information:</h3>
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Description</th>
                  <th className="text-right py-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-2">
                    <p className="font-medium">{booking.airline} - Flight {booking.flightNumber}</p>
                    <p className="text-sm text-gray-600">
                      {booking.origin} to {booking.destination}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(booking.departureDate)} {formatTime(booking.departureTime)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {booking.passengers.length} Passenger(s) - {booking.class}
                    </p>
                  </td>
                  <td className="text-right py-2">
                    {booking.paymentInfo.currency} {booking.paymentInfo.breakdown.baseFare.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Taxes & Fees</td>
                  <td className="text-right py-2">
                    {booking.paymentInfo.currency} {booking.paymentInfo.breakdown.taxes.toFixed(2)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Service Charges</td>
                  <td className="text-right py-2">
                    {booking.paymentInfo.currency} {booking.paymentInfo.breakdown.fees.toFixed(2)}
                  </td>
                </tr>
                <tr className="font-bold">
                  <td className="py-2">Total Amount</td>
                  <td className="text-right py-2">
                    {booking.paymentInfo.currency} {booking.paymentInfo.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="text-sm text-gray-500 border-t pt-4 mt-6">
            <p>Thank you for your business!</p>
            <p>For any questions regarding this invoice, please contact our support team.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketInvoiceViewer;