"use client"

import * as React from "react"
import Link from "next/link"
// import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils";
import { useNavigation } from "@/context/NavigationContext"






// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Alert Dialog",
//     href: "/docs/primitives/alert-dialog",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Hover Card",
//     href: "/docs/primitives/hover-card",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   {
//     title: "Progress",
//     href: "/docs/primitives/progress",
//     description:
//       "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   },
//   {
//     title: "Scroll-area",
//     href: "/docs/primitives/scroll-area",
//     description: "Visually or semantically separates content.",
//   },
//   {
//     title: "Tabs",
//     href: "/docs/primitives/tabs",
//     description:
//       "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   },
//   {
//     title: "Tooltip",
//     href: "/docs/primitives/tooltip",
//     description:
//       "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   },
// ]



export function NavigationMenuDemo() {

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


    const navItems = [
  {
    id: 'upload-form',
    name: 'Upload',
    hasChildren: true,
    content: [
      {
        contentId: 'upload-form',
        title: 'Upload Files',
        description: 'Upload your files to the sendsfar network',
      },
      {
        contentId: 'request-files',
        title: 'Request Files',
        description: 'Request files from the sendsfar network',
      },
    ],
    featured: {
      contentId: 'upload-form',
      title: 'Sendsfar',
      description: 'Transfers your files to the sendsfar network',
    },
  },
  {
    id: 'transfers',
    name: 'Transfers',
    hasChildren: true,
    content: [
      {
        contentId: 'transfers',
        title: 'Sent Transfers',
        description: 'View your sent transfers',
      },
      {
        contentId: 'requested-transfers',
        title: 'Requested Transfers',
        description: 'View your requested transfers',
      },
      {
        contentId: 'received-transfers',
        title: 'Received Transfers',
        description: 'View your received transfers',
      },
    ],
  },
  {
    id: 'pricing',
    name: 'Pricing',
    hasChildren: false,
    content: [],
  },
  {
    id: 'branding',
    name: 'Branding',
    hasChildren: false,
    content: [],
  },
];

  return (
    <NavigationMenu viewport={false} >
        <NavigationMenuList className="hidden md:flex gap-6">
            {navItems.map((item) => (
            <NavigationMenuItem key={item.id}>
                {item.hasChildren ? (
                <>
                    <NavigationMenuTrigger onClick={() => navigation.setActivePage(item.id)}>{item.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                    {item.featured ? (
                        <ul className="grid gap-1 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr] p-4">
                        <li className="row-span-3">
                            <NavigationMenuLink asChild >
                                <Link
                                href={`#`}
                                onClick={() => navigation.setActivePage(item.featured.contentId)}
                                className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                >
                                    <div className="mt-4 mb-2 text-lg font-medium">
                                        {item.featured.title}
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-tight">
                                        {item.featured.description}
                                    </p>
                                </Link>

                            </NavigationMenuLink>
                            
                        </li>
                        {item.content.map((link) => (
                            <li key={link.contentId}>
                            <ListItem
                                href={`#`}
                                onClick={() => navigation.setActivePage(link.contentId)}
                                className="text-left"
                            >
                                <div className="font-medium">{link.title}</div>
                                <div className="text-muted-foreground text-sm">
                                {link.description}
                                </div>
                            </ListItem>
                            </li>
                        ))}
                        </ul>
                    ) : (
                        <ul className="grid w-[300px] gap-4 p-4">
                        <li className="flex flex-col gap-4">
                            <NavigationMenuLink asChild>
                            </NavigationMenuLink>
                            {item.content.map((link) => (
                                <NavigationMenuLink asChild key={link.contentId}>
                                    <Link
                                        href={`#`}
                                        // key={link.contentId}
                                        onClick={() => navigation.setActivePage(link.contentId)}
                                        className="text-left"
                                    >
                                        <div className="font-medium">{link.title}</div>
                                        <div className="text-muted-foreground text-sm">
                                        {link.description}
                                        </div>
                                    </Link>
                                </NavigationMenuLink>
                            
                            ))}
                        </li>
                        </ul>
                    )}
                    </NavigationMenuContent>
                </>
                ) : (
                <NavigationMenuLink
                    asChild
                    className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    navigation.activePage === item.id
                        ? 'text-black dark:text-white'
                        : 'text-muted-foreground'
                    )}
                >
                    <button onClick={() => navigation.setActivePage(item.id)}>
                    {item.name}
                    </button>
                </NavigationMenuLink>
                )}
            </NavigationMenuItem>
            ))}
        </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
            <Link href={href}>
                <div className="text-sm leading-none font-medium">{title}</div>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {children}
                </p>
            </Link>
            </NavigationMenuLink>
        </li>
    )
}
export function MenuNavBar() {
  return (
    <div >
      <NavigationMenuDemo />
    </div>
  )
}