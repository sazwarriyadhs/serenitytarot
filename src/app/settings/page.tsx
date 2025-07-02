'use client';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { serviceOfferings } from '@/lib/data';
import { DynamicIcon, type IconName } from '@/components/DynamicIcon';
import { MoreHorizontal, PlusCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
    const { t } = useTranslation();

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
            <PageHeader
                title={t('settings.title')}
                description={t('settings.description')}
            />
            <Tabs defaultValue="specializations" className='w-full'>
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="specializations">{t('settings.tabs.specializations')}</TabsTrigger>
                    <TabsTrigger value="durations">{t('settings.tabs.durations')}</TabsTrigger>
                    <TabsTrigger value="payment">{t('settings.tabs.payment')}</TabsTrigger>
                </TabsList>
                <TabsContent value="specializations" className="mt-6">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <div>
                                    <CardTitle className="font-headline">{t('settings.specializations.title')}</CardTitle>
                                    <CardDescription>{t('settings.specializations.description')}</CardDescription>
                                </div>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" />
                                    {t('settings.specializations.addNew')}
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[50px]">Icon</TableHead>
                                        <TableHead>{t('settings.specializations.table.service')}</TableHead>
                                        <TableHead>{t('settings.specializations.table.description')}</TableHead>
                                        <TableHead>
                                            <span className="sr-only">{t('settings.specializations.table.actions')}</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {serviceOfferings.map((service, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <DynamicIcon name={service.iconName as IconName} className="h-5 w-5 text-muted-foreground" />
                                            </TableCell>
                                            <TableCell className="font-medium">{t(service.titleKey)}</TableCell>
                                            <TableCell className="text-muted-foreground hidden md:table-cell">{t(service.descriptionKey)}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreHorizontal className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>{t('customers.actions_edit')}</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-destructive">{t('customers.actions_delete')}</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="durations" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">{t('settings.durations.title')}</CardTitle>
                            <CardDescription>{t('settings.durations.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           <div className="text-center text-muted-foreground py-16">
                                <p>Duration management coming soon.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="payment" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">{t('settings.payment.title')}</CardTitle>
                            <CardDescription>{t('settings.payment.description')}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="payment-paypal" className="flex flex-col space-y-1">
                                    <span>PayPal</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Accept payments through PayPal.
                                    </span>
                                </Label>
                                <Switch id="payment-paypal" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="payment-stripe" className="flex flex-col space-y-1">
                                    <span>Stripe (Credit/Debit Card)</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                        Accept credit and debit card payments.
                                    </span>
                                </Label>
                                <Switch id="payment-stripe" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="payment-bank" className="flex flex-col space-y-1">
                                    <span>Bank Transfer</span>
                                    <span className="font-normal leading-snug text-muted-foreground">
                                       Accept manual bank transfer payments.
                                    </span>
                                </Label>
                                <Switch id="payment-bank" />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    );
}
