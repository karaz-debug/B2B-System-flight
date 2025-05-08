'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import PassengerForm from '@/components/flight/PassengerForm';
import BookingSummary from '@/components/flight/BookingSummary';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { decodeFromBase64 } from '@/lib/utils';
import useStore from '@/lib/store';

export default function BookingConfirm() {
  const params = useParams();
  const router = useRouter();
  const { getFlightById, setSelectedFlight, createBooking } = useStore();
  
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formStep, setFormStep] = useState(1); // 1: Passenger Info, 2: Payment
  const [error, setError] = useState('');
  const [passengerInfo, setPassengerInfo] = useState([]);
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  useEffect(() => {
    if (!params.flightId) {
      router.push('/agents/searchIndex');
      return;
    }
    
    // Try to decode the flight ID (in a real app, we would fetch from API)
    try {
      const decodedFlightId = decodeFromBase64(params.flightId);
      const flightDetails = getFlightById(decodedFlightId);
      
      if (!flightDetails) {
        router.push('/agents/searchIndex');
        return;
      }
      
      setFlight(flightDetails);
      setSelectedFlight(flightDetails);
      
      // Initialize passenger form based on the number of passengers
      // This is simplified for demo purposes
      const passengerCount = 1; // In a real app, would be from booking parameters
      const initialPassengers = Array(passengerCount).fill().map(() => ({
        title: '',
        firstName: '',
        lastName: '',
        dob: '',
        nationality: '',
        passportNumber: '',
        passportExpiry: ''
      }));
      setPassengerInfo(initialPassengers);
      
      setLoading(false);
    } catch (err) {
      console.error('Error decoding flight ID:', err);
      router.push('/agents/searchIndex');
    }
  }, [params.flightId, getFlightById, router, setSelectedFlight]);
  
  const handlePassengerInfoChange = (index, field, value) => {
    const updatedPassengers = [...passengerInfo];
    updatedPassengers[index] = { ...updatedPassengers[index], [field]: value };
    setPassengerInfo(updatedPassengers);
  };
  
  const handleContactInfoChange = (field, value) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };
  
  const validatePassengerForm = () => {
    for (const passenger of passengerInfo) {
      if (
        !passenger.title || 
        !passenger.firstName || 
        !passenger.lastName ||
        !passenger.dob ||
        !passenger.nationality
      ) {
        setError('Please fill in all required passenger information fields.');
        return false;
      }
    }
    
    if (!contactInfo.email || !contactInfo.phone) {
      setError('Please provide contact email and phone number.');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const validatePaymentForm = () => {
    if (!termsAccepted) {
      setError('Please accept the terms and conditions to proceed.');
      return false;
    }
    
    setError('');
    return true;
  };
  
  const handleContinue = () => {
    if (formStep === 1) {
      if (validatePassengerForm()) {
        setFormStep(2);
        window.scrollTo(0, 0);
      }
    }
  };
  
  const handleBack = () => {
    if (formStep === 2) {
      setFormStep(1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBookNow = () => {
    if (validatePaymentForm()) {
      // Create booking and get booking reference
      const booking = createBooking();
      
      if (booking) {
        // Navigate to booking confirmation page
        router.push(`/flights/booking_data/${booking.bookingRef}`);
      } else {
        setError('There was an error processing your booking. Please try again.');
      }
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow bg-gray-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading booking form...</p>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link href={`/flights/flight_details/${flight.id}`} className="text-primary hover:text-primary-dark flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Flight Details
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Complete Your Booking</h1>
              <div className="flex items-center">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${formStep >= 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                  1
                </div>
                <div className={`w-10 h-1 ${formStep >= 2 ? 'bg-primary' : 'bg-gray-200'}`}></div>
                <div className={`flex items-center justify-center h-8 w-8 rounded-full ${formStep >= 2 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'}`}>
                  2
                </div>
              </div>
            </div>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {formStep === 1 ? 'Passenger Information' : 'Payment Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {formStep === 1 ? (
                    <PassengerForm 
                      passengerInfo={passengerInfo}
                      contactInfo={contactInfo}
                      onPassengerInfoChange={handlePassengerInfoChange}
                      onContactInfoChange={handleContactInfoChange}
                    />
                  ) : (
                    <div className="space-y-6">
                      {/* Payment Method Selection */}
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">Select Payment Method</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div 
                            className={`border rounded-md p-4 cursor-pointer hover:border-primary transition-colors ${paymentMethod === 'credit_card' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('credit_card')}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border border-gray-300 mr-3 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-primary' : ''}`}>
                                {paymentMethod === 'credit_card' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                              </div>
                              <div>
                                <p className="font-medium">Credit Card</p>
                                <div className="flex space-x-2 mt-2">
                                  <div className="h-6 w-10 bg-blue-600 rounded flex items-center justify-center text-white text-xs">VISA</div>
                                  <div className="h-6 w-10 bg-red-600 rounded flex items-center justify-center text-white text-xs">MC</div>
                                  <div className="h-6 w-10 bg-blue-800 rounded flex items-center justify-center text-white text-xs">AMEX</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div 
                            className={`border rounded-md p-4 cursor-pointer hover:border-primary transition-colors ${paymentMethod === 'bank_transfer' ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
                            onClick={() => setPaymentMethod('bank_transfer')}
                          >
                            <div className="flex items-center">
                              <div className={`w-5 h-5 rounded-full border border-gray-300 mr-3 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-primary' : ''}`}>
                                {paymentMethod === 'bank_transfer' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                              </div>
                              <div>
                                <p className="font-medium">Bank Transfer</p>
                                <p className="text-xs text-gray-500 mt-1">Direct transfer from your bank account</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Credit Card Form (simplified) */}
                      {paymentMethod === 'credit_card' && (
                        <div className="space-y-4">
                          <div>
                            <label htmlFor="card_number" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              id="card_number"
                              placeholder="1234 5678 9012 3456"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                id="expiry_date"
                                placeholder="MM/YY"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                              />
                            </div>
                            
                            <div>
                              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                placeholder="123"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label htmlFor="card_holder" className="block text-sm font-medium text-gray-700 mb-1">
                              Card Holder Name
                            </label>
                            <input
                              type="text"
                              id="card_holder"
                              placeholder="John Smith"
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </div>
                        </div>
                      )}
                      
                      {/* Bank Transfer Information */}
                      {paymentMethod === 'bank_transfer' && (
                        <div className="bg-gray-50 p-4 rounded-md">
                          <p className="text-sm text-gray-600 mb-3">
                            Please transfer the total amount to the following bank account:
                          </p>
                          <div className="space-y-2 text-sm">
                            <p><span className="font-medium">Bank Name:</span> Global Bank</p>
                            <p><span className="font-medium">Account Name:</span> FlightsLogic Inc.</p>
                            <p><span className="font-medium">Account Number:</span> 1234567890</p>
                            <p><span className="font-medium">SWIFT/BIC:</span> GLBNK123</p>
                            <p><span className="font-medium">Reference:</span> {params.bookingId}</p>
                          </div>
                          <div className="mt-4 text-sm text-amber-600">
                            <p>Please note: Your booking will be confirmed only after payment is received.</p>
                          </div>
                        </div>
                      )}
                      
                      {/* Terms and Conditions */}
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="terms"
                              type="checkbox"
                              checked={termsAccepted}
                              onChange={(e) => setTermsAccepted(e.target.checked)}
                              className="h-4 w-4 text-primary border-gray-300 rounded"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="text-gray-600">
                              I agree to the <a href="#" className="text-primary hover:underline">Terms and Conditions</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I understand the fare rules and cancellation policy.
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  {formStep === 1 ? (
                    <div className="w-full">
                      <Button 
                        variant="primary" 
                        className="w-full" 
                        onClick={handleContinue}
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full flex flex-col md:flex-row gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1" 
                        onClick={handleBack}
                      >
                        Back
                      </Button>
                      <Button 
                        variant="primary" 
                        className="flex-1" 
                        onClick={handleBookNow}
                      >
                        Complete Booking
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </div>
            
            <div>
              <BookingSummary flight={flight} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
