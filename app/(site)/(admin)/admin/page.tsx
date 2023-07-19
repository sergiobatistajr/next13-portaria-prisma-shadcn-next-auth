import Container from "@/components/ui/container";
import Register from "./components/register-form";
import ClientAdmin from "./components/client-admin";

const AdminPage = () => {
  return (
    <Container>
      <Register />
      <hr className="mt-5 mb-5" />
      <ClientAdmin />
    </Container>
  );
};

export default AdminPage;
