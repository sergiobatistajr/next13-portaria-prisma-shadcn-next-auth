import prismadb from "@/lib/prismadb";

const getGuests = async () => {
  const guests = await prismadb.guest.findMany();

  return guests;
};

export default getGuests;
