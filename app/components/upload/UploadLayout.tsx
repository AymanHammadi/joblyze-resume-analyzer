import React from "react";
import { Header } from "@/components/Header";
import { AuthGuard } from "@/components/AuthGuard";
import { Footer } from "../Footer";

interface UploadLayoutProps {
  children: React.ReactNode;
}

export const UploadLayout = ({ children }: UploadLayoutProps) => {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-background">
        <Header />
        {/* Main content area */}
        <div className="relative z-10 container-app py-12">
          <div className="max-w-4xl mx-auto">{children}</div>
        </div>
        <Footer />
      </div>
    </AuthGuard>
  );
};
