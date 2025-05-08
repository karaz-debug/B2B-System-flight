import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { DatePicker } from '@/components/ui/datepicker';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';

import { AIRPORTS, CABIN_CLASSES, TRIP_TYPES } from '@/lib/constants';
import useStore from '@/lib/store';

const SearchForm = () => {
  const router = useRouter();
  const { searchParams, setSearchParams, searchFlights } = useStore();
  
  const [tripType, setTripType] = useState(searchParams.tripType || 'round_trip');
  const [origin, setOrigin] = useState(searchParams.origin || '');
  const [destination, setDestination] = useState(searchParams.destination || '');
  const [departureDate, setDepartureDate] = useState(searchParams.departureDate || '');
  const [returnDate, setReturnDate] = useState(searchParams.returnDate || '');
  const [adults, setAdults] = useState(searchParams.passengers?.adults || 1);
  const [children, setChildren] = useState(searchParams.passengers?.children || 0);
  const [infants, setInfants] = useState(searchParams.passengers?.infants || 0);
  const [cabinClass, setCabinClass] = useState(searchParams.cabinClass || 'economy');
  
  // Suggestions for origin and destination
  const [originSuggestions, setOriginSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  
  // Handle trip type change
  const handleTripTypeChange = (value) => {
    setTripType(value);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Update search params in store
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
    
    // Navigate to search results page
    router.push('/flights/flight_search');
  };
  
  // Filter airport suggestions based on input
  const handleOriginChange = (e) => {
    const value = e.target.value;
    setOrigin(value);
    
    if (value.length > 1) {
      const filtered = AIRPORTS.filter(airport => 
        airport.name.toLowerCase().includes(value.toLowerCase()) || 
        airport.city.toLowerCase().includes(value.toLowerCase()) || 
        airport.code.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(filtered.slice(0, 5));
    } else {
      setOriginSuggestions([]);
    }
  };
  
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    
    if (value.length > 1) {
      const filtered = AIRPORTS.filter(airport => 
        airport.name.toLowerCase().includes(value.toLowerCase()) || 
        airport.city.toLowerCase().includes(value.toLowerCase()) || 
        airport.code.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(filtered.slice(0, 5));
    } else {
      setDestinationSuggestions([]);
    }
  };
  
  // Select airport from suggestions
  const selectOrigin = (airport) => {
    setOrigin(`${airport.city} (${airport.code})`);
    setOriginSuggestions([]);
  };
  
  const selectDestination = (airport) => {
    setDestination(`${airport.city} (${airport.code})`);
    setDestinationSuggestions([]);
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
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <Input
                  type="text"
                  placeholder="City or Airport"
                  value={origin}
                  onChange={handleOriginChange}
                  required
                />
                {originSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                    {originSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectOrigin(airport)}
                      >
                        <div className="font-medium">{airport.city} ({airport.code})</div>
                        <div className="text-xs text-gray-500">{airport.name}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <Input
                  type="text"
                  placeholder="City or Airport"
                  value={destination}
                  onChange={handleDestinationChange}
                  required
                />
                {destinationSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full bg-white shadow-lg rounded-md mt-1 max-h-60 overflow-auto">
                    {destinationSuggestions.map((airport) => (
                      <div
                        key={airport.code}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => selectDestination(airport)}
                      >
                        <div className="font-medium">{airport.city} ({airport.code})</div>
                        <div className="text-xs text-gray-500">{airport.name}</div>
                      </div>
                    ))}
                  </div>
                )}
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
                    <Select value={adults} onChange={(e) => setAdults(parseInt(e.target.value))}>
                      {[...Array(9)].map((_, i) => (
                        <SelectOption key={i} value={i + 1}>{i + 1}</SelectOption>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Children</label>
                    <Select value={children} onChange={(e) => setChildren(parseInt(e.target.value))}>
                      {[...Array(10)].map((_, i) => (
                        <SelectOption key={i} value={i}>{i}</SelectOption>
                      ))}
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Infants</label>
                    <Select value={infants} onChange={(e) => setInfants(parseInt(e.target.value))}>
                      {[...Array(Math.min(adults, 5) + 1)].map((_, i) => (
                        <SelectOption key={i} value={i}>{i}</SelectOption>
                      ))}
                    </Select>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cabin Class</label>
                <Select value={cabinClass} onChange={(e) => setCabinClass(e.target.value)}>
                  {CABIN_CLASSES.map((cabinClass) => (
                    <SelectOption key={cabinClass.value} value={cabinClass.value}>
                      {cabinClass.label}
                    </SelectOption>
                  ))}
                </Select>
              </div>
            </div>
            
            <Button type="submit" variant="primary" className="w-full py-3">
              Search Flights
            </Button>
          </form>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SearchForm;
