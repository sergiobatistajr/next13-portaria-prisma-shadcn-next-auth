import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const insiders = await prismadb.guest.findMany({
      where: {
        isInside: true,
      },
      orderBy: {
        entryDate: "desc",
      },
    });

    return NextResponse.json(insiders);
  } catch (error) {
    console.log("[INSIDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
