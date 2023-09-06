"use client";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
interface ClientAdminProps {
  data: User[];
}

const ClientAdmin: React.FC<ClientAdminProps> = ({ data }) => {
  const router = useRouter();
  return (
    <div className="container">
      <DataTable
        columns={columns}
        data={data}
        searchKey="username"
        searchKeyLabel="Filtrar por usuário"
      />
      <div className="flex justify-end">
        <Button onClick={() => router.push("/admin/new")} size="sm">
          Novo usuário
        </Button>
      </div>
    </div>
  );
};

export default ClientAdmin;
