import { getGuests } from "@/actions/getGuests";
import ClientReport from "./_components/client";
import { getCurrentUser } from "@/actions/getCurrentUser";

const ReportPage = async () => {
  const user = await getCurrentUser();
  const guests = await getGuests();

  return <ClientReport data={guests ?? []} user={user} />;
};

export default ReportPage;
