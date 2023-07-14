import getInsiders from "@/actions/getInsiders";
import PortariaClient from "./components/client";

export const revalidate = 0;

const PortariaPage = async () => {
  const insiders = await getInsiders();

  return <PortariaClient data={insiders} />;
};
export default PortariaPage;
