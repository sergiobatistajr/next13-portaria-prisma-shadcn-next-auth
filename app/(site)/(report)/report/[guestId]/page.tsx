import { redirect } from "next/navigation";

import getGuestsById from "@/actions/getGuestById";
import FixGuestForm from "./_components/client";
import getCurrentUser from "@/actions/getCurrentUser";

const GuestIdPage = async ({
  params,
}: {
  params: {
    guestId: string;
  };
}) => {
  const user = await getCurrentUser();
  const guest = await getGuestsById(params.guestId);

  if ((user !== null && user.role !== "admin") || !guest) {
    return redirect("/");
  }

  return <FixGuestForm initialData={guest} />;
};

export default GuestIdPage;
