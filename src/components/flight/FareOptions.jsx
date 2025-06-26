import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2 } from 'lucide-react';

const FareOptions = ({ flightOffer, selectedFare, onSelectFare }) => {
  // Extract fare details from the first traveler pricing and segment
  const baseFare = flightOffer.travelerPricings[0].fareDetailsBySegment[0];
  const price = flightOffer.price;

  // Mocked fare options for UI demonstration.
  // In a real scenario, this data would come from the API by requesting multiple fare types.
  const fareOptions = [
    {
      name: baseFare.brandedFare || 'ECONOMY BASIC',
      price: price.total,
      details: [
        'Personal item only',
        `${baseFare.includedCheckedBags.quantity || 0} checked bag(s) included`,
        'No changes or cancellations',
        'Standard seat selection',
      ],
      isCurrent: true, // This is the fare returned by the API
    },
    {
      name: 'ECONOMY STANDARD',
      price: (parseFloat(price.total) + 50).toFixed(2), // Mocked price increase
      details: [
        'Personal item & carry-on',
        '1 checked bag included',
        'Changes allowed with a fee',
        'Standard seat selection',
      ],
      isCurrent: false,
    },
    {
      name: 'ECONOMY FLEX',
      price: (parseFloat(price.total) + 120).toFixed(2), // Mocked price increase
      details: [
        'Personal item & carry-on',
        '2 checked bags included',
        'Free changes & refundable',
        'Preferred seat selection',
      ],
      isCurrent: false,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Fare</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fareOptions.map((option) => (
            <Card
              key={option.name}
              className={`cursor-pointer transition-all ${selectedFare === option.name ? 'border-primary ring-2 ring-primary' : 'border-gray-200'}`}
              onClick={() => onSelectFare(option)}
            >
              <CardHeader className="text-center">
                <CardTitle className="text-lg">{option.name}</CardTitle>
                <p className="text-2xl font-bold text-primary">${option.price}</p>
                <p className="text-xs text-gray-500">total price</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  {option.details.map((detail, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-center mt-4">
                  {option.isCurrent && <Badge variant="secondary">Current Fare</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 text-xs text-center text-gray-500">
            * Standard and Flex fares are for demonstration purposes. To implement this, the backend needs to request multiple fare types from the Amadeus API.
        </div>
      </CardContent>
    </Card>
  );
};

export default FareOptions; 