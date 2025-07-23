import type { Route } from "./+types/home";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Upload, FileText, BarChart3, Target } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  // Get translations for meta tags
  const title = i18n.t('app.title');
  const description = i18n.t('app.description');

  return [
    { title },
    { name: "description", content: description }
  ];
}

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <h1 className="text-xl font-bold text-foreground">{t('app.title')}</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 h-screen">
        {/* Hero Section */}
  
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 {t('app.title')} - AI Resume Analyzer</p>
        </div>
      </footer>
    </div>
  );
}
