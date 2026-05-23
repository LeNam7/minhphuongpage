import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import Navbar from '@/components/Navbar';
import FloatingChat from '@/components/FloatingChat';
import '@/app/globals.css';
import { Inter, Plus_Jakarta_Sans } from "next/font/google";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
 
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://minhphuong.com.vn/${locale}`,
      siteName: 'Minh Phuong Co., Ltd',
      images: [
        {
          url: 'https://minhphuong.com.vn/images/logo_transparent.png',
          width: 800,
          height: 600,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['https://minhphuong.com.vn/images/logo_transparent.png'],
    },
    alternates: {
      canonical: `https://minhphuong.com.vn/${locale}`,
      languages: {
        'vi-VN': 'https://minhphuong.com.vn/vi',
        'en-US': 'https://minhphuong.com.vn/en',
      },
    },
  };
}

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

  // JSON-LD Organization Schema
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CÔNG TY TNHH SẢN XUẤT, XNK VÀ TMDV MINH PHƯƠNG",
    "alternateName": "Minh Phuong Co., Ltd",
    "url": `https://minhphuong.com.vn/${locale}`,
    "logo": "https://minhphuong.com.vn/images/logo_transparent.png",
    "sameAs": [
      "https://minhphuong.com.vn"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+84888979012",
      "contactType": "sales",
      "areaServed": "Worldwide",
      "availableLanguage": ["Vietnamese", "English"]
    },
    "taxID": "3703477680"
  };

  // JSON-LD FAQ Schema
  const faqMessages = (messages.FAQ || {}) as Record<string, string>;
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": faqMessages.q1 || "",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqMessages.a1 || ""
        }
      },
      {
        "@type": "Question",
        "name": faqMessages.q2 || "",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqMessages.a2 || ""
        }
      },
      {
        "@type": "Question",
        "name": faqMessages.q3 || "",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqMessages.a3 || ""
        }
      },
      {
        "@type": "Question",
        "name": faqMessages.q4 || "",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faqMessages.a4 || ""
        }
      }
    ]
  };

  const schemas = [orgSchema, faqSchema];
 
  return (
    <html lang={locale} className={`${inter.variable} ${jakarta.variable} scroll-smooth scroll-pt-[100px] antialiased`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-body bg-white text-slate-700" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <FloatingChat />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
