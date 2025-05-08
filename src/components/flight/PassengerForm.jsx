import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectOption } from '@/components/ui/select';
import { FormField, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';

const PassengerForm = ({ passengerInfo, contactInfo, onPassengerInfoChange, onContactInfoChange }) => {
  const [currentPassenger, setCurrentPassenger] = useState(0);
  
  const handlePassengerChange = (field, value) => {
    onPassengerInfoChange(currentPassenger, field, value);
  };
  
  const handleContactChange = (field, value) => {
    onContactInfoChange(field, value);
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };
  
  const validatePhone = (phone) => {
    // Basic validation - would be more complex in a real app
    return phone.length >= 5;
  };
  
  // Error states
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    dob: false,
    nationality: false,
    passportNumber: false,
    passportExpiry: false,
    email: false,
    phone: false
  });
  
  const handleBlur = (field, value) => {
    let hasError = false;
    
    switch (field) {
      case 'firstName':
      case 'lastName':
        hasError = !value || value.trim() === '';
        break;
      case 'dob':
        hasError = !value;
        break;
      case 'nationality':
        hasError = !value || value.trim() === '';
        break;
      case 'passportNumber':
        hasError = !value || value.length < 5;
        break;
      case 'passportExpiry':
        hasError = !value;
        break;
      case 'email':
        hasError = !validateEmail(value);
        break;
      case 'phone':
        hasError = !validatePhone(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [field]: hasError }));
  };
  
  return (
    <div className="space-y-6">
      {/* Passenger Information */}
      {passengerInfo.map((passenger, index) => (
        <div key={index} style={{ display: index === currentPassenger ? 'block' : 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Passenger {index + 1} {index === 0 ? '(Primary)' : ''}
            </h3>
            
            {passengerInfo.length > 1 && (
              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={() => setCurrentPassenger(prev => Math.max(0, prev - 1))}
                  disabled={currentPassenger === 0}
                  className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPassenger(prev => Math.min(passengerInfo.length - 1, prev + 1))}
                  disabled={currentPassenger === passengerInfo.length - 1}
                  className="px-3 py-1 text-sm rounded-md border border-gray-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <FormField>
              <FormLabel>Title</FormLabel>
              <Select
                value={passenger.title}
                onChange={(e) => handlePassengerChange('title', e.target.value)}
                required
              >
                <SelectOption value="">Select Title</SelectOption>
                <SelectOption value="Mr">Mr</SelectOption>
                <SelectOption value="Mrs">Mrs</SelectOption>
                <SelectOption value="Ms">Ms</SelectOption>
                <SelectOption value="Dr">Dr</SelectOption>
              </Select>
            </FormField>
            
            <FormField>
              <FormLabel>Gender</FormLabel>
              <Select
                value={passenger.gender}
                onChange={(e) => handlePassengerChange('gender', e.target.value)}
              >
                <SelectOption value="">Select Gender</SelectOption>
                <SelectOption value="male">Male</SelectOption>
                <SelectOption value="female">Female</SelectOption>
                <SelectOption value="other">Other</SelectOption>
              </Select>
            </FormField>
            
            <FormField>
              <FormLabel>First Name (as in passport)</FormLabel>
              <Input
                value={passenger.firstName || ''}
                onChange={(e) => handlePassengerChange('firstName', e.target.value)}
                onBlur={() => handleBlur('firstName', passenger.firstName)}
                placeholder="Enter first name"
                required
              />
              {errors.firstName && (
                <FormMessage>First name is required</FormMessage>
              )}
            </FormField>
            
            <FormField>
              <FormLabel>Last Name (as in passport)</FormLabel>
              <Input
                value={passenger.lastName || ''}
                onChange={(e) => handlePassengerChange('lastName', e.target.value)}
                onBlur={() => handleBlur('lastName', passenger.lastName)}
                placeholder="Enter last name"
                required
              />
              {errors.lastName && (
                <FormMessage>Last name is required</FormMessage>
              )}
            </FormField>
            
            <FormField>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                value={passenger.dob || ''}
                onChange={(e) => handlePassengerChange('dob', e.target.value)}
                onBlur={() => handleBlur('dob', passenger.dob)}
                max={new Date().toISOString().split('T')[0]}
                required
              />
              {errors.dob && (
                <FormMessage>Date of birth is required</FormMessage>
              )}
            </FormField>
            
            <FormField>
              <FormLabel>Nationality</FormLabel>
              <Input
                value={passenger.nationality || ''}
                onChange={(e) => handlePassengerChange('nationality', e.target.value)}
                onBlur={() => handleBlur('nationality', passenger.nationality)}
                placeholder="Enter nationality"
                required
              />
              {errors.nationality && (
                <FormMessage>Nationality is required</FormMessage>
              )}
            </FormField>
            
            <FormField>
              <FormLabel>Passport Number</FormLabel>
              <Input
                value={passenger.passportNumber || ''}
                onChange={(e) => handlePassengerChange('passportNumber', e.target.value)}
                onBlur={() => handleBlur('passportNumber', passenger.passportNumber)}
                placeholder="Enter passport number"
              />
              {errors.passportNumber && (
                <FormMessage>Valid passport number is required</FormMessage>
              )}
            </FormField>
            
            <FormField>
              <FormLabel>Passport Expiry Date</FormLabel>
              <Input
                type="date"
                value={passenger.passportExpiry || ''}
                onChange={(e) => handlePassengerChange('passportExpiry', e.target.value)}
                onBlur={() => handleBlur('passportExpiry', passenger.passportExpiry)}
                min={new Date().toISOString().split('T')[0]}
              />
              {errors.passportExpiry && (
                <FormMessage>Valid passport expiry date is required</FormMessage>
              )}
            </FormField>
          </div>
        </div>
      ))}
      
      {/* Pagination indicators */}
      {passengerInfo.length > 1 && (
        <div className="flex justify-center space-x-2 mb-6">
          {passengerInfo.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentPassenger(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentPassenger ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to passenger ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      <Separator className="my-6" />
      
      {/* Contact Information */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField>
            <FormLabel>Email Address</FormLabel>
            <Input
              type="email"
              value={contactInfo.email || ''}
              onChange={(e) => handleContactChange('email', e.target.value)}
              onBlur={() => handleBlur('email', contactInfo.email)}
              placeholder="Enter email address"
              required
            />
            {errors.email && (
              <FormMessage>Valid email address is required</FormMessage>
            )}
          </FormField>
          
          <FormField>
            <FormLabel>Phone Number</FormLabel>
            <Input
              type="tel"
              value={contactInfo.phone || ''}
              onChange={(e) => handleContactChange('phone', e.target.value)}
              onBlur={() => handleBlur('phone', contactInfo.phone)}
              placeholder="Enter phone number"
              required
            />
            {errors.phone && (
              <FormMessage>Valid phone number is required</FormMessage>
            )}
          </FormField>
          
          <FormField className="md:col-span-2">
            <FormLabel>Address (Optional)</FormLabel>
            <Input
              value={contactInfo.address || ''}
              onChange={(e) => handleContactChange('address', e.target.value)}
              placeholder="Enter address"
            />
          </FormField>
        </div>
        
        <div className="mt-4 text-sm text-gray-500">
          <p>
            <span className="font-medium">Note:</span> Booking confirmation and updates will be sent to this email address and phone number.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PassengerForm;
