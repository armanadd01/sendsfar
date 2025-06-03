'use client';

import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SentTransfersPage from './Sent/page';
import ReceivedTransfersPage from './Received/page';
import RequestedTransfersPage from './Requested/page';


export default function TransfersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('sent');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="min-w-[90%] max-w-[90%]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4 !w-100%">Transfers</h1>
        <Input
          type="search"
          placeholder="Search by title, file name, or email"
          value={searchQuery}
          onChange={handleSearch}
          className="max-w-md"
        />
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} >
        <TabsList>
          <TabsTrigger value="sent">Sent</TabsTrigger>
          <TabsTrigger value="received">Received</TabsTrigger>
          <TabsTrigger value="requested">Requested</TabsTrigger>
        </TabsList>

        <TabsContent value="sent">
          <SentTransfersPage searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="received">
          <ReceivedTransfersPage searchQuery={searchQuery}  />
        </TabsContent>

        <TabsContent value="requested">
          <RequestedTransfersPage searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
