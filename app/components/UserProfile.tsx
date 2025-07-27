import { usePuterStore } from "@/lib/puter";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Palette, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function UserProfile() {
  const { auth } = usePuterStore();

  if (!auth.isAuthenticated || !auth.user) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 h-9"
        >
          <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium hidden sm:inline">
            {auth.user.username}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        {/* User Info */}
        <div className="px-2 py-1.5 text-sm">
          <p className="text-foreground font-medium">{auth.user.username}</p>
          <p className="text-muted-foreground text-xs">
            ID: {auth.user.uuid.slice(0, 8)}...
          </p>
        </div>

        <DropdownMenuSeparator />

        {/* Settings Section */}
        <div className="px-2 py-2">
          <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
            Settings
          </p>

          {/* Language Setting */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Language</span>
            </div>
            <LanguageSwitcher />
          </div>

          {/* Theme Setting */}
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Theme</span>
            </div>
            <ThemeToggle />
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* Sign Out */}
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-destructive"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
