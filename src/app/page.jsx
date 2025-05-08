'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    // For demo purposes, always redirect to dashboard
    router.push('/agents/dashboard');
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!forgotEmail) {
      setError('Please enter your email address');
      return;
    }
    
    // Success message
    setError('Password reset instructions have been sent to your email');
    // Reset form
    setForgotEmail('');
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 z-10">
        <header className="bg-white shadow-sm p-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="flex items-center">
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
            <div className="flex items-center space-x-4">
              <Link href="/agents/dashboard" className="text-sm font-medium text-primary hover:text-primary-dark">
                Agent Login
              </Link>
              <Link href="#" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                Request Demo
              </Link>
            </div>
          </div>
        </header>
      </div>

      <main className="flex-grow flex items-center justify-center relative" style={{ paddingTop: '64px' }}>
        {/* Background Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="https://pixabay.com/get/g620fa07cb9a7b7491a8407fe0560fad4cd470544724686f9cdbd00883495d2d51152d7e4d07d05bb0eae410e3ef61a026b40ea3885dbea12c6b246177f097528_1280.jpg" 
            alt="Tropical Resort" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        <Card className="w-full max-w-md z-10 shadow-xl mx-4">
          <CardContent className="p-6">
            {!showForgotPassword ? (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Agent Login</h1>
                  <p className="text-sm text-gray-600 mt-1">Access your B2B flight booking portal</p>
                </div>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                      User Name or Email Id
                    </label>
                    <div className="relative">
                      <Input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter your username or email"
                        className="pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="companyCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Company Code
                    </label>
                    <div className="relative">
                      <Input
                        id="companyCode"
                        type="text"
                        value={companyCode}
                        onChange={(e) => setCompanyCode(e.target.value)}
                        placeholder="Enter company code"
                        className="pl-10"
                      />
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm8 8v2h1v1H4v-1h1v-2H4v-1h16v1h-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Checkbox 
                        id="remember-me" 
                        checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)}
                      />
                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm font-medium text-primary hover:text-primary-dark"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <Button type="submit" className="w-full" variant="primary">
                    Login
                  </Button>
                </form>
              </>
            ) : (
              <>
                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900">Forgot Password</h1>
                  <p className="text-sm text-gray-600 mt-1">Enter your email to reset your password</p>
                </div>

                {error && (
                  <Alert variant={error.includes('sent') ? 'success' : 'destructive'} className="mb-4">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleForgotPassword} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => setShowForgotPassword(false)}>
                      Back to Login
                    </Button>
                    <Button type="submit" variant="primary" className="flex-1">
                      Reset Password
                    </Button>
                  </div>
                </form>
              </>
            )}
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white py-6 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-4">
            <div className="flex justify-center space-x-6 mb-4">
              <div className="flex items-center">
                <span className="mr-2 text-sm text-gray-500">We Accept</span>
                <div className="flex space-x-2">
                  <div className="h-6 w-10 bg-blue-600 rounded flex items-center justify-center text-white text-xs">VISA</div>
                  <div className="h-6 w-10 bg-red-600 rounded flex items-center justify-center text-white text-xs">MC</div>
                  <div className="h-6 w-10 bg-blue-800 rounded flex items-center justify-center text-white text-xs">AMEX</div>
                </div>
              </div>
            </div>
            <p className="text-center text-sm text-gray-500">Copyright © 2023 Flights Logic. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
