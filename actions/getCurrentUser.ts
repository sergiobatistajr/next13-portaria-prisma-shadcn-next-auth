import { getServerSession } from "next-auth/next";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prismadb";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    if (!session?.user?.username) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        username: session.user.username,
      },
    });

    if (!currentUser) {
      return null;
    }

    return {
      ...currentUser,
    };
  } catch (error: any) {
    return null;
  }
}
