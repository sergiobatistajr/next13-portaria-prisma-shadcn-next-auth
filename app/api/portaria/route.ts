import { NextResponse } from "next/server";
import getUser from "@/app/actions/getCurrentUser";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const currentUser = await getUser();

    const body = await req.json();

    const {
      plate,
      name,
      apartment,
      observations,
      model,
      pax,
      entryDate,
      entryHour,
    } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!entryDate) {
      return new NextResponse("EntryDate is required", { status: 400 });
    }

    if (!entryHour) {
      return new NextResponse("entryHour is required", { status: 400 });
    }

    const guest = await prismadb.guest.create({
      data: {
        plate,
        name,
        apartment,
        observations,
        model,
        pax,
        entryDate: new Date(entryDate),
        entryHour,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(guest);
  } catch (error) {
    console.log("[PORTARIA_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
