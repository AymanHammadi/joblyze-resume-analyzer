import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { Zap } from "lucide-react";
import Logo from "./Logo";
import { UserProfile } from "./UserProfile";
import { Button } from "./ui/button";

export function Header() {
  const { t } = useTranslation("header");

  return (
    <header className="border-b border-border/20 backdrop-blur-xl sticky top-0 z-50 shadow-md">
      <div className="container mx-auto p-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Actions - Upload Button and User Profile */}
          <div className="flex items-center gap-3">
            <Link to="/upload">
              <Button size="sm" className="btn-primary btn-shimmer">
                <Zap className="w-4 h-4 mr-2" />
                {t("actions.uploadResume")}
              </Button>
            </Link>

            <UserProfile />
          </div>
        </div>
      </div>
    </header>
  );
}
