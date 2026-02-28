"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight, Calendar, Users, Tag, Github } from "lucide-react";

/* Static project data — in a real app this might come from a CMS */
const projectData: Record<
  string,
  { image: string; tags: string[]; year: string; client: string; githubUrl?: string }
> = {
  realestate: {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
    tags: ["HTML", "CSS", "JS"],
    year: "2025",
    client: "Riyadh Real Estate Co.",
    githubUrl: "https://github.com/nexait-studio/riyadh-residences",
  },
  coffee: {
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2071",
    tags: ["React", "Tailwind"],
    year: "2025",
    client: "Saudi Coffee Roasters",
    githubUrl: "https://github.com/nexait-studio/saudi-coffee-co",
  },
  agency: {
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
    tags: ["Vanilla JS", "GSAP"],
    year: "2024",
    client: "Jeddah Tech Hub",
    githubUrl: "https://github.com/nexait-studio/jeddah-tech-hub",
  },
  vision: {
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    tags: ["React", "D3.js"],
    year: "2024",
    client: "Ministry of Planning",
    githubUrl: "https://github.com/nexait-studio/vision-2030-tracker",
  },
};

const slugs = Object.keys(projectData);

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug }));
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const t = useTranslations("Projects");
  const slug = params.slug as keyof typeof projectData;
  const project = projectData[slug];

  if (!project) {
    return (
      <Container className="py-20 text-center">
        <h1 className="text-2xl font-bold">Project not found</h1>
        <Button href="/projects" className="mt-6">
          <ArrowLeft size={16} />
          Back to Projects
        </Button>
      </Container>
    );
  }

  /* Try to get the translation key matching the slug */
  const projectKey = slug as "realestate" | "coffee" | "agency" | "vision";

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
              {project.githubUrl && (
                <Button href={project.githubUrl} variant="outline" size="lg" className="w-full sm:w-auto" external>
                  <Github size={16} className="mr-2" />
                  View Code
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
