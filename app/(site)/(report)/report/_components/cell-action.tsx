"use client";

import { ClipboardEdit, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GuestColumns } from "./columns";
import { Button } from "@/components/ui/button";

interface CellActionProps {
  data: GuestColumns;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/admin/${data.id}`)}>
            <ClipboardEdit className="h-4 w-4 mr-2" />
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
