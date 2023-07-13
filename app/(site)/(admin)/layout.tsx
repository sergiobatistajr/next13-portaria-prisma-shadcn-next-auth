import { redirect } from "next/navigation";

import getUser from "@/app/actions/getCurrentUser";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const user = await getUser();
  if (user?.role !== "admin") redirect("/");
  return <div>{children}</div>;
};

export default AdminLayout;
