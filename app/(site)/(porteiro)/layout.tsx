import { redirect } from "next/navigation";

import { getCurrentUser } from "@/actions/getCurrentUser";

interface PorteiroLayoutProps {
  children: React.ReactNode;
}
const PorteiroLayout: React.FC<PorteiroLayoutProps> = async ({ children }) => {
  const user = await getCurrentUser();
  if (user?.role === "relatorio") redirect("/");
  return <div>{children}</div>;
};

export default PorteiroLayout;
