import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Globe, Smartphone, Cloud, Palette, Brain, Lightbulb } from "lucide-react";

const serviceIcons = [
  <Globe key="web" size={24} />,
  <Smartphone key="mobile" size={24} />,
  <Cloud key="cloud" size={24} />,
  <Palette key="ui" size={24} />,
  <Brain key="ai" size={24} />,
  <Lightbulb key="consulting" size={24} />,
];

const serviceKeys = ["web", "mobile", "cloud", "ui", "ai", "consulting"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.services" });
  return { title: t("title"), description: t("description") };
}

export default function ServicesPage() {
  const t = useTranslations("Services");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceKeys.map((key, i) => (
            <ServiceCard
              key={key}
              icon={serviceIcons[i]}
              title={t(`${key}.title`)}
              description={t(`${key}.description`)}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
