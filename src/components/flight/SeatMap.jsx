import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Seat = ({ number, status, onSelect, isSelected }) => {
  const getSeatClass = () => {
    let baseClass = 'w-8 h-8 rounded flex items-center justify-center font-semibold text-xs transition-all';
    if (status === 'OCCUPIED') {
      return `${baseClass} bg-gray-300 text-gray-500 cursor-not-allowed`;
    }
    if (isSelected) {
      return `${baseClass} bg-primary text-primary-foreground shadow-lg scale-110`;
    }
    if (status === 'BLOCKED') {
        return `${baseClass} bg-yellow-200 text-yellow-800 cursor-not-allowed`;
    }
    return `${baseClass} bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer`;
  };

  return (
    <div className={getSeatClass()} onClick={() => status === 'AVAILABLE' && onSelect(number)}>
      {number}
    </div>
  );
};

const SeatMap = ({ onSeatSelect, selectedSeats = [] }) => {
  // Mocked seat layout for a typical narrow-body aircraft (e.g., A320/B737)
  const layout = {
    rows: 30,
    seatsPerRow: 6, // 3 on each side of the aisle
    aisleAfter: 3,
  };

  // Mocked seat statuses
  const generateSeats = () => {
    const seats = [];
    for (let row = 1; row <= layout.rows; row++) {
      for (let col = 0; col < layout.seatsPerRow; col++) {
        const seatNumber = `${row}${String.fromCharCode(65 + col)}`;
        let status = 'AVAILABLE';
        // Randomly make some seats occupied for demonstration
        if (Math.random() < 0.2) status = 'OCCUPIED';
        if (row > 25) status = 'BLOCKED'; // Mock some blocked seats
        
        seats.push({ number: seatNumber, status });
      }
    }
    return seats;
  };

  const seats = generateSeats();

  const handleSelectSeat = (seatNumber) => {
    onSeatSelect(seatNumber);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Select Your Seat</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-gray-800 text-white p-4 rounded-t-lg text-center font-mono">
          AIRCRAFT CABIN
        </div>
        <div className="p-4 bg-white rounded-b-lg border shadow-inner overflow-x-auto">
          <div className="flex flex-col items-center space-y-2">
            {Array.from({ length: layout.rows }).map((_, rowIndex) => (
              <div key={rowIndex} className="flex items-center space-x-2">
                {Array.from({ length: layout.seatsPerRow }).map((_, colIndex) => {
                  const seatIndex = rowIndex * layout.seatsPerRow + colIndex;
                  const seat = seats[seatIndex];
                  if (colIndex === layout.aisleAfter) {
                    return (
                      <div key={`aisle-${rowIndex}`} className="w-8 h-8 flex items-center justify-center text-gray-400 font-bold">{rowIndex + 1}</div>
                    );
                  }
                  return (
                    <Seat
                      key={seat.number}
                      number={seat.number}
                      status={seat.status}
                      onSelect={handleSelectSeat}
                      isSelected={selectedSeats.includes(seat.number)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center space-x-4 mt-4 text-xs">
            <div className="flex items-center"><div className="w-4 h-4 rounded bg-green-100 mr-1"></div>Available</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded bg-primary mr-1"></div>Selected</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded bg-gray-300 mr-1"></div>Occupied</div>
            <div className="flex items-center"><div className="w-4 h-4 rounded bg-yellow-200 mr-1"></div>Blocked</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeatMap; 