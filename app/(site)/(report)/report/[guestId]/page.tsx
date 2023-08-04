import { ClientGuestFixForm } from "./_components/client";

const GuestIdPage = ({
  params,
}: {
  params: {
    guestId: string;
  };
}) => {
  return <ClientGuestFixForm />;
};

export default GuestIdPage;
