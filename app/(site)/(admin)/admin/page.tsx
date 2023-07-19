import Container from "@/components/ui/container";
import Register from "./components/register-form";
import ClientAdmin from "./components/client";
import prismadb from "@/lib/prismadb";

const AdminPage = async () => {
  const users = await prismadb.user.findMany();
  return (
    <Container>
      <Register />
      <hr className="mt-5 mb-5" />
      <ClientAdmin data={users} />
    </Container>
  );
};

export default AdminPage;
