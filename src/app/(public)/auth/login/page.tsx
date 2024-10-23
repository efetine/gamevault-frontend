import { getProviders } from "next-auth/react";

import { Login } from "./form";

export default async function LoginPage() {
  const providers = await getProviders();

  const providersArray = Object.values(providers ?? {}).filter(
    (provider) => provider.id !== "credentials",
  );

  return <Login providers={providersArray} />;
}
