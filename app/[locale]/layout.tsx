import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

import { Navbar } from '@/components/navbar';
import { Providers } from '../providers';
import { fontSans } from '@/config/fonts';
import clsx from 'clsx';
import '@/styles/globals.css';

const locales = ['en', 'ru'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>; // 👈 ПРИМЕЧАНИЕ: params теперь Promise
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params; // 👈 ОБЯЗАТЕЛЬНО await

  if (!locales.includes(locale)) {
    notFound();
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
            <div className="relative flex flex-col h-screen">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
                {children}
              </main>
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
