import prismadb from "@/lib/prismadb";

import GuestForm from "./components/guest-form";
import ExitGuestForm from "./components/exit-guest-form";

const GuestPage = async ({ params }: { params: { guestId: string } }) => {
  try {
    const guest = await prismadb.guest.findUnique({
      where: { id: params.guestId },
    });
    return <ExitGuestForm initialData={guest!} />;
    return <>opa</>;
  } catch {
    return <GuestForm />;
  }
};

export default GuestPage;
