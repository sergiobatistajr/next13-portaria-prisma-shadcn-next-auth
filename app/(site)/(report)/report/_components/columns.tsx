"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type GuestColumns = {
  id: string;
  plate: string | null;
  name: string;
  apartment: string | null;
  isInside: boolean;
  observations: string | null;
  model: string | null;
  pax: string | null;
  role: string;
};

export const columns: ColumnDef<GuestColumns>[] = [
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
  {
    id: "actions",
    header: "Ações",
    cell: ({ row }) => {
      const { role, isInside } = row.original;
      if (role !== "admin" || isInside) {
        return null;
      }
      return <CellAction data={row.original} />;
    },
  },
];
