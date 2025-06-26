import { NextResponse } from 'next/server';
import amadeus from '@/lib/services/amadeusService';

// Recursively remove clientId and any non-Amadeus fields
function deepCleanOffer(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepCleanOffer);
  } else if (obj && typeof obj === 'object') {
    const cleaned = {};
    for (const key in obj) {
      if (key === 'clientId') continue;
      cleaned[key] = deepCleanOffer(obj[key]);
    }
    return cleaned;
  }
  return obj;
}

export async function POST(request) {
  const { flightOffer } = await request.json();
  if (!flightOffer) {
    return NextResponse.json({ message: 'Missing flight offer data' }, { status: 400 });
  }
  // Deep clean the offer
  const amadeusOffer = deepCleanOffer(flightOffer);
  try {
    const confirmedPriceData = await amadeus.getFlightPrice({
      data: {
        type: 'flight-offers-pricing',
        flightOffers: [amadeusOffer],
      },
    });
    return NextResponse.json(confirmedPriceData, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error confirming flight price', error: error.message }, { status: 500 });
  }
} 