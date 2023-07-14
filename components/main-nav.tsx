"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";

interface MainNavProps {
  routes: {
    href: string;
    label: string;
    active: boolean;
  }[];
  className?: string;
}

export const MainNav = ({
  routes,
  className,
  ...props
}: MainNavProps & React.HTMLAttributes<HTMLElement>) => {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm md:text-lg font-medium transition-colors hover:text-primary",
            route.active
              ? "text-black dark:text-white"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
};
