import type { IProduct } from "~/interfaces/IProduct";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsFromDb(
  limit: number,
  cursor?: string,
): Promise<{ products: IProduct[]; nextCursor: string | undefined }> {
  try {
    const url = new URL("/products", NEXT_PUBLIC_API_URL);

    url.searchParams.append("limit", String(limit));

    if (cursor !== undefined) {
      url.searchParams.append("cursor", cursor);
    }

    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 1200 },
    });

    const data = await response.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
    }
  }
}

export async function getProductsById(id: string): Promise<IProduct> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/products/${id}`, {
      method: "GET",
      next: { revalidate: 1200 },
    });
    const product: IProduct = (await response.json()) as IProduct;
    return {
      ...product,
      type: product.type ? 'digital' : 'physical',};
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Se produjo un error desconocido");
    }
  }
}
