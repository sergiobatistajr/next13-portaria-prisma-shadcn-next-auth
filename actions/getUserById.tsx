import prismadb from "@/lib/prismadb";

const getUserById = async (id: string) => {
  try {
    const user = await prismadb.user.findUnique({
      where: { id: id },
    });

    return user;
  } catch {
    return null;
  }
};

export default getUserById;
