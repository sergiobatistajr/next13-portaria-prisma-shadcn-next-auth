"use client";

import { User } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
interface ClientAdminProps {
  data: User[] | null;
}

const ClientAdmin: React.FC<ClientAdminProps> = ({ data }) => {
  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      searchKey="username"
      searchKeyLabel="Filtrar por usuário"
    />
  );
};

export default ClientAdmin;
