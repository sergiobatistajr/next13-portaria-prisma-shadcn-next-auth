"use client";
import Link from "next/link";

export const MainNav = () => {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/portaria",
      label: "Portaria",
    },
    {
      href: "/admin",
      label: "Admin",
    },
  ];
  return (
    <div className="flex items-center space-x-4 font-bold justify-center">
      {routes.map((route) => (
        <Link href={route.href} key={route.href}>
          {route.label}
        </Link>
      ))}
    </div>
  );
};
