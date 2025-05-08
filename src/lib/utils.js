/**
 * Utility functions for the application
 */

// Format date string to DD MMM YYYY format
export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

// Format time string to HH:mm format
export function formatTime(timeString) {
  if (!timeString) return '';
  return timeString;
}

// Format duration from minutes to hours and minutes
export const formatDuration = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Calculate time difference between departure and arrival
export function calculateDuration(departureTime, arrivalTime, departureDate, arrivalDate) {
  const departure = new Date(`${departureDate}T${departureTime}`);
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);
  const diff = arrival - departure;
  return Math.floor(diff / (1000 * 60));
}

// Format price with currency symbol
export const formatPrice = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

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

// Helper function to get status badge variant
export const getStatusVariant = (status) => {
  const variants = {
    confirmed: 'success',
    ticketed: 'success',
    pending: 'warning',
    cancelled: 'error',
    voided: 'error',
    'refund-requested': 'warning',
    'refund-approved': 'success',
    'refund-rejected': 'error',
    'in-process': 'warning'
  };
  return variants[status?.toLowerCase()] || 'default';
};
