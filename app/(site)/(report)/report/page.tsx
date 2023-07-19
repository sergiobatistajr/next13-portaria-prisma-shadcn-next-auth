import getGuests from "@/actions/getGuests";
import ClientReport from "./components/client";

const ReportPage = async () => {
  const guests = await getGuests();
  return <ClientReport data={guests} />;
};

export default ReportPage;
