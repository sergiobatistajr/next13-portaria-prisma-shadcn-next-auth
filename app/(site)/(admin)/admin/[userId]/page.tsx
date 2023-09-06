import { redirect } from "next/navigation";

import EditUser from "./_components/edit-user-form";
import getUserById from "@/actions/getUserById";
import Register from "./_components/register-form";

const UserPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  if (params.userId === "new") return <Register />;

  const user = await getUserById(params.userId);

  if (!user) return redirect("/admin");
  return <EditUser initialValues={user} />;
};

export default UserPage;
