"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter, Link } from "@/i18n/navigation";
import { useTheme } from "@/components/providers/ThemeProvider";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "projects", href: "/projects" },
  { key: "reviews", href: "/reviews" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Navbar() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const switchLocale = () => {
    const next = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-8 w-8 rounded-lg bg-accent flex items-center justify-center text-white font-bold text-sm transition-transform group-hover:scale-110" aria-label="NexaIT Logo">
                <div className="absolute inset-0 bg-linear-to-br from-white/40 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                N
              </div>
              <span className="text-lg font-bold tracking-tight">
                Nexa<span className="text-accent">IT</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={clsx(
                      "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                      isActive
                        ? "text-accent bg-accent/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="relative h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Language Switch */}
              <button
                onClick={switchLocale}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Switch language"
              >
                <Globe size={16} />
                {t("switchLang")}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden h-9 w-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                aria-label="Toggle mobile menu"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: locale === "ar" ? "-100%" : "100%" }}
              animate={{ x: 0 }}
              exit={{ x: locale === "ar" ? "-100%" : "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={clsx(
                "fixed top-0 bottom-0 z-50 w-72 bg-card border-border p-6 md:hidden",
                locale === "ar" ? "left-0 border-e" : "right-0 border-s"
              )}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-bold">
                  Nexa<span className="text-accent">IT</span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted/50 cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={clsx(
                        "px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer",
                        isActive
                          ? "text-accent bg-accent/10"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <button
                  onClick={() => { switchLocale(); setMobileOpen(false); }}
                  className="flex items-center gap-2 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all cursor-pointer"
                >
                  <Globe size={16} />
                  {t("switchLang")}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed navbar */}
      <div className="h-16" />
    </>
  );
}
