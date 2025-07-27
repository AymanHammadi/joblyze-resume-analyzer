import { useTranslation } from 'react-i18next';
import { Button } from "./ui/button";
import { Upload, Sparkles } from "lucide-react";

export function HeroSection() {
  const { t } = useTranslation('hero');


  return (
    <section className="section-xl">
      <div className="container-content">
        <div className="text-center space-y-8">
          {/* Main Headlines */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Analysis
            </div>
            
            <h1 className="heading-xl max-w-4xl mx-auto">
              {t('title')}
            </h1>
            
            <p className="subheading max-w-2xl mx-auto text-muted-foreground">
              {t('subtitle')}
            </p>
            
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="btn-primary cur">
              <Upload className="w-5 h-5 mr-2" />
              {t('cta.upload')}
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
