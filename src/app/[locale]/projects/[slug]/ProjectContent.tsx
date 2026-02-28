"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Calendar, Users, Tag, Globe } from "lucide-react";

export default function ProjectContent({
  project,
  projectKey,
}: {
    project: { image: string; tags: string[]; year: string; client: string; liveUrl?: string };
  projectKey: string;
}) {
  const t = useTranslations("Projects");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Button href="/projects" variant="ghost" size="sm" className="mb-8">
            <ArrowLeft size={16} />
            {t("heading")}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <div className="relative aspect-16/10 rounded-2xl overflow-hidden border border-border">
              <Image
                src={project.image}
                alt={t(`items.${projectKey}.title`)}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
                priority
              />
            </div>
          </motion.div>

          {/* Project Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-2 flex flex-col"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              {t(`items.${projectKey}.title`)}
            </h1>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {t(`items.${projectKey}.description`)}
            </p>

            {/* Meta Info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Users size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Client</p>
                  <p className="font-medium">{project.client}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Year</p>
                  <p className="font-medium">{project.year}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="h-9 w-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <Tag size={16} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Tech Stack</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              {project.liveUrl && (
                <Button href={project.liveUrl} variant="outline" size="lg" className="w-full sm:w-auto" external>
                  <Globe size={16} className="mr-2" />
                  Visit Website
                </Button>
              )}
              <Button href="/contact" size="lg" className="w-full sm:w-auto">
                Start a Similar Project
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
