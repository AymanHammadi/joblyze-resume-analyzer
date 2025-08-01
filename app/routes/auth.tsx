import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { usePuterStore } from "@/lib/puter";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { ThemeToggle } from "@/components/ThemeToggle";

const Auth = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { auth, isLoading, error, puterReady, clearError } = usePuterStore();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Clear errors when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Redirect if already authenticated
  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async () => {
    if (!puterReady) return;

    setIsSigningIn(true);
    clearError();

    try {
      await auth.signIn();
      // Navigation will happen automatically due to auth state change
    } catch (err) {
      // Error is handled by the store
      console.error("Sign in error:", err);
    } finally {
      setIsSigningIn(false);
    }
  };

  const isButtonDisabled = !puterReady || isLoading || isSigningIn;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Theme Toggle */}

      <div className="absolute top-6 right-6 z-10 ">
        <ThemeToggle />
      </div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="heading-lg mb-2">{t("auth:welcome.title")}</h1>
        </div>

        <Card className="glass-effect">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">{t("auth:signIn.title")}</CardTitle>
            <CardDescription>{t("auth:signIn.description")}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert
                variant="destructive"
                className="animate-in slide-in-from-top-2 duration-300"
              >
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {!puterReady && (
              <Alert className="animate-in slide-in-from-top-2 duration-300">
                <Spinner size="sm" />
                <AlertDescription>
                  {t("auth:loading.initializing")}
                </AlertDescription>
              </Alert>
            )}

            {/* Sign In Button */}
            <div className="space-y-4">
              <Button
                onClick={handleSignIn}
                disabled={isButtonDisabled}
                className="w-full h-11 btn-primary"
                size="lg"
              >
                {isSigningIn ? (
                  <>
                    <Spinner size="sm" />
                    {t("auth:signIn.signingIn")}
                  </>
                ) : (
                  <>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="m10 17 5-5-5-5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 12H3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t("auth:signIn.button")}
                  </>
                )}
              </Button>

              <div className="text-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/")}
                  className="btn-ghost"
                >
                  {t("auth:signIn.backToHome")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-muted-foreground">
            {t("auth:footer.termsText")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
