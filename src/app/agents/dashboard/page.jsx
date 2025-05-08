'use client';
import React from 'react';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Sidebar from '@/components/global/Sidebar';
import Footer from '@/components/global/Footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { getPopularDestinations, getSpecialOffers } from '@/lib/data';

export default function AgentDashboard() {
  const popularDestinations = getPopularDestinations();
  const specialOffers = getSpecialOffers();
  
  // Recent bookings (mock data)
  const recentBookings = [
    { 
      id: 'TRP123456', 
      customer: 'John Smith', 
      destination: 'New York (JFK)', 
      date: '2023-07-15', 
      amount: '$745.00', 
      status: 'confirmed' 
    },
    { 
      id: 'TRP123457', 
      customer: 'Jane Doe', 
      destination: 'London (LHR)', 
      date: '2023-07-18', 
      amount: '$1,250.00', 
      status: 'pending' 
    },
    { 
      id: 'TRP123458', 
      customer: 'Michael Johnson', 
      destination: 'Dubai (DXB)', 
      date: '2023-07-20', 
      amount: '$1,875.00', 
      status: 'confirmed' 
    },
    { 
      id: 'TRP123459', 
      customer: 'Emily Williams', 
      destination: 'Paris (CDG)', 
      date: '2023-07-22', 
      amount: '$1,100.00', 
      status: 'cancelled' 
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex-grow flex">
        <Sidebar />
        
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, John Doe</h1>
              <p className="text-gray-600">Here's what's happening with your travel agency today.</p>
            </div>
            
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Bookings</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-2">145</h3>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-green-500 flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      12.5%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Revenue</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-2">$24,780</h3>
                    </div>
                    <div className="p-2 bg-green-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-green-500 flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      8.2%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending Bookings</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-2">12</h3>
                    </div>
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-red-500 flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                      3.1%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Commission</p>
                      <h3 className="text-3xl font-bold text-gray-900 mt-2">$3,156</h3>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <span className="text-green-500 flex items-center text-sm font-medium">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      10.3%
                    </span>
                    <span className="text-gray-500 text-sm ml-2">vs. last month</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
              {/* Quick Search */}
              <Card className="md:col-span-4">
                <CardHeader>
                  <CardTitle>Quick Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <Link href="/agents/searchIndex">
                    <Button variant="primary" className="w-full mb-3">
                      Search Flights
                    </Button>
                  </Link>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Popular Routes:</p>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm" className="text-xs">
                        NYC → LON
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        LAX → SYD
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        DXB → DEL
                      </Button>
                      <Button variant="outline" size="sm" className="text-xs">
                        SIN → HKG
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recent Bookings */}
              <Card className="md:col-span-8">
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Booking ID
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Customer
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Destination
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-gray-50">
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Link href={`/flights/booking_data/${booking.id}`} className="text-primary font-medium">
                                {booking.id}
                              </Link>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {booking.customer}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {booking.destination}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {booking.date}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap font-medium">
                              {booking.amount}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <Badge variant={
                                booking.status === 'confirmed' ? 'default' :
                                booking.status === 'pending' ? 'secondary' : 'outline'
                              }>
                                {booking.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 text-center">
                    <Link href="#" className="text-sm font-medium text-primary hover:text-primary-dark">
                      View all bookings →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Popular Destinations */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Popular Destinations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {popularDestinations.map((destination) => (
                    <div key={destination.code} className="relative overflow-hidden rounded-lg group h-48">
                      <img 
                        src={destination.image} 
                        alt={destination.name} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                        <h3 className="text-white text-lg font-bold">{destination.name}</h3>
                        <p className="text-white/80 text-sm">{destination.code}</p>
                        <Button variant="primary" size="sm" className="mt-2 w-full">
                          Search Flights
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Special Offers */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Special Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {specialOffers.map((offer, index) => (
                    <Card key={index} className="border-2 border-primary/20 hover:border-primary transition-colors">
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-primary">{offer.title}</h3>
                        <p className="text-sm text-gray-600 my-2">{offer.description}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                            {offer.code}
                          </div>
                          <p className="text-xs text-gray-500">
                            Expires: {offer.expiryDate}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
}
