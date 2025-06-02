// components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";
import React from "react";
import { useNavigation } from "@/context/NavigationContext";
import { ProfileDropdown } from "./ProfileDropdown";

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

        {!showBackButton && (
          <NavigationMenu>
            <NavigationMenuList className="hidden md:flex gap-6">
              {[
                { id: "upload-form", name: "Upload Form" },
                { id: "transfers", name: "Transfers" },
                { id: "pricing", name: "Pricing" },
                { id: "branding", name: "Branding" },
              ].map(({ id, name }) => (
                <NavigationMenuItem key={id}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      navigation.activePage === id
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                    )}
                  >
                    <button onClick={() => navigation.setActivePage(id)}>
                      {name}
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
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
