"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe, Smartphone, PenTool, Palette, Search, ShoppingCart, ArrowRight, Star } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

const serviceIcons = [
  <Palette key="ui" size={24} />,
  <Globe key="web" size={24} />,
  <PenTool key="branding" size={24} />,
  <Smartphone key="mobile" size={24} />,
  <ShoppingCart key="ecommerce" size={24} />,
  <Search key="seo" size={24} />,
];

const serviceKeys = ["ui", "web", "cloud", "mobile", "consulting", "ai"] as const;
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

export default function HomeContent() {
  const t = useTranslations("Hero");
  const st = useTranslations("Services");
  const pt = useTranslations("Projects");

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/5 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-500/5 blur-[120px]" />
        </div>
        <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay" />
        <Container className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <motion.div
                className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                {t("badge")}
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                {t("title")}{" "}
                <span className="bg-linear-to-r from-accent via-sky-400 to-accent bg-clip-text text-transparent bg-size-[200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                  {t("titleHighlight")}
                </span>
                <br />
                {t("titleEnd")}
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {t("subtitle")}
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="/contact" size="lg" className="hover:scale-105 transition-transform duration-300">
                  {t("cta")}
                  <ArrowRight size={18} />
                </Button>
                <Button href="/projects" variant="outline" size="lg" className="hover:scale-105 transition-transform duration-300">
                  {t("ctaSecondary")}
                </Button>
              </div>
            </FadeIn>

            {/* Stats Row */}
            <FadeIn delay={0.6} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/50 pt-10">
              <div className="flex flex-col items-center gap-2">
                <AnimatedCounter to={50} suffix="+" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Projects Delivered</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AnimatedCounter to={5} suffix="/5" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                  Average Rating <Star size={14} className="text-amber-500 fill-amber-500" />
                </span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AnimatedCounter to={99} suffix="%" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Client Satisfaction</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <AnimatedCounter to={24} suffix="/7" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Support Available</span>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
      <section className="py-20 lg:py-28">
        <Container>
          <FadeIn>
            <SectionHeading title={st("heading")} subtitle={st("subtitle")} />
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceKeys.map((key, i) => (
              <motion.div key={key} variants={staggerItemVariants}>
                <ServiceCard
                  icon={serviceIcons[i]}
                  title={st(`${key}.title`)}
                  description={st(`${key}.description`)}
                  index={i}
                />
              </motion.div>
            ))}
          </StaggerContainer>
        </Container>
      </section>
      <section className="py-20 lg:py-28 bg-muted/20">
        <Container>
          <FadeIn>
            <SectionHeading title={pt("heading")} subtitle={pt("subtitle")} />
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {projectKeys.map((key, i) => (
              <motion.div key={key} variants={staggerItemVariants}>
                <ProjectCard
                  slug={key}
                  title={pt(`items.${key}.title`)}
                  description={pt(`items.${key}.description`)}
                  tags={pt(`items.${key}.tags`).split(",")}
                  image={projectImages[i]}
                  index={i}
                  githubUrl={githubLinks[i]}
                />
              </motion.div>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.4} className="mt-12 text-center">
            <Button href="/projects" variant="outline" className="hover:scale-105 transition-transform duration-300">
              {pt("viewProject")}
              <ArrowRight size={16} />
            </Button>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
