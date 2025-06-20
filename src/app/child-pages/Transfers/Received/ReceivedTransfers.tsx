'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchReceivedTransfers, formatFileSize } from '@/lib/api';
import { Transfer } from '@/types';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationPrevious, 
  PaginationNext,
  PaginationLink,
  PaginationEllipsis
} from '@/components/ui/pagination';
import { useRouter } from 'next/navigation';

type ReceivedTransfersProps = {
  searchQuery: string;
};

export default function ReceivedTransfers({ searchQuery }: ReceivedTransfersProps) {
  const router = useRouter();
  const [data, setData] = useState<Transfer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: transfers, total } = await fetchReceivedTransfers({ 
        page: currentPage, 
        limit: itemsPerPage, 
        search: searchQuery 
      });
      setData(transfers);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching received transfers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (transfer: Transfer) => {
    router.push(`/transfers/${transfer.id}`);
  };

  const renderTransferCard = (transfer: Transfer) => (
    <Card key={transfer.id} className="mb-4 flex flex-col justify-center content-center !py-0 hover:shadow-md transition-shadow cursor-pointer min-h-28 max-h-28" onClick={() => handleViewDetails(transfer)}>
      <CardHeader className="">
        <div className="flex justify-between items-start">
          <div className="flex-1 custom-card">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className='text-xs'>{transfer.status}</Badge>
              <span className="text-xs text-muted-foreground">1 file</span>
            </div>
            <CardTitle className="text-xl mb-0">
              {transfer.title}
              <br />
              <span className='text-xs text-muted-foreground'>
                {new Date(transfer.createdAt).toLocaleDateString()} · {formatFileSize(transfer.fileSize)}
              </span>
            </CardTitle>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>Download</Button>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>Forward</Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <div className="">
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : data.length > 0 ? (
        <>
          {data.map(transfer => renderTransferCard(transfer))}

          <div className="mt-4 flex justify-center">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)} 
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>

                {currentPage > 2 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
                  </PaginationItem>
                )}

                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage > 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(currentPage - 1)}>
                      {currentPage - 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink isActive>{currentPage}</PaginationLink>
                </PaginationItem>

                {currentPage < totalPages && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(currentPage + 1)}>
                      {currentPage + 1}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {currentPage < totalPages - 1 && (
                  <PaginationItem>
                    <PaginationLink onClick={() => handlePageChange(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationNext 
                    onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)} 
                    className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <div className="text-sm text-muted-foreground ml-4">
              Showing page {currentPage} of {totalPages} ({totalPages * itemsPerPage} items)
            </div>
          </div>
        </>
      ) : (
        <div className="text-center py-8">No received transfers found</div>
      )}
    </div>
  );
}
