import { getTranslations, setRequestLocale } from "next-intl/server";
import ProjectsContent from "./ProjectsContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.projects" });
  return { title: t("title"), description: t("description") };
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <ProjectsContent />;
}
