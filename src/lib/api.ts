import { Transfer } from '@/types';
import { sentTransfers, receivedTransfers, requestTransfers } from '@/data/index';

// This file simulates API calls to fetch data
// In a real application, these would be actual API calls to a backend server

/**
 * Fetch sent transfers with pagination and filtering
 */
export async function fetchSentTransfers({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Transfer[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...sentTransfers];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(transfer => 
      transfer.title.toLowerCase().includes(query) || 
      transfer.fileName.toLowerCase().includes(query) ||
      transfer.recipients.some(r => r.email.toLowerCase().includes(query))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Fetch received transfers with pagination and filtering
 */
export async function fetchReceivedTransfers({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Transfer[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...receivedTransfers];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(transfer => 
      transfer.title.toLowerCase().includes(query) || 
      transfer.fileName.toLowerCase().includes(query) ||
      transfer.sender.email.toLowerCase().includes(query)
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Fetch requested transfers with pagination and filtering
 */
export async function fetchRequestedTransfers({
  page = 1,
  limit = 10,
  search = '',
}: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<{ data: Transfer[]; total: number }> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  let filtered = [...requestTransfers];
  
  // Apply search filter if provided
  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter(transfer => 
      transfer.title.toLowerCase().includes(query) || 
      transfer.fileName.toLowerCase().includes(query) ||
      (transfer.sender && transfer.sender.email && transfer.sender.email.toLowerCase().includes(query)) ||
      (transfer.recipients && transfer.recipients.some(r => r.email.toLowerCase().includes(query)))
    );
  }
  
  // Calculate pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedData = filtered.slice(startIndex, endIndex);
  
  return {
    data: paginatedData,
    total: filtered.length
  };
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
}
