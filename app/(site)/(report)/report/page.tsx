import getGuests from "@/actions/getGuests";
import ClientReport from "./_components/client";
import getUser from "@/actions/getCurrentUser";

export const dynamic = "force-dynamic";

const ReportPage = async () => {
  const user = await getUser();
  const guests = await getGuests();
  return <ClientReport data={guests} user={user} />;
};

export default ReportPage;
