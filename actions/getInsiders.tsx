import { Guest } from "@prisma/client";
const URL = `${process.env.NEXT_PUBLIC_API}/api/portaria/insiders`;
const getInsiders = async (): Promise<Guest[] | null> => {
  try {
    const insiders = await fetch(URL, {
      cache: "no-cache",
    });
    return insiders.json();
  } catch {
    return null;
  }
};

export default getInsiders;
