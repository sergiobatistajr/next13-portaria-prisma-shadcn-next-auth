"use client";

import { Guest, User } from "@prisma/client";
import { format } from "date-fns";

import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { exportToExcel, cn } from "@/lib/utils";

const ClientReport = ({
  data,
  role,
}: {
  data: Awaited<Guest[]>;
  role: Awaited<User["role"]>;
}) => {
  const formattedGuests = data.map((item) => {
    return {
      ...item,
      entryDate: format(item.entryDate, `yyy/MM/dd ${item.entryHour}`),
      plate: item.plate || "A pé",
      apartment: item.apartment || "-",
      observations: item.observations || "-",
      model: item.model || "-",
      pax: item.pax || "-",
      exitDate: item.exitDate
        ? format(item.exitDate, `yyy/MM/dd ${item.exitHour}`)
        : "-",
      role: role,
    };
  });

  const handleExport = () => {
    exportToExcel(data, "data.xlsx");
  };

  return (
    <div className="container">
      <DataTable
        columns={columns}
        data={formattedGuests}
        searchKey="name"
        searchKeyLabel="Filtrar por nome..."
        searchKey2="plate"
        searchKeyLabel2="Filtrar por placa..."
        searchKey3="entryDate"
        searchKeyLabel3="Filtrar por data de entrada..."
        searchKey4="exitDate"
        searchKeyLabel4="Filtrar por data de saída..."
      />
      <div className="flex items-center justify-end">
        {role !== "porteiro" && (
          <Button
            variant="outline"
            onClick={handleExport}
            size="sm"
            className={cn(!data.length && "hidden")}
          >
            Exportar para Excel
          </Button>
        )}
      </div>
    </div>
  );
};

export default ClientReport;
