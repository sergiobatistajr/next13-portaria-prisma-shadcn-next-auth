"use client";

import { useState } from "react";
import { Guest } from "@prisma/client";
import { format } from "date-fns";

import GuestForm from "./guest-form";
import CarForm from "./car-forms";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
interface PortariaClientProps {
  data: Guest[];
}

const PortariaClient: React.FC<PortariaClientProps> = ({ data }) => {
  const [isCar, setIsCar] = useState(true);

  const formattedInsiders = data.map((item) => {
    const dayMounthYear = format(new Date(item.entryDate), "dd/MM/yyyy");
    const entryDate = `${dayMounthYear} ${item.entryHour}`;

    return {
      ...item,
      plate: item.plate ? item.plate : "A pé",
      dataEntryTime: entryDate,
    };
  });

  return (
    <Container>
      <div className="mt-2">
        <Button variant="outline" onClick={() => setIsCar(!isCar)}>
          {isCar ? "Cadastrar a Pé" : "Cadastrar Veículo"}
        </Button>
        {isCar ? <CarForm /> : <GuestForm />}
        <DataTable
          columns={columns}
          data={formattedInsiders}
          searchKey="name"
          searchKeyLabel="Filtrar por nome..."
          searchKey2="plate"
          searchKeyLabel2="Filtrar por placa..."
        />
      </div>
    </Container>
  );
};

export default PortariaClient;
