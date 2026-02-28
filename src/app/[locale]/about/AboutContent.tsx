"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/StaggerContainer";
import { Target, Eye, Sparkles, Users, Rocket } from "lucide-react";

const valueIcons = [<Sparkles key="i" size={22} />, <Target key="q" size={22} />, <Users key="c" size={22} />, <Rocket key="im" size={22} />];
const valueKeys = ["innovation", "quality", "collaboration", "impact"] as const;

export default function AboutContent() {
  const t = useTranslations("About");

  const stats = [
    { value: t("stats.projects"), label: t("stats.projectsLabel") },
    { value: t("stats.clients"), label: t("stats.clientsLabel") },
    { value: t("stats.years"), label: t("stats.yearsLabel") },
    { value: t("stats.team"), label: t("stats.teamLabel") },
  ];

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />

        {/* Mission & Vision */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 lg:mb-24">
          {(["mission", "vision"] as const).map((key, i) => (
            <motion.div
              key={key}
              variants={staggerItemVariants}
              className="glass-card p-8"
            >
              <div className="mb-4 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                {key === "mission" ? <Target size={24} /> : <Eye size={24} />}
              </div>
              <h3 className="text-xl font-semibold mb-3">{t(`${key}.title`)}</h3>
              <p className="text-muted-foreground leading-relaxed">{t(`${key}.description`)}</p>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* Stats */}
        <FadeIn className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16 lg:mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center gap-2 p-6 glass-card rounded-2xl text-center">
              <AnimatedCounter
                to={parseInt(stat.value.replace(/[^0-9]/g, '')) || 0}
                suffix={stat.value.replace(/[0-9]/g, '')}
                className="text-4xl md:text-5xl font-bold text-foreground"
              />
              <span className="text-sm text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </FadeIn>

        {/* Values */}
        <div>
          <FadeIn>
            <h3 className="text-2xl font-bold text-center mb-10">{t("values.title")}</h3>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueKeys.map((key, i) => (
              <motion.div
                key={key}
                variants={staggerItemVariants}
                className="glass-card p-6 text-center"
              >
                <div className="mx-auto mb-4 h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                  {valueIcons[i]}
                </div>
                <h4 className="text-base font-semibold mb-2">{t(`values.items.${key}.title`)}</h4>
                <p className="text-sm text-muted-foreground">{t(`values.items.${key}.description`)}</p>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  );
}
