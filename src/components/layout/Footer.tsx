"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

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
    <footer className="relative border-t border-border bg-muted/30 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            className="md:col-span-1 lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <motion.div
                className="shrink-0"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <img
                  src="/nexit-studio/logo.png"
                  alt="NexaIT Logo"
                  width={36}
                  height={36}
                  className="rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/logo.png";
                  }}
                />
              </motion.div>
              <span className="text-lg font-bold tracking-tight">
                Nexa<span className="bg-linear-to-r from-accent to-sky-400 bg-clip-text text-transparent">IT</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("tagline")}
            </p>

            {/* WhatsApp CTA */}
            <motion.a
              href="https://wa.me/201030769960"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 text-sm font-medium transition-all cursor-pointer group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle size={18} />
              {t("whatsapp")}
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-foreground">{t("quickLinks")}</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-foreground hover:text-accent transition-colors cursor-pointer hover:translate-x-1 inline-block"
                  >
                    {nav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold mb-4 text-foreground">{t("connect")}</h3>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>hello@nexait.studio</li>
              <li>+966 55 123 4567</li>
              <li>Riyadh, Saudi Arabia</li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-xs text-muted-foreground text-center">
            {t("rights")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
