"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RefreshCw } from 'lucide-react';

type Integration = {
  id: string;
  name: string;
  description: string;
  icon: string;
  connected: boolean;
  category: string;
};

type IntegrationCategory = {
  id: string;
  name: string;
  description: string;
};

const categories: IntegrationCategory[] = [
  {
    id: 'storage',
    name: 'Cloud Storage',
    description: 'Connect your favorite cloud storage providers',
  },
  {
    id: 'productivity',
    name: 'Productivity',
    description: 'Tools to help you get more done',
  },
  {
    id: 'communication',
    name: 'Communication',
    description: 'Connect with your team and clients',
  },
];

const integrations: Integration[] = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Access and share your Google Drive files directly',
    icon: '📊',
    connected: true,
    category: 'storage',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Connect your Dropbox account to access files',
    icon: '📦',
    connected: false,
    category: 'storage',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Get notifications and share files directly to Slack',
    icon: '💬',
    connected: true,
    category: 'communication',
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Save files and links to your Notion workspace',
    icon: '📝',
    connected: false,
    category: 'productivity',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Connect with your GitHub repositories',
    icon: '💻',
    connected: false,
    category: 'productivity',
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Share files directly to your Teams channels',
    icon: '👥',
    connected: false,
    category: 'communication',
  },
];

export default function AccountIntegrations() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [connectedIntegrations, setConnectedIntegrations] = useState<string[]>(
    integrations.filter(i => i.connected).map(i => i.id)
  );
  const [isLoading, setIsLoading] = useState<{[key: string]: boolean}>({});



  const toggleIntegration = async (integrationId: string) => {
    setIsLoading(prev => ({ ...prev, [integrationId]: true }));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setConnectedIntegrations(prev => 
        prev.includes(integrationId)
          ? prev.filter(id => id !== integrationId)
          : [...prev, integrationId]
      );
    } catch (error) {
      console.error('Failed to toggle integration:', error);
      // You might want to show a toast notification here
      // toast({
      //   title: 'Error',
      //   description: 'Failed to update integration',
      //   variant: 'destructive',
      // });
    } finally {
      setIsLoading(prev => ({ ...prev, [integrationId]: false }));
    }
  };

  const filteredIntegrations = activeCategory === 'all'
    ? integrations
    : integrations.filter(integration => integration.category === activeCategory);

  const connectedCount = connectedIntegrations.length;
  const totalIntegrations = integrations.length;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold">Integrations</h2>
        <p className="text-muted-foreground mt-1">
          Connect {process.env.NEXT_PUBLIC_APP_NAME || 'our service'} with your favorite tools
        </p>
      </div>

      {/* Connected Apps Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Connected</CardDescription>
            <CardTitle className="text-3xl">{connectedCount}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {connectedCount === totalIntegrations 
                ? 'All integrations connected!'
                : `${totalIntegrations - connectedCount} more available`}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available</CardDescription>
            <CardTitle className="text-3xl">{totalIntegrations}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Total integrations available</p>
          </CardContent>
        </Card>
      </div>

      {/* Category Tabs */}
      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Integrations</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category.id} value={category.id}>
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Integrations Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map(integration => {
          const isConnected = connectedIntegrations.includes(integration.id);
          const loading = isLoading[integration.id];
          
          return (
            <Card key={integration.id} className="flex flex-col h-full">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-muted text-2xl">
                  {integration.icon}
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-lg">{integration.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {integration.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="mt-auto pt-2">
                <Button
                  variant={isConnected ? ('outline' as const) : ('default' as const)}
                  size="sm"
                  className="w-full"
                  disabled={loading}
                  onClick={() => toggleIntegration(integration.id)}
                >
                  {loading 
                    ? (isConnected ? 'Disconnecting...' : 'Connecting...')
                    : (isConnected ? 'Connected' : 'Connect')}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* No Results */}
      {filteredIntegrations.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <span className="text-muted-foreground text-2xl">🔍</span>
          </div>
          <h3 className="mt-4 text-lg font-medium">No integrations found</h3>
          <p className="mb-4 mt-2 text-sm text-muted-foreground">
            We couldn&apos;t find any integrations matching your current filters.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setActiveCategory('all')}
            className="mt-2"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset filters
          </Button>
        </div>
      )}

      {/* Developer API Section */}
      <div className="mt-12">
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle>Developer API</CardTitle>
            <CardDescription className="mt-2">
              Build custom integrations with our comprehensive API. Access your data programmatically
              and extend {process.env.NEXT_PUBLIC_APP_NAME || 'our service'} to fit your workflow.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="outline" className="w-full">
              View API Documentation
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
