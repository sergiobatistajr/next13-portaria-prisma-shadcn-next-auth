import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import bcrypt from "bcrypt";

import getUser from "@/actions/getCurrentUser";

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    const user = await prismadb.user.findUnique({
      where: { id: params.userId },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const currentUser = await getUser();
    const body = await req.json();
    const { name, username, password, confirmPassword, isActive, role } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!params.userId) {
      return new NextResponse("User id is required", { status: 400 });
    }

    if (password && confirmPassword) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await prismadb.user.update({
        where: { id: params.userId },
        data: {
          hashedPassword,
        },
      });
      return NextResponse.json(user);
    }

    const user = await prismadb.user.update({
      where: { id: params.userId },
      data: {
        name,
        username,
        isActive,
        role,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("[USER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
