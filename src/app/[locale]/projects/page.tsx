import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projectKeys = ["realestate", "coffee", "agency", "vision"] as const;

const projectImages = [
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070",
  "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=2071",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2069",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
];

const githubLinks = [
  "https://github.com/nexait-studio/riyadh-residences",
  "https://github.com/nexait-studio/saudi-coffee-co",
  "https://github.com/nexait-studio/jeddah-tech-hub",
  "https://github.com/nexait-studio/vision-2030-tracker",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default function ProjectsPage() {
  const t = useTranslations("Projects");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {projectKeys.map((key, i) => (
            <ProjectCard
              key={key}
              slug={key}
              title={t(`items.${key}.title`)}
              description={t(`items.${key}.description`)}
              tags={t(`items.${key}.tags`).split(",")}
              image={projectImages[i]}
              index={i}
              githubUrl={githubLinks[i]}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
