import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatTime, formatDuration, formatPrice } from '@/lib/utils';
import useStore from '@/lib/store';

const FlightCard = ({ flight }) => {
  const router = useRouter();
  const { setSelectedFlight } = useStore();
  
  const handleViewDetails = () => {
    router.push(`/flights/flight_details/${flight.clientId}`);
  };
  
  const itinerary = flight.itineraries[0];
  const segments = itinerary.segments;
  const firstSegment = segments[0];
  const lastSegment = segments[segments.length - 1];
  const stops = segments.length - 1;

  // Determine flight type label
  const getFlightTypeLabel = () => {
    if (stops === 0) {
      return <Badge variant="default">Direct</Badge>;
    } else if (stops === 1) {
      return <Badge variant="secondary">{stops} Stop</Badge>;
    } else {
      return <Badge variant="secondary">{stops} Stops</Badge>;
    }
  };
  
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Airline Info */}
          <div className="md:col-span-2">
            <div className="text-lg font-semibold mb-1">{firstSegment.carrierCode}</div>
            <div className="text-sm text-gray-500">{firstSegment.number}</div>
            {getFlightTypeLabel()}
          </div>
          
          {/* Flight Times */}
          <div className="md:col-span-5">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <div className="text-xl font-bold">{formatTime(firstSegment.departure.at)}</div>
                <div className="text-sm text-gray-600">{firstSegment.departure.iataCode}</div>
              </div>
              
              <div className="flex flex-col items-center mx-4">
                <div className="text-xs text-gray-500 mb-1">
                  {formatDuration(itinerary.duration)}
                </div>
                <div className="relative w-20 h-0.5 bg-gray-300">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                  {stops > 0 && segments.slice(0, -1).map((segment, idx) => (
                    <div key={idx} className="absolute top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-gray-500" style={{ 
                      left: `${((idx + 1) / (stops + 1)) * 100}%` 
                    }}></div>
                  ))}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {stops === 0 ? 'Direct' : `${stops} ${stops === 1 ? 'stop' : 'stops'}`}
                </div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold">{formatTime(lastSegment.arrival.at)}</div>
                <div className="text-sm text-gray-600">{lastSegment.arrival.iataCode}</div>
              </div>
            </div>
            
            {stops > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                <span>Stops: </span>
                {segments.slice(0, -1).map((segment, idx) => (
                  <span key={idx}>
                    {segment.arrival.iataCode}
                    {idx < stops - 1 ? ', ' : ''}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Return Flight (if applicable) */}
          {flight.itineraries[1] && (() => {
            const returnItinerary = flight.itineraries[1];
            const returnStops = returnItinerary.segments.length - 1;
            return (
              <div className="md:col-span-3">
                <div className="flex flex-col">
                  <div className="text-xs text-gray-500 mb-1">Return Flight</div>
                  <div className="flex items-center">
                    <div className="text-sm font-semibold">
                      {formatTime(returnItinerary.segments[0].departure.at)} - {formatTime(returnItinerary.segments[returnItinerary.segments.length - 1].arrival.at)}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDuration(returnItinerary.duration)} • 
                    {returnStops === 0 
                      ? ' Direct' 
                      : ` ${returnStops} ${returnStops === 1 ? 'stop' : 'stops'}`}
                  </div>
                </div>
              </div>
            );
          })()}
          
          {/* Price and Book Button */}
          <div className="md:col-span-2 flex flex-col justify-between">
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">{formatPrice(flight.price.total)}</div>
              <div className="text-xs text-gray-500">per passenger</div>
            </div>
            
            <Button 
              variant="primary" 
              className="mt-2"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
          </div>
        </div>
        
        {/* Flight Details */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Baggage Included</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Meal Included</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Flexible Booking</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
              <span>Aircraft: {firstSegment.aircraft.code}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
