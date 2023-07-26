import getGuests from "@/actions/getGuests";
import ClientReport from "./components/client";
import getUser from "@/actions/getCurrentUser";
const ReportPage = async () => {
  const user = await getUser();
  const guests = await getGuests();
  return <ClientReport data={guests} user={user} />;
};

export default ReportPage;
