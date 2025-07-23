import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Globe } from "lucide-react";
import { Button } from "./ui/button";
import { changeLanguage } from '../i18n';

type Language = {
  code: string;
  name: string;
  direction: 'ltr' | 'rtl';
}

type LanguageSwitcherProps = {
  languages?: Language[];
}

export function LanguageSwitcher({ languages = [] }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  
  // Default languages if none provided
  const defaultLanguages: Language[] = [
    { code: 'en', name: 'English', direction: 'ltr' },
    { code: 'ar', name: 'العربية', direction: 'rtl' },
  ];

  const availableLanguages = languages.length > 0 ? languages : defaultLanguages;
  const current = availableLanguages.find(lang => lang.code === i18n.language) || availableLanguages[0];

  const handleLanguageChange = (language: Language) => {
    changeLanguage(language.code);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="text-sm">{current.name}</span>
          <ChevronDown className="h-3 w-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="cursor-pointer"
          >
            <span>{language.name}</span>
            {language.direction === 'rtl' && (
              <span className="ml-auto text-xs text-muted-foreground">RTL</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
