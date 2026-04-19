import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import '@/app/globals.css';
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export const metadata = {
  title: "Minh Phuong Co., Ltd | Vietnam Premium Agri-Food",
  description: "Minh Phuong is a leading Vietnamese exporter of high-quality frozen seafood, fresh/frozen fruits, and Golden Robusta coffee. FDA, BRCGS, IFS & ISO certified.",
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }
 
  const messages = await getMessages();
 
  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable} scroll-smooth scroll-pt-[100px] antialiased`}>
      <body className="min-h-screen flex flex-col font-body bg-white text-slate-700">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
