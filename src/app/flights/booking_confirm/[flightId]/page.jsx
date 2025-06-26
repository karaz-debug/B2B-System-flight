'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import useStore from '@/lib/store';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import BookingSummary from '@/components/flight/BookingSummary';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { mapAmadeusOfferToFlight } from '@/lib/store';

export default function BookingConfirm() {
  const params = useParams();
  const router = useRouter();
  const { getRawFlightOfferByClientId, travelers, setCurrentBooking, selectedFare, seatSelection } = useStore();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const flight = getRawFlightOfferByClientId(params.flightId);
  const mappedFlight = flight ? mapAmadeusOfferToFlight(flight) : null;

  if (!flight || !travelers || travelers.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <Card className="p-6 text-center">
            <CardContent>
              <p className="text-red-600">Missing booking information. Please start your booking again.</p>
              <Button className="mt-4" onClick={() => router.push('/agents/searchIndex')}>Back to Search</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const handleConfirmBooking = async () => {
    setLoading(true);
    setError('');

    // Create a deep copy to avoid mutating the object in the store
    const flightOfferForBooking = JSON.parse(JSON.stringify(flight));

    // If a fare was selected, update the price in the copied flight offer.
    if (selectedFare) {
      flightOfferForBooking.price.total = selectedFare.price;
      flightOfferForBooking.price.grandTotal = selectedFare.price;
    }

    const bookingData = {
      flightOffer: flightOfferForBooking, // Use the updated flight offer
      travelers: travelers,
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      const result = await res.json();

      if (!res.ok) {
        let errorMessage = result.message || 'An unknown error occurred during booking.';
        if (result.error) {
          try {
            const amadeusErrorString = result.error.replace('Amadeus API error: ', '');
            const amadeusError = JSON.parse(amadeusErrorString);
            if (amadeusError.errors && amadeusError.errors.length > 0) {
              const firstError = amadeusError.errors[0];
              errorMessage = `${firstError.title}: ${firstError.detail}`;
            }
          } catch (e) {
            errorMessage = result.error;
          }
        }
        throw new Error(errorMessage);
      }

      setCurrentBooking(result);
      const pnr = result.data.associatedRecords[0]?.reference;
      router.push(`/flights/booking_data/${pnr || result.data.id}`);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">Review and Confirm Your Booking</h1>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="mb-8">
            <BookingSummary flight={mappedFlight} selectedFare={selectedFare} />
          </div>
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Passenger Details</CardTitle>
            </CardHeader>
            <CardContent>
              {travelers.map((traveler, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-4 mb-4 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="col-span-2">
                    <div className="font-semibold">{traveler.name.firstName} {traveler.name.lastName}</div>
                    <div className="text-sm text-gray-500">{traveler.contact.emailAddress}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Seat</div>
                    <div className="text-lg font-mono text-primary">{seatSelection[traveler.id] || 'N/A'}</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button variant="primary" size="lg" onClick={handleConfirmBooking} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Booking'}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 