import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";
import { UserOrders } from "./user-orders-table";

export default async function Profile() {
  const session = await getServerAuthSession();

  if (session === null) {
    redirect("/api/auth/signin");
  }

  const { user } = session;

  return (
    <div className="flex min-h-screen text-white">
      {/* Main Content */}
      <div className="flex-grow p-8">
        <div className="mx-auto max-w-4xl space-y-8">
          {/* Header */}
          <div className="relative">
            <img
              src="https://img.freepik.com/fotos-premium/papel-tapiz-patron-juego_1134901-402147.jpg"
              alt="Profile Banner"
              className="h-48 w-full rounded-t-lg object-cover opacity-50"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <div className="flex items-center space-x-4">
                <img
                  src={user.profileImage ?? undefined}
                  alt="Profile Picture"
                  className="h-32 w-32 rounded-full border-4 border-blue-800 bg-gray-500"
                />
                <div>
                  <h1 className="text-3xl font-bold">
                    {user.username ?? "username"}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <UserOrders userId={session.user.id} />
        </div>
      </div>
    </div>
  );
}
