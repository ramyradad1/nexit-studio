"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, ArrowUpRight } from "lucide-react";

const quickLinks = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="mb-12 rounded-3xl bg-linear-to-br from-sky-500/10 via-accent/5 to-transparent border border-accent/10 p-8 sm:p-12 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
                N
              </div>
              <span className="text-lg font-bold tracking-tight">
                Nexa<span className="text-accent">IT</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("tagline")}
            </p>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/201030769960"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-sm font-medium transition-all cursor-pointer group"
            >
              <MessageCircle size={18} />
              {t("whatsapp")}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">{t("quickLinks")}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">{t("connect")}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>hello@nexait.studio</li>
              <li>+966 55 123 4567</li>
              <li>Riyadh, Saudi Arabia</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
