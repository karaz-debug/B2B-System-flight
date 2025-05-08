'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/global/Header';
import Footer from '@/components/global/Footer';
import BookingConfirmation from '@/components/flight/BookingConfirmation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import TicketInvoiceViewer from '@/components/flight/TicketInvoiceViewer';

export default function BookingDetails() {
  const params = useParams();
  const router = useRouter();
  const [activeAction, setActiveAction] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [showTicket, setShowTicket] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/bookings/${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch booking');
        }
        const data = await response.json();
        setBooking(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchBooking();
    }
  }, [params.id]);

  const handleDownloadTicket = () => {
    setShowTicket(true);
  };

  const handleSendEmail = async () => {
    // Email sending logic here
  };

  const handleCancel = async () => {
    // Cancellation logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              <div className="h-32 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-gray-50 p-6">
          <div className="max-w-7xl mx-auto">
            <Alert variant="destructive">
              <AlertDescription>Booking not found</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6">
            <Link 
              href="/bookings"
              className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Back to Bookings
            </Link>
          </div>

          {/* Quick Actions */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="outline" 
                  className={activeAction === 'fareRule' ? 'bg-primary/10' : ''}
                  onClick={() => setActiveAction('fareRule')}
                >
                  Fare Rule
                </Button>
                <Button 
                  variant="outline"
                  className={activeAction === 'enquiry' ? 'bg-primary/10' : ''}
                  onClick={() => setActiveAction('enquiry')}
                >
                  Enquiry
                </Button>
                <Button 
                  variant="outline"
                  className={activeAction === 'changeRequest' ? 'bg-primary/10' : ''}
                  onClick={() => setActiveAction('changeRequest')}
                >
                  Change Request
                </Button>
                <Button 
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/5"
                  onClick={() => setShowInvoice(true)}
                >
                  View Invoice
                </Button>
                <Button 
                  variant="outline"
                  className="text-primary border-primary hover:bg-primary/5"
                  onClick={() => setShowTicket(true)}
                >
                  Open Ticket
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Action Content */}
          {activeAction && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>
                  {activeAction === 'fareRule' && 'Fare Rules'}
                  {activeAction === 'enquiry' && 'Submit Enquiry'}
                  {activeAction === 'changeRequest' && 'Change Request Form'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {activeAction === 'fareRule' && (
                  <div className="prose max-w-none">
                    <h3>Fare Rules for Booking {booking.pnr}</h3>
                    {/* Add fare rules content */}
                  </div>
                )}
                {activeAction === 'enquiry' && (
                  <div className="space-y-4">
                    {/* Add enquiry form */}
                  </div>
                )}
                {activeAction === 'changeRequest' && (
                  <div className="space-y-4">
                    {/* Add change request form */}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          <BookingConfirmation
            booking={booking}
            onDownloadTicket={handleDownloadTicket}
            onSendEmail={handleSendEmail}
            onCancel={handleCancel}
          />

          {/* Ticket Dialog */}
          <Dialog open={showTicket} onOpenChange={setShowTicket}>
            <DialogContent className="max-w-4xl w-full">
              <TicketInvoiceViewer type="ticket" booking={booking} />
            </DialogContent>
          </Dialog>

          {/* Invoice Dialog */}
          <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
            <DialogContent className="max-w-4xl w-full">
              <TicketInvoiceViewer type="invoice" booking={booking} />
            </DialogContent>
          </Dialog>
        </div>
      </main>
      <Footer />
    </div>
  );
}