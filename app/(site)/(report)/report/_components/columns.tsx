"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

export type InsidersColumn = {
  id: string;
  plate: string | null;
  name: string;
  apartment: string | null;
  observations: string | null;
  model: string | null;
  pax: string | null;
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
    accessorKey: "dataExitDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data de Saída
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
    accessorKey: "observations",
    header: "Observações",
  },
  {
    accessorKey: "model",
    header: "Modelo",
  },
  {
    accessorKey: "pax",
    header: "Pax",
  },
];
