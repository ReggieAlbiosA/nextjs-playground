'use client'

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
import { Skeleton } from "@/components/ui/skeleton"
import { LogOut, User, Settings, Loader2 } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { getInitials } from "@/utils/stringUtils";


export default function UserProfile() {
  const { data: session, isPending } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
      setIsLoggingOut(true);
      
      await signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          }
        }
      });
    
  };

  if (isPending) {
    return (
        <Avatar className="w-10 h-10">
          <Skeleton className="w-full h-full rounded-full bg-zinc-300/20 dark:bg-zinc-700/20" />
        </Avatar>
    );
  }

  // Don't render anything if no session
  if (!session?.user) {
    return null;
  }

  return (
    <>
      {/* Logout Overlay with smooth transitions */}
      {isLoggingOut && (
         <div className="inset-0 z-[9999] w-screen h-screen flex items-center absolute justify-center bg-black backdrop-blur-sm     animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-4 duration-500 delay-150 ">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
            <span className="text-sm font-medium text-white">Signing Out...</span>
          </div>
        </div>
      )}

      <DropdownMenu>
        <DropdownMenuTrigger
            className="overflow-hidden transition-all duration-200 rounded-full cursor-pointer card-bg"
        >
            <Avatar className="w-10 h-10 transition-transform duration-200">
              <AvatarImage 
                src={session.user.image ?? undefined} 
                alt={session.user.name ?? 'User avatar'} 
              />
              <AvatarFallback className="absolute primary-text card-bg">
                 <span className="absolute inset-0">{getInitials(session.user.name) || getInitials(session.user.email)}</span>
              </AvatarFallback>
            </Avatar>
            
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="w-64 p-2 duration-200 shadow-2xl card-bg border-divider z-[100] primary-text animate-in fade-in slide-in-from-top-2" 
          align="end" 
          forceMount
          sideOffset={8}
        >
          <DropdownMenuLabel className="p-3 font-normal">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12">
                <AvatarImage 
                  src={session.user.image ?? undefined} 
                  alt={session.user.name ?? 'User avatar'} 
                  className="object-cover"
                />
                <AvatarFallback className="text-sm font-medium border primary-text card-bg border-divider">
                  {getInitials(session.user.name) || getInitials(session.user.email)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col flex-1 min-w-0 space-y-1">
                <p className="text-sm font-semibold leading-none truncate primary-text">
                  {session.user.name || "User"}
                </p>
                {session.user.email && (
                  <p className="text-xs leading-none truncate secondary-text">
                    {session.user.email}
                  </p>
                )}
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator className="my-2 border-divider" />
          
          <DropdownMenuItem
            className="p-3 transition-colors duration-150 rounded-lg cursor-pointer primary-text hover:bg-zinc-500/10 focus:bg-zinc-500/10 group"
            onSelect={() => toast.info("Profile page coming soon!")}
          >
            <div className="flex items-center w-full space-x-3">
              <div className="p-1.5 rounded-md bg-secondary-accent/10 group-hover:bg-secondary-accent/20 transition-colors duration-150">
                <User className="w-4 h-4 secondary-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Profile</span>
                <span className="text-xs secondary-text">Manage your account</span>
              </div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem
            className="p-3 transition-colors duration-150 rounded-lg cursor-pointer primary-text hover:bg-zinc-500/10 focus:bg-zinc-500/10 group"
            onSelect={() => toast.info("Settings page coming soon!")}
          >
            <div className="flex items-center w-full space-x-3">
              <div className="p-1.5 rounded-md bg-secondary-accent/10 group-hover:bg-secondary-accent/20 transition-colors duration-150">
                <Settings className="w-4 h-4 secondary-accent" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Settings</span>
                <span className="text-xs secondary-text">Preferences & privacy</span>
              </div>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator className="my-2 border-divider" />
          
          <DropdownMenuItem
            onClick={handleSignOut}
            disabled={isLoggingOut}
            className="p-3 transition-colors duration-150 rounded-lg cursor-pointer primary-text hover:bg-red-500/10 focus:bg-red-500/10 group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="flex items-center w-full space-x-3">
              <div className="p-1.5 rounded-md bg-red-500/10 group-hover:bg-red-500/20 transition-colors duration-150">
                {isLoggingOut ? (
                  <Loader2 className="w-4 h-4 error-warning animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 error-warning" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium error-warning">
                  {isLoggingOut ? "Signing out..." : "Sign out"}
                </span>
                <span className="text-xs secondary-text">
                  {isLoggingOut ? "Please wait..." : "End your session"}
                </span>
              </div>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}