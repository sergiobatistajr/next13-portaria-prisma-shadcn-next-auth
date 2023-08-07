import { User } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const url = `${URL}/${id}`;
    const user = await fetch(url);
    return user.json();
  } catch {
    return null;
  }
};

export default getUserById;
