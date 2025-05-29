'use client'
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Github, LogOut, User, Settings } from "lucide-react"; // Added Loader2 for a potential spinner
import { authClient } from "@/lib/auth-client";

export default function SignInButton() {
  const { data: session, isPending } = authClient.useSession();

  // Function to get initials from name
  const getInitials = (name?: string | null) => {
    if (!name) return "";
    const initials = name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
    return initials.length > 2 ? initials.substring(0, 2) : initials; // Keep it to 2 chars max for fallback
  };

  const handleSignOut = async () => {
    await authClient.signOut(); // Redirect to home or desired page after sign out
  };

  // While the session is being determined, render nothing (or a subtle loader)
  if (isPending) {
    // Option 1: Render nothing as requested
    return null;

    // Option 2: Render a subtle loading indicator (if you change your mind)
    // return (
    //   <div className="flex items-center justify-center w-10 h-10">
    //     <Loader2 className="w-5 h-5 animate-spin secondary-text" />
    //   </div>
    // );
  }

  return (
    <>
      {!session ? (
        <Button
          className="card-bg primary-text flex items-center gap-2 rounded-md border border-divider px-3 py-1.5 text-sm font-medium transition-colors hover:card/20 cursor-pointer"
          onClick={async () => await authClient.signIn.social(
            {
              provider: "github",
              callbackURL: "/" // Ensure users are redirected appropriately after sign-in
            })
          }
        >
          <Github size={16} />
          <span className="hidden sm:inline">Continue with Github</span>
        </Button>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative w-10 h-10 p-0 border rounded-full cursor-pointer card-bg border-divider focus-visible:ring-0 focus-visible:ring-offset-0" // Added cursor-pointer
            >
              <Avatar className="w-9 h-9"> {/* Ensure avatar size is slightly smaller than button if button has padding/border */}
                {session.user?.image && <AvatarImage src={session.user.image} alt={session.user.name ?? 'User avatar'} />}
                <AvatarFallback className="text-xs primary-text card-bg"> {/* Made fallback text slightly smaller */}
                  {getInitials(session.user?.name) || getInitials(session.user?.email)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 card-bg border-divider primary-text" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none primary-text">
                  {session.user?.name || "User"}
                </p>
                {session.user?.email && (
                  <p className="text-xs leading-none secondary-text">
                    {session.user.email}
                  </p>
                )}
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="border-divider" />
            <DropdownMenuItem className="cursor-pointer primary-text hover:bg-zinc-500/10 focus:secondary-accent">
              <User className="w-4 h-4 mr-2" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer primary-text hover:bg-zinc-500/10 focus:secondary-accent">
              <Settings className="w-4 h-4 mr-2" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="border-divider"/>
            <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer primary-text hover:bg-zinc-500/10 focus:error-warning">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}