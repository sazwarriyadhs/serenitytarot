'use client';

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments, customers } from "@/lib/data";
import { ArrowUpRight, CalendarCheck, Users, DollarSign } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/SettingsContext";

export default function Dashboard() {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming').slice(0, 5);
  const totalRevenue = 5231.89; // Mock data
  const newClientsThisMonth = 12; // Mock data

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('dashboard.welcome')}
        description={t('dashboard.description')}
        actions={<Button asChild><Link href="/appointments">{t('dashboard.scheduleAppointment')}</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('dashboard.totalRevenue')} value={formatCurrency(totalRevenue)} icon={DollarSign} />
        <StatCard title={t('dashboard.totalClients')} value={`+${customers.length}`} icon={Users} />
        <StatCard title={t('dashboard.appointmentsThisMonth')} value={`+${appointments.length}`} icon={CalendarCheck} />
        <StatCard title={t('dashboard.newClientsMonth')} value={`+${newClientsThisMonth}`} icon={ArrowUpRight} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('dashboard.upcomingAppointments')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('dashboard.customer')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('dashboard.date')}</TableHead>
                <TableHead className="text-right">{t('dashboard.time')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcomingAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={appointment.customerAvatarUrl} alt="Avatar" />
                          <AvatarFallback>{appointment.customerName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{appointment.customerName}</div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(appointment.date).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">{appointment.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
}
