import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";

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

    const currentUser = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      id: currentUser.id,
      name: currentUser.name,
      role: currentUser.role,
      username: currentUser.username,
    };
  } catch (error: any) {
    return null;
  }
}
