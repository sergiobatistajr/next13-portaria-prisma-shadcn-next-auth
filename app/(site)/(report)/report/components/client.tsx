"use client";

import { Guest } from "@prisma/client";
import { format } from "date-fns";

import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
interface ClientReportProps {
  data: Guest[];
}

const ClientReport: React.FC<ClientReportProps> = ({ data }) => {
  const formattedInsiders = data.map((item) => {
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

  return (
    <Container>
      <DataTable
        columns={columns}
        data={formattedInsiders}
        searchKey="name"
        searchKeyLabel="Filtrar por nome..."
        searchKey2="plate"
        searchKeyLabel2="Filtrar por placa..."
      />
    </Container>
  );
};

export default ClientReport;
