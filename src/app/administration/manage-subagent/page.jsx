'use client';
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import Header from '@/components/global/Header';
import Sidebar from '@/components/global/Sidebar';

export default function ManageSubAgent() {
  const [subAgents, setSubAgents] = useState([
    {
      id: 1,
      slNo: 1,
      agencyName: 'jamal travel',
      city: 'nairobi',
      country: 'Kenya',
      mobile: '0725917635',
      email: 'abdiqafartraderabukar@gmail.com',
      status: 'Inactive',
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const handleExport = (type) => {
    // Implementation for export functionality
    console.log(`Exporting as ${type}`);
  };

  const handleStatusUpdate = (id) => {
    // Implementation for status update
    console.log(`Updating status for ${id}`);
  };

  const handleCreditUpdate = (id) => {
    // Implementation for credit update
    console.log(`Updating credit for ${id}`);
  };

  const handleMarkupUpdate = (id) => {
    // Implementation for markup update
    console.log(`Updating markup for ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">B2B Agents</h1>
              <Button variant="link" className="text-gray-600">Home</Button>
            </div>

            <Card className="bg-white shadow-sm p-6">
              <div className="space-y-4">
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button onClick={() => handleExport('copy')} variant="default" className="bg-primary hover:bg-primary/90 text-white">
                    Copy
                  </Button>
                  <Button onClick={() => handleExport('excel')} variant="default" className="bg-primary hover:bg-primary/90 text-white">
                    Excel
                  </Button>
                  <Button onClick={() => handleExport('pdf')} variant="default" className="bg-primary hover:bg-primary/90 text-white">
                    PDF
                  </Button>
                  <Button onClick={() => handleExport('print')} variant="default" className="bg-primary hover:bg-primary/90 text-white">
                    Print
                  </Button>
                </div>

                {/* Search */}
                <div className="flex justify-end">
                  <div className="w-80">
                    <label className="text-sm text-gray-600">Search:</label>
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="text-center w-10"><span className="cursor-pointer">▲</span></TableHead>
                        <TableHead className="text-gray-600">SI No</TableHead>
                        <TableHead className="text-gray-600">Agency Name</TableHead>
                        <TableHead className="text-gray-600">City</TableHead>
                        <TableHead className="text-gray-600">Update Credit</TableHead>
                        <TableHead className="text-gray-600">Payment Requests</TableHead>
                        <TableHead className="text-gray-600">Update Markup</TableHead>
                        <TableHead className="text-gray-600">Country</TableHead>
                        <TableHead className="text-gray-600">Mobile</TableHead>
                        <TableHead className="text-gray-600">Email ID</TableHead>
                        <TableHead className="text-gray-600">Status</TableHead>
                        <TableHead className="text-gray-600">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subAgents.map((agent) => (
                        <TableRow key={agent.id} className="hover:bg-gray-50">
                          <TableCell className="text-center">
                            <input type="checkbox" className="rounded border-gray-300" />
                          </TableCell>
                          <TableCell>{agent.slNo}</TableCell>
                          <TableCell className="font-medium">{agent.agencyName}</TableCell>
                          <TableCell>{agent.city}</TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleCreditUpdate(agent.id)}
                              variant="link"
                              className="text-primary hover:text-primary/90 p-0"
                            >
                              Update Credit
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline"
                              className="bg-primary hover:bg-primary/90 p-1 rounded-full"
                            >
                              <span className="text-white">👁</span>
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Button
                              onClick={() => handleMarkupUpdate(agent.id)}
                              variant="link"
                              className="text-primary hover:text-primary/90 p-0"
                            >
                              Update Markup
                            </Button>
                          </TableCell>
                          <TableCell>{agent.country}</TableCell>
                          <TableCell>{agent.mobile}</TableCell>
                          <TableCell className="text-gray-600">{agent.email}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              agent.status === 'Active' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {agent.status}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" className="bg-primary hover:bg-primary/90 text-white">
                              Action
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                  <div>Showing 1 to 1 of 1 entries</div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-gray-200 text-gray-600"
                    >
                      Previous
                    </Button>
                    <Button
                      variant="default"
                      className="bg-gray-100 text-gray-800 border-gray-200"
                    >
                      1
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setCurrentPage(prev => prev + 1)}
                      disabled={true}
                      className="border-gray-200 text-gray-600"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}