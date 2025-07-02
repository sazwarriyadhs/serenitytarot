
'use client';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { serviceOfferings } from '@/lib/data';
import { DynamicIcon, type IconName } from '@/components/DynamicIcon';

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('services.title')}
        description={t('services.pageDescription')}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {serviceOfferings.map((service, index) => {
          return (
            <Card key={index} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3">
                  <DynamicIcon name={service.iconName as IconName} className="h-6 w-6 text-primary" />
                  {t(service.titleKey)}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground">{t(service.descriptionKey)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
