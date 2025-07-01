import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { appointments } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AppointmentsPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader 
        title="Appointments" 
        description="Manage your client sessions." 
        actions={<Button>Schedule New</Button>}
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">All Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Customer</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>
                                    <span className="sr-only">Actions</span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="hidden h-9 w-9 sm:flex">
                                              <AvatarImage src={appointment.customerAvatarUrl} alt="Avatar" />
                                              <AvatarFallback>{appointment.customerName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {appointment.customerName}
                                        </div>
                                    </TableCell>
                                    <TableCell>{new Date(appointment.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{appointment.time}</TableCell>
                                    <TableCell>
                                        <Badge variant={appointment.status === 'Upcoming' ? 'default' : appointment.status === 'Completed' ? 'secondary' : 'destructive'} 
                                            className={cn(
                                                appointment.status === 'Upcoming' && 'bg-blue-500/20 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-500/20',
                                                appointment.status === 'Completed' && 'bg-green-500/20 text-green-700 dark:bg-green-500/20 dark:text-green-400 border-green-500/20',
                                                appointment.status === 'Cancelled' && 'bg-red-500/20 text-red-700 dark:bg-red-500/20 dark:text-red-400 border-red-500/20'
                                            )}>
                                            {appointment.status}
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
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Calendar</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Calendar
                        mode="single"
                        selected={new Date()}
                        className="rounded-md"
                    />
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
}
