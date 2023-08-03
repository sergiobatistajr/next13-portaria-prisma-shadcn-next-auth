import { User } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const url = `${URL}/${id}`;
    const user = await fetch(url, {
      cache: "no-cache",
    });
    return user.json();
  } catch {
    return null;
  }
};
