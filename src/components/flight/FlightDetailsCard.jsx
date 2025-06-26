import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format, parseISO } from 'date-fns';
import { formatDuration, formatPrice } from '@/lib/utils';

// Helper to render a single flight segment
const SegmentDetails = ({ segment, isLast }) => {
  const departureTime = format(parseISO(segment.departure.at), 'HH:mm');
  const arrivalTime = format(parseISO(segment.arrival.at), 'HH:mm');
  const departureDate = format(parseISO(segment.departure.at), 'MMM d, yyyy');
  const arrivalDate = format(parseISO(segment.arrival.at), 'MMM d, yyyy');

  return (
    <div className="relative">
      <div className="flex items-start space-x-4">
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">{departureTime}</div>
          <div className="text-sm text-gray-600">{segment.departure.iataCode}</div>
        </div>
        <div className="flex-1 pt-1">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full border-2 border-primary"></div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
            <div className="flex-1 border-t-2 border-dashed border-gray-300 mx-2"></div>
            <div className="w-4 h-4 rounded-full border-2 border-primary bg-primary"></div>
          </div>
          <div className="text-center text-sm text-gray-500 mt-1">{formatDuration(segment.duration)}</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-bold text-lg">{arrivalTime}</div>
          <div className="text-sm text-gray-600">{segment.arrival.iataCode}</div>
        </div>
      </div>
      <div className="text-sm text-gray-500 mt-2 ml-4">
        {segment.carrierCode} {segment.number} • {segment.aircraft.code} • Departs from terminal {segment.departure.terminal || 'TBC'}
      </div>
      {!isLast && (
        <div className="pl-6 mt-4 pb-4 border-l-2 border-dotted ml-3.5">
          <div className="bg-gray-100 p-2 rounded-md text-sm text-primary font-medium w-fit">
            Layover of {formatDuration(segment.duration)} in {segment.arrival.iataCode}
          </div>
        </div>
      )}
    </div>
  );
};

const FlightDetailsCard = ({ flight }) => {
  if (!flight) {
    return null; // Or a loading/error state
  }

  const handleBooking = () => {
    console.log('Proceed to booking for:', flight);
    // You would navigate to the booking page here
  };

  const outboundItinerary = flight.itineraries[0];
  const returnItinerary = flight.itineraries.length > 1 ? flight.itineraries[1] : null;
  const travelerPricings = flight.travelerPricings || [];

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Flight Itinerary & Details</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="itinerary">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
            <TabsTrigger value="fare-baggage">Fare & Baggage</TabsTrigger>
            <TabsTrigger value="price-breakdown">Price Breakdown</TabsTrigger>
          </TabsList>

          {/* Itinerary Tab */}
          <TabsContent value="itinerary" className="pt-6">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-xl mb-4 flex items-center text-primary">Outbound Journey</h3>
                <div className="space-y-6">
                  {outboundItinerary.segments.map((segment, index) => (
                    <SegmentDetails key={segment.id} segment={segment} isLast={index === outboundItinerary.segments.length - 1} />
                  ))}
                </div>
              </div>
              {returnItinerary && (
                <>
                  <Separator />
                  <div>
                    <h3 className="font-semibold text-xl mb-4 flex items-center text-primary">Return Journey</h3>
                    <div className="space-y-6">
                      {returnItinerary.segments.map((segment, index) => (
                        <SegmentDetails key={segment.id} segment={segment} isLast={index === returnItinerary.segments.length - 1} />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Fare & Baggage Tab */}
          <TabsContent value="fare-baggage" className="pt-6">
            {travelerPricings.map((traveler) => (
              <div key={traveler.travelerId} className="mb-6">
                <h3 className="font-semibold text-lg capitalize mb-2">{traveler.travelerType}</h3>
                <div className="border rounded-lg p-4 space-y-2">
                  {traveler.fareDetailsBySegment.map((fareDetail) => (
                    <div key={fareDetail.segmentId} className="grid grid-cols-3 gap-4 text-sm">
                      <div><span className="font-medium">Segment {fareDetail.segmentId}</span></div>
                      <div>
                        <Badge variant="outline">{fareDetail.brandedFare || 'Standard'}</Badge>
                        <span className="mx-2">|</span>
                        <span>{fareDetail.cabin}</span>
                      </div>
                      <div><span className="font-medium">Baggage:</span> {fareDetail.includedCheckedBags.quantity || 0} checked bag(s)</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>

          {/* Price Breakdown Tab */}
          <TabsContent value="price-breakdown" className="pt-6">
            <h3 className="font-semibold text-lg mb-2">Price per Traveler</h3>
            {travelerPricings.map((traveler) => (
              <div key={traveler.travelerId} className="mb-4">
                <p className="font-medium capitalize">{traveler.travelerType}: {formatPrice(traveler.price.total, traveler.price.currency)}</p>
                <div className="text-xs text-gray-600 space-y-1 mt-2 pl-4">
                  <p>Base Fare: {formatPrice(traveler.price.base, traveler.price.currency)}</p>
                  <p>Taxes & Fees: {formatPrice(traveler.price.total - traveler.price.base, traveler.price.currency)}</p>
                  <ul>
                    {(traveler.price.taxes || []).map(tax => (
                       <li key={tax.code}>- {tax.code}: {formatPrice(tax.amount, traveler.price.currency)}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default FlightDetailsCard;
