import { Brain, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

const Logo = () => {
  const { t } = useTranslation("header");

  return (
    <Link to="/" className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
        <img src="/Joblyz.svg" alt="joblyz logo" />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
          {t("logo")}
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
