import { User } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;

const getUsers = async (): Promise<User[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getUsers;
