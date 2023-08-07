import { Guest } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/portaria`;

const getGuestsById = async (id: string): Promise<Guest | null> => {
  try {
    const url = `${URL}/${id}`;
    const guest = await fetch(url);
    return guest.json();
  } catch {
    return null;
  }
};

export default getGuestsById;
