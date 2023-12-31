import getGuestById from "@/actions/getGuestById";
import ExitGuestForm from "./_components/exit-guest-form";
import GuestForm from "./_components/guest-form";

const GuestPage = async ({ params }: { params: { guestId: string } }) => {
  const guest = await getGuestById(params.guestId);

  if (guest) {
    return <ExitGuestForm initialData={guest} />;
  }

  return <GuestForm />;
};

export default GuestPage;
