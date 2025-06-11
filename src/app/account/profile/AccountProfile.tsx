"use client";

import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Simple user data - in a real app, this would come from your auth context or API
export default function AccountProfile() {
  const [formData, setFormData] = useState({
    name: 'Arman Habib Nahid ', // Default values - in a real app, these would come from your user context or API
    email: 'john@example.com',
    phone: '',
    company: 'Multilat Inc',
    position: 'Developer',
    avatar: '/avater-01.webp' // Default avatar URL
  });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(prev => ({
          ...prev,
          avatar: ev.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic, including uploading avatarFile if needed
    console.log('Profile updated:', formData, avatarFile);
  };
  return (
    <Card className="mx-auto p-6 shadow rounded-lg">
      <div className="relative w-fit mx-auto mb-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={formData?.avatar} alt={formData.name} />
          <AvatarFallback>{formData.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Button
          type="button"
          size="icon"
          variant="default"
          className="absolute bottom-0 right-0 rounded-full p-2 shadow"
          onClick={handleAvatarClick}
          aria-label="Edit profile image"
        >
          
          <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512" fill="currentColor" stroke="currentColor" color='currentColor'><path d="M22.853,1.148a3.626,3.626,0,0,0-5.124,0L1.465,17.412A4.968,4.968,0,0,0,0,20.947V23a1,1,0,0,0,1,1H3.053a4.966,4.966,0,0,0,3.535-1.464L22.853,6.271A3.626,3.626,0,0,0,22.853,1.148ZM5.174,21.122A3.022,3.022,0,0,1,3.053,22H2V20.947a2.98,2.98,0,0,1,.879-2.121L15.222,6.483l2.3,2.3ZM21.438,4.857,18.932,7.364l-2.3-2.295,2.507-2.507a1.623,1.623,0,1,1,2.295,2.3Z"/></svg>
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>
      <CardHeader className="text-center mb-4">
        <CardTitle className="text-lg font-medium mb-6">Profile Information</CardTitle>
      </CardHeader>
        
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-muted-foreground">
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
            <label htmlFor="email" className="block text-sm font-medium text-muted-foreground">
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
            <label htmlFor="phone" className="block text-sm font-medium text-muted-foreground">
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
            <label htmlFor="company" className="block text-sm font-medium text-muted-foreground">
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
            <label htmlFor="position" className="block text-sm font-medium text-muted-foreground">
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
          <Button type="submit" className="px-6 text-primary-foreground">
            Save Changes
          </Button>
        </div>
      </form>
    </Card>
  );
}
