'use client';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { formatDate, formatPrice } from '@/lib/utils';

export default function ManageBooking() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('action') || 'refund');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    reason: '',
    amount: '',
    penalty: '',
    notes: ''
  });

  // Mock booking data
  const booking = {
    id: 'TRP1234567',
    pnr: 'UARZ131',
    refNo: 'TRDP174671896189',
    customerName: 'Mohamed abdikadir',
    status: 'confirmed',
    origin: 'CDC',
    destination: 'HKG',
    date: '2025-05-13',
    amount: 260.506,
    airline: 'Emirates Airways'
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - in a real app, this would make an API call
    alert(`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} request submitted`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/bookings" className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Bookings
            </Link>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'refund' ? 'Request Refund' : 'Void Ticket'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Booking Summary */}
              <div className="mb-6 bg-gray-50 p-4 rounded-md">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">PNR</p>
                    <p className="font-medium">{booking.pnr}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Reference</p>
                    <p className="font-medium">{booking.refNo}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-medium text-primary">{formatPrice(booking.amount)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">{booking.airline}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Passenger</p>
                      <p className="font-medium">{booking.customerName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Route</p>
                      <p className="font-medium">{booking.origin} → {booking.destination}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Travel Date</p>
                      <p className="font-medium">{formatDate(booking.date)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Status</p>
                      <p className="font-medium capitalize">{booking.status}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason for {activeTab === 'refund' ? 'Refund' : 'Void'}
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md"
                      value={formData.reason}
                      onChange={(e) => handleInputChange('reason', e.target.value)}
                      required
                    >
                      <option value="">Select a reason</option>
                      <option value="schedule_change">Schedule Change</option>
                      <option value="medical">Medical Reason</option>
                      <option value="duplicate">Duplicate Booking</option>
                      <option value="customer_request">Customer Request</option>
                    </select>
                  </div>

                  {activeTab === 'refund' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Refund Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded-md"
                          value={formData.amount}
                          onChange={(e) => handleInputChange('amount', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Penalty Amount
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          className="w-full p-2 border rounded-md"
                          value={formData.penalty}
                          onChange={(e) => handleInputChange('penalty', e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <textarea
                    className="w-full p-2 border rounded-md h-32"
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Enter any additional notes or comments..."
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
              <Link href={`/bookings/${booking.id}`}>
                <Button variant="outline">Cancel</Button>
              </Link>
              <Button variant="primary" onClick={handleSubmit}>
                Submit {activeTab === 'refund' ? 'Refund' : 'Void'} Request
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}