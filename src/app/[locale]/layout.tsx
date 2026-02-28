import "../globals.css";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Comfortaa, IBM_Plex_Sans_Arabic } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { PageTransition } from "@/components/animations/PageTransition";
import { Toaster } from "sonner";

const comfortaa = Comfortaa({
  subsets: ["latin"],
  variable: "--font-comfortaa",
  display: "swap",
});

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexait.studio"),
  title: {
    default: "NexaIT Studio — Premium Digital Solutions",
    template: "%s | NexaIT Studio",
  },
  description: "We craft stunning websites, mobile apps, and cloud solutions that drive growth.",
  openGraph: {
    type: "website",
    siteName: "NexaIT Studio",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
};

import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isRtl = locale === "ar";
  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className="dark"
      suppressHydrationWarning
    >
      <head>
        {/* Inline script to prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var t = localStorage.getItem('nexa-theme');
                if (!t) t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.classList.remove('light','dark');
                document.documentElement.classList.add(t);
              })();
            `,
          }}
        />
      </head>
      <body className={`${comfortaa.variable} ${ibmArabic.variable} font-sans antialiased overflow-x-hidden`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1 w-full flex flex-col items-center justify-start overflow-hidden">
                <PageTransition>{children}</PageTransition>
              </main>
              <Footer />
              <FloatingWhatsApp />
              <Toaster position="bottom-right" richColors />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
