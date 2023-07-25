import prismadb from "@/lib/prismadb";

const getInsiders = async () => {
  const insiders = await prismadb.guest.findMany({
    where: {
      isInside: true,
    },
  });

  return insiders;
};

export default getInsiders;
