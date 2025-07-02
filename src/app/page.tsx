'use client';

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments, customers } from "@/lib/data";
import { DollarSign, Users, ListChecks, Clock } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/SettingsContext";
import { useMemo } from "react";

export default function Dashboard() {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming').slice(0, 5);

  const { totalRevenue, totalServicesProvided, totalHoursRead } = useMemo(() => {
    const completedAppointments = appointments.filter(a => a.status === 'Completed');
    
    const revenue = completedAppointments.reduce((sum, app) => sum + app.totalPrice, 0);
    const services = completedAppointments.reduce((sum, app) => sum + app.services.length, 0);
    const minutes = completedAppointments.reduce((sum, app) => sum + app.totalDuration, 0);
    const hours = (minutes / 60).toFixed(1);
    
    return {
      totalRevenue: revenue,
      totalServicesProvided: services,
      totalHoursRead: hours,
    };
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('dashboard.welcome')}
        description={t('dashboard.description')}
        actions={<Button asChild><Link href="/appointments">{t('dashboard.scheduleAppointment')}</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('dashboard.totalRevenue')} value={formatCurrency(totalRevenue)} icon={DollarSign} />
        <StatCard title={t('dashboard.totalClients')} value={`${customers.length}`} icon={Users} />
        <StatCard title={t('dashboard.totalServicesProvided')} value={`${totalServicesProvided}`} icon={ListChecks} />
        <StatCard title={t('dashboard.totalHoursRead')} value={`${totalHoursRead} ${t('dashboard.hours')}`} icon={Clock} />
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
