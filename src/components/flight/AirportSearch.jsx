import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash';

export default function AirportSearch({ onSelect, placeholder = "Search airport or city..." }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async (value) => {
    if (value.length < 2) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/airports?keyword=${encodeURIComponent(value)}`);
      if (!res.ok) {
        // Try to parse error from Amadeus
        const errBody = await res.json().catch(() => null);
        const detail = errBody?.error?.detail || 'Failed to fetch suggestions';
        throw new Error(detail);
      }
      const data = await res.json();
      setSuggestions(data.data || []);
    } catch (err) {
      setError(err.message);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounce the fetch function
  const debouncedFetch = useCallback(debounce(fetchSuggestions, 500), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
    debouncedFetch(value);
  };

  const handleSelect = (airport) => {
    setInput(`${airport.name} (${airport.iataCode})`);
    setSuggestions([]);
    if (onSelect) onSelect(airport);
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder={placeholder}
        className="border p-2 rounded w-full"
        value={input}
        onChange={handleChange}
        autoComplete="off"
      />
      {loading && <div className="absolute left-0 right-0 bg-white border-t p-2 text-sm text-gray-500">Loading...</div>}
      {error && <div className="absolute left-0 right-0 bg-white border-t p-2 text-sm text-red-500">{error}</div>}
      {suggestions.length > 0 && (
        <ul className="absolute left-0 right-0 bg-white border-t z-10 max-h-60 overflow-y-auto">
          {suggestions.map((airport) => (
            <li
              key={airport.id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelect(airport)}
            >
              {airport.name} ({airport.iataCode}) - {airport.address?.cityName || airport.address?.countryName}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 