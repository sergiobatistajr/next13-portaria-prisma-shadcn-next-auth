"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

export type UserColumn = User;

export const columns: ColumnDef<UserColumn>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "username",
    header: "Usuário",
  },
  {
    accessorKey: "role",
    header: "Função",
  },
  {
    accessorKey: "isActive",
    header: "Ativo",
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <div
          className={`${
            isActive ? "bg-green-500" : "bg-red-500"
          } h-2 w-2 rounded-full`}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Saida",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
