import prismadb from "@/lib/prismadb";

const getGuestsById = async (id: string) => {
  try {
    const guest = await prismadb.guest.findUnique({
      where: { id: id },
    });

    return guest;
  } catch {
    return null;
  }
};

export default getGuestsById;
