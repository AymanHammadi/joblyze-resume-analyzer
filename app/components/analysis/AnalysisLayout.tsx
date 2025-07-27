import React from "react";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";
import { Footer } from "../Footer";

interface AnalysisLayoutProps {
  children: React.ReactNode;
}

export const AnalysisLayout = ({ children }: AnalysisLayoutProps) => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        <div className="relative z-10 container-app py-8">
          <div className="max-w-7xl mx-auto space-y-8">{children}</div>
        </div>
      </div>
      <Footer />
    </AuthGuard>
  );
};
