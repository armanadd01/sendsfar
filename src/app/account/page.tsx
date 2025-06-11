"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import IntegrationsPage from './integrations/page';
import ProfilePage from './profile/page';
import SecurityPage from './security/page';
import PlansPage from './Plans/page';

const tabs = [
  { id: 'profile', label: 'Profile', component: ProfilePage },
  { id: 'security', label: 'Security', component: SecurityPage },
  { id: 'plans', label: 'Plans', component: PlansPage }, // Uncomment when you implement this component
  { id: 'integrations', label: 'Integrations', component: IntegrationsPage }, // Uncomment when you implement this component
];

export default function AccountPage() {
  const pathname = usePathname();
  
  // Get the active tab from the URL hash or default to 'profile'
  const getActiveTab = () => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      return tabs.find(tab => tab.id === hash) ? hash : 'profile';
    }
    return 'profile';
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    // Update the URL without causing a page reload
    window.history.pushState({}, '', `${pathname}#${tabId}`);
  };

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || ProfilePage;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Account Settings</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-4 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary  text-primary'
                  : 'border-transparent text-muted-foreground hover:text-primary hover:border-primary/50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-2">
        <ActiveComponent />
      </div>
    </div>
  );
}
