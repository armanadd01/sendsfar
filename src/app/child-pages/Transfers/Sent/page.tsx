'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { fetchSentTransfers, formatFileSize } from '@/lib/api';
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
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { TbDotsVertical } from "react-icons/tb";
import { useRouter } from 'next/navigation';

interface SentTransfersPageProps {
  searchQuery: string;
}

export default function SentTransfersPage({ searchQuery }: SentTransfersPageProps) {
  const router = useRouter();
  const [data, setData] = useState<Transfer[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewDetails = (transfer: Transfer) => {
    router.push(`/transfers/${transfer.id}`);
  };

  const handleEditTitle = async (transfer: Transfer) => {
    const newTitle = prompt('Enter new title:', transfer.title);
    if (newTitle && newTitle !== transfer.title) {
      // TODO: Implement API call to update title
      setData(data.map(t => t.id === transfer.id ? { ...t, title: newTitle } : t));
    }
  };

  const handleDeleteTransfer = (transfer: Transfer) => {
    if (confirm('Are you sure you want to delete this transfer?')) {
      // TODO: Implement API call to delete transfer
      setData(data.filter(t => t.id !== transfer.id));
    }
  };

  const handleForwardTransfer = (transfer: Transfer) => {
    // TODO: Implement forward functionality
    console.log('Forward transfer:', transfer);
  };

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: transfers, total } = await fetchSentTransfers({
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery
      });
      setData(transfers);
      setTotalPages(Math.ceil(total / itemsPerPage));
    } catch (error) {
      console.error('Error fetching sent transfers:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="">
      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : data.length > 0 ? (
        <>
          {data.map(transfer => (
            <Card key={transfer.id} className=" mb-4 flex flex-col justify-center content-center !py-0 hover:shadow-md transition-shadow cursor-pointer min-h-28 max-h-28" onClick={() => handleViewDetails(transfer)}>
              <CardHeader className="">
                <div className="flex justify-between items-start">
                  <div className="flex-1 custom-card">
                    <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className='text-xs'>{transfer.status}</Badge>
                        <span className="text-xs text-muted-foreground">{transfer.recipients?.length || 0} recipients</span>
                    </div>
                    <CardTitle className="text-xl mb-0 ">
                        {transfer.title}
                        <br />
                        <span className='text-xs text-muted-foreground'>
                            {new Date(transfer.createdAt).toLocaleDateString()} · {formatFileSize(transfer.fileSize)}
                        </span>
                        </CardTitle>
                    {/* <CardDescription className="text-sm cutsom-text-hidden">
                      {new Date(transfer.createdAt).toLocaleDateString()} · {formatFileSize(transfer.fileSize)}
                    </CardDescription> */}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={(e) => e.stopPropagation()}>
                        <TbDotsVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleEditTitle(transfer);
                      }}>Edit Title</DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleForwardTransfer(transfer);
                      }}>Forward</DropdownMenuItem>
                      <DropdownMenuItem onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTransfer(transfer);
                      }}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              
            </Card>
          ))}

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
        <div className="text-center py-8">
          <CardTitle className="mb-2">No transfers found</CardTitle>
          <CardDescription>Try adjusting your search criteria</CardDescription>
        </div>
      )}
    </div>
  );
}