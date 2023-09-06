"use client";

import { Guest } from "@prisma/client";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";

const PortariaClient = ({ data }: { data: Awaited<Guest[]> }) => {
  const router = useRouter();

  const formattedInsiders = data.map((item) => {
    return {
      ...item,
      apartment: item.apartment ? item.apartment : "-",
      entryDate: format(item.entryDate, `yyy/MM/dd ${item.entryHour}`),
      plate: item.plate ? item.plate : "A pé",
    };
  });
  return (
    <div className="container">
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
    </div>
  );
};

export default PortariaClient;
