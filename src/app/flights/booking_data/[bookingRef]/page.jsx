'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDate, formatTime, formatDuration, formatPrice } from '@/lib/utils';
import useStore from '@/lib/store';

export default function BookingData() {
  const params = useParams();
  const router = useRouter();
  const { getBookingByRef } = useStore();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!params.bookingRef) {
      router.push('/agents/dashboard');
      return;
    }
    
    // Get booking details
    const bookingDetails = getBookingByRef(params.bookingRef);
    
    // Simulate API request delay
    setTimeout(() => {
      if (bookingDetails) {
        setBooking(bookingDetails);
      }
      setLoading(false);
    }, 1000);
  }, [params.bookingRef, getBookingByRef, router]);
  
  const downloadETicket = () => {
    // In a real app, this would trigger a PDF download
    alert('E-Ticket download functionality would be implemented here.');
  };
  
  const sendEmailConfirmation = () => {
    // In a real app, this would send an email confirmation
    alert('Email confirmation would be sent here.');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking details...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
          <Card className="max-w-md w-full text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Not Found</h2>
            <p className="text-gray-600 mb-6">
              The booking reference you entered doesn't exist or has been removed.
            </p>
            <Link href="/agents/dashboard">
              <Button variant="primary">Return to Dashboard</Button>
            </Link>
          </Card>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <Link href="/agents/dashboard" className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          
          <div className="grid gap-6">
            <Card>
              <CardHeader className="bg-primary/5 border-b border-primary/10">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-xl font-bold text-gray-900">Booking Confirmation</CardTitle>
                  <div className="mt-2 md:mt-0 flex items-center space-x-2">
                    <Badge variant="default">Confirmed</Badge>
                    <span className="text-sm font-medium">Booking Ref: {booking.bookingRef}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Booking Successful</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Your booking has been confirmed. Below is your booking information.</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Flight Details */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Flight Details</h3>
                  
                  <div className="bg-gray-50 rounded-md p-4 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                      <div className="md:col-span-3">
                        <div className="text-sm text-gray-500">Airline</div>
                        <div className="font-medium">{booking.flight.airline}</div>
                        <div className="text-sm text-gray-600">{booking.flight.flightNumber}</div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className="text-sm text-gray-500">From</div>
                        <div className="font-medium">{booking.flight.from}</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(booking.flight.departureDate)} • {formatTime(booking.flight.departureTime)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className="text-sm text-gray-500">To</div>
                        <div className="font-medium">{booking.flight.to}</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(booking.flight.departureDate)} • {formatTime(booking.flight.arrivalTime)}
                        </div>
                      </div>
                      
                      <div className="md:col-span-3">
                        <div className="text-sm text-gray-500">Duration</div>
                        <div className="font-medium">{formatDuration(booking.flight.duration)}</div>
                        <div className="text-sm text-gray-600">
                          {booking.flight.stops === 0 
                            ? 'Direct Flight' 
                            : `${booking.flight.stops} ${booking.flight.stops === 1 ? 'Stop' : 'Stops'}`}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {booking.flight.returnFlight && (
                    <div className="bg-gray-50 rounded-md p-4">
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-3">
                          <div className="text-sm text-gray-500">Return Airline</div>
                          <div className="font-medium">{booking.flight.airline}</div>
                          <div className="text-sm text-gray-600">{booking.flight.returnFlight.flightNumber}</div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <div className="text-sm text-gray-500">From</div>
                          <div className="font-medium">{booking.flight.to}</div>
                          <div className="text-sm text-gray-600">
                            {formatDate(booking.flight.returnDate)} • {formatTime(booking.flight.returnFlight.departureTime)}
                          </div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <div className="text-sm text-gray-500">To</div>
                          <div className="font-medium">{booking.flight.from}</div>
                          <div className="text-sm text-gray-600">
                            {formatDate(booking.flight.returnDate)} • {formatTime(booking.flight.returnFlight.arrivalTime)}
                          </div>
                        </div>
                        
                        <div className="md:col-span-3">
                          <div className="text-sm text-gray-500">Duration</div>
                          <div className="font-medium">{formatDuration(booking.flight.returnFlight.duration)}</div>
                          <div className="text-sm text-gray-600">
                            {booking.flight.returnFlight.stops === 0 
                              ? 'Direct Flight' 
                              : `${booking.flight.returnFlight.stops} ${booking.flight.returnFlight.stops === 1 ? 'Stop' : 'Stops'}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Passenger Information */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Passenger Information</h3>
                  
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Name
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Seat
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {booking.passengers.map((passenger, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {passenger.title} {passenger.firstName} {passenger.lastName}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">Adult</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">Not Assigned</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  
                  <div className="bg-gray-50 rounded-md p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Payment Status</div>
                        <div className="font-medium text-green-600">Confirmed</div>
                        <div className="text-sm text-gray-600">
                          {new Date(booking.payment.timestamp).toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-sm text-gray-500">Payment Method</div>
                        <div className="font-medium">Credit Card</div>
                        <div className="text-sm text-gray-600">xxxx-xxxx-xxxx-1234</div>
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Base Fare:</span>
                        <span className="text-sm">{formatPrice(booking.payment.basePrice)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">Taxes & Fees:</span>
                        <span className="text-sm">{formatPrice(booking.payment.taxes + booking.payment.fees)}</span>
                      </div>
                      <div className="flex justify-between font-medium">
                        <span>Total:</span>
                        <span>{formatPrice(booking.payment.totalPrice)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col md:flex-row gap-4 border-t">
                <Button variant="outline" className="flex-1" onClick={downloadETicket}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download E-Ticket
                </Button>
                <Button variant="outline" className="flex-1" onClick={sendEmailConfirmation}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Confirmation
                </Button>
                <Link href="/agents/dashboard" className="flex-1">
                  <Button variant="primary" className="w-full">
                    Return to Dashboard
                  </Button>
                </Link>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-900">Contact our support team</h3>
                      <p className="text-gray-600 mt-1">Need to make changes or have questions about this booking?</p>
                    </div>
                    <div className="flex space-x-4">
                      <Button variant="outline" className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Call Support
                      </Button>
                      <Button variant="primary" className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                        Live Chat
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
