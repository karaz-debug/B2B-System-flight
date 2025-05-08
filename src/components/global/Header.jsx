import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <img src="/assets/logo.svg" alt="FlightLogic" className="h-8" />
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/agents/dashboard">Dashboard</Link>
            </Button>
            
            {/* Administration Dropdown */}
            <div className="relative group">
              <Button variant="ghost" className="relative z-50">
                Administration
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
              {/* Added a pseudo-element to create a hover bridge */}
              <div className="absolute top-full left-0 w-48 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="bg-white border rounded-md shadow-lg py-1">
                  <Link href="/administration/sub-agents/add" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Add Sub Agent
                  </Link>
                  <Link href="/administration/manage-subagent" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Manage Sub Agents
                  </Link>
                </div>
              </div>
            </div>

            <Button variant="ghost" asChild>
              <Link href="/bookings">Bookings</Link>
            </Button>
            
            <Button variant="ghost" asChild>
              <Link href="/agents/searchIndex">Flights</Link>
            </Button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* User Avatar Dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 focus:outline-none">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 z-50 hidden group-hover:block w-48 bg-white border rounded-md shadow-lg py-1 mt-1">
                <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Settings
                </Link>
                <div className="border-t border-gray-100"></div>
                <button 
                  onClick={() => {
                    // Add logout logic here
                    console.log('Logging out...');
                  }} 
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
