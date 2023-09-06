import getInsiders from "@/actions/getInsiders";
import PortariaClient from "./_components/client";

const PortariaPage = async () => {
  const insiders = await getInsiders();
  return <PortariaClient data={insiders} />;
};
export default PortariaPage;
