import { useTranslation } from "react-i18next";

export function Footer() {
  const { t } = useTranslation("app");

  return (
    <footer className="container mx-auto px-4 py-12">
      {/* Bottom Bar */}
      <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          {t("footer.copyright")} &copy; {new Date().getFullYear()}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>{t("footer.madeWith")}</span>
        </div>
      </div>
    </footer>
  );
}
