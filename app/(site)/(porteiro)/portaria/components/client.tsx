"use client";

import { useState } from "react";
import GuestForm from "./guest-form";
import CarForm from "./car-forms";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/container";

const PortariaClient = () => {
  const [isCar, setIsCar] = useState(true);
  return (
    <Container>
      <div className="mt-2">
        <Button variant="outline" onClick={() => setIsCar(!isCar)}>
          {isCar ? "Cadastrar Visitante" : "Cadastrar Veículo"}
        </Button>
        {isCar ? <CarForm /> : <GuestForm />}
      </div>
    </Container>
  );
};

export default PortariaClient;
