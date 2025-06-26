import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { CABIN_CLASSES, TRIP_TYPES } from '@/lib/constants';
import useStore from '@/lib/store';
import AirportSearch from './AirportSearch';

const SearchForm = () => {
  const router = useRouter();
  const { searchParams, setSearchParams } = useStore();
  
  const [tripType, setTripType] = useState(searchParams.tripType || 'round_trip');
  const [origin, setOrigin] = useState(searchParams.origin || '');
  const [destination, setDestination] = useState(searchParams.destination || '');
  const [departureDate, setDepartureDate] = useState(searchParams.departureDate || '');
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || '');
  const [adults, setAdults] = useState(searchParams.passengers?.adults || 1);
  const [children, setChildren] = useState(searchParams.passengers?.children || 0);
  const [infants, setInfants] = useState(searchParams.passengers?.infants || 0);
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || 'economy');

  // Handle trip type change
  const handleTripTypeChange = (value) => {
    setTripType(value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams({
      tripType,
      origin,
      destination,
      departureDate,
      returnDate,
      passengers: {
        adults,
        children,
        infants
      },
      cabinClass
    });
    router.push('/flights/flight_search');
  };

  // Handle airport/city selection
  const handleOriginSelect = (airport) => {
    setOrigin(`${airport.name} (${airport.iataCode})`);
  };
  const handleDestinationSelect = (airport) => {
    setDestination(`${airport.name} (${airport.iataCode})`);
  };

  return (
    <Card className="bg-white shadow-md rounded-md">
      <CardContent className="p-6">
        <Tabs defaultValue={tripType} onValueChange={handleTripTypeChange}>
          <TabsList className="mb-6">
            {TRIP_TYPES.map((type) => (
              <TabsTrigger key={type.value} value={type.value}>
                {type.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <AirportSearch onSelect={handleOriginSelect} placeholder="City or Airport" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <AirportSearch onSelect={handleDestinationSelect} placeholder="City or Airport" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Departure Date</label>
                <DatePicker
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  placeholder="Select departure date"
                />
              </div>
              {tripType === 'round_trip' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                  <DatePicker
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    min={departureDate || new Date().toISOString().split('T')[0]}
                    required={tripType === 'round_trip'}
                    placeholder="Select return date"
                  />
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Adults</label>
                    <input
                      type="number"
                      min={1}
                      max={9}
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      className="w-full border rounded p-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Children</label>
                    <input
                      type="number"
                      min={0}
                      max={9}
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      className="w-full border rounded p-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Infants</label>
                    <input
                      type="number"
                      min={0}
                      max={9}
                      value={infants}
                      onChange={(e) => setInfants(Number(e.target.value))}
                      className="w-full border rounded p-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
                <Select value={cabinClass} onValueChange={setCabinClass}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select cabin class" />
                  </SelectTrigger>
                  <SelectContent>
                    {CABIN_CLASSES.map((c) => (
                      <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button type="submit" className="w-full" variant="primary">
              Search Flights
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
