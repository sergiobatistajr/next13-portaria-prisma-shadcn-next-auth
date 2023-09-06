import ClientAdmin from "./_components/client";
import getUsers from "@/actions/getUsers";

const AdminPage = async () => {
  const users = await getUsers();
  return <ClientAdmin data={users} />;
};

export default AdminPage;
