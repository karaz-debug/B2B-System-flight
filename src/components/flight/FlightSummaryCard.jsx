import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPrice, formatDuration } from '@/lib/utils';
import { CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const FlightSummaryCard = ({ flight, selectedFare, onBook }) => {
  if (!flight) {
    return (
      <Card className="animate-pulse">
        <CardHeader>
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        </CardHeader>
        <CardContent>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-10 bg-gray-200 rounded w-full mt-4"></div>
        </CardContent>
      </Card>
    );
  }

  const price = selectedFare ? selectedFare.price : flight.price.total;
  const currency = flight.price.currency;

  const itinerary = flight.itineraries[0];
  const returnItinerary = flight.itineraries[1];
  
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <div className="flex justify-between items-baseline">
            <CardTitle className="text-xl">Your Flight Summary</CardTitle>
            {selectedFare && <Badge variant="default">{selectedFare.name}</Badge>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-600">Total Price</span>
          <span className="text-3xl font-bold text-primary">{formatPrice(price, currency)}</span>
        </div>
        <Separator />
        <div className="space-y-3 my-4 text-sm">
            <p className="font-semibold">Outbound: {formatDuration(itinerary.duration)}</p>
            {returnItinerary && <p className="font-semibold">Return: {formatDuration(returnItinerary.duration)}</p>}
        </div>
        <Button onClick={onBook} className="w-full" size="lg">
          Continue to Book
        </Button>
      </CardContent>
      <CardFooter>
        <ul className="space-y-2 text-xs text-gray-500 w-full">
            <li className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-2 text-green-500"/> Price verified and held for 10:00 minutes</li>
            <li className="flex items-center"><CheckCircle2 className="h-3 w-3 mr-2 text-green-500"/> No hidden fees</li>
        </ul>
      </CardFooter>
    </Card>
  );
};

export default FlightSummaryCard; 