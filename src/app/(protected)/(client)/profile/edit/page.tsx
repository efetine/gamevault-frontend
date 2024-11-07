import { getServerAuthSession } from "~/server/auth";
import UserEditForm from "./edit-form";

export default async function EditUserSettings() {
  const session = await getServerAuthSession();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="w-full max-w-4xl p-6 sm:p-8 lg:p-12">
        <div className="rounded-lg bg-gray-800 p-6 shadow-md sm:p-8 lg:p-12">
          <h2 className="mb-6 text-center text-2xl font-semibold">
            Edit Profile
          </h2>
          <UserEditForm userid={session?.user.id} />
        </div>
      </div>
    </div>
  );
}
