"use client";

import { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function AccountSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement password change logic
    console.log('Password change requested');
  };

  const toggleTwoFactor = () => {
    // TODO: Implement 2FA toggle logic
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="space-y-8">
      {/* Password Update Section */}
      <Card className="rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Change Password</h2>
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div>
            <label htmlFor="current-password" className="block text-sm font-medium text-muted-foreground">
              Current Password
            </label>
            <Input
              type="password"
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-muted-foreground">
              New Password
            </label>
            <Input
              type="password"
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-muted-foreground">
              Confirm New Password
            </label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1"
              required
            />
          </div>
          <div className="pt-2">
            <Button type="submit" className="px-6 text-primary-foreground">
              Update Password
            </Button>
          </div>
        </form>
      </Card>

      {/* Two-Factor Authentication Section */}
      <Card className="rounded-lg shadow p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-primary">Two-Factor Authentication</h2>
            <p className="text-sm text-muted-foreground">
              {twoFactorEnabled 
                ? 'Two-factor authentication is currently enabled.'
                : 'Add an extra layer of security to your account.'}
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTwoFactor}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              twoFactorEnabled ? 'bg-primary' : 'bg-primary/50'
            }`}
            role="switch"
            aria-checked={twoFactorEnabled}
          >
            <span className="sr-only">Toggle two-factor authentication</span>
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        
        {twoFactorEnabled && (
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-primary">Set up your authenticator app</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Scan the QR code with your authenticator app or enter the code manually.
            </p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex-shrink-0 bg-white p-2 rounded">
                {/* Placeholder for QR Code */}
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                  <span className="text-xs text-gray-500">QR Code</span>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-medium text-gray-900">Manual Entry</p>
                <p className="mt-1 text-gray-500 font-mono">ABCD EFGH IJKL MNOP</p>
                <button
                  type="button"
                  className="mt-2 text-sm text-blue-600 hover:text-blue-500"
                >
                  Copy code
                </button>
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Active Sessions */}
      <Card className="rounded-lg shadow p-6">
        <h2 className="text-lg font-medium mb-4">Active Sessions</h2>
        <div className="overflow-hidden border border-primary rounded-md">
          <Table className="!p-4">
            <TableHeader className="bg-primary text-primary-foreground ">
              <TableRow className="m-4">
                <TableHead className='px-4 py-3'>Device</TableHead>
                <TableHead className='px-4 py-3'>Location</TableHead>
                <TableHead className='px-4 py-3'>Last Active</TableHead>
                <TableHead className="text-right px-4 py-3">Sign out</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="h-20">
              <TableRow>
                <TableCell className="px-4 py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-primary/5 rounded-md">
                      <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-muted-foreground">Windows 10</div>
                      <div className="text-sm text-gray-500">Chrome 114.0.5735.199</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3">
                  <div className="text-sm text-muted-foreground">New York, USA</div>
                  <div className="text-sm text-primary/50">192.168.1.1</div>
                </TableCell>
                <TableCell className="text-sm text-gray-500 px-4 py-3">
                  <svg className="inline-block h-3 w-3 text-ring mr-1 mb-1.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                  Just now
                </TableCell>
                <TableCell className="text-right text-sm font-medium">
                  <button className="text-red-500 hover:text-red-700">Sign out</button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
