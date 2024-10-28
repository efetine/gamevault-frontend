import { FormSchema } from "~/app/(protected)/admin/products/create/page";
import { env } from "~/env";

export async function createProduct(values: FormSchema) {
  const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await response.json();
}
