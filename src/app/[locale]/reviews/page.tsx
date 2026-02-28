import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ReviewCard } from "@/components/ui/ReviewCard";

const reviewKeys = ["review1", "review2", "review3", "review4"] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata.reviews" });
  return { title: t("title"), description: t("description") };
}

export default function ReviewsPage() {
  const t = useTranslations("Reviews");

  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeading title={t("heading")} subtitle={t("subtitle")} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviewKeys.map((key, i) => (
            <ReviewCard
              key={key}
              name={t(`items.${key}.name`)}
              role={t(`items.${key}.role`)}
              quote={t(`items.${key}.quote`)}
              index={i}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
