import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { format, parseISO } from 'date-fns';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return '';
  return format(parseISO(dateString), 'yyyy-MM-dd');
}

export function formatTime(timeString) {
  if (!timeString) return '';
  try {
    return format(parseISO(timeString), 'HH:mm');
  } catch (e) {
    return timeString; // Fallback for 'HH:mm' format
  }
}

export function formatDuration(isoDuration) {
    if (!isoDuration) return 'N/A';
    const matches = isoDuration.match(/PT(\d+H)?(\d+M)?/);
    if (!matches) return isoDuration;
    const hours = matches[1] ? parseInt(matches[1].slice(0, -1)) : 0;
    const minutes = matches[2] ? parseInt(matches[2].slice(0, -1)) : 0;
    return `${hours}h ${minutes}m`;
}

export function formatPrice(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}

export function generateBookingReference() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
