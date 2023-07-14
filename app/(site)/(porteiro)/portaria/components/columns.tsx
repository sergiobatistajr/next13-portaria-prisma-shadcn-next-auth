"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type InsidersColumn = {
  id: string;
  name: string;
  plate: string;
  dataEntryTime: string;
};

export const columns: ColumnDef<InsidersColumn>[] = [
  {
    accessorKey: "name",
    header: "Nome",
  },
  {
    accessorKey: "plate",
    header: "Placa",
  },
  {
    accessorKey: "dataEntryTime",
    header: "Data de Entrada",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
