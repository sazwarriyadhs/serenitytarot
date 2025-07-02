
'use client';

import { useState } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments as initialAppointments, customers, serviceOfferings } from "@/lib/data";
import type { Appointment } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreHorizontal, Info, CreditCard } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/SettingsContext";
import { ScheduleAppointmentDialog } from '@/components/ScheduleAppointmentDialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export default function AppointmentsPage() {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [appointmentList, setAppointmentList] = useState<Appointment[]>(initialAppointments);

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointmentList(prev => [newAppointment, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader 
        title={t('appointments.title')}
        description={t('appointments.description')}
        actions={<ScheduleAppointmentDialog onAppointmentScheduled={handleAddAppointment} customers={customers} services={serviceOfferings} />}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('appointments.table_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <TooltipProvider>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('appointments.table_customer')}</TableHead>
                                <TableHead>{t('appointments.table_date')}</TableHead>
                                <TableHead>{t('appointments.table_price')}</TableHead>
                                <TableHead>{t('appointments.table_payment')}</TableHead>
                                <TableHead>{t('appointments.table_status')}</TableHead>
                                <TableHead>
                                    <span className="sr-only">{t('appointments.table_actions')}</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointmentList.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                              <AvatarImage src={appointment.customerAvatarUrl} alt="Avatar" />
                                              <AvatarFallback>{appointment.customerName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span>{appointment.customerName}</span>
                                                <span className="text-xs text-muted-foreground">{appointment.time}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                                     <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span>{formatCurrency(appointment.totalPrice)}</span>
                                             <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="p-2 text-sm">
                                                        <p className="font-bold mb-2">{t('appointments.schedule.services')}:</p>
                                                        <ul className="list-disc pl-4">
                                                            {appointment.services.map(s => <li key={s.id}>{s.title}</li>)}
                                                        </ul>
                                                        <p className="font-bold mt-2">{t('appointments.schedule.total_duration')}: {appointment.totalDuration} {t('appointments.schedule.minutes')}</p>
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={appointment.paymentStatus === 'Paid' ? 'secondary' : 'default'}
                                          className={cn(
                                            appointment.paymentStatus === 'Paid' && 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
                                            appointment.paymentStatus === 'Pending' && 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400 border-yellow-500/20',
                                          )}>
                                          <CreditCard className="mr-1 h-3 w-3" />
                                          {t(`appointments.payment_status.${appointment.paymentStatus.toLowerCase()}`)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={appointment.status === 'Upcoming' ? 'default' : appointment.status === 'Completed' ? 'secondary' : 'destructive'} 
                                            className={cn(
                                                appointment.status === 'Upcoming' && 'bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
                                                appointment.status === 'Completed' && 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
                                                appointment.status === 'Cancelled' && 'bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20'
                                            )}>
                                            {t(`appointments.status.${appointment.status.toLowerCase()}`)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                    <span className="sr-only">Toggle menu</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>{t('appointments.table_actions')}</DropdownMenuLabel>
                                                <DropdownMenuItem>{t('customers.actions_edit')}</DropdownMenuItem>
                                                <DropdownMenuItem>{t('appointments.actions_reschedule')}</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">{t('appointments.actions_cancel')}</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    </TooltipProvider>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">{t('appointments.calendar_title')}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md"
                        disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
