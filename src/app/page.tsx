import { PageHeader } from "@/components/PageHeader";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments, customers } from "@/lib/data";
import { ArrowUpRight, CalendarCheck, Users, DollarSign } from "lucide-react";
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming').slice(0, 5);
  const totalRevenue = 5231.89; // Mock data
  const newClientsThisMonth = 12; // Mock data

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title="Welcome back!"
        description="Here's a snapshot of your mystical business."
        actions={<Button asChild><Link href="/appointments">Schedule Appointment</Link></Button>}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={DollarSign} />
        <StatCard title="Total Clients" value={`+${customers.length}`} icon={Users} />
        <StatCard title="Appointments this month" value={`+${appointments.length}`} icon={CalendarCheck} />
        <StatCard title="New Clients (Month)" value={`+${newClientsThisMonth}`} icon={ArrowUpRight} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Time</TableHead>
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
