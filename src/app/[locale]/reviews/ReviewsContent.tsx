"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Star, ShieldCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";

const reviewKeys = [
  "review1", "review2", "review3", "review4",
  "review5", "review6", "review7", "review8"
] as const;

export default function ReviewsContent() {
  const t = useTranslations("Reviews");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        {/* Aggregate Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Star className="fill-accent text-accent" size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">4.9/5</h3>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <ThumbsUp size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">98%</h3>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
          <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">50+</h3>
            <p className="text-sm text-muted-foreground">Verified Reviews</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviewKeys.map((key, i) => (
            <ReviewCard
              key={key}
              name={t(`items.${key}.name`)}
              role={t(`items.${key}.role`)}
              quote={t(`items.${key}.quote`)}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
