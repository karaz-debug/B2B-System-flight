'use client';
import React, { useState } from 'react';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatDate, formatPrice } from '@/lib/utils';

export default function BookingsList() {
  const [activeTab, setActiveTab] = useState('ticketed');
  const [searchFilters, setSearchFilters] = useState({
    pnr: '',
    pax: '',
    ticketNumber: '',
    airline: '',
    travelFrom: '',
    travelTo: ''
  });

  // Mock bookings data
  const bookings = [
    {
      id: 'TRP1234567',
      pnr: 'UARZ131',
      refNo: 'TRDP174671896189',
      customerName: 'Mohamed abdikadir',
      origin: 'CDC',
      destination: 'HKG',
      date: '2025-05-13',
      amount: 260.506,
      status: 'confirmed',
      pax: '1 ADT',
      airline: 'Emirates Airways'
    },
    {
      id: 'TRP1234568',
      pnr: 'UARZ313',
      refNo: 'TRDP174671841290',
      customerName: 'Mohamed abdikadir',
      origin: 'CDC',
      destination: 'HKG',
      date: '2025-05-13',
      amount: 260.506,
      status: 'confirmed',
      pax: '1 ADT',
      airline: 'Emirates Airways'
    }
  ];

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleViewBooking = (bookingId) => {
    // Navigate to booking details page
    window.location.href = `/bookings/${bookingId}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">TicketOrder Flight Queue</h1>
          </div>

          {/* Status Tabs */}
          <Tabs defaultValue="ticketed" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 gap-2">
              <TabsTrigger value="ticketed">Ticketed</TabsTrigger>
              <TabsTrigger value="voided">Voided</TabsTrigger>
              <TabsTrigger value="refundQuote">Refund Quote Request</TabsTrigger>
              <TabsTrigger value="refundProcess">Refund In Process</TabsTrigger>
              <TabsTrigger value="refunded">Refunded</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restrict By PNR</label>
                  <Input
                    placeholder="Enter PNR"
                    value={searchFilters.pnr}
                    onChange={(e) => handleFilterChange('pnr', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restrict By PAX</label>
                  <Input
                    placeholder="Search by passenger name"
                    value={searchFilters.pax}
                    onChange={(e) => handleFilterChange('pax', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restrict By Ticket Number</label>
                  <Input
                    placeholder="Enter ticket number"
                    value={searchFilters.ticketNumber}
                    onChange={(e) => handleFilterChange('ticketNumber', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Restrict to Airline</label>
                  <Input
                    placeholder="Enter airline"
                    value={searchFilters.airline}
                    onChange={(e) => handleFilterChange('airline', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel From</label>
                  <Input
                    type="date"
                    value={searchFilters.travelFrom}
                    onChange={(e) => handleFilterChange('travelFrom', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Travel To</label>
                  <Input
                    type="date"
                    value={searchFilters.travelTo}
                    onChange={(e) => handleFilterChange('travelTo', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bookings List */}
          <div className="space-y-4">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                    <div className="lg:col-span-3">
                      <div>
                        <p className="text-sm text-gray-600">Customer</p>
                        <p className="font-medium">{booking.customerName}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">PNR</p>
                        <p className="text-primary font-medium">{booking.pnr}</p>
                      </div>
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Ref No.</p>
                        <p className="font-medium">{booking.refNo}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-4">
                      <div>
                        <p className="text-sm text-gray-600">Route</p>
                        <div className="flex items-center mt-1">
                          <span className="font-medium">{booking.origin}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-2 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{booking.destination}</span>
                        </div>
                        <div className="mt-1">
                          <p className="text-sm text-gray-600">Date: {formatDate(booking.date)}</p>
                          <p className="text-sm text-gray-600">Airline: {booking.airline}</p>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-3">
                      <p className="text-sm text-gray-600">Passengers</p>
                      <p className="font-medium">{booking.pax}</p>
                      <p className="font-medium text-primary mt-2">{formatPrice(booking.amount)}</p>
                    </div>

                    <div className="lg:col-span-2 flex items-center justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleViewBooking(booking.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}