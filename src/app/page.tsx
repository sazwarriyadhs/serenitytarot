'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Logo } from '@/components/icons';
import { serviceOfferings, tarotMaster } from '@/lib/data';
import { DynamicIcon } from '@/components/DynamicIcon';
import type { IconName } from '@/components/DynamicIcon';
import { ArrowRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "The reading was incredibly accurate and gave me the clarity I desperately needed. Madame Elena is a true master.",
    name: "Aria M.",
    service: "Career & Business Reading"
  },
  {
    quote: "I was skeptical at first, but the insights I received were profound. It helped me navigate a very difficult relationship decision.",
    name: "Spencer H.",
    service: "Love & Relationship Reading"
  },
  {
    quote: "An empowering and healing experience. I left the session feeling lighter and more hopeful about the future.",
    name: "Hanna M.",
    service: "Spiritual & Healing Reading"
  }
];


export default function LandingPage() {
  const { t } = useTranslation();
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const featuredServices = serviceOfferings.slice(0, 3);

  return (
    <div className="bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Logo className="h-6 w-6" />
              <span className="font-bold font-headline">Mystic Agenda</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/login">{t('landing.bookNow')}</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section with Carousel */}
        <section className="relative h-[60vh] md:h-[80vh] w-full">
           <Carousel 
              className="w-full h-full" 
              plugins={[plugin.current]}
              opts={{ loop: true }}
            >
              <CarouselContent className="h-full">
                  <CarouselItem>
                      <Image src="/images/tarot/hero_1.png" alt="Mystical Tarot Reading" fill={true} className="object-cover brightness-50" data-ai-hint="mystical tarot reading" />
                  </CarouselItem>
                  <CarouselItem>
                      <Image src="/images/tarot/hero_2.png" alt="Astrology Chart" fill={true} className="object-cover brightness-50" data-ai-hint="astrology chart" />
                  </CarouselItem>
                  <CarouselItem>
                      <Image src="/images/tarot/hero_3.png" alt="Crystal Ball Future" fill={true} className="object-cover brightness-50" data-ai-hint="crystal ball future" />
                  </CarouselItem>
              </CarouselContent>
          </Carousel>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
            <h1 className="text-4xl md:text-6xl font-extrabold font-headline leading-tight tracking-tighter drop-shadow-md">
              {t('landing.heroTitle')}
            </h1>
            <p className="mt-4 max-w-2xl text-lg md:text-xl text-primary-foreground/90 drop-shadow-sm">
              {t('landing.heroSubtitle')}
            </p>
            <Button size="lg" className="mt-8" asChild>
              <Link href="/login">{t('landing.getReading')}</Link>
            </Button>
          </div>
        </section>

        {/* About the Master Section */}
        <section id="about" className="py-16 md:py-24 bg-card">
           <div className="container mx-auto px-4">
             <div className="grid md:grid-cols-3 gap-8 items-center">
                <div className="md:col-span-1 flex justify-center">
                    <Avatar className="h-48 w-48 border-4 border-primary">
                        <AvatarImage src={tarotMaster.avatarUrl} alt={tarotMaster.name} />
                        <AvatarFallback className="text-5xl">{tarotMaster.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                </div>
                <div className="md:col-span-2 text-center md:text-left">
                    <h2 className="text-3xl font-bold font-headline">{t('landing.aboutTitle', { name: tarotMaster.name })}</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        {t('landing.aboutText')}
                    </p>
                    <Button variant="outline" className="mt-6" asChild>
                        <Link href="/profile">{t('landing.learnMore')} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
             </div>
           </div>
        </section>

        {/* Featured Services Section */}
        <section id="services" className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold font-headline">{t('landing.servicesTitle')}</h2>
                <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
                   {t('landing.servicesSubtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
                    {featuredServices.map((service) => (
                        <Card key={service.id} className="transform transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
                            <CardHeader>
                                <div className="flex items-center gap-4">
                                    <DynamicIcon name={service.iconName as IconName} className="h-8 w-8 text-primary" />
                                    <CardTitle className="font-headline text-xl">{service.title}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{service.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Button size="lg" className="mt-12" variant="secondary" asChild>
                    <Link href="/services">{t('landing.viewAllServices')}</Link>
                </Button>
            </div>
        </section>

         {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24 bg-card">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold font-headline">{t('landing.testimonialsTitle')}</h2>
                <p className="mt-2 max-w-2xl mx-auto text-lg text-muted-foreground">
                    {t('landing.testimonialsSubtitle')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                   {testimonials.map((testimonial, index) => (
                        <Card key={index} className="text-left">
                            <CardContent className="pt-6">
                                <Quote className="h-8 w-8 text-primary/50 mb-4" />
                                <blockquote className="text-foreground italic">"{testimonial.quote}"</blockquote>
                                <footer className="mt-4">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">{testimonial.service}</p>
                                </footer>
                            </CardContent>
                        </Card>
                   ))}
                </div>
            </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t">
          <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
              <p>&copy; {new Date().getFullYear()} Mystic Agenda. {t('landing.footerRights')}</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                  <Link href="#" className="hover:text-primary">Privacy Policy</Link>
                  <Link href="#" className="hover:text-primary">Terms of Service</Link>
              </div>
          </div>
      </footer>
    </div>
  );
}
