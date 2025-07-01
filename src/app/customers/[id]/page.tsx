import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { customers } from "@/lib/data";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Calendar as CalendarIcon, FileText } from "lucide-react";
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function CustomerProfilePage({ params }: { params: { id: string } }) {
  const customer = customers.find(c => c.id === params.id);

  if (!customer) {
    notFound();
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader 
        title={customer.name}
        actions={
          <Button asChild>
            <Link href="/appointments">New Appointment</Link>
          </Button>
        }
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                <AvatarFallback className="text-3xl">{customer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-2xl">{customer.name}</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2 text-sm">
                <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground"/>
                    <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground"/>
                    <span>Joined on {new Date(customer.joinDate).toLocaleDateString()}</span>
                </div>
                 <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground"/>
                    <span>{customer.bookings.length} total bookings</span>
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Booking History</CardTitle>
              <CardDescription>A log of all past readings for {customer.name}.</CardDescription>
            </CardHeader>
            <CardContent>
                {customer.bookings.length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                        {customer.bookings.map((booking, index) => (
                            <AccordionItem value={`item-${index}`} key={booking.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <span>{booking.readingType}</span>
                                        <span className="text-muted-foreground">{new Date(booking.date).toLocaleDateString()}</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-muted-foreground">{booking.notes}</p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                    <p className="text-center text-muted-foreground py-8">No bookings yet.</p>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
