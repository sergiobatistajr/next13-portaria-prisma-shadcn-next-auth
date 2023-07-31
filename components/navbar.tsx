"use client";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { User } from "@prisma/client";

import { MainNav } from "@/components/main-nav";
import { Button } from "./ui/button";

interface NavbarProps {
  user: Pick<User, "name" | "role">;
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const pathname = usePathname();

  const routes = [
    {
      href: "/",
      label: "Home",
      active: pathname === "/",
    },
  ];
  if (user.role === "porteiro" || user.role === "admin")
    routes.push({
      href: "/portaria",
      label: "Portaria",
      active: pathname === "/portaria",
    });

  routes.push({
    href: "/report",
    label: "Relatório",
    active: pathname === "/report",
  });

  if (user.role === "admin")
    routes.push({
      href: "/admin",
      label: "Configurações",
      active: pathname === "/admin",
    });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <MainNav routes={routes} className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          {user.name}
          <Button variant="ghost" size="icon" onClick={() => signOut()}>
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
