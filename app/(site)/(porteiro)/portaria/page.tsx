import PortariaClient from "./components/client";
import prismadb from "@/lib/prismadb";

const PortariaPage = async () => {
  const insiders = await prismadb.guest.findMany({
    where: {
      isInside: true,
    },
  });

  return <PortariaClient data={insiders} />;
};
export default PortariaPage;
