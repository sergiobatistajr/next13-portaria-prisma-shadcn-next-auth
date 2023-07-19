import prismadb from "@/lib/prismadb";
import EditUser from "./components/edit-user-form";

const UserPage = async ({
  params,
}: {
  params: {
    userId: string;
  };
}) => {
  try {
    const user = await prismadb.user.findUnique({
      where: {
        id: params.userId,
      },
    });
    if (!user) {
      return null;
    }
    return <EditUser initialValues={user} />;
  } catch {
    return null;
  }
};

export default UserPage;
