import { useTranslation } from "react-i18next";
import { useState } from "react";
import Logo from "./Logo";
import { DesktopActions, MobileMenuButton, MobileNav } from "./Navbars";

const navItems = [{ key: "home", href: "/" }];

export function Header() {
  const { t } = useTranslation("header");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b border-border/20 backdrop-blur-xl sticky top-0 z-50 shadow-md">
      <div className="container mx-auto p-2">
        <div className="flex items-center justify-between">
          {/*  Logo */}
          <Logo />

          {/*  Actions */}
          <DesktopActions />

          {/*  Mobile Menu Button */}
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>

        {/*  Mobile Navigation */}
        <MobileNav
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </header>
  );
}
