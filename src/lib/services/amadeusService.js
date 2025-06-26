// Amadeus API Service Layer
class AmadeusService {
  constructor() {
    this.baseUrl = 'https://test.api.amadeus.com/v2';
    this.baseUrlV1 = 'https://test.api.amadeus.com/v1';
    this.token = null;
    this.tokenExpiry = null;
  }

  async authenticate() {
    // Read env vars here
    const clientId = process.env.AMADEUS_CLIENT_ID;
    const clientSecret = process.env.AMADEUS_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      throw new Error('Amadeus credentials are missing in environment variables');
    }
    if (this.token && this.tokenExpiry && Date.now() < this.tokenExpiry) {
      return this.token;
    }
    const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`
    });
    const data = await res.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in - 60) * 1000;
    return this.token;
  }

  async searchFlights(params) {
    const token = await this.authenticate();
    const url = `${this.baseUrl}/shopping/flight-offers`;

    // Build travelers array
    const travelers = [];
    for (let i = 0; i < (params.adults || 1); i++) {
      travelers.push({ id: `${travelers.length + 1}`, travelerType: "ADULT" });
    }
    for (let i = 0; i < (params.children || 0); i++) {
      travelers.push({ id: `${travelers.length + 1}`, travelerType: "CHILD" });
    }
    for (let i = 0; i < (params.infants || 0); i++) {
      travelers.push({ id: `${travelers.length + 1}`, travelerType: "HELD_INFANT" });
    }

    // Build originDestinations array with departureDateTimeRange
    const originDestinations = [
      {
        id: "1",
        originLocationCode: params.originLocationCode,
        destinationLocationCode: params.destinationLocationCode,
        departureDateTimeRange: { date: params.departureDate }
      }
    ];
    if (params.returnDate) {
      originDestinations.push({
        id: "2",
        originLocationCode: params.destinationLocationCode,
        destinationLocationCode: params.originLocationCode,
        departureDateTimeRange: { date: params.returnDate }
      });
    }

    const body = {
      currencyCode: params.currencyCode || "USD",
      originDestinations,
      travelers,
      sources: ["GDS"],
      searchCriteria: {
        maxFlightOffers: params.max || 20,
        flightFilters: {
          cabinRestrictions: [
            {
              cabin: (params.travelClass || "ECONOMY").toUpperCase(),
              coverage: "MOST_SEGMENTS",
              originDestinationIds: originDestinations.map(od => od.id)
            }
          ]
        }
      }
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Amadeus API error: ${error}`);
    }
    const data = await res.json();
    return data;
  }

  async searchAirports(keyword) {
    const token = await this.authenticate();
    const url = `${this.baseUrlV1}/reference-data/locations?keyword=${encodeURIComponent(keyword)}&subType=AIRPORT,CITY&view=FULL&sort=analytics.travelers.score`;
    const res = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Amadeus API error: ${error}`);
    }
    const data = await res.json();
    return data;
  }

  async getFlightPrice(pricingRequest) {
    const token = await this.authenticate();
    const url = `https://test.api.amadeus.com/v1/shopping/flight-offers/pricing`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(pricingRequest)
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Amadeus API error: ${error}`);
    }
    const data = await res.json();
    return data;
  }

  async createBooking(bookingData) {
    // Placeholder for booking creation
    // Use /booking/flight-orders endpoint
  }

  async createOrder(order) {
    const token = await this.authenticate();
    const url = `${this.baseUrlV1}/booking/flight-orders`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });
    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Amadeus API error: ${error}`);
    }
    const data = await res.json();
    return data;
  }

  async getOrder(orderId) {
    // Placeholder for order management
    // Use /booking/flight-orders/{orderId} endpoint
  }

  // Add more methods as needed (seat map, branded fares, etc.)
}

export default new AmadeusService(); 