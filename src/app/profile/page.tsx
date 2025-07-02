
'use client';

import { useTranslation } from 'react-i18next';
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { tarotMaster } from '@/lib/data';
import { Mail, Star } from 'lucide-react';

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <PageHeader
        title={t('profile.title')}
        description={t('profile.description')}
        actions={<Button>{t('profile.edit')}</Button>}
      />
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-32 w-32 mb-4">
                <AvatarImage src={tarotMaster.avatarUrl} alt={tarotMaster.name} data-ai-hint="person portrait" />
                <AvatarFallback className="text-4xl">{tarotMaster.name.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-3xl">{tarotMaster.name}</CardTitle>
              <CardDescription>{t('profile.contact')}</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span>{tarotMaster.email}</span>
              </div>
               <div className="flex items-center gap-3">
                <Star className="w-5 h-5 text-muted-foreground" />
                <span>{tarotMaster.experienceYears} {t('profile.experience')}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('profile.aboutMe')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{tarotMaster.bio}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('profile.specialties')}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {tarotMaster.specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary">{specialty}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
