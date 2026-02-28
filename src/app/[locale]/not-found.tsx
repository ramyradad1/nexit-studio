"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  const t = useTranslations("NotFound");

  return (
    <section className="min-h-[70vh] flex items-center">
      <Container className="text-center py-20">
        {/* Large 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-[8rem] sm:text-[12rem] font-bold leading-none bg-linear-to-b from-accent/40 to-transparent bg-clip-text text-transparent select-none"
        >
          {t("title")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-2xl sm:text-3xl font-bold -mt-6"
        >
          {t("heading")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-4 text-muted-foreground max-w-md mx-auto"
        >
          {t("description")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-8"
        >
          <Button href="/" size="lg">
            <ArrowLeft size={16} />
            {t("cta")}
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}
