"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe, Smartphone, Cloud, Palette, Brain, Lightbulb, ArrowRight } from "lucide-react";

const serviceIcons = [
  <Globe key="web" size={24} />,
  <Smartphone key="mobile" size={24} />,
  <Cloud key="cloud" size={24} />,
  <Palette key="ui" size={24} />,
  <Brain key="ai" size={24} />,
  <Lightbulb key="consulting" size={24} />,
];

const serviceKeys = ["web", "mobile", "cloud", "ui", "ai", "consulting"] as const;
const projectKeys = ["realestate", "coffee", "agency", "vision", "logistics", "education"] as const;

const projectImages = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2071",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=2000",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
];

const githubLinks = [
  "https://github.com/nexait-studio/riyadh-residences",
  "https://github.com/nexait-studio/saudi-coffee-co",
  "https://github.com/nexait-studio/jeddah-tech-hub",
  "https://github.com/nexait-studio/vision-2030-tracker",
  "https://github.com/nexait-studio/fasttrack-logistics",
  "https://github.com/nexait-studio/edulearn-platform",
];

export default function HomePage() {
  const t = useTranslations("Hero");
  const st = useTranslations("Services");
  const pt = useTranslations("Projects");

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent/3 blur-[150px]" />
        </div>

        {/* Grid Pattern Overlay */}
        <div
          className="absolute inset-0 opacity-[0.02] grid-pattern-overlay"
        />

        <Container className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              {t("badge")}
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
            >
              {t("title")}{" "}
              <span className="bg-linear-to-r from-accent via-sky-400 to-accent bg-clip-text text-transparent bg-size-[200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                {t("titleHighlight")}
              </span>
              <br />
              {t("titleEnd")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button href="/contact" size="lg">
                {t("cta")}
                <ArrowRight size={18} />
              </Button>
              <Button href="/projects" variant="outline" size="lg">
                {t("ctaSecondary")}
              </Button>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ─── Services Preview ─── */}
      <section className="py-20 lg:py-28">
        <Container>
          <SectionHeading title={st("heading")} subtitle={st("subtitle")} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceKeys.map((key, i) => (
              <ServiceCard
                key={key}
                icon={serviceIcons[i]}
                title={st(`${key}.title`)}
                description={st(`${key}.description`)}
                index={i}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ─── Featured Projects ─── */}
      <section className="py-20 lg:py-28 bg-muted/20">
        <Container>
          <SectionHeading title={pt("heading")} subtitle={pt("subtitle")} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectKeys.map((key, i) => (
              <ProjectCard
                key={key}
                slug={key}
                title={pt(`items.${key}.title`)}
                description={pt(`items.${key}.description`)}
                tags={pt(`items.${key}.tags`).split(",")}
                image={projectImages[i]}
                index={i}
                githubUrl={githubLinks[i]}
              />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/projects" variant="outline">
              {pt("viewProject")}
              <ArrowRight size={16} />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
