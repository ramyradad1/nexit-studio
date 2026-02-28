import { getTranslations } from "next-intl/server";
import ProjectDetailClient from "./ProjectDetailClient";
import { projectData } from "./data";

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];

  routing.locales.forEach((locale) => {
    Object.keys(projectData).forEach((slug) => {
      params.push({ locale, slug });
    });
  });

  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "Projects.items" });

  if (!projectData[slug as keyof typeof projectData]) {
    return { title: "Project Not Found" };
  }

  // @ts-ignore - Dynamic key usage
  const title = t(`${slug}.title`);
  // @ts-ignore
  const description = t(`${slug}.description`);

  return {
    title: `${title} — NexaIT Studio`,
    description: description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  return <ProjectDetailClient slug={slug} />;
}
