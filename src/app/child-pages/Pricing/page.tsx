'use client';

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const plans = [
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

export default function PricingPage() {
	const router = useRouter();

	const handleUpgrade = (plan: typeof plans[0]) => {
		router.push(`/payment?plan=${plan.id}&name=${encodeURIComponent(plan.name)}&price=${plan.price}`);
	};


	return (
		<div className="flex flex-col items-center justify-center py-12 px-4">
			<h1 className="text-4xl font-bold mb-4">Pricing</h1>
			<p className="text-muted-foreground mb-10 text-lg">Choose the plan that fits your needs.</p>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
				{/* {plans.map((plan) => (
					<Card key={plan.id} className={plan.current ? 'border-primary border-2 shadow-lg' : ''}>
						<CardHeader>
							<CardTitle className="flex items-center justify-between">
								{plan.name}
								{plan.current && <span className="ml-2 px-2 py-0.5 text-xs rounded bg-primary text-primary-foreground">Current Plan</span>}
							</CardTitle>
							<CardDescription>{plan.description}</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="text-3xl font-bold mb-4">
								{plan.price === 0 ? 'Free' : `$${plan.price}/mo`}
							</div>
							<ul className="mb-6 space-y-2">
								{plan.features.map((feature) => (
									<li key={feature} className="flex items-center text-sm">
										<span className="mr-2 text-green-500">✓</span> {feature}
									</li>
								))}
							</ul>
						</CardContent>
						<CardFooter>
							<Button className="w-full" variant={plan.current ? 'default' : 'outline'}>
								{plan.current ? 'Your Plan' : 'Choose Plan'}
							</Button>
						</CardFooter>
					</Card>
				))} */}

				{plans.map((plan) => (
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
								className={`w-full ${plan.isCurrent ? 'bg-muted-foreground/60 text-muted-foreground': ''}`}
								disabled={plan.isCurrent}
								onClick={() => handleUpgrade(plan)}
								variant={plan.isPopular ? 'default' : 'outline'}
								size="lg"
							>
								{plan.isCurrent ? 'Current Plan' : 'Upgrade'}
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}