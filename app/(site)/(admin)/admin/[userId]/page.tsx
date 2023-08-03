import EditUser from "./_components/edit-user-form";
import getUserById from "@/actions/getUserById";

const UserPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  const user = await getUserById(params.userId);

  if (!user) {
    return null;
  }

  return <EditUser initialValues={user} />;
};

export default UserPage;
