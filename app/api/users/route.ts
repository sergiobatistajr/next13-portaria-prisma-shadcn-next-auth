import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const users = await prismadb.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.log("[USERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
