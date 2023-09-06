import { redirect } from "next/navigation";

import getGuests from "@/actions/getGuests";
import ClientReport from "./_components/client";
import getUser from "@/actions/getCurrentUser";

const ReportPage = async () => {
  const user = await getUser();
  const guests = await getGuests();
  if (!user) redirect("/");
  return <ClientReport data={guests} role={user.role} />;
};

export default ReportPage;
