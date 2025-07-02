
'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  Calendar,
  Users,
  WandSparkles,
  LogOut,
  Globe,
  Check,
  BookHeart,
  Settings,
  User,
  Tags,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSettings } from '@/context/SettingsContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const { currency, setCurrency, language, setLanguage } = useSettings();

  const menuItems = [
    { href: '/', label: t('dashboard.title'), icon: LayoutDashboard },
    { href: '/appointments', label: t('appointments.title'), icon: Calendar },
    { href: '/customers', label: t('customers.title'), icon: Users },
    { href: '/reading', label: t('aiReading.title'), icon: WandSparkles },
    { href: '/services', label: t('services.title'), icon: BookHeart },
    { href: '/pricing', label: t('pricing.title'), icon: Tags },
    { href: '/profile', label: t('profile.title'), icon: User },
    { href: '/settings', label: t('settings.title'), icon: Settings },
  ];

  if (pathname.startsWith('/share/') || pathname === '/login') {
    return <>{children}</>;
  }

  const changeLanguage = (lng: 'en' | 'id') => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-accent" />
            <h2 className="text-xl font-headline font-semibold text-white">{t('mysticAgenda')}</h2>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LogOut />
                <span>{t('logout')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 md:px-6 sticky top-0 z-30">
            <div className='flex items-center gap-4'>
                <SidebarTrigger className="md:hidden" />
                <h1 className="hidden text-lg font-semibold md:block md:text-xl font-headline">{t('mysticAgenda')}</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Globe className="h-4 w-4" />
                  <span className="sr-only">{t('settings.title')}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t('settings.language')}</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => changeLanguage('en')}>
                  <span className='w-4 mr-2'>{language === 'en' && <Check className='h-4 w-4'/>}</span>
                  {t('settings.english')}
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => changeLanguage('id')}>
                  <span className='w-4 mr-2'>{language === 'id' && <Check className='h-4 w-4'/>}</span>
                  {t('settings.indonesian')}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>{t('settings.currency')}</DropdownMenuLabel>
                <DropdownMenuItem onSelect={() => setCurrency('USD')}>
                   <span className='w-4 mr-2'>{currency === 'USD' && <Check className='h-4 w-4'/>}</span>
                  US$
                </DropdownMenuItem>
                <DropdownMenuItem onSelect={() => setCurrency('IDR')}>
                   <span className='w-4 mr-2'>{currency === 'IDR' && <Check className='h-4 w-4'/>}</span>
                  IDR
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </header>
        {children}
        </SidebarInset>
    </SidebarProvider>
  );
}
