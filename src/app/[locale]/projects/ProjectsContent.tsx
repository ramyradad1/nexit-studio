"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FadeIn } from "@/components/animations/FadeIn";
import { ProjectsGrid } from "@/components/projects/ProjectsGrid";

export default function ProjectsContent() {
  const t = useTranslations("Projects");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <FadeIn>
          <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        </FadeIn>
        <ProjectsGrid />
      </Container>
    </section>
  );
}
