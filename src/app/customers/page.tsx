'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { customers as initialCustomers } from "@/lib/data";
import type { Customer } from '@/lib/types';
import { MoreHorizontal, ArrowRight } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddCustomerDialog } from '@/components/AddCustomerDialog';


export default function CustomersPage() {
  const { t } = useTranslation();
  const [customerList, setCustomerList] = useState<Customer[]>(initialCustomers);

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomerList(prev => [newCustomer, ...prev]);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader 
        title={t('customers.title')}
        description={t('customers.description')}
        actions={<AddCustomerDialog onCustomerAdded={handleAddCustomer} />}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('customers.roster_title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('customers.table_name')}</TableHead>
                <TableHead className="hidden sm:table-cell">{t('customers.table_email')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('customers.table_join_date')}</TableHead>
                <TableHead className="text-right">{t('customers.table_bookings')}</TableHead>
                <TableHead>
                  <span className="sr-only">{t('customers.table_actions')}</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerList.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    <Link href={`/customers/${customer.id}`} className="flex items-center gap-3 hover:underline">
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src={customer.avatarUrl} alt="Avatar" />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {customer.name}
                    </Link>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{customer.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(customer.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{customer.bookings.length}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="ghost" size="icon">
                            <Link href={`/customers/${customer.id}`}>
                                <ArrowRight className="h-4 w-4" />
                                <span className="sr-only">View Profile</span>
                            </Link>
                        </Button>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>{t('customers.table_actions')}</DropdownMenuLabel>
                            <DropdownMenuItem>{t('customers.actions_edit')}</DropdownMenuItem>
                            <DropdownMenuItem>{t('customers.actions_view_bookings')}</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">{t('customers.actions_delete')}</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
