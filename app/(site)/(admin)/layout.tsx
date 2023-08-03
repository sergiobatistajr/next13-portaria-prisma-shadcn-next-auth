import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();
  if (user?.role !== "admin") redirect("/");
  return <div>{children}</div>;
};

export default AdminLayout;
