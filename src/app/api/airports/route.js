import { NextResponse } from 'next/server';
import amadeusService from '@/lib/services/amadeusService';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const keyword = searchParams.get('keyword');
  if (!keyword || keyword.length < 2) {
    return NextResponse.json({ data: [] });
  }
  try {
    const data = await amadeusService.searchAirports(keyword);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error searching airports:', error);
    return NextResponse.json({ error: 'Failed to fetch suggestions', details: error.message }, { status: 500 });
  }
} 