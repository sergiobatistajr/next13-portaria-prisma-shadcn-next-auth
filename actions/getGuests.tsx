import { Guest } from "@prisma/client";

const URL = `${process.env.NEXT_PUBLIC_API}/api/portaria/`;

const getGuests = async (): Promise<Guest[]> => {
  const res = await fetch(URL);

  return res.json();
};

export default getGuests;
