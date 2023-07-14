"use client";

import { Guest } from "@prisma/client";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { InsidersColumn } from "./columns";
import { Input } from "@/components/ui/input";

interface CellActionProps {
  data: InsidersColumn;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Product ID copied to clipboard.");
  };

  return (
    <>
      <Button variant="ghost" onClick={() => onCopy(data.id)}>
        Saida
      </Button>
    </>
  );
};
