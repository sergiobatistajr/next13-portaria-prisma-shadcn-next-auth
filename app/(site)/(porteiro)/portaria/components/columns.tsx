"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";

export type InsidersColumn = {
  id: string;
  name: string;
  plate: string;
  dataEntryTime: string;
  apartment: string;
};

export const columns: ColumnDef<InsidersColumn>[] = [
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
    accessorKey: "plate",
    header: "Placa",
  },
  {
    accessorKey: "dataEntryTime",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Entrada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "apartment",
    header: "Apartamento",
  },
  {
    id: "actions",
    header: "Saida",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
