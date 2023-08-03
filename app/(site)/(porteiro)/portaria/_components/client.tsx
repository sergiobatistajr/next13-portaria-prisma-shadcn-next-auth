"use client";

import { Guest } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
interface PortariaClientProps {
  data: Guest[] | [];
}

const PortariaClient: React.FC<PortariaClientProps> = ({ data }) => {
  const router = useRouter();

  const formattedInsiders = data.map((item) => {
    const dayMounthYear = format(new Date(item.entryDate), "dd/MM/yyyy");
    const entryDate = `${dayMounthYear} ${item.entryHour}`;

    return {
      ...item,
      plate: item.plate ? item.plate : "A pé",
      dataEntryTime: entryDate,
      apartment: item.apartment ? item.apartment.toString() : "-",
    };
  });

  return (
    <Container>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button onClick={() => router.push("/portaria/new")}>
          Nova Entrada
        </Button>
      </div>
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

export default PortariaClient;
