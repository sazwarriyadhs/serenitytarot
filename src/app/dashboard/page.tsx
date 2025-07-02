
'use client';

import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments, customers } from "@/lib/data";
import { DollarSign, Users, Wallet, Receipt, CalendarCheck } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { useSettings } from "@/context/SettingsContext";
import { useMemo } from "react";
import { format } from "date-fns";

export default function DashboardPage() {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming').slice(0, 5);

  const { grossRevenue, platformFees, netEarnings, nextPayout } = useMemo(() => {
    const completedAppointments = appointments.filter(a => a.status === 'Completed');
    
    const gross = completedAppointments.reduce((sum, app) => sum + app.totalPrice, 0);
    const fees = gross * 0.20;
    const net = gross * 0.80;
    
    const now = new Date();
    const currentMonthAppointments = completedAppointments.filter(app => {
      const appDate = new Date(app.date);
      return appDate.getFullYear() === now.getFullYear() && appDate.getMonth() === now.getMonth();
    });
    const currentMonthGross = currentMonthAppointments.reduce((sum, app) => sum + app.totalPrice, 0);
    const payout = currentMonthGross * 0.80;

    return {
      grossRevenue: gross,
      platformFees: fees,
      netEarnings: net,
      nextPayout: payout,
    };
  }, []);
  
  const nextPayoutDate = useMemo(() => {
    const now = new Date();
    const payoutDay = 28;
    let payoutDate = new Date(now.getFullYear(), now.getMonth(), payoutDay);
    if(now.getDate() > payoutDay) {
      payoutDate = new Date(now.getFullYear(), now.getMonth() + 1, payoutDay);
    }
    return format(payoutDate, 'MMM do, yyyy');
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('dashboard.welcome')}
        description={t('dashboard.description')}
        actions={<Button asChild><Link href="/appointments">{t('dashboard.scheduleAppointment')}</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title={t('dashboard.grossRevenue')} value={formatCurrency(grossRevenue)} icon={DollarSign} />
        <StatCard title={t('dashboard.platformFees')} value={formatCurrency(platformFees)} icon={Receipt} />
        <StatCard title={t('dashboard.netEarnings')} value={formatCurrency(netEarnings)} icon={Wallet} />
        <StatCard title={t('dashboard.nextPayout')} value={formatCurrency(nextPayout)} icon={CalendarCheck} description={`${t('dashboard.payoutOn')} ${nextPayoutDate}`} />
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
