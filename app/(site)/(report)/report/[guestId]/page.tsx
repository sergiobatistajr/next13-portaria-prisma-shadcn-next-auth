import { redirect } from "next/navigation";

import getGuestsById from "@/actions/getGuestById";
import { ClientGuestFixForm } from "./_components/client";
import getCurrentUser from "@/actions/getCurrentUser";
export const dynamic = "force-dynamic";
const GuestIdPage = async ({
  params,
}: {
  params: {
    guestId: string;
  };
}) => {
  const user = await getCurrentUser();
  if (user !== null && user.role !== "admin") {
    return redirect("/");
  }
  const guest = await getGuestsById(params.guestId);

  return <ClientGuestFixForm initialData={guest} />;
};

export default GuestIdPage;
