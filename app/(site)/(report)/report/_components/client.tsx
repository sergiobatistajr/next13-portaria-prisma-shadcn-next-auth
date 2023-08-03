"use client";

import { Guest } from "@prisma/client";
import { format } from "date-fns";

import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { exportToExcel, cn } from "@/lib/utils";
interface ClientReportProps {
  data: Guest[];
  user: {
    name: string;
    role: string;
  } | null;
}

const ClientReport: React.FC<ClientReportProps> = ({ data, user }) => {
  const formattedGuests = data.map((item) => {
    const entryDayMounthYear = format(new Date(item.entryDate), "dd/MM/yyyy");
    const entryDate = `${entryDayMounthYear} ${item.entryHour}`;
    let exitDate = null;

    if (item.exitDate) {
      const exitDayMounthYear = format(new Date(item.exitDate), "dd/MM/yyyy");
      exitDate = `${exitDayMounthYear} ${item.exitHour}`;
    }

    return {
      ...item,
      model: item.model ? item.model : "-",
      pax: item.pax ? item.pax.toString() : "-",
      plate: item.plate ? item.plate : "A pé",
      dataEntryTime: entryDate,
      apartment: item.apartment ? item.apartment.toString() : "-",
      dataExitDate: exitDate ? exitDate : "-",
      observations: item.observations ? item.observations : "-",
    };
  });
  const handleExport = () => {
    exportToExcel(data, "data.xlsx");
  };

  return (
    <Container>
      <DataTable
        columns={columns}
        data={formattedGuests}
        searchKey="name"
        searchKeyLabel="Filtrar por nome..."
        searchKey2="plate"
        searchKeyLabel2="Filtrar por placa..."
      />
      <div className="flex items-center justify-end">
        {user?.role !== "porteiro" && (
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
    </Container>
  );
};

export default ClientReport;
