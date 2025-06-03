'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useNavigation } from "@/context/NavigationContext";


export function ProfileDropdown() {
  const router = useRouter();
  const user = { name: "Arman Habib", email: "arman@example.com", avatar: "/avater-01.webp" };

  // Handle navigation context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = { activePage: '', setActivePage: (page: string) => {} };
    try {
      const nav = useNavigation();
      if (nav) {
        navigation.activePage = nav.activePage;
        navigation.setActivePage = nav.setActivePage;
      }
    } catch {
      // NavigationProvider not available, use default values
      console.error('Navigation context not available');
    }

  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center space-x-2 border-1 border-primary shadow-sm px-2.5 py-1.5 rounded-lg">
        <Avatar className="h-8 w-8 border-2 border-primary">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start items-start">
          <span className="text-sm font-medium">{user.name}</span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
        
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/profile")}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/settings")}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem onClick={() => alert('Sign out clicked!')}> */}
        <DropdownMenuItem onClick={() => router.push("/login")}>
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    
    </>
    
  );
}