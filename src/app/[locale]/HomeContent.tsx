"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Globe, Smartphone, PenTool, Palette, Search, ShoppingCart, ArrowRight, Star, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/animations/FadeIn";
import { StaggerContainer, staggerItemVariants } from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

const HeroScene = dynamic(() => import("@/components/3d/HeroScene").then(m => ({ default: m.HeroScene })), {
  ssr: false,
  loading: () => null,
});

const serviceIcons = [
  <Palette key="ui" size={24} />,
  <Globe key="web" size={24} />,
  <PenTool key="branding" size={24} />,
  <Smartphone key="mobile" size={24} />,
  <ShoppingCart key="ecommerce" size={24} />,
  <Search key="seo" size={24} />,
];

const serviceKeys = ["ui", "web", "cloud", "mobile", "consulting", "ai"] as const;
const projectKeys = ["realestate", "coffee", "agency", "vision", "logistics", "education", "photography", "lessence"] as const;

const BP = "/nexit-studio";
const heroImages = [
  `${BP}/projects/realestate.png`,
  `${BP}/projects/coffee.png`,
  `${BP}/projects/agency.png`,
  `${BP}/projects/vision.png`,
  `${BP}/projects/logistics.png`,
  `${BP}/projects/education.png`,
  `${BP}/projects/photography.png`,
  `${BP}/projects/lessence.png`,
];

const liveLinks = [
  "https://ramyradad1.github.io/riyadh-residences",
  "https://ramyradad1.github.io/saudi-coffee-co",
  "https://ramyradad1.github.io/jeddah-tech-hub",
  "https://ramyradad1.github.io/vision-2030-tracker",
  "https://ramyradad1.github.io/horizon-logistics",
  "https://ramyradad1.github.io/eduplay-learning",
  "https://ramyradad1.github.io/vision-photography/",
  "https://lessence-web.vercel.app/",
];

export default function HomeContent() {
  const t = useTranslations("Hero");
  const st = useTranslations("Services");
  const pt = useTranslations("Projects");

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* 3D Background Scene */}
        <HeroScene />

        {/* Static ambient gradients (replaced infinite motion.div animations) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-accent/8 blur-[80px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-sky-500/8 blur-[80px]" />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02] grid-pattern-overlay" />

        {/* Subtle decorative shapes with gentle CSS animations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 right-[20%] w-4 h-4 rounded-full border-2 border-accent/30"
            animate={{ y: [0, -15, 0], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[40%] left-[10%] w-3 h-3 bg-sky-400/30 rounded-sm rotate-45"
            animate={{ y: [0, 10, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[30%] right-[15%] w-5 h-5 border border-emerald-400/20 rounded-lg"
            animate={{ y: [0, -8, 0], rotate: [0, 20, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <Container className="relative py-20 lg:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <FadeIn delay={0.1}>
              <motion.div
                className="mb-8 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent text-sm font-medium"
                whileHover={{ scale: 1.05, borderColor: "rgba(56, 189, 248, 0.4)" }}
              >
                <Sparkles size={14} className="animate-pulse" />
                {t("badge")}
              </motion.div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="animate-float">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                  {t("title")}{" "}
                  <span className="bg-linear-to-r from-accent via-sky-400 to-emerald-400 bg-clip-text text-transparent bg-size-[200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                    {t("titleHighlight")}
                  </span>
                  <br />
                  {t("titleEnd")}
                </h1>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="animate-float [animation-delay:1s]">
                <p className="mt-6 text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {t("subtitle")}
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button href="/contact" size="lg" className="shadow-lg shadow-accent/20 hover:shadow-xl hover:shadow-accent/30 transition-shadow duration-300">
                    {t("cta")}
                    <ArrowRight size={18} />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button href="/projects" variant="outline" size="lg" className="hover:border-accent/30 transition-all duration-300">
                    {t("ctaSecondary")}
                  </Button>
                </motion.div>
              </div>
            </FadeIn>

            {/* Stats Row */}
            <FadeIn delay={0.6} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/50 pt-10">
              <div className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-200">
                <AnimatedCounter to={50} suffix="+" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Projects Delivered</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-200">
                <AnimatedCounter to={5} suffix="/5" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium flex items-center gap-1">
                  Average Rating <Star size={14} className="text-amber-500 fill-amber-500" />
                </span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-200">
                <AnimatedCounter to={99} suffix="%" className="text-3xl md:text-4xl font-bold text-foreground" />
                <span className="text-sm text-muted-foreground font-medium">Client Satisfaction</span>
              </div>
              <div className="flex flex-col items-center gap-2 hover:-translate-y-1 transition-transform duration-200">
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
                  image={heroImages[i]}
                  index={i}
                  liveUrl={liveLinks[i]}
                />
              </motion.div>
            ))}
          </StaggerContainer>
          <FadeIn delay={0.4} className="mt-12 text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
              <Button href="/projects" variant="outline" className="hover:border-accent/30 transition-all duration-300">
                {pt("viewProject")}
                <ArrowRight size={16} />
              </Button>
            </motion.div>
          </FadeIn>
        </Container>
      </section>
    </>
  );
}
