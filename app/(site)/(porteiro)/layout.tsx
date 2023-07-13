import { redirect } from "next/navigation";

import getUser from "@/app/actions/getCurrentUser";

interface PorteiroLayoutProps {
  children: React.ReactNode;
}
const PorteiroLayout: React.FC<PorteiroLayoutProps> = async ({ children }) => {
  const user = await getUser();
  if (user?.role === "relatorio") redirect("/");
  return <div>{children}</div>;
};

export default PorteiroLayout;
