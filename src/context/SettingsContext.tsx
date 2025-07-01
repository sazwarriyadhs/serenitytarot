'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';

type Currency = 'USD' | 'IDR';
type Language = 'en' | 'id';

interface SettingsContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  language: Language;
  setLanguage: (language: Language) => void;
  formatCurrency: (value: number) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [language, setLanguageState] = useState<Language>('en');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const storedCurrency = localStorage.getItem('currency') as Currency | null;
    const storedLanguage = localStorage.getItem('language') as Language | null;

    if (storedCurrency) {
      setCurrencyState(storedCurrency);
    }
    if (storedLanguage) {
      setLanguageState(storedLanguage);
    }
    setIsMounted(true);
  }, []);

  const setCurrency = (newCurrency: Currency) => {
    setCurrencyState(newCurrency);
    if(typeof window !== 'undefined') localStorage.setItem('currency', newCurrency);
  };

  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
    if(typeof window !== 'undefined') localStorage.setItem('language', newLanguage);
  };
  
  const formatCurrency = useMemo(() => (value: number) => {
      if (!isMounted) return ''; // Avoid rendering on server or before hydration
      const options: Intl.NumberFormatOptions = {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
      };
      const locale = language === 'id' ? 'id-ID' : 'en-US';
      return new Intl.NumberFormat(locale, options).format(value);
  }, [currency, language, isMounted]);

  const value = {
    currency,
    setCurrency,
    language,
    setLanguage,
    formatCurrency
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
