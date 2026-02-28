"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import {
  ArrowLeft, ArrowRight, Calendar, Users, Tag, Globe,
  Target, Zap, Lightbulb, CheckCircle2, TrendingUp, Code
} from "lucide-react";

import { projectData } from "./data";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const project = projectData[slug as keyof typeof projectData];

  if (!project) {
    return (
      <Container className="py-20 text-center flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-3xl font-bold mb-4">Project not found</h1>
        <p className="text-muted-foreground mb-8">The case study you are looking for does not exist.</p>
        <Button href="/projects">
          <ArrowLeft size={16} className={locale === 'ar' ? 'ml-2 rotate-180' : 'mr-2'} />
          Back to Projects
        </Button>
      </Container>
    );
  }

  const projectKey = slug as keyof typeof projectData;
  const content = project[locale as 'en' | 'ar'] || project.en;
  const isRtl = locale === 'ar';

  return (
    <article className="pb-20 lg:pb-32 overflow-hidden">
      {/* Hero Section */}
      <section className="pt-20 lg:pt-28 pb-10">
        <Container>
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Button href="/projects" variant="ghost" size="sm" className="mb-8">
              <ArrowLeft size={16} className={isRtl ? 'ml-2 rotate-180' : 'mr-2'} />
              {t("heading")}
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="lg:col-span-5 flex flex-col"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {t(`items.${projectKey}.title`)}
              </h1>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {content.overview}
              </p>

              <div className="flex flex-wrap gap-6 mb-8 p-6 bg-accent/5 rounded-2xl border border-accent/10">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Users size={14} /> Client
                  </span>
                  <span className="font-semibold">{project.client}</span>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar size={14} /> Year
                  </span>
                  <span className="font-semibold">{project.year}</span>
                </div>
                <div className="w-px h-10 bg-border hidden sm:block"></div>
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Tag size={14} /> Services
                  </span>
                  <span className="font-semibold capitalize">{t(`items.${projectKey}.category`)}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button href="/contact" size="lg" className="w-full sm:w-auto">
                  Start a Similar Project
                  <ArrowRight size={16} className={isRtl ? 'mr-2 rotate-180' : 'ml-2'} />
                </Button>
                {project.liveUrl && (
                  <Button href={project.liveUrl} variant="outline" size="lg" className="w-full sm:w-auto" external>
                    <Globe size={16} className={isRtl ? 'ml-2' : 'mr-2'} />
                    {isRtl ? 'زيارة الموقع' : 'Visit Website'}
                  </Button>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="lg:col-span-7"
            >
              <div className="relative aspect-4/3 lg:aspect-square xl:aspect-4/3 rounded-3xl overflow-hidden border border-border/50 shadow-2xl group">
                <Image
                  src={project.image}
                  alt={t(`items.${projectKey}.title`)}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-tr from-background/20 to-transparent pointer-events-none"></div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* The Challenge & Solution */}
      <section className="py-16 md:py-24 bg-secondary/30 border-y border-border/40">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <motion.div
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-red-500/10 text-red-500 rounded-xl mb-6">
                <Target size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">{isRtl ? 'التحدي' : 'The Challenge'}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.challenge}
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <div className="inline-flex items-center justify-center p-3 bg-primary/10 text-primary rounded-xl mb-6">
                <Lightbulb size={24} />
              </div>
              <h2 className="text-3xl font-bold mb-4">{isRtl ? 'الحل' : 'Our Solution'}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {content.solution}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Key Features */}
      <section className="py-20 md:py-32">
        <Container>
          <motion.div
            variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{isRtl ? 'أهم المميزات التقنية' : 'Key Features'}</h2>
            <p className="text-muted-foreground text-lg">
              {isRtl
                ? 'تم تصميم وبناء هذا المشروع باستخدام أحدث التقنيات لضمان أفضل أداء وتجربة مستخدم.'
                : 'This project was architected using state-of-the-art technologies to ensure maximum performance and user experience.'}
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {content.features.map((feature, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp}
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className="h-12 w-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {idx === 0 ? <Zap size={24} /> : idx === 1 ? <CheckCircle2 size={24} /> : <Code size={24} />}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>

      {/* Impact & Results & Gallery */}
      <section className="py-20 bg-primary text-primary-foreground relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-white/10 to-transparent blur-3xl rounded-full opacity-30 transform translate-x-1/2 -translate-y-1/4 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-linear-to-t from-black/20 to-transparent blur-3xl opacity-40 pointer-events-none"></div>

        <Container className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-sm font-medium mb-8 border border-white/20">
                <TrendingUp size={16} />
                <span>{isRtl ? 'الأثر والنتائج' : 'Impact & Results'}</span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                {content.results}
              </h2>

              <div className="flex gap-8 mt-12">
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">100%</span>
                  <span className="text-primary-foreground/80 mt-2 text-sm">{isRtl ? 'تسليم في الموعد' : 'On-time Delivery'}</span>
                </div>
                <div className="w-px h-16 bg-white/20"></div>
                <div className="flex flex-col">
                  <span className="text-4xl md:text-5xl font-extrabold text-white">3x</span>
                  <span className="text-primary-foreground/80 mt-2 text-sm">{isRtl ? 'زيادة في الأداء' : 'Performance Boost'}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-auto rounded-2xl overflow-hidden border border-white/20 shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                <Image
                  src={project.gallery[0] || project.image}
                  alt="Project Showcase"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover"
                />
              </div>

              {project.gallery[1] && (
                <div className="absolute -bottom-10 -left-10 w-2/3 rounded-xl overflow-hidden border-4 border-primary shadow-2xl transform rotate-3">
                  <Image
                    src={project.gallery[1]}
                    alt="Project Showcase Feature"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Additional Mobile Gallery (only if we have extra images from data) */}
      <section className="py-16 lg:hidden">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {project.gallery.map((img, idx) => (
              <motion.div
                key={idx}
                variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                className="relative aspect-video rounded-xl overflow-hidden shadow-md"
              >
                <Image src={img} alt="Gallery image" fill className="object-cover" />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center">
        <Container>
          <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isRtl ? 'مستعد لبناء مشروع مماثل؟' : 'Ready to build something similar?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {isRtl
                ? 'دعنا نتحدث عن كيف يمكن لخبراتنا مساعدة عملك في تحقيق أهدافه الرقمية.'
                : 'Let\'s discuss how our expertise can help your business achieve its digital goals.'}
            </p>
            <Button href="/contact" size="lg" className="h-14 px-8 text-lg">
              {isRtl ? 'تواصل معنا الآن' : 'Get in Touch Today'}
              <ArrowRight size={20} className={isRtl ? 'mr-3 rotate-180' : 'ml-3'} />
            </Button>
          </motion.div>
        </Container>
      </section>
    </article>
  );
}
