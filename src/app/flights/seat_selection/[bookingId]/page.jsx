'use client';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import FlightSummaryCard from '@/components/flight/FlightSummaryCard';
import SeatMap from '@/components/flight/SeatMap';
import useStore from '@/lib/store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function SeatSelectionPage() {
  const router = useRouter();
  const params = useParams();
  const { travelers, getRawFlightOfferByClientId, selectedFare, setSeatSelection } = useStore();
  
  const flightOffer = getRawFlightOfferByClientId(params.bookingId);
  
  const [selectedSeats, setSelectedSeats] = useState({});
  const [currentTravelerIndex, setCurrentTravelerIndex] = useState(0);

  const handleSeatSelect = (seatNumber) => {
    const currentTravelerId = travelers[currentTravelerIndex].id;
    
    // Check if the seat is already selected by another traveler
    const isOccupied = Object.values(selectedSeats).includes(seatNumber);
    if (isOccupied && selectedSeats[currentTravelerId] !== seatNumber) {
        alert("This seat is already taken.");
        return;
    }
    
    setSelectedSeats(prev => ({
      ...prev,
      [currentTravelerId]: prev[currentTravelerId] === seatNumber ? null : seatNumber,
    }));
  };

  const handleConfirmSeats = () => {
    // Basic validation: ensure every traveler has a seat
    if (Object.keys(selectedSeats).length < travelers.length) {
      alert('Please select a seat for every passenger.');
      return;
    }
    
    setSeatSelection(selectedSeats);
    router.push(`/flights/booking_confirm/${params.bookingId}`);
  };

  const currentTraveler = travelers[currentTravelerIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Seat Selection</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Select a seat for:</CardTitle>
                    <div className="flex items-center space-x-2 overflow-x-auto py-2">
                        {travelers.map((traveler, index) => (
                            <Button 
                                key={traveler.id}
                                variant={currentTravelerIndex === index ? 'primary' : 'outline'}
                                onClick={() => setCurrentTravelerIndex(index)}
                            >
                                {traveler.name.firstName} {traveler.name.lastName}
                                {selectedSeats[traveler.id] && <Badge className="ml-2">{selectedSeats[traveler.id]}</Badge>}
                            </Button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-center text-gray-600 mb-4">
                        You are selecting a seat for <span className="font-bold text-primary">{currentTraveler.name.firstName}</span>.
                    </p>
                    <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={Object.values(selectedSeats)} />
                </CardContent>
              </Card>
            </div>
            <div className="space-y-6">
              <FlightSummaryCard flight={flightOffer} selectedFare={selectedFare} />
               <Button onClick={handleConfirmSeats} size="lg" className="w-full">
                Confirm Seats & Continue
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 