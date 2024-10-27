import type { IProduct } from "~/interfaces/IProduct";

interface IApiResponse {
  products: IProduct[];
  nextCursor: string | undefined;
  prevCursor: string | undefined;
}

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsFromDb(
  limit: number,
  cursor?: string,
  type?: string,
  search?: string
): Promise<{ products: IProduct[]; nextCursor: string | undefined }> {
  try {
    const url = new URL("/products", NEXT_PUBLIC_API_URL);    

    url.searchParams.append("limit", String(limit));

    if (cursor !== undefined) {
      url.searchParams.append("cursor", cursor);
    }
    if (type !== undefined) {
      url.searchParams.append("type", type);
    }
    if (search !== undefined) {
      url.searchParams.append("search", search);
    }

    const response = await fetch(url, {
      method: "GET",
      next: { revalidate: 1200 },
    });

    if (!response.ok) {
      throw new Error(`Error fetching products: ${response.status} ${response.statusText}`);
    }

    const data : IApiResponse = await response.json();
    

    console.log("Data from API:", data);

    return {
      products: data.products || [],
      nextCursor: data.nextCursor,
    };
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
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
      throw new Error("An unknown error occurred");
    }
  }
}

export async function getProductsByCategory(id: string): Promise<IProduct> {
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/products/category/${id}`, {
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
      throw new Error("An unknown error occurred");
    }
  }
}







