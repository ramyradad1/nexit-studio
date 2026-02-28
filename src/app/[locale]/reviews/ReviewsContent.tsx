"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Star, ShieldCheck, ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/StaggerContainer";

const reviewKeys = [
  "review1", "review2", "review3", "review4",
  "review5", "review6", "review7", "review8"
] as const;

export default function ReviewsContent() {
  const t = useTranslations("Reviews");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </FadeIn>

        {/* Aggregate Stats */}
        <StaggerContainer
          className="mb-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          <motion.div variants={staggerItemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
              <Star className="fill-accent text-accent" size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">4.9/5</h3>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </motion.div>
          <motion.div variants={staggerItemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4">
              <ThumbsUp size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">98%</h3>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </motion.div>
          <motion.div variants={staggerItemVariants} className="glass-card p-6 flex flex-col items-center justify-center text-center">
            <div className="h-12 w-12 rounded-full bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-4xl font-bold mb-1">50+</h3>
            <p className="text-sm text-muted-foreground">Verified Reviews</p>
          </motion.div>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviewKeys.map((key, i) => (
            <motion.div key={key} variants={staggerItemVariants}>
              <ReviewCard
                name={t(`items.${key}.name`)}
                role={t(`items.${key}.role`)}
                quote={t(`items.${key}.quote`)}
                index={i}
              />
            </motion.div>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  );
}
