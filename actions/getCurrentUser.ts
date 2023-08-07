import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@prisma/client";
const URL = `${process.env.NEXT_PUBLIC_API}/api/users`;
export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(): Promise<Pick<
  User,
  "id" | "name" | "role" | "username"
> | null> {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return null;
    }
    const url = `${URL}/${session?.user?.id}`;
    const currentUser = await fetch(url, {
      cache: "force-cache",
    });

    if (!currentUser) {
      return null;
    }
    const user = await currentUser.json();
    return {
      id: user.id,
      name: user.name,
      role: user.role,
      username: user.username,
    };
  } catch (error: any) {
    return null;
  }
}
