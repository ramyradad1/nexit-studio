import { routing } from "@/i18n/routing";

export default function RootPage() {
  const defaultLocale = routing.defaultLocale;

  return (
    <html>
      <head>
        <meta httpEquiv="refresh" content={`0;url=/nexit-studio/${defaultLocale}`} />
      </head>
      <body />
    </html>
  );
}
