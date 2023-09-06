"use client";
import { Guest } from "@prisma/client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Button } from "@/components/ui/button";

export type InsidersColumn = Omit<
  Guest,
  "entryDate" | "exitDate" | "apartment"
> & {
  entryDate: string;
  apartment: string | number;
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
    accessorKey: "apartment",
    header: "Apartamento",
  },
  {
    accessorKey: "observations",
    header: "Observações",
    accessorFn: (row) => {
      const { observations } = row;
      if (!observations) return "-";

      return observations.length < 20
        ? observations
        : `${observations.slice(0, 40)}...`;
    },
  },
  {
    id: "actions",
    header: "Saida",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
