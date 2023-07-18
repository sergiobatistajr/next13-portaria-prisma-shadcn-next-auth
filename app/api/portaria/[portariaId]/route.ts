import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import getUser from "@/actions/getCurrentUser";

export async function PATCH(
  req: Request,
  { params }: { params: { portariaId: string } }
) {
  try {
    const currentUser = await getUser();
    const body = await req.json();

    const { exitDate, exitHour } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!exitDate) {
      return new NextResponse("exitDate is required", { status: 400 });
    }

    if (!exitHour) {
      return new NextResponse("exitHour is required", { status: 400 });
    }

    if (!params.portariaId) {
      return new NextResponse("Portaria id is required", { status: 400 });
    }

    const exitGuest = await prismadb.guest.update({
      where: {
        id: params.portariaId,
      },
      data: {
        exitDate: new Date(exitDate),
        exitHour,
        isInside: false,
      },
    });

    return NextResponse.json(exitGuest);
  } catch (error) {
    console.log("[PORTARIA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
