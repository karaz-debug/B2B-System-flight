import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { formatDate, formatTime, formatDuration, formatPrice } from '@/lib/utils';

const BookingSummary = ({ flight, selectedFare }) => {
  if (!flight) return null;
  
  // Use the price from the selected fare if available, otherwise use the flight's default price.
  const displayPrice = selectedFare ? selectedFare.price : flight.price.total;
  const currency = flight.price.currency;
  
  // These are approximations for display only if a selectedFare is present.
  const baseFare = selectedFare ? (parseFloat(displayPrice) / 1.2).toFixed(2) : flight.price.base; 
  const taxes = (parseFloat(displayPrice) - parseFloat(baseFare)).toFixed(2);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-baseline">
            <CardTitle className="text-lg font-semibold">Booking Summary</CardTitle>
            {selectedFare && <Badge variant="default">{selectedFare.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Flight Info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="text-sm font-medium">{flight.airline}</div>
            <div className="text-sm text-gray-500">{flight.flightNumber}</div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-bold">{formatTime(flight.departureTime)}</div>
              <div className="text-xs text-gray-500">{flight.from}</div>
            </div>
            
            <div className="flex flex-col items-center mx-2">
              <div className="text-xs text-gray-500 mb-1">
                {formatDuration(flight.duration)}
              </div>
              <div className="relative w-16 h-0.5 bg-gray-300">
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {flight.stops === 0 ? 'Direct' : `${flight.stops} ${flight.stops === 1 ? 'stop' : 'stops'}`}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-lg font-bold">{formatTime(flight.arrivalTime)}</div>
              <div className="text-xs text-gray-500">{flight.to}</div>
            </div>
          </div>
          
          <div className="text-xs text-gray-500">
            <div>Date: {formatDate(flight.departureDate)}</div>
            <div className="mt-1">
              {flight.stops === 0 ? 'Direct Flight' : (
                <span>
                  Stops: {Array.isArray(flight.layovers) && flight.layovers.length > 0 ? (
                    flight.layovers.map((layover, idx) => (
                      <span key={idx}>
                        {layover.airport}
                        {idx < flight.layovers.length - 1 ? ', ' : ''}
                      </span>
                    ))
                  ) : 'N/A'}
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Return Flight if applicable */}
        {flight.returnFlight && (
          <>
            <Separator />
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">{flight.airline}</div>
                <div className="text-sm text-gray-500">{flight.returnFlight.flightNumber}</div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <div className="text-lg font-bold">{formatTime(flight.returnFlight.departureTime)}</div>
                  <div className="text-xs text-gray-500">{flight.to}</div>
                </div>
                
                <div className="flex flex-col items-center mx-2">
                  <div className="text-xs text-gray-500 mb-1">
                    {formatDuration(flight.returnFlight.duration)}
                  </div>
                  <div className="relative w-16 h-0.5 bg-gray-300">
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {flight.returnFlight.stops === 0 ? 'Direct' : `${flight.returnFlight.stops} ${flight.returnFlight.stops === 1 ? 'stop' : 'stops'}`}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-lg font-bold">{formatTime(flight.returnFlight.arrivalTime)}</div>
                  <div className="text-xs text-gray-500">{flight.from}</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-500">
                <div>Date: {formatDate(flight.returnDate)}</div>
                {flight.returnFlight.stops > 0 && flight.returnFlight.layovers && (
                  <div className="mt-1">
                    Stops: {flight.returnFlight.layovers.map((layover, idx) => (
                      <span key={idx}>
                        {layover.airport}
                        {idx < flight.returnFlight.layovers.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        <Separator />
        
        {/* Fare Summary */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Fare Summary</div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Fare</span>
              <span>{formatPrice(baseFare, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes & Fees</span>
              <span>{formatPrice(taxes, currency)}</span>
            </div>
          </div>
          
          <Separator />
          
          <div className="flex justify-between font-semibold">
            <span>Total Price</span>
            <span className="text-primary">{formatPrice(displayPrice, currency)}</span>
          </div>
        </div>
        
        {/* Additional Information */}
        <div className="bg-blue-50 rounded-md p-3 text-xs text-blue-800">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="font-medium mb-1">Important Information</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Fare is non-refundable unless stated otherwise.</li>
                <li>Changes may incur a fee plus any fare difference.</li>
                <li>Check-in closes 60 minutes before departure.</li>
                <li>All times shown are local to the airport.</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Baggage Information */}
        <div className="rounded-md bg-gray-50 p-3">
          <div className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h1.17A3 3 0 015 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V8a1 1 0 00-1-1h-2.17a3 3 0 01-5.66 0H5zm9 0a1 1 0 100-2h-2.17a3 3 0 01-5.66 0H4a1 1 0 100 2h.17a3 3 0 015.66 0h2.17a3 3 0 015.66 0H16z" clipRule="evenodd" />
            </svg>
            <div>
              <p className="text-xs font-medium text-gray-700 mb-1">Baggage Allowance</p>
              <div className="text-xs text-gray-600">
                <p>Cabin: 1 bag (7kg)</p>
                <p>Check-in: 1 bag (23kg)</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingSummary;
