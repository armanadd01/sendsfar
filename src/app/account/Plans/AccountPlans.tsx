"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { useRouter } from 'next/navigation';

type Plan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
  isCurrent: boolean;
  storage: string;
  transfers: string;
  expiry: string;
};

export default function AccountPlans() {
  // // es-lint-disable-next-line @typescript-eslint/no-unused-vars
  // const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  // // es-lint-disable-next-line @typescript-eslint/no-unused-vars
  // const [, setSelectedPlan] = useState<string | null>(null);
  const [showAllPlans, setShowAllPlans] = useState(false);

  const plans: Plan[] = [
      {
      id: 'free',
      name: 'Free',
      description: 'For individuals and small teams getting started.',
      price: 0,
      features: [
        'Up to 2GB per transfer',
        '7 days file retention',
        'Basic email notifications',
        'Web access only',
      ],
      isPopular: false,
      isCurrent: true,
      storage: '3 GB',
      transfers: '10 transfers/month',
      expiry: '3 days'
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'For professionals who need more power and flexibility.',
      price: 12,
      features: [
        'Up to 20GB per transfer',
        '30 days file retention',
        'Advanced tracking & analytics',
        'Password protection',
        'Custom branding',
        'API access',
      ],
      isPopular: true,
      isCurrent: false,
      storage: '100 GB',
      transfers: 'Unlimited',
      expiry: '7 days'
    },
    {
      id: 'business',
      name: 'Business',
      description: 'For teams that need advanced features and support.',
      price: 23,
      features: [
        'Unlimited transfer size',
        '90 days file retention',
        'Advanced security features',
        'Team management',
        'Priority support',
        'All integrations included',
        'Custom workflows',
        'Audit logs',
      ],
      isPopular: false,
      isCurrent: false,
      storage: '1 TB',
      transfers: 'Unlimited',
      expiry: '30 days'
    },
  ];

  const currentPlan = plans.find(plan => plan.isCurrent);
  // Filtered plans are used in the UI but not directly referenced

  const router = useRouter();
  
    const handleUpgrade = (plan: typeof plans[0]) => {
      console.log(`Upgrading to plana:  /payment?plan=${plan.id}&name=${encodeURIComponent(plan.name)}&price=${plan.price}`);
      // Navigate to payment page with plan details
      router.push(`/payment?plan=${plan.id}&name=${encodeURIComponent(plan.name)}&price=${plan.price}`);
    };

  const toggleShowAllPlans = () => {
    setShowAllPlans(!showAllPlans);
  };



  return (
    <div className="space-y-8">
      {/* Current Plan */}
      {currentPlan && (
        <Card className="rounded-xl shadow-sm border p-6">
          <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between pb-4">
            <div>
              <CardTitle className="text-xl font-semibold">Your Current Plan</CardTitle>
              <p className="mt-1 text-muted-foreground">
                You&apos;re currently on the <span className="font-medium">{currentPlan.name}</span> plan.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="border border-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Storage</p>
                <p className="mt-1 text-lg font-semibold">{currentPlan.storage}</p>
              </div>
              <div className="border border-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Transfers</p>
                <p className="mt-1 text-lg font-semibold">{currentPlan.transfers}</p>
              </div>
              <div className="border border-muted rounded-lg p-4">
                <p className="text-sm font-medium text-muted-foreground">Transfer Expiry</p>
                <p className="mt-1 text-lg font-semibold">{currentPlan.expiry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Plans */}
      <Card className="rounded-xl shadow-sm border overflow-hidden">
        <CardHeader className="p-6 border-b">
          <CardTitle className="text-xl font-semibold">Available Plans</CardTitle>
          <p className="mt-1 text-muted-foreground">
            Choose the plan that&apos;s right for you. You can change or cancel anytime.
          </p>
        </CardHeader>
        <CardContent className={`grid gap-6 p-6 ${showAllPlans ? 'grid-cols-1 md:grid-cols-3' : 'grid-cols-1'}`}> 
          {showAllPlans ? (
            plans.map((plan) => (
              <Card key={plan.id} className={`relative !grid ${plan.isPopular ? 'ring-2 ring-primary' : ''}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader>
                <div className="flex items-center justify-between">
                <CardTitle>{plan.name}</CardTitle>
                <div className="text-2xl font-bold">{plan.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
                </div>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                  <svg
                    className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-2 text-sm">{feature}</span>
                  </li>
                ))}
                </ul>
                
              </CardContent>
                <CardFooter className='flex flex-col items-stretch self-end'>
                  <Button 
                    className={`w-full ${plan.isCurrent ? 'bg-muted-foreground/60 text-primary-foreground': ''}`}
                    disabled={plan.isCurrent}
                    onClick={() => handleUpgrade(plan)}
                    variant={plan.isPopular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.isCurrent ? 'Current Plan' : 'Upgrade'}
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <h3 className="text-lg font-medium mb-2">Looking for more?</h3>
              <p className="text-muted-foreground mb-6 text-center">Upgrade to unlock more storage, unlimited transfers, and additional features</p>
              <Button onClick={toggleShowAllPlans} variant="default">
                View all plans
              </Button>
            </div>
          )}
        </CardContent>
        {showAllPlans && (
          <div className="bg-muted px-6 py-4 border-t">
            <div className="text-center text-sm">
              <p className="text-muted-foreground">
                Need help choosing a plan?{' '}
                <a href="#" className="font-medium text-primary hover:underline">
                  Contact our sales team
                </a>
              </p>
            </div>
          </div>
        )}
      </Card>
      {/* Billing History */}
      <Card className="rounded-xl shadow-sm border p-6">
        <CardHeader>
          <CardTitle className="text-xl font-semibold mb-4">Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Invoice</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>June 1, 2023</TableCell>
                <TableCell>{currentPlan?.name} Plan - Monthly</TableCell>
                <TableCell>{currentPlan?.price}/mo</TableCell>
                <TableCell>
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Paid
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <a href="#" className="text-primary hover:underline">
                    View
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            No other billing history available
          </div>
        </CardContent>
      </Card>
    </div>
  );
}