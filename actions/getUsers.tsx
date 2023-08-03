import { User } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;

const getUsers = async (): Promise<User[] | null> => {
  try {
    const users = await fetch(URL, {
      cache: "no-cache",
    });
    return users.json();
  } catch {
    return null;
  }
};

export default getUsers;
