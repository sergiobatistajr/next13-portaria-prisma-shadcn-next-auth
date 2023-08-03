import { Guest } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/portaria`;

export const getGuestById = async (id: string): Promise<Guest | null> => {
  try {
    if (id === "new") {
      return null;
    }
    const url = `${URL}/${id}`;
    const guest = await fetch(url, {
      cache: "no-cache",
    });
    return guest.json();
  } catch {
    return null;
  }
};
