import getGuestsById from "@/actions/getGuestById";
import { ClientGuestFixForm } from "./_components/client";

const GuestIdPage = async ({
  params,
}: {
  params: {
    guestId: string;
  };
}) => {
  const guest = await getGuestsById(params.guestId);

  return <ClientGuestFixForm initialData={guest} />;
};

export default GuestIdPage;
