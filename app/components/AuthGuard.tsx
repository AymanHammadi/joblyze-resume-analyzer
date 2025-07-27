import { useEffect } from "react";
import { Navigate } from "react-router";
import { usePuterStore } from "@/lib/puter";
import { Spinner } from "@/components/ui/spinner";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const { auth, isLoading, puterReady, init } = usePuterStore();

  // Initialize Puter on component mount
  useEffect(() => {
    if (!puterReady) {
      init();
    }
  }, [init, puterReady]);

  // Show loading spinner while checking auth status
  if (isLoading || !puterReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <Spinner size="lg" />
          <p className="body-text">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!auth.isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return <>{children}</>;
}
