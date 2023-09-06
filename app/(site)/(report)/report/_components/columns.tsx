"use client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Guest } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { CellAction } from "./cell-action";

export type GuestColumns = Omit<
  Guest,
  "entryDate" | "exitDate" | "apartment" | "pax"
> & {
  entryDate: string;
  exitDate: string;
  role: string;
  apartment: string | number;
  pax: number | string;
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
    accessorKey: "entryDate",
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
    accessorKey: "entryHour",
    header: "Hora de Entrada",
  },
  {
    accessorKey: "exitDate",
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
    accessorKey: "exitHour",
    header: "Hora de Saída",
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
