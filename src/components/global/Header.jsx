import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const Header = () => {
  const pathname = usePathname();
  
  const isLoginPage = pathname === '/';
  const isAgent = pathname.includes('/agents');
  
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/agents/dashboard" className="flex-shrink-0">
              <svg width="200" height="50" viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                <path d="M30.5 10L40 20L30.5 30L21 20L30.5 10Z" fill="#0D9488" />
                <path d="M30.5 5L48 22.5L30.5 40L13 22.5L30.5 5Z" stroke="#0D9488" strokeWidth="2" />
                <path d="M60 22H56L64 12H68L60 22Z" fill="#0D9488" />
                <path d="M71 12H75V32H71V12Z" fill="#0D9488" />
                <path d="M80 12H84V15C85 13 87 12 89 12C94 12 96 15 96 20V32H92V21C92 17 91 16 88 16C85 16 84 18 84 21V32H80V12Z" fill="#0D9488" />
                <path d="M100 22C100 16 104 12 110 12C116 12 120 16 120 22C120 28 116 32 110 32C104 32 100 28 100 22ZM116 22C116 18 114 16 110 16C106 16 104 18 104 22C104 26 106 28 110 28C114 28 116 26 116 22Z" fill="#0D9488" />
                <path d="M122 12H126V15C127 13 129 12 131 12C136 12 138 15 138 20V32H134V21C134 17 133 16 130 16C127 16 126 18 126 21V32H122V12Z" fill="#0D9488" />
                <path d="M140 12H144V32H140V12Z" fill="#0D9488" />
                <path d="M146 22C146 16 150 12 156 12C160 12 165 14 166 19H161C160 17 158 16 156 16C152 16 150 18 150 22C150 26 152 28 156 28C158 28 160 27 161 25H166C165 30 160 32 156 32C150 32 146 28 146 22Z" fill="#0D9488" />
              </svg>
            </Link>
          </div>
          
          {!isLoginPage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link 
                  href="/agents/dashboard" 
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/agents/dashboard' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/agents/searchIndex" 
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium',
                    pathname === '/agents/searchIndex' 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  Search Flights
                </Link>
                <Link 
                  href="#" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Bookings
                </Link>
                <Link 
                  href="#" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Reports
                </Link>
                <Link 
                  href="#" 
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                >
                  Support
                </Link>
              </div>
            </div>
          )}
          
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {isLoginPage ? (
                <div className="flex space-x-4">
                  <Link 
                    href="/agents/login" 
                    className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary-dark"
                  >
                    Agent Login
                  </Link>
                  <Link 
                    href="/request-demo" 
                    className="px-3 py-2 rounded-md text-sm font-medium border border-primary text-primary hover:bg-gray-50"
                  >
                    Request Demo
                  </Link>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-700">Agent: John Doe</span>
                  <button className="p-1 rounded-full text-gray-700 hover:text-gray-900 focus:outline-none">
                    <span className="sr-only">View notifications</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button className="max-w-xs bg-gray-200 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                          JD
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              <span className="sr-only">Open main menu</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
