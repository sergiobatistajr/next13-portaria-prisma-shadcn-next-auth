import prismadb from "@/lib/prismadb";

const getUsers = async () => {
  const users = await prismadb.user.findMany();

  return users;
};

export default getUsers;
