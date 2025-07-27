import { useTranslation } from "react-i18next";
import { Menu, X, Zap } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface NavItem {
  key: string;
  href: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
}

interface MobileMenuButtonProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MobileNavProps {
  navItems: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const DesktopNav = ({ navItems }: DesktopNavProps) => {
  const { t } = useTranslation("header");

  return (
    <nav className="hidden md:flex items-center gap-1 glass-effect rounded-lg px-2 py-1">
      {navItems.map((item) => (
        <Link
          key={item.key}
          to={item.href}
          className="nav-link px-2 py-2 rounded-md"
        >
          {t(`navigation.${item.key}`)}
        </Link>
      ))}
    </nav>
  );
};

export const DesktopActions = () => {
  const { t } = useTranslation("header");

  return (
    <div className="hidden md:flex items-center gap-3">
      <Button size="sm" className="btn-primary btn-shimmer">
        <Zap className="w-4 h-4 mr-2" />
        {t("actions.uploadResume")}
      </Button>

      <div className="flex items-center gap-3 ml-3 pl-3 border-l border-border">
        <div className="flex items-center gap-2 p-1 surface rounded-lg">
          <LanguageSwitcher />
          <div className="w-px h-4 bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export const MobileMenuButton = ({
  isOpen,
  onToggle,
}: MobileMenuButtonProps) => {
  return (
    <div className="md:hidden flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="btn-ghost p-2"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>
    </div>
  );
};

export const MobileNav = ({ navItems, isOpen, onClose }: MobileNavProps) => {
  const { t } = useTranslation("header");

  if (!isOpen) return null;

  return (
    <div className="md:hidden mt-4 pb-6 glass-effect rounded-lg">
      {/* Main Action Button - Upload Resume */}
      <div className="p-4 border-b border-border">
        <Button size="sm" className="btn-primary w-full" onClick={onClose}>
          <Zap className="w-4 h-4 mr-2" />
          {t("actions.uploadResume")}
        </Button>
      </div>

      {/* Navigation Links */}
      <nav className="p-4">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.key}
              to={item.href}
              className="nav-link py-3 px-4 rounded-md"
              onClick={onClose}
            >
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
        </div>
      </nav>

      {/* Theme and Language Controls */}
      <div className="p-4 pt-0 border-t border-border mt-2">
        <div className="flex items-center justify-center gap-4 p-3 surface rounded-lg">
          <LanguageSwitcher />
          <div className="w-px h-4 bg-border" />
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};
