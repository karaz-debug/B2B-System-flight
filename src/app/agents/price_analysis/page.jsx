import React from 'react';

export default function PriceAnalysisPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Price Analysis Dashboard</h1>
      <div className="bg-white p-6 rounded shadow w-full max-w-2xl">
        {/* TODO: Integrate Amadeus Flight Price Analysis API here */}
        <p>Price trends and analysis will be displayed here.</p>
      </div>
    </div>
  );
} 