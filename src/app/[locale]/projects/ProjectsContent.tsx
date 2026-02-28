"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

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

export default function ProjectsContent() {
  const t = useTranslations("Projects");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        <ProjectsGrid />
      </Container>
    </section>
  );
}
