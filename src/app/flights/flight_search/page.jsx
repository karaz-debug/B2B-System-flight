'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import SearchForm from '@/components/flight/SearchForm';
import FlightCard from '@/components/flight/FlightCard';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { SORT_OPTIONS, FILTER_CATEGORIES } from '@/lib/constants';
import useStore from '@/lib/store';

export default function FlightSearch() {
  const router = useRouter();
  const { searchParams, searchResults, searchFlights } = useStore();
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');
  const [filters, setFilters] = useState({
    stops: [],
    airlines: [],
    departure_time: []
  });
  
  useEffect(() => {
    const performSearch = async () => {
      if (!searchParams.origin || !searchParams.destination) {
        router.push('/agents/searchIndex');
        return;
      }
      setLoading(true);
      setError('');
      try {
        await searchFlights();
      } catch (err) {
        setError('Failed to fetch flights. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    performSearch();
  }, [searchParams, searchFlights, router]);
  
  // Helper to check if a flight offer is expired
  function isOfferExpired(offer) {
    if (!offer.lastTicketingDate) return false;
    // Treat lastTicketingDate as end of the day
    const expiry = new Date(offer.lastTicketingDate + 'T23:59:59');
    const now = new Date();
    return now > expiry;
  }
  
  // Debug: log all offers and their lastTicketingDate
  if (typeof window !== 'undefined' && searchResults?.data) {
    console.log('All offers:', searchResults.data.map(f => ({ id: f.clientId, lastTicketingDate: f.lastTicketingDate })));
  }
  
  // Filter out expired flights before rendering
  const flights = (searchResults?.data || []).filter(flight => !isOfferExpired(flight));
  // Sort flights based on selected option
  const sortFlights = (flightsToSort) => {
    switch (sortOption) {
      case 'price_asc':
        return [...flightsToSort].sort((a, b) => a.price.total - b.price.total);
      case 'price_desc':
        return [...flightsToSort].sort((a, b) => b.price.total - a.price.total);
      case 'duration_asc':
        return [...flightsToSort].sort((a, b) => a.duration - b.duration);
      case 'departure_asc':
        return [...flightsToSort].sort((a, b) => {
          const timeA = a.itineraries[0].segments[0].departure.at.split('T')[1].split(':').map(Number);
          const timeB = b.itineraries[0].segments[0].departure.at.split('T')[1].split(':').map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
      case 'arrival_asc':
        return [...flightsToSort].sort((a, b) => {
          const timeA = a.itineraries[0].segments[a.itineraries[0].segments.length - 1].arrival.at.split('T')[1].split(':').map(Number);
          const timeB = b.itineraries[0].segments[b.itineraries[0].segments.length - 1].arrival.at.split('T')[1].split(':').map(Number);
          return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
        });
      default:
        return flightsToSort;
    }
  };
  
  // Filter flights based on selected filters
  const filterFlights = (flightsToFilter) => {
    return flightsToFilter.filter(flight => {
      // Filter by stops
      if (filters.stops.length > 0) {
        const stopsMatch = filters.stops.some(stop => {
          const numStops = flight.itineraries[0].segments.length - 1;
          if (stop === '0') return numStops === 0;
          if (stop === '1') return numStops === 1;
          if (stop === '2+') return numStops >= 2;
          return false;
        });
        if (!stopsMatch) return false;
      }
      
      // Filter by airlines
      if (filters.airlines.length > 0) {
        const airlineCode = flight.itineraries[0].segments[0].carrierCode;
        if (!filters.airlines.includes(airlineCode)) return false;
      }
      
      // Filter by departure time
      if (filters.departure_time.length > 0) {
        const hour = parseInt(flight.itineraries[0].segments[0].departure.at.split('T')[1].substring(0, 2));
        const timeMatches = filters.departure_time.some(time => {
          if (time === 'early_morning') return hour >= 0 && hour < 6;
          if (time === 'morning') return hour >= 6 && hour < 12;
          if (time === 'afternoon') return hour >= 12 && hour < 18;
          if (time === 'evening') return hour >= 18 && hour < 24;
          return false;
        });
        if (!timeMatches) return false;
      }
      
      return true;
    });
  };
  
  // Handle filter change
  const handleFilterChange = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (newFilters[category].includes(value)) {
        // Remove the value if it's already selected
        newFilters[category] = newFilters[category].filter(item => item !== value);
      } else {
        // Add the value if it's not selected
        newFilters[category] = [...newFilters[category], value];
      }
      
      return newFilters;
    });
  };
  
  // Reset all filters
  const resetFilters = () => {
    setFilters({
      stops: [],
      airlines: [],
      departure_time: []
    });
    setSortOption('price_asc');
  };
  
  // Get filtered and sorted flights
  const filteredAndSortedFlights = sortFlights(filterFlights(flights));
  
  // Get unique airlines from flights
  const uniqueAirlines = flights.length > 0
    ? Array.from(new Set(flights.map(flight => {
        const airlineCode = flight.itineraries[0].segments[0].carrierCode;
        const airlineName = `Airline ${airlineCode}`; // Replace with a proper lookup if available
        return JSON.stringify({ code: airlineCode, name: airlineName });
      }))).map(item => JSON.parse(item))
    : [];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h1 className="text-xl font-bold text-gray-900 mb-4">Flight Search Results</h1>
            <SearchForm />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Filters Sidebar */}
            <div className="w-full md:w-64 flex-shrink-0">
              <Card className="sticky top-6">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg">Filters</h2>
                    <Button 
                      variant="ghost" 
                      className="text-sm text-primary h-auto p-1"
                      onClick={resetFilters}
                    >
                      Reset All
                    </Button>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Stops Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Stops</h3>
                      {FILTER_CATEGORIES.stops.map((option) => (
                        <div key={option.value} className="flex items-center mb-2">
                          <Checkbox
                            id={`stops-${option.value}`}
                            checked={filters.stops.includes(option.value)}
                            onChange={() => handleFilterChange('stops', option.value)}
                          />
                          <label 
                            htmlFor={`stops-${option.value}`} 
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Airlines Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Airlines</h3>
                      {uniqueAirlines.map((airline) => (
                        <div key={airline.code} className="flex items-center mb-2">
                          <Checkbox
                            id={`airline-${airline.code}`}
                            checked={filters.airlines.includes(airline.code)}
                            onChange={() => handleFilterChange('airlines', airline.code)}
                          />
                          <label 
                            htmlFor={`airline-${airline.code}`} 
                            className="ml-2 text-sm text-gray-700"
                          >
                            {airline.name}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    {/* Departure Time Filter */}
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Departure Time</h3>
                      {FILTER_CATEGORIES.departure_time.map((option) => (
                        <div key={option.value} className="flex items-center mb-2">
                          <Checkbox
                            id={`departure-${option.value}`}
                            checked={filters.departure_time.includes(option.value)}
                            onChange={() => handleFilterChange('departure_time', option.value)}
                          />
                          <label 
                            htmlFor={`departure-${option.value}`} 
                            className="ml-2 text-sm text-gray-700"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Flight Results */}
            <div className="flex-1">
              <Card className="mb-4">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row justify-between md:items-center">
                    <div className="mb-2 md:mb-0">
                      <h2 className="font-semibold">
                        {searchParams.origin} to {searchParams.destination}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {searchParams.departureDate}
                        {searchParams.tripType === 'round_trip' ? ` - ${searchParams.returnDate}` : ''}
                        {' • '}
                        {searchParams.passengers?.adults || 1} {(searchParams.passengers?.adults || 1) === 1 ? 'Adult' : 'Adults'}
                        {searchParams.passengers?.children > 0 && `, ${searchParams.passengers.children} Children`}
                        {searchParams.passengers?.infants > 0 && `, ${searchParams.passengers.infants} Infants`}
                      </p>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-2">Sort by:</span>
                      <Select value={sortOption} onValueChange={setSortOption}>
                        <SelectTrigger className="text-sm w-48">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          {SORT_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {loading ? (
                <Card className="p-8 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="mt-4 text-gray-600">Searching for the best flights...</p>
                </Card>
              ) : filteredAndSortedFlights.length === 0 ? (
                <Card className="p-8 text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">No flights found</h3>
                  <p className="text-gray-600 mb-4">No flights match your search criteria. Try adjusting your filters or search for different dates.</p>
                  <Button variant="outline" onClick={resetFilters}>Reset Filters</Button>
                </Card>
              ) : (
                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-4 mb-4 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm text-blue-800">
                        <span className="font-medium">Showing {filteredAndSortedFlights.length} flights</span> from {searchParams.origin} to {searchParams.destination}. 
                        Prices include taxes and fees.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex overflow-x-auto pb-2 mb-2">
                    {Object.entries(filters).flatMap(([category, values]) =>
                      values.map(value => {
                        // Get the label for the filter
                        const categoryOptions = FILTER_CATEGORIES[category];
                        const option = categoryOptions?.find(opt => opt.value === value);
                        const label = option?.label || value;
                        
                        return (
                          <Badge key={`${category}-${value}`} variant="secondary" className="mr-2 mb-2">
                            {label}
                            <button 
                              className="ml-1 text-gray-500 hover:text-gray-700"
                              onClick={() => handleFilterChange(category, value)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </Badge>
                        );
                      })
                    )}
                  </div>
                  
                  {filteredAndSortedFlights.map((flight) => (
                    <FlightCard key={flight.clientId} flight={flight} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
