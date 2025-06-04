'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
// import { Button } from '@/components/ui/Button';
// import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Header';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Define form values interface
interface FormValues {
  paymentMethod: 'card' | 'paypal';
  cardNumber: string;
  expirationDate: string;
  securityCode: string;
  firstName: string;
  zipCode: string;
  country: string;
  isBusinessPurchase: boolean;
  companyName: string;
  address: string;
  city: string;
  promoCode: string;
}

const countries = [
  { value: 'nl', label: 'Netherlands' },
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
];

const plans = {
  pro: {
    name: 'Pro Plan',
    monthly: 23,
    yearly: 230, // 10 months price for yearly (2 months free)
  },
  business: {
    name: 'Business Plan',
    monthly: 49,
    yearly: 490, // 10 months price for yearly (2 months free)
  }
};

const validPromoCodes = [
  { code: 'getFree', discount: 0.17 },
  { code: 'getoff', discount: 0.17 },
  { code: 'aru', discount: 0.17 },
  { code: 'multilat', discount: 0.17 }
];

export default function PaymentPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const [isBusinessPurchase, setIsBusinessPurchase] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'pro' | 'business'>('pro');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoInputValue, setPromoInputValue] = useState('');
  
  // Get initial plan details from URL if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const planParam = searchParams.get('plan');
      if (planParam === 'business') {
        setSelectedPlan('business');
      }
    }
  }, []);
  
  // Current plan details
  const planDetails = plans[selectedPlan];
  const planName = planDetails.name;
  const planPrice = billingCycle === 'monthly' ? planDetails.monthly : planDetails.yearly;

  // Use the FormValues interface for proper type checking
  const form = useForm<FormValues>({
    defaultValues: {
      paymentMethod: 'card',
      cardNumber: '',
      expirationDate: '',
      securityCode: '',
      firstName: '',
      zipCode: '',
      country: 'nl',
      isBusinessPurchase: false,
      companyName: '',
      address: '',
      city: '',
      promoCode: '',
    },
  });

  // Use the FormValues interface for proper type checking
  function onSubmit(values: FormValues) {
    // Include selected plan and billing cycle in the form submission
    const submissionData = {
      ...values,
      selectedPlan,
      billingCycle,
      appliedPromoCode,
      finalPrice: calculateFinalPrice()
    };
    console.log(submissionData);
    router.push('/success');
  }

  const handleBack = () => {
    router.back();
  };
  
  const handleBillingCycleChange = (cycle: 'monthly' | 'yearly') => {
    setBillingCycle(cycle);
  };
  

  
  const applyPromoCode = () => {
    console.log('Applying promo code:', promoInputValue);
    
    if (!promoInputValue) {
      // Show error for empty promo code
      alert('Please enter a promo code');
      return;
    }
    
    const validPromo = validPromoCodes.find(p => p.code === promoInputValue);
    
    if (validPromo) {
      setAppliedPromoCode(promoInputValue);
      setDiscount(validPromo.discount);
      setShowPromoInput(false);
      form.setValue('promoCode', promoInputValue);
      console.log('Valid promo code applied:', promoInputValue, 'with discount:', validPromo.discount);
    } else {
      // Show error for invalid promo code
      alert('Invalid promo code');
      console.log('Invalid promo code:', promoInputValue);
    }
  };
  
  const removePromoCode = () => {
    setAppliedPromoCode(null);
    setDiscount(0);
    form.setValue('promoCode', '');
  };
  
  const calculateFinalPrice = () => {
    let price = planPrice;
    
    // Apply discount if promo code is applied
    if (appliedPromoCode) {
      price = price * (1 - discount);
    }
    
    return Math.round(price * 100) / 100; // Round to 2 decimal places
  };
  
  const handlePaymentMethodChange = (method: 'card' | 'paypal') => {
    setPaymentMethod(method);
    form.setValue('paymentMethod', method);
  };
  
  const handleBusinessPurchaseChange = (checked: boolean) => {
    setIsBusinessPurchase(checked);
    form.setValue('isBusinessPurchase', checked);
  };

  return (
    <div className="min-h-screen bg-primary-foreground text-primary">
      <Header showBackButton onBack={handleBack} title="Choose how to pay" />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Choose how to pay</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Payment Method Selection */}
                <div className="space-y-4">
                  {/* Card Option */}
                  <div 
                    className={`border rounded-lg p-4 ${paymentMethod === 'card' ? 'border-primary' : 'border-muted-foreground'}`}
                    onClick={() => handlePaymentMethodChange('card')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 10H2M22 12V8.2C22 7.0799 22 6.51984 21.782 6.09202C21.5903 5.7157 21.2843 5.40974 20.908 5.21799C20.4802 5 19.9201 5 18.8 5H5.2C4.0799 5 3.51984 5 3.09202 5.21799C2.7157 5.40973 2.40973 5.71569 2.21799 6.09202C2 6.51984 2 7.0799 2 8.2V15.8C2 16.9201 2 17.4802 2.21799 17.908C2.40973 18.2843 2.71569 18.5903 3.09202 18.782C3.51984 19 4.07989 19 5.2 19H18.8C19.9201 19 20.4802 19 20.908 18.782C21.2843 18.5903 21.5903 18.2843 21.782 17.908C22 17.4802 22 16.9201 22 15.8V12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className="font-medium">Card</span>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <div className="mt-4 space-y-4">
                        {/* Card Number */}
                        <div className="relative">
                          <FormField
                            control={form.control}
                            name="cardNumber"
                            render={({ field }) => (
                              <FormItem>
                                <Input
                                  placeholder="Card number"
                                  {...field}
                                  onChange={e => {
                                    const value = e.target.value.replace(/\D/g, '').slice(0, 16);
                                    field.onChange(value.replace(/(.{4})/g, '$1 ').trim());
                                  }}
                                  value={field.value}
                                  inputMode="numeric"
                                  maxLength={19}
                                  className="h-12  border-muted-foreground"
                                />
                                
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className="absolute right-3 top-3 flex items-center gap-1">
                            <Image src="/visa.svg" alt="Visa" width={24} height={16} className='dark:text-white' />
                            <Image src="/mastercard.svg" alt="Mastercard" width={24} height={16} className='dark:invert' />
                            <Image src="/amex.svg" alt="American Express" width={24} height={16} className='dark:invert' />
                          </div>
                        </div>
                        
                        {/* Expiration Date and Security Code */}
                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="expirationDate"
                            render={({ field }) => (
                              <FormItem>
                                <Input
                                  placeholder="MM/YY"
                                  {...field}
                                  onChange={e => {
                                    let value = e.target.value.replace(/[^\d]/g, '').slice(0, 4);
                                    let month = value.slice(0, 2);
                                    if (month.length === 2) {
                                      const monthNum = parseInt(month, 10);
                                      if (monthNum > 12) {
                                        month = '12';
                                        value = month + value.slice(2);
                                      } else if (monthNum === 0) {
                                        month = '01';
                                        value = month + value.slice(2);
                                      }
                                    }
                                    if (value.length >= 3) {
                                      value = value.slice(0, 2) + '/' + value.slice(2);
                                    }
                                    field.onChange(value);
                                  }}
                                  value={field.value}
                                  inputMode="numeric"
                                  maxLength={5}
                                  className="h-12 border-muted-foreground"
                                />
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <div className='relative'>
                            <FormField
                              control={form.control}
                              name="securityCode"
                              render={({ field }) => (
                                <FormItem>
                                  <Input
                                    placeholder="Security code"
                                    {...field}
                                    onChange={e => {
                                      const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                      field.onChange(value);
                                    }}
                                    value={field.value}
                                    inputMode="numeric"
                                    maxLength={4}
                                    className="h-12 border-muted-foreground"
                                  />
                                  
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className="absolute right-3 top-3.5">
                              <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="23" height="15" rx="1.5" fill="white" stroke="#E5E7EB" />
                                <text x="12" y="10" textAnchor="middle" fontSize="8" fill="#6B7280">123</text>
                              </svg>
                            </div>
                          </div>
                            
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* PayPal Option */}
                  <div 
                    className={`border rounded-lg p-4 ${paymentMethod === 'paypal' ? 'border-blue-500' : 'border-gray-200'}`}
                    onClick={() => handlePaymentMethodChange('paypal')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 flex items-center justify-center text-[#003087]">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 48 48">
                          <path fill="#001C64" d="M37.972 13.82c.107-5.565-4.485-9.837-10.799-9.837H14.115a1.278 1.278 0 0 0-1.262 1.079L7.62 37.758a1.038 1.038 0 0 0 1.025 1.2h7.737l-1.21 7.572a1.038 1.038 0 0 0 1.026 1.2H22.5c.305 0 .576-.11.807-.307.231-.198.269-.471.316-.772l1.85-10.885c.047-.3.2-.69.432-.888.231-.198.433-.306.737-.307H30.5c6.183 0 11.43-4.394 12.389-10.507.678-4.34-1.182-8.287-4.916-10.244Z"/>
                          <path fill="#0070E0" d="m18.056 26.9-1.927 12.22-1.21 7.664a1.038 1.038 0 0 0 1.026 1.2h6.67a1.278 1.278 0 0 0 1.261-1.079l1.758-11.14a1.277 1.277 0 0 1 1.261-1.078h3.927c6.183 0 11.429-4.51 12.388-10.623.68-4.339-1.504-8.286-5.238-10.244-.01.462-.05.923-.121 1.38-.959 6.112-6.206 10.623-12.389 10.623h-6.145a1.277 1.277 0 0 0-1.261 1.077Z"/>
                          <path fill="#003087" d="M16.128 39.12h-7.76a1.037 1.037 0 0 1-1.025-1.2l5.232-33.182a1.277 1.277 0 0 1 1.262-1.078h13.337c6.313 0 10.905 4.595 10.798 10.16-1.571-.824-3.417-1.295-5.44-1.295H21.413a1.278 1.278 0 0 0-1.261 1.078L18.057 26.9l-1.93 12.22Z"/>
                        </svg>
                      </div>
                      <span className="font-medium">PayPal</span>
                    </div>
                  </div>
                </div>
                
                {/* Personal Information */}
                <div className="space-y-4">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <div className="text-xs text-gray-500 mb-1">First name</div>
                        <Input 
                          placeholder="First name" 
                          {...field} 
                          className="h-12 border-muted-foreground"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Zip Code and Country */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem>
                          <Input 
                            placeholder="Zip code" 
                            {...field} 
                            className="h-12 border-muted-foreground"
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="!h-12 w-full border-muted-foreground">
                                <SelectValue placeholder="Country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {countries.map((country) => (
                                <SelectItem key={country.value} value={country.value}>
                                  {country.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Business Purchase Checkbox */}
                  <div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="business" 
                        checked={isBusinessPurchase}
                        onCheckedChange={handleBusinessPurchaseChange}
                      />
                      <label
                        htmlFor="business"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I am purchasing for a business
                      </label>
                    </div>
                  </div>
                  
                  {/* Business Information (conditional) */}
                  {isBusinessPurchase && (
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="companyName"
                        render={({ field }) => (
                          <FormItem>
                            <Input 
                              placeholder="Company name" 
                              {...field} 
                              className="h-12 border-muted-foreground"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <Input 
                              placeholder="Address" 
                              {...field} 
                              className="h-12 border-muted-foreground"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <Input 
                              placeholder="City" 
                              {...field} 
                              className="h-12 border-muted-foreground"
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </div>
                
                {/* Terms and Conditions */}
                <div className="space-y-4">
                  <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                    <li>
                      By purchasing a plan you agree that you have read, understand and agree to
                      be bound by the <a href="#" className="text-primary">WeTransfer Terms of Service</a> and <a href="#" className="text-primary">Privacy Statement</a>.
                    </li>
                    <li>
                      After the first {billingCycle === 'monthly' ? 'month' : 'year'}, your subscription will renew and your payment method
                      will be charged usd {planPrice} unless you cancel. You can cancel anytime through
                      your account settings.
                    </li>
                  </ul>
                </div>
                
                {/* Submit Button */}
                
                <Button 
                  className="w-full bg-primary py-2 px-4 rounded-lg"
                  type="submit"
                >
                  Purchase {planName} (${calculateFinalPrice()})
                </Button>
              </form>
            </Form>
          </div>
          
          {/* Right Column - Plan Summary */}
          <div className="border rounded-lg p-6 space-y-6 h-fit">
            <div>
              <div className="text-sm text-gray-500 mb-1">Your plan</div>
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{planName}</h2>
                <div className="relative inline-block">
                  <button 
                    onClick={() => setSelectedPlan(selectedPlan === 'pro' ? 'business' : 'pro')}
                    className="text-primary text-sm font-medium"
                  >
                    Switch to {selectedPlan === 'pro' ? 'Business' : 'Pro'}
                  </button>
                </div>
              </div>
              <div className="text-muted-foreground dark:text-gray-400 mt-1">arman&apos;s workspace</div>
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-muted-foreground dark:text-gray-400">Billing cycle</div>
                <div className="relative inline-block">
                  <button 
                    onClick={() => handleBillingCycleChange(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
                    className="flex items-center text-primary font-medium"
                  >
                    <span className="mr-1">{billingCycle === 'monthly' ? 'Monthly' : 'Yearly'}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-muted-foreground">${planPrice} x {billingCycle === 'monthly' ? '1 month' : '12 months'}</div>
                <div className="font-bold">${billingCycle === 'monthly' ? planPrice : planPrice}</div>
              </div>
              
              {billingCycle === 'yearly' && (
                <div className="flex items-center justify-between mt-2">
                  <div className="text-muted-foreground">2 months free with yearly</div>
                  <div className="font-bold text-green-600">Save ${Math.round(planDetails.monthly * 2)}</div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-2">
                <div className="text-muted-foreground">Promo code</div>
                {!appliedPromoCode && !showPromoInput && (
                  <button 
                    onClick={() => setShowPromoInput(true)}
                    className="text-primary text-sm font-medium"
                  >
                    Add
                  </button>
                )}
                {appliedPromoCode && (
                  <button 
                    onClick={removePromoCode}
                    className="text-red-600 text-sm font-medium"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              {showPromoInput && !appliedPromoCode && (
                <div className="flex gap-2 mt-2">
                  <div className="flex-1">
                    <Input 
                      placeholder="Enter promo code" 
                      value={promoInputValue}
                      onChange={(e) => setPromoInputValue(e.target.value)}
                      type="text"
                    />
                  </div>
                  <Button 
                    type="button" 
                    onClick={applyPromoCode}
                    className="shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              )}
              
              {appliedPromoCode && (
                <div className="flex items-center justify-between mt-2">
                  <div className="text-muted-foreground flex items-center">
                    <span className="bg-primary text-primary text-xs font-medium px-2 py-0.5 rounded mr-2">
                      {appliedPromoCode}
                    </span>
                    {discount * 100}% off
                  </div>
                  <div className="font-bold text-primary">- ${(planPrice * discount).toFixed(2)}</div>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">Today&apos;s total</div>
                <div className="text-xl font-bold">${calculateFinalPrice()}</div>
              </div>
              
              {billingCycle === 'monthly' && !appliedPromoCode && (
                <div className="mt-4 bg-primary/10 p-3 rounded-lg">
                  <p className="text-sm text-primary flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
                    </svg>
                    Save by switching to yearly billing
                  </p>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground mt-2">
                {billingCycle === 'yearly' ? "You'll pay for the full year upfront." : "You'll be billed monthly."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
