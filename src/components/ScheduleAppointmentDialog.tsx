
'use client';

import { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import type { Customer, ServiceOffering, Appointment } from '@/lib/types';
import { PlusCircle, ArrowRight, ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { useSettings } from '@/context/SettingsContext';
import { format } from 'date-fns';

interface ScheduleAppointmentDialogProps {
  onAppointmentScheduled: (newAppointment: Appointment) => void;
  customers: Customer[];
  services: ServiceOffering[];
}

const formSchema = z.object({
  customerId: z.string({ required_error: 'Please select a client.' }),
  serviceIds: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one service.",
  }),
  date: z.date({ required_error: 'A date is required.' }),
  time: z.string({ required_error: 'A time is required.' }),
});

export function ScheduleAppointmentDialog({ onAppointmentScheduled, customers, services }: ScheduleAppointmentDialogProps) {
  const { t } = useTranslation();
  const { formatCurrency } = useSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceIds: [],
    },
  });

  const selectedServiceIds = form.watch('serviceIds');

  const { totalPrice, totalDuration } = useMemo(() => {
    const selectedServices = services.filter(service => selectedServiceIds?.includes(service.id));
    const totalPrice = selectedServices.reduce((acc, service) => acc + service.price, 0);
    const totalDuration = selectedServices.reduce((acc, service) => acc + service.duration, 0);
    return { totalPrice, totalDuration };
  }, [selectedServiceIds, services]);


  function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedCustomer = customers.find(c => c.id === values.customerId);
    const selectedServices = services.filter(s => values.serviceIds.includes(s.id));

    if (!selectedCustomer) return;

    const newAppointment: Appointment = {
      id: `app${Date.now()}`,
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerAvatarUrl: selectedCustomer.avatarUrl,
      date: format(values.date, 'yyyy-MM-dd'),
      time: values.time,
      status: 'Upcoming',
      services: selectedServices,
      totalPrice: totalPrice,
      totalDuration: totalDuration,
    };
    
    onAppointmentScheduled(newAppointment);
    toast({
      title: t('appointments.schedule.success_toast_title'),
      description: t('appointments.schedule.success_toast_desc', { name: selectedCustomer.name, date: format(values.date, 'PPP') }),
    });
    setIsOpen(false);
    form.reset();
    setStep(1);
  }

  const handleNext = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await form.trigger("customerId");
    } else if (step === 2) {
      isValid = await form.trigger("serviceIds");
    }
    if (isValid) {
      setStep(s => s + 1);
    }
  };

  const handleBack = () => {
    setStep(s => s - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
        if (!open) {
            form.reset();
            setStep(1);
        }
        setIsOpen(open);
    }}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t('appointments.schedule_button')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline">{t('appointments.schedule.title')}</DialogTitle>
          <DialogDescription>
            {step === 1 && t('appointments.schedule.step1_desc')}
            {step === 2 && t('appointments.schedule.step2_desc')}
            {step === 3 && t('appointments.schedule.step3_desc')}
            {step === 4 && t('appointments.schedule.summary_desc')}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {step === 1 && (
              <Card className="p-6">
                <FormField
                  control={form.control}
                  name="customerId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t('appointments.schedule.client')}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={t('reading.selectClientPlaceholder')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {customers.map(customer => (
                            <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                 <FormField
                    control={form.control}
                    name="serviceIds"
                    render={() => (
                        <FormItem>
                        <div className="mb-4">
                            <FormLabel className="text-base">{t('appointments.schedule.services')}</FormLabel>
                            <FormDescription>
                                {t('appointments.schedule.step2_desc')}
                            </FormDescription>
                        </div>
                        <div className="max-h-60 overflow-y-auto pr-2 space-y-2">
                        {services.map((item) => (
                            <FormField
                            key={item.id}
                            control={form.control}
                            name="serviceIds"
                            render={({ field }) => {
                                return (
                                <FormItem
                                    key={item.id}
                                    className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                                >
                                    <FormControl>
                                    <Checkbox
                                        checked={field.value?.includes(item.id)}
                                        onCheckedChange={(checked) => {
                                        return checked
                                            ? field.onChange([...(field.value ?? []), item.id])
                                            : field.onChange(
                                                field.value?.filter(
                                                (value) => value !== item.id
                                                )
                                            )
                                        }}
                                    />
                                    </FormControl>
                                    <div className="w-full">
                                        <FormLabel className="font-normal flex justify-between items-center w-full">
                                            <span>{item.title}</span>
                                            <span className="text-sm font-bold">{formatCurrency(item.price)}</span>
                                        </FormLabel>
                                        <FormDescription className="text-xs">
                                           {item.duration} {t('appointments.schedule.minutes')}
                                        </FormDescription>
                                    </div>
                                </FormItem>
                                )
                            }}
                            />
                        ))}
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div className="mt-4 pt-4 border-t flex justify-between font-bold text-lg">
                        <span>{t('appointments.schedule.total_price')}</span>
                        <span>{formatCurrency(totalPrice)}</span>
                    </div>
                     <div className="flex justify-between font-medium">
                        <span>{t('appointments.schedule.total_duration')}</span>
                        <span>{totalDuration} {t('appointments.schedule.minutes')}</span>
                    </div>
              </Card>
            )}
            
            {step === 3 && (
                <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6">
                         <FormField
                            control={form.control}
                            name="date"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                <FormLabel><CalendarIcon className="mr-2 h-4 w-4 inline" />{t('appointments.table_date')}</FormLabel>
                                <FormControl>
                                    <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    disabled={(date) =>
                                        date < new Date(new Date().setDate(new Date().getDate() - 1))
                                    }
                                    initialFocus
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                            />
                    </Card>
                     <Card className="p-6">
                        <FormField
                            control={form.control}
                            name="time"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel><Clock className="mr-2 h-4 w-4 inline"/>{t('appointments.table_time')}</FormLabel>
                                <FormControl>
                                    <Input type="time" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Card>
                </div>
            )}

            {step === 4 && (
              <Card>
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-headline text-lg">{t('appointments.schedule.summary')}</h3>
                  <div>
                    <span className="text-sm text-muted-foreground">{t('appointments.schedule.client')}</span>
                    <p className="font-medium">{customers.find(c => c.id === form.getValues('customerId'))?.name}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t('appointments.schedule.date_time')}</span>
                    <p className="font-medium">{format(form.getValues('date'), 'PPP')} at {form.getValues('time')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">{t('appointments.schedule.services')}</span>
                    <ul className="list-disc list-inside font-medium">
                      {services.filter(s => form.getValues('serviceIds').includes(s.id)).map(s => <li key={s.id}>{s.title}</li>)}
                    </ul>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between font-bold text-lg">
                      <span>{t('appointments.schedule.total_price')}</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{t('appointments.schedule.total_duration')}</span>
                      <span>{totalDuration} {t('appointments.schedule.minutes')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <DialogFooter className="pt-4">
              {step > 1 && <Button type="button" variant="outline" onClick={handleBack}><ArrowLeft /> {t('appointments.schedule.button_back')}</Button>}
              {step < 4 && <Button type="button" onClick={handleNext}>{t('appointments.schedule.button_next')} <ArrowRight /></Button>}
              {step === 4 && <Button type="submit">{t('appointments.schedule.button_schedule')}</Button>}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
