'use client';
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Add a list of country codes
const COUNTRY_CODES = [
  { code: '254', label: 'Kenya (+254)' },
  { code: '33', label: 'France (+33)' },
  { code: '1', label: 'USA/Canada (+1)' },
  { code: '44', label: 'UK (+44)' },
  { code: '234', label: 'Nigeria (+234)' },
  { code: '91', label: 'India (+91)' },
  { code: '49', label: 'Germany (+49)' },
  { code: '81', label: 'Japan (+81)' },
  { code: '61', label: 'Australia (+61)' },
  { code: '27', label: 'South Africa (+27)' },
  // Add more as needed
];

const PassengerForm = ({ flight, onSubmit, buttonLabel = 'Confirm & Book' }) => {
  const [travelers, setTravelers] = useState([
    {
      id: '1',
      dateOfBirth: '',
      name: { firstName: '', lastName: '' },
      gender: '',
      contact: { emailAddress: '', phones: [{ deviceType: 'MOBILE', countryCallingCode: '', number: '' }] },
      documents: [{ documentType: 'PASSPORT', number: '', expiryDate: '', issuanceCountry: '', nationality: '', holder: true }]
    }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateTraveler = (traveler) => {
    const errs = {};
    // Validate country calling code
    const code = traveler.contact.phones[0].countryCallingCode;
    if (!code || !/^[0-9]{1,4}$/.test(code)) {
      errs.countryCallingCode = 'Country calling code must be 1–4 digits, e.g. 33 for France, 254 for Kenya.';
    }
    // You can add more validations here if needed
    return errs;
  };

  const handleTravelerChange = (index, field, value) => {
    const updatedTravelers = [...travelers];
    const fieldParts = field.split('.');
    let current = updatedTravelers[index];
    for (let i = 0; i < fieldParts.length - 1; i++) {
      current = current[fieldParts[i]];
    }
    current[fieldParts[fieldParts.length - 1]] = value;
    setTravelers(updatedTravelers);
    // Validate on change
    const newErrors = { ...errors };
    newErrors[index] = validateTraveler(updatedTravelers[index]);
    setErrors(newErrors);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Validate all travelers
    const newErrors = {};
    travelers.forEach((traveler, idx) => {
      newErrors[idx] = validateTraveler(traveler);
    });
    setErrors(newErrors);
    // If any errors, prevent submit
    const hasError = Object.values(newErrors).some(errObj => Object.keys(errObj).length > 0);
    if (hasError) {
      setIsSubmitting(false);
      return;
    }
    onSubmit({ travelers });
    // In a real scenario, you might want to handle the response
    // and only set isSubmitting to false on success/error
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Passenger Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {travelers.map((traveler, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <h3 className="font-semibold text-lg">Traveler {index + 1}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`firstName-${index}`}>First Name</Label>
                  <Input id={`firstName-${index}`} value={traveler.name.firstName} onChange={(e) => handleTravelerChange(index, 'name.firstName', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor={`lastName-${index}`}>Last Name</Label>
                  <Input id={`lastName-${index}`} value={traveler.name.lastName} onChange={(e) => handleTravelerChange(index, 'name.lastName', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor={`dob-${index}`}>Date of Birth</Label>
                  <Input
                    id={`dob-${index}`}
                    type="date"
                    value={traveler.dateOfBirth}
                    onChange={(e) => handleTravelerChange(index, 'dateOfBirth', e.target.value)}
                    required
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor={`gender-${index}`}>Gender</Label>
                  <Select onValueChange={(value) => handleTravelerChange(index, 'gender', value)} required>
                    <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MALE">Male</SelectItem>
                      <SelectItem value="FEMALE">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <h4 className="font-semibold pt-4 border-t mt-4">Contact Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`email-${index}`}>Email Address</Label>
                  <Input id={`email-${index}`} type="email" value={traveler.contact.emailAddress} onChange={(e) => handleTravelerChange(index, 'contact.emailAddress', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor={`phone-${index}`}>Phone Number</Label>
                  <Input id={`phone-${index}`} type="tel" value={traveler.contact.phones[0].number} onChange={(e) => handleTravelerChange(index, 'contact.phones.0.number', e.target.value)} required />
                </div>
                {/* Country Calling Code Dropdown - always visible */}
                <div>
                  <Label htmlFor={`countryCallingCode-${index}`}>Country Calling Code</Label>
                  <select
                    id={`countryCallingCode-${index}`}
                    value={traveler.contact.phones[0].countryCallingCode}
                    onChange={e => handleTravelerChange(index, 'contact.phones.0.countryCallingCode', e.target.value)}
                    required
                    className="block w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select country code</option>
                    {COUNTRY_CODES.map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.label}</option>
                    ))}
                  </select>
                  {errors[index]?.countryCallingCode && (
                    <div className="text-red-600 text-xs mt-1">{errors[index].countryCallingCode}</div>
                  )}
                </div>
              </div>

              <h4 className="font-semibold pt-4 border-t mt-4">Passport Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`passport-${index}`}>Passport Number</Label>
                  <Input id={`passport-${index}`} value={traveler.documents[0].number} onChange={(e) => handleTravelerChange(index, 'documents.0.number', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor={`expiry-${index}`}>Expiry Date</Label>
                  <Input id={`expiry-${index}`} type="date" value={traveler.documents[0].expiryDate} onChange={(e) => handleTravelerChange(index, 'documents.0.expiryDate', e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor={`issuance-${index}`}>Issuance Country (2-letter code)</Label>
                  <Input id={`issuance-${index}`} value={traveler.documents[0].issuanceCountry} onChange={(e) => handleTravelerChange(index, 'documents.0.issuanceCountry', e.target.value.toUpperCase())} maxLength="2" required />
                </div>
                <div>
                  <Label htmlFor={`nationality-${index}`}>Nationality (2-letter code)</Label>
                  <Input id={`nationality-${index}`} value={traveler.documents[0].nationality} onChange={(e) => handleTravelerChange(index, 'documents.0.nationality', e.target.value.toUpperCase())} maxLength="2" required />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" disabled={isSubmitting}>
            {isSubmitting ? (buttonLabel === 'Confirm & Book' ? 'Submitting Booking...' : 'Processing...') : buttonLabel}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default PassengerForm;
