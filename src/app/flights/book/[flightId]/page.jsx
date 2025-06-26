'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import PassengerForm from '@/components/flight/PassengerForm';
import FlightSummaryCard from '@/components/flight/FlightSummaryCard';
import useStore from '@/lib/store';
import { Card, CardContent } from '@/components/ui/card';

export default function BookFlightPage() {
  const params = useParams();
  const router = useRouter();
  const { getRawFlightOfferByClientId, rawFlightOffers, setTravelers, selectedFare } = useStore();
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Wait until the rawFlightOffers have been loaded from storage
    if (rawFlightOffers.length === 0) {
      return;
    }

    const flightId = params.flightId;
    if (!flightId) {
      router.push('/agents/searchIndex');
      return;
    }
    const offer = getRawFlightOfferByClientId(flightId);
    if (!offer) {
      setError("The flight offer could not be found. It might have expired.");
      setLoading(false);
    } else {
      setFlight(offer);
      setLoading(false);
    }
  }, [params.flightId, getRawFlightOfferByClientId, router, rawFlightOffers]);

  const handleContinue = (bookingData) => {
    setTravelers(bookingData.travelers);
    router.push(`/flights/seat_selection/${params.flightId}`);
  };
  
  if (loading && rawFlightOffers.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="text-center p-6">
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Complete Your Booking</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <PassengerForm flight={flight} onSubmit={handleContinue} buttonLabel="Continue Booking" />
            </div>
            <div>
              <FlightSummaryCard flight={flight} selectedFare={selectedFare} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
