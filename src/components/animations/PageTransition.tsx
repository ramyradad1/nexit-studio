"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = useLocale();
  const isRtl = locale === "ar";
  
  // Slide direction respects RTL layout
  const initialX = isRtl ? 20 : -20;
  const exitX = isRtl ? -20 : 20;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, x: initialX }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: exitX }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
