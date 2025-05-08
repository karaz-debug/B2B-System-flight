'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import Header from '@/components/global/Header';
import Sidebar from '@/components/global/Sidebar';

export default function AddSubAgentPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Add New Sub-Agent</h1>
              <Button variant="link" className="text-gray-600">Home</Button>
            </div>
            
            <Card className="bg-white shadow-sm">
              <form className="space-y-6 p-6">
                {/* Basic Information */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Agency Name</label>
                      <Input placeholder="Enter agency name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                      <Input placeholder="Enter contact person name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <Input type="email" placeholder="Enter email address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <Input type="password" placeholder="Enter password" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input placeholder="Enter address" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Pincode/Zipcode</label>
                      <Input placeholder="Enter pincode/zipcode" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                      <Input placeholder="Enter city" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <Select>
                        <option value="">Select Your Country</option>
                        {/* Add country options here */}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Telephone No.</label>
                      <Input placeholder="Number should be in digits" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Logo</label>
                      <Input type="file" className="cursor-pointer" />
                    </div>
                  </div>
                </div>

                {/* Product Access Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Product Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product1" />
                        <span className="text-gray-700">Product 1</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product2" />
                        <span className="text-gray-700">Product 2</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product3" />
                        <span className="text-gray-700">Product 3</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product4" />
                        <span className="text-gray-700">Product 4</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product5" />
                        <span className="text-gray-700">Product 5</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product6" />
                        <span className="text-gray-700">Product 6</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product7" />
                        <span className="text-gray-700">Product 7</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product8" />
                        <span className="text-gray-700">Product 8</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="product9" />
                        <span className="text-gray-700">Product 9</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Menu Access Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Menu Access</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu1" />
                        <span className="text-gray-700">Menu 1</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu2" />
                        <span className="text-gray-700">Menu 2</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu3" />
                        <span className="text-gray-700">Menu 3</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu4" />
                        <span className="text-gray-700">Menu 4</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu5" />
                        <span className="text-gray-700">Menu 5</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu6" />
                        <span className="text-gray-700">Menu 6</span>
                      </label>
                    </div>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu7" />
                        <span className="text-gray-700">Menu 7</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu8" />
                        <span className="text-gray-700">Menu 8</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox id="menu9" />
                        <span className="text-gray-700">Menu 9</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Button variant="outline" type="button" className="border-gray-300">Cancel</Button>
                  <Button type="submit" className="bg-primary hover:bg-primary/90 text-white">Submit</Button>
                </div>
              </form>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}