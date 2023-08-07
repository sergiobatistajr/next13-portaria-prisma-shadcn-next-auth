import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

import getUser from "@/actions/getCurrentUser";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: { portariaId: string };
  }
) {
  try {
    const guest = await prismadb.guest.findFirst({
      where: {
        id: params.portariaId,
      },
    });
    return NextResponse.json(guest);
  } catch (error) {
    console.log("[PORTARIA_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { portariaId: string } }
) {
  try {
    const currentUser = await getUser();
    const body = await req.json();

    const {
      name,
      entryDate,
      entryHour,
      exitDate,
      exitHour,
      plate,
      model,
      pax,
      apartment,
      observations,
    } = body;

    if (!currentUser) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!entryDate) {
      return new NextResponse("entryDate is required", { status: 400 });
    }
    if (!entryHour) {
      return new NextResponse("entryHour is required", { status: 400 });
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
        name,
        entryDate: new Date(entryDate),
        entryHour,
        exitDate: new Date(exitDate),
        exitHour,
        isInside: false,
        plate,
        model,
        pax,
        apartment,
        observations,
      },
    });

    return NextResponse.json(exitGuest);
  } catch (error) {
    console.log("[PORTARIA_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
