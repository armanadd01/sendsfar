'use client';

import RequestedTransfers from './RequestedTransfers';

interface RequestedTransfersPageProps {
  searchQuery: string;
}

export default function RequestedTransfersPage({ searchQuery }: RequestedTransfersPageProps) {
  return <RequestedTransfers searchQuery={searchQuery} />;
}