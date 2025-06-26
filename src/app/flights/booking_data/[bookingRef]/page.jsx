'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime, formatDuration, formatPrice } from '@/lib/utils';
import useStore from '@/lib/store';

// A modern, timeline-style component for displaying a flight segment
const SegmentDetail = ({ segment, dictionary, isLast }) => {
  return (
    <div className="relative pl-8 py-2">
      {/* Vertical line connecting segments */}
      {!isLast && <div className="absolute left-4 top-5 h-full w-0.5 bg-gray-200"></div>}
      
      {/* Dot on the timeline */}
      <div className="absolute left-4 top-5 -ml-2 h-4 w-4 rounded-full bg-primary ring-4 ring-white dark:ring-gray-900"></div>
      
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{formatTime(segment.departure.at)} - {segment.departure.iataCode}</p>
          <p className="text-sm text-gray-500">{formatDate(segment.departure.at, 'eeee, MMM d')}</p>
        </div>
        <div className="text-center px-4">
          <p className="text-sm font-semibold text-primary">{formatDuration(segment.duration)}</p>
          <p className="text-xs text-gray-400">{segment.carrierCode} {segment.number}</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-lg">{formatTime(segment.arrival.at)} - {segment.arrival.iataCode}</p>
          <p className="text-sm text-gray-500">{formatDate(segment.arrival.at, 'eeee, MMM d')}</p>
        </div>
      </div>
    </div>
  );
};

// Component to display a full itinerary (e.g., outbound or return)
const ItineraryDetails = ({ itinerary, title, dictionary }) => (
  <div className="mb-8">
    <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">{title}</h3>
    <div className="space-y-4">
      {itinerary.segments.map((segment, index) => (
        <SegmentDetail 
          key={segment.id} 
          segment={segment}
          dictionary={dictionary} 
          isLast={index === itinerary.segments.length - 1} 
        />
      ))}
    </div>
  </div>
);

export default function BookingData() {
  const params = useParams();
  const router = useRouter();
  const { getBookingByRef, currentBooking, selectedFare } = useStore();
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!params.bookingRef) {
      router.push('/agents/dashboard');
      return;
    }
    if (currentBooking && currentBooking.data?.associatedRecords?.[0]?.reference === params.bookingRef) {
      setBooking(currentBooking);
      setLoading(false);
      return;
    }
    const bookingDetails = getBookingByRef(params.bookingRef);
      if (bookingDetails) {
        setBooking(bookingDetails);
      }
      setLoading(false);
  }, [params.bookingRef, getBookingByRef, router, currentBooking]);
  
  const downloadETicket = () => {
    window.print();
  };
  
  const sendEmailConfirmation = () => {
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
  
  if (!booking || !booking.data) {
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

  const { data: bookingData, warnings, dictionaries } = booking;
  const flightOffer = bookingData.flightOffers[0];
  const pnr = bookingData.associatedRecords[0]?.reference;
  const bookingDate = bookingData.associatedRecords[0]?.creationDate;
  const issuingAgent = bookingData.contacts[0]?.companyName;
  const dummyTicketNumber = `157-${pnr?.slice(0, 4)}-${Math.floor(100000 + Math.random() * 900000)}`;
  
  // Determine the price and fare name to display, prioritizing the user's selection
  const displayFare = selectedFare || { 
      name: flightOffer.travelerPricings[0].fareDetailsBySegment[0].brandedFare || 'STANDARD',
      price: flightOffer.price.grandTotal 
  };
  const displayPrice = displayFare.price;
  const currency = flightOffer.price.currency;
  // Approximate the base fare and taxes if a custom fare was selected
  const baseFare = selectedFare ? (parseFloat(displayPrice) / 1.2).toFixed(2) : flightOffer.price.base;
  const taxes = (parseFloat(displayPrice) - parseFloat(baseFare)).toFixed(2);
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 print:bg-white">
      <div className="print:hidden">
      <Header />
      </div>
      
      <main className="flex-grow p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <div className="print:hidden">
            {warnings && warnings.length > 0 && (
            <Alert variant="warning" className="mb-4">
              <AlertDescription>
                  {warnings.map((w, i) => (
                  <div key={i}><b>{w.title}:</b> {w.detail}</div>
                ))}
              </AlertDescription>
            </Alert>
          )}
          
          <div className="mb-6">
            <Link href="/agents/dashboard" className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Dashboard
            </Link>
            </div>
          </div>
          
          <Card className="shadow-lg print:shadow-none">
            <CardHeader className="bg-gray-50 print:bg-white border-b p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                   <Image src="/assets/logo.svg" alt="Company Logo" width={40} height={40} className="mr-4" />
                   <div>
                     <CardTitle className="text-2xl font-bold text-gray-900">E-Ticket & Itinerary</CardTitle>
                     <div className="flex items-center space-x-2">
                        {issuingAgent && <p className="text-sm text-gray-500">Issued by: {issuingAgent}</p>}
                        <Badge variant="outline">{displayFare.name}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-left md:text-right">
                  <div className="mb-2">
                    <span className="text-sm text-gray-500 block">PNR</span>
                    <p className="font-mono text-lg font-bold">{pnr}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block">Ticket Number</span>
                    <p className="font-mono text-lg font-bold">{dummyTicketNumber}</p>
                          </div>
                        </div>
                      </div>
              <div className="text-sm text-gray-500 mt-4">
                 Booked on: {formatDate(bookingDate, 'eeee, MMM d, yyyy')}
                    </div>
            </CardHeader>
            <CardContent className="p-6">
              {/* Itinerary */}
              {flightOffer.itineraries.map((itinerary, index) => (
                <ItineraryDetails
                  key={index}
                  itinerary={itinerary}
                  title={index === 0 ? 'Outbound Journey' : 'Return Journey'}
                  dictionary={dictionaries.locations}
                />
              ))}

              <Separator className="my-8" />

              {/* Passengers */}
              <h3 className="text-xl font-bold text-gray-800 mb-4">Passengers</h3>
              <div className="overflow-x-auto border rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Passport</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                    {bookingData.travelers.map((traveler, index) => (
                      <tr key={traveler.id}>
                        <td className="px-6 py-4 whitespace-nowrap font-medium">{traveler.name.firstName} {traveler.name.lastName}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{flightOffer.travelerPricings[index].travelerType}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{traveler.documents[0].number}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">{traveler.contact.emailAddress}</td>
                            </tr>
                    ))}
                      </tbody>
                    </table>
              </div>

              <Separator className="my-8" />

              {/* Fare, Baggage & Rules */}
              <h3 className="text-xl font-bold text-gray-800 mb-4">Fare, Baggage & Rules</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Fare Breakdown */}
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Fare Breakdown</h4>
                  <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                    <div className="flex justify-between"><span>Base Fare:</span> <span>{formatPrice(baseFare, currency)}</span></div>
                    <div className="flex justify-between"><span>Taxes & Fees:</span> <span>{formatPrice(taxes, currency)}</span></div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg"><span>Grand Total:</span> <span>{formatPrice(displayPrice, currency)}</span></div>
                  </div>
                </div>
                {/* Baggage & Fare Details */}
                <div>
                  <h4 className="font-semibold mb-2 text-gray-700">Baggage & Fare Type</h4>
                  <div className="border rounded-lg p-4 space-y-2 bg-gray-50">
                    {flightOffer.travelerPricings[0].fareDetailsBySegment.map(fare => (
                      <div key={fare.segmentId} className="flex justify-between items-center text-sm">
                        <span>Segment {fare.segmentId} ({fare.cabin}):</span>
                        <div className="flex items-center space-x-2">
                           <Badge variant="outline">{fare.brandedFare || 'STANDARD'}</Badge>
                           <Badge variant="secondary">{fare.includedCheckedBags.quantity || 0} checked bag(s)</Badge>
                      </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Important Notices */}
              {warnings && warnings.length > 0 && (
                <>
                  <Separator className="my-8" />
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Important Notices</h3>
                  <Alert variant="warning">
                    <AlertDescription>
                      {warnings.map((w, i) => (
                        <div key={i}><b>{w.title}:</b> {w.detail}</div>
                      ))}
                    </AlertDescription>
                  </Alert>
                </>
              )}

              {/* General Conditions */}
              <div className="mt-8 pt-6 border-t print:mt-4">
                 <h3 className="text-lg font-bold text-gray-800 mb-2">General Conditions</h3>
                 <ul className="list-disc list-inside text-xs text-gray-500 space-y-1">
                    <li>All times shown are local to the respective airports.</li>
                    <li>Check-in counters close 60 minutes prior to departure. Online check-in is recommended.</li>
                    <li>A valid government-issued photo ID or passport is required for all travelers.</li>
                    <li>Fares are not guaranteed until ticketed. Changes may be subject to fees and fare differences.</li>
                    <li>For detailed fare rules and baggage policies, please contact the issuing agency.</li>
                 </ul>
              </div>

              </CardContent>

            <CardFooter className="flex flex-col md:flex-row gap-4 border-t p-6 bg-gray-50 print:hidden">
                <Button variant="outline" className="flex-1" onClick={downloadETicket}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                Print / Download E-Ticket
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
        </div>
      </main>
      
      <div className="print:hidden">
      <Footer />
      </div>
    </div>
  );
}