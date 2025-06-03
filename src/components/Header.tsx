// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
// import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
// import { cn } from "@/lib/utils";
import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import { ProfileDropdown } from "./ProfileDropdown";
import { MenuNavBar } from "./MenuNavBar";

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBackButton, onBack, title }: HeaderProps) {


  // Handle navigation context
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = { activePage: "", setActivePage: (page: string) => {} };
  try {
    const nav = useNavigation();
    if (nav) {
      navigation.activePage = nav.activePage;
      navigation.setActivePage = nav.setActivePage;
    }
  } catch {
    console.log("Navigation context not available");
  }


  return (
    <header className="!border-b">
      <div className="flex flex-row items-center justify-between h-16  px-6">
        <div className="flex items-center space-x-4">
          {showBackButton && (
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
          )}
          <Link href="/">
            <Image
              src="https://assets.multilat.xyz/branding/logos/multilat-logo.svg"
              alt="Logo"
              width={96}
              height={32}
            />
          </Link>
          {showBackButton && title && (
            <h1 className="text-xl font-semibold">{title}</h1>
          )}
        </div>

          {/* <MenuNavBar /> */}

        {!showBackButton && (
          // <NavigationMenu viewport={false} >
          //   <NavigationMenuList className="hidden md:flex gap-6">
          //     {navItems.map((item) => (
          //       <NavigationMenuItem key={item.id}>
          //         {item.hasChildren ? (
          //           <>
          //             <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
          //             <NavigationMenuContent>
          //               {item.featured ? (
          //                 <ul className="grid gap-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
          //                   <li className="row-span-3">
          //                     <NavigationMenuLink
          //                       asChild >
          //                         <Link
          //                           href={`/child-pages/${item.featured.contentId}`}
          //                           onClick={() => navigation.setActivePage(item.featured.contentId)}
          //                           className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-gradient-to-b p-6 no-underline outline-none select-none hover:shadow-md"
          //                         >
          //                           <div className="mt-4 mb-2 text-lg font-medium">
          //                             {item.featured.title}
          //                           </div>
          //                           <p className="text-muted-foreground text-sm leading-tight">
          //                             {item.featured.description}
          //                           </p>
          //                         </Link>

          //                       </NavigationMenuLink>
                              
          //                   </li>
          //                   {item.content.map((link) => (
          //                     <li key={link.contentId}>
          //                       <ListItem
          //                         onClick={() => navigation.setActivePage(link.contentId)}
          //                         className="text-left"
          //                       >
          //                         <div className="font-medium">{link.title}</div>
          //                         <div className="text-muted-foreground text-sm">
          //                           {link.description}
          //                         </div>
          //                       </ListItem>
          //                     </li>
          //                   ))}
          //                 </ul>
          //               ) : (
          //                 <ul className="grid w-[300px] gap-4 p-4">
          //                   <li className="flex flex-col gap-4">
          //                     {item.content.map((link) => (
          //                       <button
          //                         key={link.contentId}
          //                         onClick={() => navigation.setActivePage(link.contentId)}
          //                         className="text-left"
          //                       >
          //                         <div className="font-medium">{link.title}</div>
          //                         <div className="text-muted-foreground text-sm">
          //                           {link.description}
          //                         </div>
          //                       </button>
          //                     ))}
          //                   </li>
          //                 </ul>
          //               )}
          //             </NavigationMenuContent>
          //           </>
          //         ) : (
          //           <NavigationMenuLink
          //             asChild
          //             className={cn(
          //               'text-sm font-medium transition-colors hover:text-primary',
          //               navigation.activePage === item.id
          //                 ? 'text-black dark:text-white'
          //                 : 'text-muted-foreground'
          //             )}
          //           >
          //             <button onClick={() => navigation.setActivePage(item.id)}>
          //               {item.name}
          //             </button>
          //           </NavigationMenuLink>
          //         )}
          //       </NavigationMenuItem>
          //     ))}
          //   </NavigationMenuList>
          // </NavigationMenu>
          <MenuNavBar />
        )}

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <ProfileDropdown
            // user={user}
            // onProfileClick={() => router.push("/profile")}
            // onSettingsClick={() => router.push("/settings")}          />
          />
        </div>
      </div>
    </header>
  );
}
