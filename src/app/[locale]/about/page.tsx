import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutContent from "./AboutContent";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutContent />;
}
