/**
 * Utility functions for the application
 */

// Format date to display in a readable format
export function formatDate(dateString) {
  const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

// Format time to display in 12-hour format with AM/PM
export function formatTime(timeString) {
  const date = new Date(`2000-01-01T${timeString}`);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Format duration from minutes to hours and minutes
export function formatDuration(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Calculate time difference between departure and arrival
export function calculateDuration(departureTime, arrivalTime, departureDate, arrivalDate) {
  const departure = new Date(`${departureDate}T${departureTime}`);
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
  const diff = arrival - departure;
  return Math.floor(diff / (1000 * 60));
}

// Format price with currency symbol
export function formatPrice(price, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(price);
}

// Generate a unique booking reference
export function generateBookingReference() {
  const prefix = 'TRP';
  const timestamp = Date.now();
  return `${prefix}${timestamp}`;
}

// Convert to base64
export function encodeToBase64(str) {
  return typeof window !== 'undefined' 
    ? window.btoa(str) 
    : Buffer.from(str).toString('base64');
}

// Convert from base64
export function decodeFromBase64(str) {
  return typeof window !== 'undefined' 
    ? window.atob(str) 
    : Buffer.from(str, 'base64').toString();
}

// Handle API errors
export function handleApiError(error) {
  console.error('API Error:', error);
  return {
    error: true,
    message: error.message || 'An unknown error occurred',
  };
}

// Validate email format
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Class merging utility
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
