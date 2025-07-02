
'use client';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export default function PricingPage() {
  const { t } = useTranslation();

  const priceListData = [
    { service: t('pricing.services.one_question'), duration: '10–15 ' + t('appointments.schedule.minutes'), price: 'Rp20.000 – Rp50.000' },
    { service: t('pricing.services.short_session'), duration: '15–20 ' + t('appointments.schedule.minutes'), price: 'Rp50.000 – Rp75.000' },
    { service: t('pricing.services.general_reading'), duration: '30–45 ' + t('appointments.schedule.minutes'), price: 'Rp100.000 – Rp150.000' },
    { service: t('pricing.services.deep_reading'), duration: '60 ' + t('appointments.schedule.minutes'), price: 'Rp150.000 – Rp300.000' },
    { service: t('pricing.services.chat_reading'), duration: t('pricing.services.depends'), price: 'Rp30.000 – Rp100.000' },
    { service: t('pricing.services.video_call'), duration: '30-60 ' + t('appointments.schedule.minutes'), price: 'Rp100.000 – Rp300.000' },
    { service: t('pricing.services.event'), duration: t('pricing.services.per_hour'), price: 'Rp500.000 – Rp1.000.000+' },
  ];

  const factors = [
    t('pricing.factors.experience'),
    t('pricing.factors.media'),
    t('pricing.factors.complexity'),
  ];

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('pricing.title')}
        description={t('pricing.description')}
      />
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">{t('pricing.table_title')}</CardTitle>
          <CardDescription>{t('pricing.table_description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('pricing.table_service')}</TableHead>
                <TableHead>{t('pricing.table_duration')}</TableHead>
                <TableHead className="text-right">{t('pricing.table_price')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {priceListData.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.service}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell className="text-right">
                    <Badge variant="secondary">{item.price}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 pt-6 border-t">
            <h3 className="font-headline text-lg mb-4">{t('pricing.factors_title')}</h3>
            <ul className="space-y-2 text-muted-foreground">
              {factors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Star className="h-4 w-4 mt-1 text-primary shrink-0" />
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
