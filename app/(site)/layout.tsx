import { redirect } from "next/navigation";

import getUser from "@/actions/getCurrentUser";
interface SiteLayoutProps {
  children: React.ReactNode;
}

const SiteLayout: React.FC<SiteLayoutProps> = async ({ children }) => {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }
  return <div>{children}</div>;
};

export default SiteLayout;
