import { Guest } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/portaria`;
const getGuests = async (): Promise<Guest[] | null> => {
  try {
    const guests = await fetch(URL);

    return guests.json();
  } catch {
    return null;
  }
};

export default getGuests;
