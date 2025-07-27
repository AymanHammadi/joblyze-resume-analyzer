import i18n from "@/i18n";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { RecentAnalyses } from "@/components/home/RecentAnalyses";
import { Footer } from "@/components/Footer";

export function meta() {
  // Get translations for meta tags
  const title = i18n.t("app.title");
  const description = i18n.t("app.description");

  return [{ title }, { name: "description", content: description }];
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <HeroSection />

      {/* Recent Analyses */}
      <RecentAnalyses />

      {/* Footer */}
      <Footer />
    </div>
  );
}
