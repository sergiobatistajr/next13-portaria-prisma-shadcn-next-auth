"use client";

import { ClipboardEdit, Cog, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserColumn } from "./columns";
import { Button } from "@/components/ui/button";
import { useResetModal } from "@/hooks/use-reset-modal";
import { ResetModal } from "./modals/reset-modal";

interface CellActionProps {
  data: UserColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const resetModal = useResetModal();
  return (
    <>
      <ResetModal
        isOpen={resetModal.isOpen}
        onClose={resetModal.onClose}
        id={data.id}
      />
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
          <DropdownMenuItem onClick={() => resetModal.onOpen()}>
            <Cog className="h-4 w-4 mr-2" />
            Resetar senha
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
