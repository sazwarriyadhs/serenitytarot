
'use client';

import { useTranslation } from 'react-i18next';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Globe,
  Heart,
  Briefcase,
  Banknote,
  HandHeart,
  ThumbsUp,
  CalendarClock,
  Hourglass,
  Stars,
  Orbit,
  type LucideIcon,
} from 'lucide-react';

type Service = {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
};

const services: Service[] = [
  {
    icon: Globe,
    titleKey: 'services.general.title',
    descriptionKey: 'services.general.description',
  },
  {
    icon: Heart,
    titleKey: 'services.love.title',
    descriptionKey: 'services.love.description',
  },
  {
    icon: Briefcase,
    titleKey: 'services.career.title',
    descriptionKey: 'services.career.description',
  },
  {
    icon: Banknote,
    titleKey: 'services.finance.title',
    descriptionKey: 'services.finance.description',
  },
  {
    icon: HandHeart,
    titleKey: 'services.spiritual.title',
    descriptionKey: 'services.spiritual.description',
  },
  {
    icon: ThumbsUp,
    titleKey: 'services.yesNo.title',
    descriptionKey: 'services.yesNo.description',
  },
  {
    icon: CalendarClock,
    titleKey: 'services.timeBased.title',
    descriptionKey: 'services.timeBased.description',
  },
  {
    icon: Hourglass,
    titleKey: 'services.ppf.title',
    descriptionKey: 'services.ppf.description',
  },
  {
    icon: Stars,
    titleKey: 'services.soulmate.title',
    descriptionKey: 'services.soulmate.description',
  },
  {
    icon: Orbit,
    titleKey: 'services.chakra.title',
    descriptionKey: 'services.chakra.description',
  },
];

export default function ServicesPage() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('services.title')}
        description={t('services.pageDescription')}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <Card key={index} className="flex flex-col transition-shadow hover:shadow-lg">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-3">
                  <Icon className="h-6 w-6 text-primary" />
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
