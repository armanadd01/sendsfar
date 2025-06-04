"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@radix-ui/react-avatar';

// Simple user data - in a real app, this would come from your auth context or API
export default function AccountProfile() {
  const [formData, setFormData] = useState({
    name: 'Arman Habib Nahid ', // Default values - in a real app, these would come from your user context or API
    email: 'john@example.com',
    phone: '',
    company: 'Acme Inc',
    position: 'Software Developer',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log('Profile updated:', formData);
  };

  return (
    <div>
      <Avatar className="w-24 h-24 mb-6">
      
      </Avatar>
      <h2 className="text-lg font-medium mb-6">Profile Information</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <Input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <Input
              type="tel"
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <Input
              type="text"
              name="company"
              id="company"
              value={formData.company}
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          <div>
            <label htmlFor="position" className="block text-sm font-medium text-gray-700">
              Position
            </label>
            <Input
              type="text"
              name="position"
              id="position"
              value={formData.position}
              onChange={handleChange}
              className="mt-1"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button type="submit" className="px-6">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
