import { User } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;

const getUsers = async (): Promise<User[] | null> => {
  const users = await fetch(URL);
  return users.json();
};

export default getUsers;
