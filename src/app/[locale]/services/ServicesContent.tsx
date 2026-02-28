"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Globe, Smartphone, Cloud, Palette, Brain, Lightbulb } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/StaggerContainer";
import { motion } from "framer-motion";

const serviceIcons = [
  <Globe key="web" size={24} />,
  <Smartphone key="mobile" size={24} />,
  <Cloud key="cloud" size={24} />,
  <Palette key="ui" size={24} />,
  <Brain key="ai" size={24} />,
  <Lightbulb key="consulting" size={24} />,
];

const serviceKeys = ["web", "mobile", "cloud", "ui", "ai", "consulting"] as const;

const techItems = ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "Supabase", "Framer Motion", "Docker"];

export default function ServicesContent() {
  const t = useTranslations("Services");

  return (
    <section className="py-20 lg:py-28 overflow-hidden">
      <Container>
        <FadeIn>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </FadeIn>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => (
            <motion.div key={key} variants={staggerItemVariants}>
              <ServiceCard
                icon={serviceIcons[i]}
                title={t(`${key}.title`)}
                description={t(`${key}.description`)}
                index={i}
              />
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Infinite Marquee Section — now CSS-only instead of framer-motion */}
        <div className="mt-24 pt-16 border-t border-border/50">
          <FadeIn>
            <h3 className="text-xl md:text-2xl font-semibold text-center mb-10 text-muted-foreground">{t("techStack") || "Powered by Next-Gen Technologies"}</h3>
          </FadeIn>

          <div className="relative flex overflow-x-hidden group">
            <div className="absolute top-0 left-0 w-32 h-full bg-linear-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-full bg-linear-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* CSS-only marquee using @keyframes — no JS per frame */}
            <div
              className="flex whitespace-nowrap gap-12 sm:gap-16 py-4 px-8 items-center animate-[marquee_20s_linear_infinite]"
            >
              {[...Array(2)].map((_, arrayIndex) => (
                <div key={arrayIndex} className="flex gap-12 sm:gap-16 items-center">
                  {techItems.map((item) => (
                    <span key={`${arrayIndex}-${item}`} className="text-2xl sm:text-3xl font-bold text-accent/20">{item}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
