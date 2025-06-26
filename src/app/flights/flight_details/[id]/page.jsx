'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import FlightDetailsCard from '@/components/flight/FlightDetailsCard';
import FlightSummaryCard from '@/components/flight/FlightSummaryCard';
import FareOptions from '@/components/flight/FareOptions';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AIRLINE_INTERIOR_IMAGES } from '@/lib/constants';
import useStore from '@/lib/store';

export default function FlightDetails() {
  const params = useParams();
  const router = useRouter();
  const { getRawFlightOfferByClientId, rawFlightOffers, selectedFare, setSelectedFare } = useStore();
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (rawFlightOffers.length === 0) {
      return;
    }

    const clientId = params.id;
    
    if (!clientId) {
      router.push('/agents/searchIndex');
      return;
    }
    
    const rawOffer = getRawFlightOfferByClientId(clientId);

    if (!rawOffer) {
      setError("The flight offer could not be found. It might have expired. Please search again.");
      setLoading(false);
      return;
    }
    
    const verifyPriceAndSetFlight = async () => {
      try {
        const res = await fetch(`/api/flights/verify`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ flightOffer: rawOffer })
        });

        if (!res.ok) {
          const errorData = await res.json();
          const detail = errorData?.error?.errors?.[0]?.detail || errorData.message || "Price verification failed. The offer may have expired.";
          throw new Error(detail);
        }

        const verifiedFlightData = await res.json();
        
        if (!verifiedFlightData.data?.flightOffers?.[0]) {
            throw new Error('Could not retrieve confirmed flight details. The offer may have expired.');
        }

        const flightData = verifiedFlightData.data.flightOffers[0];
        
        setFlight(flightData);

        const fareName = flightData.travelerPricings?.[0]?.fareDetailsBySegment?.[0]?.brandedFare || 'STANDARD';
        
        setSelectedFare({
            name: fareName,
            price: flightData.price.total,
        });

      } catch (err) {
        console.error("Flight verification error:", err);
        setError(err.message || 'An error occurred during price verification.');
      } finally {
        setLoading(false);
      }
    };
    
    verifyPriceAndSetFlight();

  }, [params.id, getRawFlightOfferByClientId, router, rawFlightOffers, setSelectedFare]);
  
  const handleSelectFare = (fare) => {
      setSelectedFare(fare);
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Verifying flight details and availability...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
          <Card className="max-w-md w-full text-center p-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Flight</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link href="/agents/searchIndex">
              <Button variant="primary">Search Again</Button>
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
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href="/flights/flight_search" className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Search Results
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <FlightDetailsCard flight={flight} />
              <FareOptions flightOffer={flight} selectedFare={selectedFare?.name} onSelectFare={handleSelectFare} />
            </div>
            
            <div className="space-y-6">
              <FlightSummaryCard 
                flight={flight} 
                selectedFare={selectedFare}
                onBook={() => router.push(`/flights/book/${params.id}`)} 
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
