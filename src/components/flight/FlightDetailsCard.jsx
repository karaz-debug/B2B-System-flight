import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime, formatDuration, formatPrice } from '@/lib/utils';
import useStore from '@/lib/store';

const FlightDetailsCard = ({ flight }) => {
  const router = useRouter();
  const { setSelectedFlight } = useStore();
  
  const handleBookNow = () => {
    setSelectedFlight(flight);
    // Mocking booking ID
    const bookingId = `${Math.floor(Math.random() * 10000000)}`;
    const encodedBookingId = Buffer.from(bookingId).toString('base64');
    const encodedFlightId = Buffer.from(flight.id).toString('base64');
    router.push(`/flights/booking_confirm/${encodedBookingId}/${encodedFlightId}`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-bold">Flight Details</CardTitle>
            <div className="text-2xl font-bold text-primary">{formatPrice(flight.price)}</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <div className="text-lg font-semibold">{flight.airline}</div>
                <div className="text-sm text-gray-600">{flight.flightNumber}</div>
              </div>
              <div className="flex space-x-2">
                {flight.stops === 0 ? (
                  <Badge variant="default">Direct Flight</Badge>
                ) : (
                  <Badge variant="secondary">{flight.stops} {flight.stops === 1 ? 'Stop' : 'Stops'}</Badge>
                )}
                <Badge variant="outline">{flight.cabinClass || 'Economy'}</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <div className="md:col-span-5">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">{formatDate(flight.departureDate)}</div>
                  <div className="text-2xl font-bold">{formatTime(flight.departureTime)}</div>
                  <div className="text-md">{flight.from}</div>
                </div>
              </div>
              
              <div className="md:col-span-2 flex flex-col items-center justify-center">
                <div className="text-sm text-gray-500 mb-2">{formatDuration(flight.duration)}</div>
                <div className="relative w-full h-0.5 bg-gray-300">
                  <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {flight.stops === 0 ? 'Direct' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
                </div>
              </div>
              
              <div className="md:col-span-5">
                <div className="flex flex-col">
                  <div className="text-sm text-gray-500">{formatDate(flight.departureDate)}</div>
                  <div className="text-2xl font-bold">{formatTime(flight.arrivalTime)}</div>
                  <div className="text-md">{flight.to}</div>
                </div>
              </div>
            </div>
          </div>
          
          {flight.stops > 0 && flight.layovers && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Layover Details</h3>
              {flight.layovers.map((layover, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md mb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{layover.airport}</span>
                      <span className="mx-2 text-gray-400">|</span>
                      <span>Layover: {formatDuration(layover.duration)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {flight.returnFlight && (
            <>
              <Separator className="my-6" />
              
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Return Flight</h3>
                
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <div className="text-lg font-semibold">{flight.airline}</div>
                    <div className="text-sm text-gray-600">{flight.returnFlight.flightNumber}</div>
                  </div>
                  <div className="flex space-x-2">
                    {flight.returnFlight.stops === 0 ? (
                      <Badge variant="default">Direct Flight</Badge>
                    ) : (
                      <Badge variant="secondary">
                        {flight.returnFlight.stops} {flight.returnFlight.stops === 1 ? 'Stop' : 'Stops'}
                      </Badge>
                    )}
                    <Badge variant="outline">{flight.cabinClass || 'Economy'}</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  <div className="md:col-span-5">
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">{formatDate(flight.returnDate)}</div>
                      <div className="text-2xl font-bold">{formatTime(flight.returnFlight.departureTime)}</div>
                      <div className="text-md">{flight.to}</div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 flex flex-col items-center justify-center">
                    <div className="text-sm text-gray-500 mb-2">{formatDuration(flight.returnFlight.duration)}</div>
                    <div className="relative w-full h-0.5 bg-gray-300">
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {flight.returnFlight.stops === 0 
                        ? 'Direct' 
                        : `${flight.returnFlight.stops} ${flight.returnFlight.stops === 1 ? 'stop' : 'stops'}`}
                    </div>
                  </div>
                  
                  <div className="md:col-span-5">
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500">{formatDate(flight.returnDate)}</div>
                      <div className="text-2xl font-bold">{formatTime(flight.returnFlight.arrivalTime)}</div>
                      <div className="text-md">{flight.from}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {flight.returnFlight.stops > 0 && flight.returnFlight.layovers && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Return Layover Details</h3>
                  {flight.returnFlight.layovers.map((layover, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-md mb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{layover.airport}</span>
                          <span className="mx-2 text-gray-400">|</span>
                          <span>Layover: {formatDuration(layover.duration)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Baggage Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Cabin Baggage</div>
                <div className="text-sm text-gray-600">1 piece, 7 kg per passenger</div>
              </div>
              <div className="bg-gray-50 p-3 rounded-md">
                <div className="font-medium">Check-in Baggage</div>
                <div className="text-sm text-gray-600">1 piece, 23 kg per passenger</div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="text-xl font-bold text-primary">{formatPrice(flight.price)}</div>
            <div className="text-sm text-gray-500">Includes taxes & fees</div>
          </div>
          <Button variant="primary" size="lg" onClick={handleBookNow}>
            Book Now
          </Button>
        </CardFooter>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Fare Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Cancellation</h3>
              <p className="text-sm text-gray-600">
                Cancellation fee of $100 applies. Cancellations made within 24 hours before departure are non-refundable.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Date Change</h3>
              <p className="text-sm text-gray-600">
                Date change fee of $75 applies plus any fare difference. Changes must be made at least 24 hours before departure.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">No Show</h3>
              <p className="text-sm text-gray-600">
                No show will result in forfeiture of fare. Return flight, if applicable, will be automatically cancelled.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlightDetailsCard;
